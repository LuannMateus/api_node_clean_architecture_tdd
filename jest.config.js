/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  watchPathIgnorePatterns: ['./.docker'],
  collectCoverageFrom: ['**/src/**/*.js', '!**/src/main/**', '!**/src/login.js', '!**/.docker/**/mongoData'],
  preset: '@shelf/jest-mongodb'
}
