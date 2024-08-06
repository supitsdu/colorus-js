import { Color } from "../Color";
import { Clamp } from "../core/colorNormalizer";
import type { ColorInput, RgbColor } from "../types";
/**
 * Interpolates between two RgbColor colors based on a given amount.
 * @param primary - The primary color in RgbColor format.
 * @param secondary - The secondary color in RgbColor format.
 * @param amount - A value between 0 and 1, indicating the strength of interpolation.
 * @return An object containing interpolated RgbColor and optional alpha values.
 */
export const interpolateRgb = (
	primary: RgbColor,
	secondary: RgbColor,
	amount = 0.1,
): RgbColor => {
	const mixBy = (p: number, s: number) => p * (1 - amount) + s * amount;

	return Clamp.rgb({
		r: mixBy(primary.r, secondary.r),
		g: mixBy(primary.g, secondary.g),
		b: mixBy(primary.b, secondary.b),
		a: mixBy(primary.a ?? 1, secondary.a ?? 1), // Handle optional alpha
	});
};

/**
 * Mixes the current color with another color.
 * @param input - The color to mix with.
 * @param amount - The amount of mixing.
 * @return A new Color instance representing the mixed color.
 */
export function mix(this: Color, input: ColorInput, amount = 0.1) {
	return new Color(interpolateRgb(this.rgb, new Color(input).rgb, amount));
}
