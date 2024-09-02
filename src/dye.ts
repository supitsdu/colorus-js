/**
 * @file Defines the core `dye` function for creating and manipulating color objects in the colorus-js library.
 *
 * The `dye` function serves as the main entry point for working with colors. It accepts various color inputs (strings or objects) and optional configuration options, including plugins for extending functionality.
 *
 * It returns a `DyeReturns` object that provides access to color properties, conversion methods, adjustment methods, and any custom plugin methods.
 */

// Core library modules
import { contrastRatio, relativeLuminance } from "./core/accessibility";
import { alpha, hue, lighten, saturate } from "./core/colorAdjustments";
import colorFormatter from "./core/colorFormatter";
import { fallbackColor, processColorInput } from "./core/inputSerializer";
import { isValidPlugin } from "./core/pluginValidation";

// Conversion utilities
import {
	rgbToCmyk,
	rgbToHex,
	rgbToHsl,
	rgbToHsv,
	rgbToNamedColor,
} from "./conversions/rgbConversions";

// Helper functions
import { isObject, isUndefined } from "./helpers";

// Constants
import { errorMessages } from "./constants/errorMessages";

// Types
import type {
	ColorInput,
	Dye,
	DyeOptions,
	DyePlugins,
	DyeReturns,
} from "./types";

function isValidDyeOptions<P extends DyePlugins>(
	options?: DyeOptions<P>,
): options is DyeOptions<P> {
	if (isUndefined(options)) return false;

	if (
		!isObject(options) ||
		(!isUndefined(options.plugins) && !isObject(options.plugins)) ||
		(!isUndefined(options.formatOptions) && !isObject(options.formatOptions))
	) {
		return false;
	}

	return true;
}

/**
 * Creates a color object for manipulation and conversion.
 *
 * @param {ColorInput} input - The color input (string or object).
 * @param {DyeOptions<P>} [options] - Optional configuration (plugins, format options).
 *
 * @returns {DyeReturns<P>} The color object with core and plugin methods.
 */
export function dye<P extends DyePlugins>(
	input: ColorInput,
	options: DyeOptions<P> = {},
): DyeReturns<P> {
	try {
		const processedInput = processColorInput(input);

		if (!isValidDyeOptions(options)) {
			throw new TypeError(errorMessages.invalidOptions);
		}

		const result: Dye<P> = {
			...processedInput,

			get luminance() {
				return relativeLuminance(result.rgb);
			},

			get rgb() {
				return result.value || fallbackColor.value;
			},

			get hsl() {
				return rgbToHsl(result.rgb);
			},

			get hsv() {
				return rgbToHsv(result.rgb);
			},

			get cmyk() {
				return rgbToCmyk(result.rgb);
			},

			toHex: () => rgbToHex(result.rgb, options.formatOptions),
			toRgb: () => colorFormatter.rgb(result.rgb, options.formatOptions),
			toHsl: () => colorFormatter.hsl(result.hsl, options.formatOptions),
			toHsv: () => colorFormatter.hsv(result.hsv, options.formatOptions),
			toCmyk: () => colorFormatter.cmyk(result.cmyk, options.formatOptions),
			toNamed: () => rgbToNamedColor(result.rgb),

			lighten: (amount = 0.1) => dye(lighten(result.hsl, amount), options),
			darken: (amount = 0.1) => dye(lighten(result.hsl, -amount), options),
			saturate: (amount = 0.1) => dye(saturate(result.hsl, amount), options),
			desaturate: (amount = 0.1) => dye(saturate(result.hsl, -amount), options),
			hue: (amount = 0.1) => dye(hue(result.hsl, amount), options),
			alpha: (amount = 0.1) => dye(alpha(result.rgb, amount), options),
			contrastRatio: bgColor => contrastRatio(result.rgb, dye(bgColor).rgb),
		};

		for (const methodName in options.plugins) {
			if (isValidPlugin(options.plugins, methodName)) {
				(result as any)[methodName] = (...args: unknown[]) =>
					options.plugins?.[methodName]?.call(result, ...args);
			}
		}

		return result as DyeReturns<P>;
	} catch (err) {
		if (err instanceof TypeError) {
			throw new TypeError(`Invalid dye() usage: ${err.message}`);
		}

		if (err instanceof Error) {
			throw new Error(err.message);
		}

		throw new Error("An unknown error occurred during color processing.");
	}
}
