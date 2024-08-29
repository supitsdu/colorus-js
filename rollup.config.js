import esbuild from "rollup-plugin-esbuild";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import outputSize from "rollup-plugin-output-size";

export default [
	{
		input: "src/main.ts",
		plugins: [
			typescript(),
			esbuild({
				minify: true,
				target: "esnext",
				minifyIdentifiers: true,
				minifySyntax: true,
				minifyWhitespace: true,
			}),
			outputSize({ summary: "always" }),
		],
		output: [
			{
				file: "dist/main.cjs",
				format: "cjs",
				exports: "auto",
			},
			{
				file: "dist/main.js",
				format: "esm",
				exports: "auto",
			},
		],
	},
	{
		input: "dist/__types__/main.d.ts",
		plugins: [dts(), outputSize({ summary: "always" })],
		output: [{ file: "dist/main.d.ts", format: "esm", exports: "auto" }],
	},
];
