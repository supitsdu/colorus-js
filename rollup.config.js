// This Rollup configuration defines a three-phase build process:
//
// 1. Transpile TypeScript to JavaScript and generate declaration files (`.d.ts`).
// 2. Bundle and minify the JavaScript code using esbuild, creating both CommonJS and ES module outputs.
// 3. Bundle TypeScript declaration files into a single file for distribution.
//
// The `tsconfig.json` file is used for TypeScript compilation settings, including the output location for declaration files.

import esbuild from "rollup-plugin-esbuild";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import outputSize from "rollup-plugin-output-size";

export default [
	// Phase 1: Transpile TypeScript to JavaScript and generate declaration files (`.d.ts`)
	{
		input: "src/main.ts", // Entry point of your TypeScript code
		plugins: [
			typescript(), // Compiles TypeScript to JavaScript. See: https://github.com/rollup/plugins/tree/master/packages/typescript
			outputSize({ summary: "always" }), // Prints a summary of the output file sizes. See: https://github.com/ritz078/rollup-plugin-output-size
		],
		output: {
			file: "build/main.js", // Output the compiled JavaScript to this file
			format: "es", // Use ECMAScript module format
			exports: "auto", // Let Rollup determine how to handle exports
		},
	},

	// Phase 2: Bundle and minify the JavaScript code using esbuild
	{
		input: "build/main.js", // Take the output from phase 1 as input
		plugins: [
			esbuild({
				minify: true, // Minify the code to reduce file size
				target: "esnext", // Target the latest JavaScript features
				minifyIdentifiers: true, // Shorten variable and function names
				minifySyntax: true, // Remove unnecessary whitespace and syntax
				minifyWhitespace: true, // Further reduce whitespace
			}), // See: https://github.com/egoist/rollup-plugin-esbuild
			outputSize({ summary: "always" }),
		],
		output: [
			{
				file: "dist/main.cjs", // Output a CommonJS module
				format: "cjs",
				exports: "auto",
			},
			{
				file: "dist/main.js", // Output an ES module
				format: "esm",
				exports: "auto",
			},
		],
	},

	// Phase 3: Bundle TypeScript declaration files into a single file
	{
		input: "build/@types/main.d.ts", // Take the output from phase 1 as TypeScript declarations, as configured in tsconfig.json ("declarationDir")
		plugins: [
			dts(), // Bundles .d.ts files. See: https://github.com/Swatinem/rollup-plugin-dts
			outputSize({ summary: "always" }),
		],
		output: [{ file: "dist/main.d.ts", format: "esm", exports: "auto" }], // Output the bundled declarations
	},
];
