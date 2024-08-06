import { ColorFormatter } from "./colorFormatter";
import {
	rgbToCmyk,
	rgbToHex,
	rgbToHsl,
	rgbToHsv,
	rgbToNamedColor,
} from "./conversions/rgbConversions";
import { contrastRatio, relativeLuminance } from "./core/accessibility";
import { alpha, hue, lighten, saturate } from "./core/colorAdjustments";
import { processColorInput } from "./core/inputSerializer";
import { isNotObject, isNotPlugin } from "./helpers";
import type {
	CmykColor,
	ColorData,
	ColorInput,
	ColorOptions,
	ColorPlugins,
	FormatOptions,
	HslColor,
	HsvColor,
	RgbColor,
} from "./types";

export class Color {
	private readonly data: ColorData;

	/**
	 * Constructs a new Color instance with the given input and optional plugins.
	 * @param input - The color input string or object.
	 * @param options - Optional configuration options.
	 * @param options.plugins - An key-value object with plugin functions to apply.
	 */
	constructor(input: ColorInput, options?: ColorOptions<any>) {
		this.data = processColorInput(input);

		validateOptions(options);

		for (const methodName in options?.plugins) {
			if (isNotPlugin(options?.plugins, methodName)) continue;

			Object.defineProperty(this, methodName, {
				value: (...args: unknown[]) =>
					options.plugins[methodName]?.call(this, ...args),
				enumerable: false, // Make the property non-enumerable
				writable: false, // Prevent accidental modification
				configurable: false, // Prevent deletion or reconfiguration
			});
		}
	}

	/**
	 * Gets the type of the current color.
	 * @return The color type.
	 */
	get colorType(): string | undefined {
		return this.data?.colorType;
	}

	/**
	 * Gets the relative luminance of the current color.
	 * @link [WCAG 2.0 Adherence](https://www.w3.org/TR/WCAG20-TECHS/G17.html)
	 * @return The relative luminance.
	 */
	get luminance(): number {
		return relativeLuminance(this.rgb);
	}

	/**
	 * Gets the RgbColor object representation of the current color.
	 * @return The RgbColor representation.
	 */
	get rgb(): RgbColor {
		return this.data.colorObject;
	}

	/**
	 * Gets the HslColor object representation of the current color.
	 * @return The HslColor representation.
	 */
	get hsl(): HslColor {
		return rgbToHsl(this.rgb);
	}

	/**
	 * Gets the HsvColor representation of the current color.
	 * @return The HsvColor representation.
	 */
	get hsv(): HsvColor {
		return rgbToHsv(this.rgb);
	}

	/**
	 * Gets the CmykColor representation of the current color.
	 * @return The CmykColor representation.
	 */
	get cmyk(): CmykColor {
		return rgbToCmyk(this.rgb);
	}

	/**
	 * Converts the current color to hexadecimal format.
	 * @param  options - Formatting options.
	 * @return The hexadecimal representation of the color.
	 */
	toHex = (options?: FormatOptions) => rgbToHex(this.rgb, options);

	/**
	 * Converts the current color to RgbColor format.
	 * @param options - Formatting options.
	 * @return The RgbColor representation of the color.
	 */
	toRgb = (options?: FormatOptions) =>
		new ColorFormatter(options).rgb(this.rgb);

	/**
	 * Converts the current color to HslColor format.
	 * @param options - Formatting options.
	 * @return The HslColor representation of the color.
	 */
	toHsl = (options?: FormatOptions) =>
		new ColorFormatter(options).hsl(this.hsl);

	/**
	 * Converts the current color to HsvColor format.
	 * @param options - Formatting options.
	 * @return The HsvColor representation of the color.
	 */
	toHsv = (options?: FormatOptions) =>
		new ColorFormatter(options).hsv(this.hsv);

	/**
	 * Converts the current color to CmykColor format.
	 * @param options - Formatting options.
	 * @return The CmykColor representation of the color.
	 */
	toCmyk = (options?: FormatOptions) =>
		new ColorFormatter(options).cmyk(this.cmyk);

	/**
	 * Converts the current color to its nearest CSS named color representation.
	 * @return The CSS named color.
	 */
	toNamed = () => rgbToNamedColor(this.rgb);

	/**
	 * Lightens the current color.
	 * @param amount - The amount of lightening.
	 * @return A new Color instance representing the lightened color.
	 */
	lighten(amount = 0.1) {
		return new Color(lighten(this.hsl, amount));
	}

	/**
	 * Darkens the current color.
	 * @param amount - The amount of darkening.
	 * @return A new Color instance representing the darkened color.
	 */
	darken(amount = 0.1) {
		return new Color(lighten(this.hsl, -amount));
	}

	/**
	 * Saturates the current color.
	 * @param amount - The amount of saturation.
	 * @return A new Color instance representing the saturated color.
	 */
	saturate(amount = 0.1) {
		return new Color(saturate(this.hsl, amount));
	}

	/**
	 * Desaturates the current color.
	 * @param amount - The amount of desaturation.
	 * @return A new Color instance representing the desaturated color.
	 */
	desaturate(amount = 0.1) {
		return new Color(saturate(this.hsl, -amount));
	}

	/**
	 * Changes the hue of the current color.
	 * @param amount - The amount of hue change.
	 * @return A new Color instance representing the color with changed hue.
	 */
	hue(amount = 0.1) {
		return new Color(hue(this.hsl, amount));
	}

	/**
	 * Changes the alpha (opacity) of the current color.
	 * @param amount - The amount of alpha change.
	 * @return A new Color instance representing the color with changed alpha.
	 */
	alpha(amount = 0.1) {
		return new Color(alpha(this.rgb, amount));
	}

	/**
	 * Calculates the contrast ratio between a foreground color and its adjacent background.
	 * @param backgroundColor - The background color.
	 * @return The contrast ratio between the instantiated color and the provided background color.
	 */
	contrastRatio(backgroundColor: ColorInput) {
		return contrastRatio(this.rgb, new Color(backgroundColor).rgb);
	}
}

/**
 * Validates the options object passed to the Color constructor.
 *
 * @param options - An optional configuration object.
 * @param options.plugins - An optional object containing plugin functions to extend the Color instance.
 *                                     - Keys should be the names of the plugin methods.
 *                                     - Values should be functions that take the Color instance as `this` and any additional arguments.
 *
 * @throws If `options` is not a plain object or if `options.plugins` is present but not a plain object.
 */
function validateOptions(options?: ColorOptions<any>) {
	if (typeof options === "undefined") return {};

	if (isNotObject(options)) {
		throw new TypeError(
			`Invalid options: Expected a plain object with method names as keys. Received ${Array.isArray(options) ? "an array" : typeof options}`,
		);
	}

	const { plugins } = options;

	if (typeof plugins !== "undefined" && isNotObject(plugins)) {
		throw new TypeError(
			`Invalid plugins: Expected a plain object with method names as keys. Received ${Array.isArray(plugins) ? "an array" : typeof plugins}`,
		);
	}
}

/**
 * Creates a new Color instance or returns the existing one if provided, with the specified plugin types.
 *
 * @param input - The color input string, object, or an existing Color instance
 * @param options - Optional configuration options (same as in the Color constructor)
 * @returns A new or existing Color instance with the specified plugin types
 */
export function defineColor<T extends ColorPlugins>(
	input: ColorInput | Color,
	options: ColorOptions<T> = {},
): Color & T {
	if (input instanceof Color) return input as Color & T; // Type assertion to include plugin types
	return new Color(input, options) as Color & T; // Type assertion to include plugin types
}
