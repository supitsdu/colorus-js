/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
	// A map from regular expressions to paths to transformers
	transform: {
		"^.+\\.(ts|js)$": "@swc/jest",
	},

	// Automatically clear mock calls, instances, contexts and results before every test
	clearMocks: true,

	// Indicates whether the coverage information should be collected while executing the test
	collectCoverage: true,
	collectCoverageFrom: [
		"src/**/*.ts",      // Include all .js files in the src folder
		"!src/types/*.ts", 	// Exclude types files
		"!test/**/*.ts", 	// Exclude test files
	  ],


	// The directory where Jest should output its coverage files
	coverageDirectory: "coverage",

	// Indicates which provider should be used to instrument code for coverage
	coverageProvider: "v8",
	coverageReporters: ["html-spa", "lcov"],

	// An array of file extensions your modules use
	moduleFileExtensions: ["js", "ts"],

	// A list of paths to directories that Jest should use to search for files in
	roots: ["./test", "./src"],

	// The glob patterns Jest uses to detect test files
	testMatch: ["**/?(*.)+(spec|test).(ts|js)"],

};
