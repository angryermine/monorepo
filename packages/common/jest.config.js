/* eslint-disable @typescript-eslint/no-var-requires */
const {pathsToModuleNameMapper} = require('ts-jest/utils');
const {compilerOptions} = require('./tsconfig.json');

module.exports = {
  rootDir: 'src',
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {prefix: '<rootDir>'}),
  coverageDirectory: '<rootDir>/../coverage',
};
