import type { AnyObject } from "./types";

/**
 * Clamps a value between a minimum and maximum limit.
 *
 * - If the input value is greater than the maximum, the maximum will be returned.
 * - If the input value is less than the minimum, the minimum will be returned.
 *
 * The clamped value is guaranteed to be greater than or equal to zero.
 *
 * @param v - The input value to clamp
 * @param max - The maximum value for the input
 * @return The clamped value between 0 and max
 */
export const utmost = (v: number | string, max: number): number =>
	Math.max(Math.min(Number(v), max), 0);

/**
 * Returns the input value with a precision level of two decimal places.
 *
 * @param value - The input value to format
 * @return The input value formatted with the specified precision
 */
export const precision = (value: number): number =>
	Math.trunc(value) !== value ? Math.round(value * 100) / 100 : value;

/**
 * Converts the input to a string with radix 16 (HEX).
 *
 * @param input - The RgbColor channel values.
 * @param minSize - Minimum size of the HEX string. If not provided, defaults to 6.
 * @return An HEX string. (e.g., "FF" or "00FF00" depending on the minSize value.)
 */
export const hexString = (input: number, minSize: number): string =>
	input.toString(16).padStart(minSize, "0").toUpperCase();

/**
 * Converts a minified HEX color into a HEX 6 or 8.
 *
 * **Warning**: Only use this with minified HEX strings.
 *
 * @param  minHex - A minified HEX string. (e.g., "FFF" or "E3EF".)
 * @return A HEX string with a length of 6 or 8.
 */
export const padString = (minHex: string): string => {
	if (minHex.length > 4) return minHex;

	let value = "";

	for (const slice of minHex) {
		value += slice + slice;
	}

	return value;
};

/**
 * Check if input is NOT a Number (NaN)
 * @param v - The value to check against.
 * @return `true` if it is not an number, `false` otherwise.
 */
export const nan = (v: unknown): boolean =>
	typeof v !== "number" || Number.isNaN(v) || !Number.isFinite(v);

/**
 * Check if input is a valid object
 * @param v - The object to check against.
 * @return `true` if it is not an object, `false` otherwise.
 */
export const isObject = (v: unknown): v is AnyObject<string, unknown> =>
	!(typeof v !== "object" || Array.isArray(v) || v === null);
