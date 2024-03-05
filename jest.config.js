/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.js$': '@swc/jest'
  },

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',
  coverageReporters: ['html-spa'],

  // An array of file extensions your modules use
  moduleFileExtensions: ['js'],

  // A list of paths to directories that Jest should use to search for files in
  roots: ['./test', './src'],

  // The glob patterns Jest uses to detect test files
  testMatch: ['**/?(*.)+(spec|test).js']
}
