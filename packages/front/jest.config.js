/* eslint-disable @typescript-eslint/no-var-requires */
const {pathsToModuleNameMapper} = require('ts-jest/utils');
const {compilerOptions} = require('./tsconfig.json');

module.exports = {
  rootDir: 'src',
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '\\.(png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    ...pathsToModuleNameMapper(compilerOptions.paths, {prefix: '<rootDir>'}),
  },
  coverageDirectory: '<rootDir>/../coverage',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
