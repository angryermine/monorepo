/* eslint-disable @typescript-eslint/no-var-requires */
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  modifyWebpackConfig({webpackConfig}) {
    webpackConfig.resolve.plugins.push(new TsconfigPathsPlugin({}));

    return webpackConfig;
  },
  options: {
    buildType: 'spa',
  },
};
