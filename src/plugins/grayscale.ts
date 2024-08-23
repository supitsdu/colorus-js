import { Color } from "../Color";
import type { RgbColor } from "../types";

/**
 * Converts an RgbColor color to grayscale.
 * @param color - An object representing an RGBA color.
 * @param useNtscFormula - Whether to use the NTSC formula for conversion. (Default: `false`)
 * @return An object representing the grayscale color.
 */
export const rgbToGray = (
	color: RgbColor,
	useNtscFormula = false,
): RgbColor => {
	const y = useNtscFormula
		? 0.299 * color.r + 0.587 * color.g + 0.114 * color.b
		: 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;

	return { r: y, g: y, b: y, a: color.a ?? 1 }; // Handle optional alpha
};

/**
 * Converts the current color to grayscale.
 * @param useNtscFormula - Whether to use the NTSC formula for conversion. (Default: `false`)
 * @return A new Color object representing the grayscale color.
 */
export function grayscale(this: Color, useNtscFormula = false) {
	return new Color(rgbToGray(this.rgb, useNtscFormula));
}
