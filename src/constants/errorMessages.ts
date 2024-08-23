export const errorMessages = {
	invalidOptions: "Invalid options: Expected a plain object.",
	invalidPlugins:
		"Invalid plugins: Expected a plain object with method names as keys.",
	invalidPlugin: (methodName: string) =>
		`Invalid plugin for '${methodName}': Expected a function.`,
	invalidPluginOverwrite: (methodName: string) =>
		`Invalid plugin for '${methodName}': Overwritring an existing method is not allowed.`,
	invalidColorString: (input: string) => `Invalid color string: ${input}`,
	invalidColorObject: (input: unknown) =>
		`Invalid color object: ${JSON.stringify(input)}`,
	invalidColorType:
		"Invalid color type, expected a valid color string or object.",
};
