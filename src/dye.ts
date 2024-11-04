import { rgbParser } from "./parsers/rgbParser";
import { convertRgbToCmyk, convertRgbToHsv } from "./processing/conversions";
import { rgbToHsl } from "./processing/interconversions";
import { matchColor } from "./processing/matchColor";
import type { Colors, Dye } from "./types";
import { relativeLuminance } from "./utils/accessibility";
import { integratePlugins } from "./utils/pluginHelpers";

/**
 * Creates and manipulates colors.
 *
 * @param {Colors.Input} input - The color input (string or object).
 * @param {Dye.Options<P>} [options] - Optional configuration (e.g.: `plugins`, `parsers`, `formatOptions`).
 * @returns {Dye.Instance<P>} The `Dye.Instance` object with color properties and methods.
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
	let processedInput: Dye.ParserMatchArray | undefined;
	let error: Dye.Instance["error"];

	options.parsers = [rgbParser, ...(options.parsers || [])];

	try {
		processedInput = matchColor(input, { parsers: options.parsers });
	} catch (err) {
		error = { message: (err as Error).message };
	}

	if (!processedInput) {
		processedInput = [
			input,
			{ r: 0, g: 0, b: 0, a: 1 },
			{ model: "unknown", value: input, isValid: false },
		];
	}

	const [_, rgb, source] = processedInput;

	return integratePlugins<P>(
		{
			source: source,

			options,

			get rgb() {
				return rgb;
			},

			get luminance() {
				return relativeLuminance(this.rgb);
			},

			get hsl() {
				return rgbToHsl(this.rgb);
			},

			get hsv() {
				return convertRgbToHsv(this.rgb);
			},

			get cmyk() {
				return convertRgbToCmyk(this.rgb);
			},

			get alpha() {
				return this.rgb.a;
			},

			get hue() {
				return this.hsl.h;
			},

			error,
		} as Dye.Instance<P>,
		options.plugins as P,
	);
}
