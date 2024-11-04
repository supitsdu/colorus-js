import type { Colors, Dye } from "../types";
import { ColorParser } from "./colorParser";

/**
 * Attempts to match a color input to a valid color object using the available parsers.
 * The function iterates over the registered parsers and attempts to parse the input
 * using each one. If a valid color object is found, it is returned. If no valid color
 * object is found, an error is thrown.
 *
 * @param input - The color input to parse.
 * @param options - The parsing options to be used for processing the input.
 * @returns The parsed color object.
 * @throws An error if no valid color parsers are found for the input.
 */
export function matchColor(
	input?: Colors.Input,
	options?: Dye.Options,
): Dye.ParserMatchArray;
export function matchColor(
	this: Dye.Options,
	input?: Colors.Input,
	options?: Dye.Options,
): Dye.ParserMatchArray {
	let error = "";
	const parsers = [...(options?.parsers || []), ...(this?.parsers || [])];
	if (!input) {
		throw new Error("No color input provided");
	}

	if (parsers.length === 0) {
		throw new Error(
			"No parsers were provided for the color input. Ensure at least one parser is available",
		);
	}

	for (const parser of parsers) {
		try {
			if (!(parser instanceof ColorParser)) {
				throw new Error("Invalid parser provided");
			}

			const parsedValue = parser.parse(input);
			if (parsedValue) return parsedValue;
		} catch (err) {
			error = (err as Error).message;
		}
	}

	if (error) throw new Error(`Failed to parse color input: ${error}`);

	throw new Error(
		`Failed to parse color input: No valid parser found for '${typeof input}'`,
	);
}
