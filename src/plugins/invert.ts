import { Color } from "../Color";
import type { RgbColor } from "../types";

/**
 * Invert an RgbColor color.
 * @param color - RgbColor color object.
 * @return New RgbColor color object.
 */
export const invertRgb = (color: RgbColor): RgbColor => ({
	...color,
	r: 255 - color.r,
	g: 255 - color.g,
	b: 255 - color.b,
});

/**
 * Inverts the color using sRGB values.
 * @return A new Color instance representing the color with inverted color values.
 */
export function invert(this: Color) {
	return new Color(invertRgb(this.rgb));
}
