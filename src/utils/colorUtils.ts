import type { Dye, Utils } from "../types";
import { isColorValue } from "./validation";

/**
 * Modifies the given `value` by a certain `amount`.
 *
 * @param value - The value to modify.
 * @param amount - The amount to modify the `value` by, a value between 0 and 1.
 * @return The modified `value`.
 */
export const modBy = (value: number, amount: number): number => {
	const a = Number(amount);

	if (!isColorValue(a)) return value;

	return clamp(formatDecimal((1 + a) * value), 100);
};

/**
 * Converts an integer to a hexadecimal string with a specified minimum length.
 * @param input - The integer to convert.
 * @param minSize - The minimum length of the resulting hex string.
 * @returns A hex string with the specified minimum length.
 */
export const toHexString = (input: number, minSize: number): string =>
	input.toString(16).padStart(minSize, "0");

/**
 * Expands a shortened hex color (e.g., "FFF" or "E3EF") to a full 6- or 8-character hex string.
 * @param hexString - A shortened hex color string.
 * @returns A full hex string with 6 or 8 characters.
 */
export const expandHexString = (hexString: string): string => {
	const minHex = hexString.startsWith("#") ? hexString.slice(1) : hexString;
	if (minHex.length > 4) return minHex;

	let expanded = "";
	for (const char of minHex) {
		expanded += char + char;
	}
	return expanded;
};

export const clamp = (value: number | string, max: number): number =>
	Math.max(Math.min(Number(value) || 0, max), 0);

export const formatDecimal = (value = 1): number =>
	Math.trunc(value) !== value ? Math.round(value * 100) / 100 : value;

export const normalizeDegrees = (value = 0, round = false) => {
	const fn = round ? Math.round : formatDecimal;
	return fn(clamp(value, 360)) || 0;
};

export const normalizePercentage = (value = 0, round = false) => {
	const fn = round ? Math.round : formatDecimal;
	return fn(clamp(value, 100)) || 0;
};

export const normalize8Bit = (value = 0, round = false) => {
	const fn = round ? Math.round : formatDecimal;
	return fn(clamp(value, 255)) || 0;
};

export const normalizeAlpha: Utils.NormalizeFunction = (value = 1) =>
	formatDecimal(clamp(value, 1));

export function generateColorComponents(
	alphaChannel: number = 1,
	{ minify, cssNext }: Dye.FormatOptions = {},
): string[] {
	let alpha = "";
	const space = !minify ? " " : "";
	const spacers = cssNext ? [" ", `${space}/${space}`] : [`,${space}`];
	const percent = !minify ? "%" : "";
	const suffix = alphaChannel === 1 || cssNext ? "" : "a";

	if (alphaChannel !== 1) {
		alpha = `${spacers[1] || spacers[0]}${alphaChannel}`;
	}

	return [spacers[0], alpha, suffix, percent];
}
