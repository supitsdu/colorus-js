import { rgbParser } from "./parsers/rgbParser";
import { ColorParser } from "./processing/colorParser";
import { convertRgbToCmyk, convertRgbToHsv } from "./processing/conversions";
import { rgbToHsl } from "./processing/interconversions";
import type { Colors, Dye } from "./types";
import { relativeLuminance } from "./utils/accessibility";
import { integratePlugins } from "./utils/pluginHelpers";

/**
 * ColorInstance class that represents a color instance with various properties and methods.
 * @template P The plugins type extending Dye.Plugins
 */
class ColorInstance<P extends Dye.Plugins> implements Dye.Properties<P> {
	readonly source: Dye.Source;
	readonly options: Dye.Options<P>;
	readonly error?: { message?: string };
	private readonly _rgb: Colors.Rgb;

	constructor(
		source: Dye.Source,
		rgb: Colors.Rgb,
		options: Dye.Options<P>,
		error?: { message?: string },
	) {
		this.source = source;
		this._rgb = rgb;
		this.options = options;
		this.error = error;
	}

	get rgb() {
		return this._rgb;
	}

	get luminance() {
		return relativeLuminance(this.rgb);
	}

	get hsl() {
		return rgbToHsl(this.rgb);
	}

	get hsv() {
		return convertRgbToHsv(this.rgb);
	}

	get cmyk() {
		return convertRgbToCmyk(this.rgb);
	}

	get alpha() {
		return this.rgb.a;
	}

	get hue() {
		return this.hsl.h;
	}
}

/**
 * Colorus class that provides methods for color processing and parsing.
 * @template P The plugins type extending Dye.Plugins
 */
class Colorus<P extends Dye.Plugins> {
	readonly options: Dye.Options<P>;

	/**
	 * Creates a new Colorus instance with the specified options.
	 * @param options Configuration options for color processing
	 */
	constructor(options?: Dye.Options<P>) {
		this.options = {
			formatOptions: {},
			fallback: { r: 0, g: 0, b: 0, a: 1 },
			parsers: [],
			...options,
		};

		// Always ensure rgbParser is available
		this.options.parsers?.push(rgbParser);
	}

	/**
	 * Validates if a parser is properly configured and can be used
	 * @param parser The parser to validate
	 * @returns true if valid, false otherwise
	 */
	private isValidParser(parser: unknown): parser is ColorParser<any, any> {
		return parser instanceof ColorParser;
	}

	/**
	 * Creates a fallback result when color parsing fails
	 * @param input The original color input that failed to parse
	 * @returns A structured ParserMatchArray with fallback values
	 */
	private createFallbackResult(input: Colors.Input): Dye.ParserMatchArray {
		return [
			input,
			this.options.fallback || { r: 0, g: 0, b: 0, a: 1 },
			{ model: "unknown", value: input, isValid: false },
		];
	}

	/**
	 * Attempts to match a color input using available parsers
	 *
	 * @param input - The color input to parse
	 * @returns The parsed color array or undefined if no match
	 * @throws Error if parsing fails due to configuration issues
	 */
	match(input: Colors.Input): Dye.ParserMatchArray | undefined {
		if (!input) {
			throw new Error("No color input provided");
		}

		const parsers = this.options.parsers || [];
		if (parsers.length === 0) {
			throw new Error(
				"No parsers were provided for the color input. Ensure at least one parser is available",
			);
		}

		let lastError = "";
		for (const parser of parsers) {
			try {
				if (!this.isValidParser(parser)) {
					continue; // Skip invalid parsers instead of throwing
				}

				const parsedValue = parser.parse(input);
				if (parsedValue) return parsedValue;
			} catch (err) {
				lastError = (err as Error).message;
			}
		}

		// Only throw if we encountered actual parsing errors, not just failed matches
		if (lastError) {
			throw new Error(`Failed to parse color input: ${lastError}`);
		}

		return undefined;
	}

	/**
	 * Creates a color instance with the specified input
	 *
	 * @param input - Color specification (hex, rgb, hsl string or object)
	 * @returns A color instance with all applicable plugins
	 */
	dye<I extends Colors.Any>(input: I): Dye.Instance<P>;
	dye<I extends Colors.Input>(input: I): Dye.Instance<P>;
	dye<I extends Colors.Input>(input: I): Dye.Instance<P> {
		let colorResult: Dye.ParserMatchArray;
		let error: Dye.Instance["error"];

		try {
			// Attempt to match the color
			const matchResult = this.match(input);

			if (matchResult) {
				colorResult = matchResult;
			} else {
				// No parser matched but no errors occurred - SET AN ERROR ANYWAY
				error = {
					message: `Failed to parse color input: No valid parser found for '${typeof input}'`,
				};
				colorResult = this.createFallbackResult(input);
			}
		} catch (err) {
			// An error occurred during parsing
			error = { message: (err as Error).message };
			colorResult = this.createFallbackResult(input);
		}

		const [_, rgb, source] = colorResult;

		// Create an instance of ColorInstance and integrate plugins
		const instance = new ColorInstance<P>(
			source as Dye.Source<any>,
			rgb,
			this.options,
			error,
		);

		return integratePlugins<P>(instance, this.options.plugins as P);
	}
}

/**
 * Main function to process color input and return a color instance.
 * This function is a wrapper around the Colorus class.
 *
 * @param input - The color input to process
 * @param options - Configuration options for color processing
 * @returns A color instance with all applicable plugins
 */
export function dye<I extends Colors.Any, P extends Dye.Plugins>(
	input: I,
	options?: Dye.Options<P>,
): Dye.Instance<P>;
export function dye<I extends Colors.Input, P extends Dye.Plugins>(
	input: I,
	options?: Dye.Options<P>,
): Dye.Instance<P>;
export function dye<I extends Colors.Input, P extends Dye.Plugins>(
	input: I,
	options: Dye.Options<P> = {},
): Dye.Instance<P> {
	const colorus = new Colorus<P>(options);
	return colorus.dye(input);
}
