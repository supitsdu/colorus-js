import { nan, precision } from "../helpers";
import type { Hsl, Rgb } from "../types";
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
 * Lightens an Hsl color by the specified amount.
 * @param color - Hsl color object to lighten.
 * @param amount - A value between 0 and 1.
 * @return New Hsl color object.
 */
export const lighten = (color: Hsl, amount: number): Hsl => {
	return Clamp.hsl({ ...color, l: modBy(color.l, amount) });
};

/**
 * Saturate an Hsl color by the specified amount.
 * @param color - Hsl color object to lighten.
 * @param amount - A value between 0 and 1.
 * @return New Hsl color object.
 */
export const saturate = (color: Hsl, amount: number): Hsl => {
	return Clamp.hsl({ ...color, s: modBy(color.s, amount) });
};

/**
 * Adjust the hue of a Hsl color.
 * @param color - Hsl color object..
 * @param amount - A value between 0 and 1.
 * @return New Hsl color object.
 */
export const hue = (color: Hsl, amount: number): Hsl => {
	return Clamp.hsl({ ...color, h: modBy(color.h, amount) });
};

/**
 * Adjust the alpha channel of a Rgb color.
 * @param color - Rgb color object..
 * @param amount - A value between 0 and 1.
 * @return New Rgb color object.
 */
export const alpha = (color: Rgb, amount: number): Rgb => {
	return Clamp.rgb({ ...color, a: modBy(color.a ?? 1, amount) }); // Handle optional alpha
};
