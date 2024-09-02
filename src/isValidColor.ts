import {
	determineColorType,
	execColorStringTest,
} from "./core/colorTypeAnalyzer";
import { isObject, isString } from "./helpers";
import type { AnyObject, SupportedColorFormat } from "./types";

/** Tests the `input` for a valid color.
 * @param input - The color input string or object.
 * @return The type of the string (e.g.: `rgb`) if color is valid, otherwise `null`.
 */
export function isValidColor(
	input: object | string | unknown,
): SupportedColorFormat | null {
	if (!input) return null;

	if (isObject(input)) {
		return determineColorType(input as AnyObject) || null;
	}

	if (isString(input)) {
		const match = execColorStringTest(input);
		if (match) return match[0];
	}

	return null;
}
