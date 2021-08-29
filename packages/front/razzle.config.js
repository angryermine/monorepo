/* eslint-disable @typescript-eslint/no-var-requires */
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const makeLoaderFinder = require('razzle-dev-utils/makeLoaderFinder');

module.exports = {
  modifyWebpackConfig({webpackConfig, env}) {
    webpackConfig.resolve.extensions = [...webpackConfig.resolve.extensions, '.ts', '.tsx'];
    webpackConfig.resolve.plugins.push(new TsconfigPathsPlugin({}));

    // Safely locate Babel-Loader in Razzle's webpack internals
    const babelLoaderFinder = makeLoaderFinder('babel-loader');
    const babelLoader = webpackConfig.module.rules.find(babelLoaderFinder);

    // Get the correct `include` option, since that hasn't changed.
    // This tells Razzle which directories to transform.
    const {include} = babelLoader;

    const esbuildLoader = {
      include,
      test: /\.tsx?$/,
      use: [
        {
          loader: require.resolve('esbuild-loader'),
          options: {
            loader: 'tsx',
            target: env.target === 'web' ? 'es6' : 'node12',
            tsconfigRaw: require('./tsconfig.json'),
          },
        },
      ],
    };

    // Remove babel
    webpackConfig.module.rules = webpackConfig.module.rules.filter((rule) => !babelLoaderFinder(rule));
    webpackConfig.module.rules.push(esbuildLoader);

    // Do typechecking in a separate process,
    // We can run it only in client builds.
    if (env.target === 'web') {
      webpackConfig.plugins.push(
        new ForkTsCheckerWebpackPlugin({
          typescript: {
            build: true,
            configFile: './tsconfig.json',
          },
        }),
      );
      if (env.dev) {
        // As suggested by Microsoft's Outlook team, these optimizations
        // crank up Webpack x TypeScript perf.
        // @see https://medium.com/@kenneth_chau/speeding-up-webpack-typescript-incremental-builds-by-7x-3912ba4c1d15
        webpackConfig.output.pathinfo = false;
        webpackConfig.optimization = {
          removeAvailableModules: false,
          removeEmptyChunks: false,
          splitChunks: false,
        };
      }
    }

    return webpackConfig;
  },
};
