import {
	determineColorType,
	execColorStringTest,
} from "./core/colorTypeAnalyzer";
import { isNotObject } from "./helpers";
import type { AnyObject, SupportedColorFormat } from "./types";

/** Tests the `input` for a valid color.
 * @param input - The color input string or object.
 * @return The type of the string (e.g.: `rgb`) if color is valid, otherwise `null`.
 */
export function isValidColor(
	input: object | string | unknown,
): SupportedColorFormat | null {
	if (typeof input === "undefined") return null;

	if (isNotObject(input) && input !== null) {
		return determineColorType(input as AnyObject) || null;
	}

	if (typeof input === "string") {
		const match = execColorStringTest(input);
		if (match) return match[0];
	}

	return null;
}
