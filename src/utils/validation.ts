import {
	chCmyk,
	chHsl,
	chHsv,
	chRgb,
	regexCmyk,
	regexHex,
	regexHsl,
	regexHsv,
	regexRgb,
} from "../patterns";
import type { Colors } from "../types";

/**
 * Checks if the input value is a dictionary-like object with key-value pairs.
 * @param v - The value to check against.
 * @return `true` if it is not an object, `false` otherwise.
 */
export const isObject = (v: unknown): boolean =>
	typeof v === "object" && v !== null && !Array.isArray(v);

/**
 * Checks if a value represents a number, including support for numerical strings.
 *
 * @param v - The value to be checked.
 * @returns `true` if the value is a number or a numerical string, `false` otherwise.
 */
export const isColorValue = (v: unknown): boolean => {
	if (typeof v === "number") return Number.isFinite(v);
	if (typeof v === "string")
		return isColorValue(Number.parseFloat(v)) && isColorValue(Number(v));
	return false;
};

/**
 * Creates a color analyzer function that checks if the input value is a color model.
 * @param keys - The keys to check against.
 * @param exp - The regular expression to match the color string.
 * @return The model checker function.
 */
export const createColorAnalyzer =
	(keys: string[] | string, exp: RegExp) =>
	<T = unknown>(v: T): string | null => {
		if (isObject(v)) {
			for (const key of keys) {
				if (
					!(
						isColorValue((v as Colors.Object<any>)[key]) ||
						(key === "a" && (v as Colors.Object<any>)[key] === undefined)
					)
				) {
					return null;
				}
			}
		} else if (typeof v !== "string" || !exp.test(v)) {
			return null;
		}

		return typeof keys === "string" ? keys : keys.join("");
	};

export const testHex = createColorAnalyzer("hexa", regexHex);
export const testRgb = createColorAnalyzer(chRgb, regexRgb);
export const testHsl = createColorAnalyzer(chHsl, regexHsl);
export const testHsv = createColorAnalyzer(chHsv, regexHsv);
export const testCmyk = createColorAnalyzer(chCmyk, regexCmyk);
