import { nan, precision } from "../helpers";
import type { HslColor, RgbColor } from "../types";
import { Clamp } from "./colorNormalizer";

/**
 * Modifies the given `value` by a certain `amount`.
 *
 * @param value - The value to modify.
 * @param amount - The amount to modify the `value` by, a value between 0 and 1.
 * @return The modified `value`.
 */
export const modBy = (value: number, amount: number): number => {
	const a = Number(amount);

	if (nan(a)) return value;

	return precision((1 + a) * value);
};

/**
 * Lightens an HslColor color by the specified amount.
 * @param color - HslColor color object to lighten.
 * @param amount - A value between 0 and 1.
 * @return New HslColor color object.
 */
export const lighten = (color: HslColor, amount: number): HslColor => {
	return Clamp.hsl({ ...color, l: modBy(color.l, amount) });
};

/**
 * Saturate an HslColor color by the specified amount.
 * @param color - HslColor color object to lighten.
 * @param amount - A value between 0 and 1.
 * @return New HslColor color object.
 */
export const saturate = (color: HslColor, amount: number): HslColor => {
	return Clamp.hsl({ ...color, s: modBy(color.s, amount) });
};

/**
 * Adjust the hue of a HslColor color.
 * @param color - HslColor color object..
 * @param amount - A value between 0 and 1.
 * @return New HslColor color object.
 */
export const hue = (color: HslColor, amount: number): HslColor => {
	return Clamp.hsl({ ...color, h: modBy(color.h, amount) });
};

/**
 * Adjust the alpha channel of a RgbColor color.
 * @param color - RgbColor color object..
 * @param amount - A value between 0 and 1.
 * @return New RgbColor color object.
 */
export const alpha = (color: RgbColor, amount: number): RgbColor => {
	return Clamp.rgb({ ...color, a: modBy(color.a ?? 1, amount) }); // Handle optional alpha
};
