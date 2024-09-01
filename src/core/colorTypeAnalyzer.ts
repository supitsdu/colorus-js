import namedColors from "../constants/namedColors";
import { isString, nan } from "../helpers";
import type {
	AnyColorData,
	AnyObject,
	ColorPatterns,
	SupportedColorFormat,
} from "../types";

export const isColorData = (
	input: Record<string, unknown>,
): input is AnyColorData =>
	"format" in input ||
	"value" in input ||
	"isValid" in input ||
	"originalInput" in input;

export const colorPatterns: ColorPatterns = [
	["hex", /^#([a-f\d]{8}|[a-f\d]{6}|[a-f\d]{3,4})$/iy],
	[
		"rgb",
		/^rgba?\(\s*(\d{1,3})(?:\s*,\s*|\s+)(\d{1,3})(?:\s*,\s*|\s+)(\d{1,3})(?:\s*(?:,|\/)\s*(0?\.\d+|1|0))?\s*\)$/iy,
	],
	[
		"hsl",
		/^hsla?\(\s*(\d{1,3})(?:deg|°)?(?:\s*,\s*|\s+)(\d{1,3})%?(?:\s*,\s*|\s+)(\d{1,3})%?(?:\s*(?:,|\/)\s*(0?\.\d+|1|0))?\s*\)$/iy,
	],
	[
		"hsv",
		/^hsva?\(\s*(\d{1,3})(?:deg|°)?(?:\s*,\s*|\s+)(\d{1,3})%?(?:\s*,\s*|\s+)(\d{1,3})%?(?:\s*(?:,|\/)\s*(0?\.\d+|1|0))?\s*\)$/iy,
	],
	[
		"cmyk",
		/^cmyka?\(\s*(\d{1,3})%?(?:\s*,\s*|\s+)(\d{1,3})%?(?:\s*,\s*|\s+)(\d{1,3})%?(?:\s*,\s*|\s+)(\d{1,3})%?(?:\s*(?:,|\/)\s*(0?\.\d+|1|0))?\s*\)$/iy,
	],
	["named", namedColors.pattern],
];

/**
 * Performs a test on a color string.
 * ```
 * execColorStringTest('hsl(360,0,100)') // Returns: "hsl"
 * ```
 * @param input - The input color string.
 */
export function execColorStringTest(
	input = "",
): [SupportedColorFormat, string[]] | null {
	if (!isString(input) || !input) return null;

	for (const [name, pattern] of colorPatterns) {
		pattern.lastIndex = 0;
		const match = pattern.exec(input);
		if (match !== null) return [name, match];
	}

	return null;
}

/**
 * Determine the color type based on the provided color object.
 * @param colorObject - The color object to be analyzed.
 * @return The determined color type ('rgb', 'hsl', 'hsv', 'cmyk').
 */
export const determineColorType = (colorObject?: Record<string, any>) => {
	if (!colorObject) return undefined;

	if (isRgbObject(colorObject)) return "rgb";
	if (isHslObject(colorObject)) return "hsl";
	if (isHsvObject(colorObject)) return "hsv";
	if (isCmykObject(colorObject)) return "cmyk";

	return undefined;
};

/**
 * Checks if the provided object represents an Rgb color.
 * @param input - The object to be checked.
 * @return True if the object represents an Rgb color, false otherwise.
 */
export const isRgbObject = ({ r, g, b, a = 1 }: AnyObject): boolean =>
	!(nan(r) || nan(g) || nan(b) || nan(a));

/**
 * Checks if the provided object represents an Hsl color.
 * @param input - The object to be checked.
 * @return True if the object represents an Hsl color, false otherwise.
 */
export const isHslObject = ({ h, s, l, a = 1 }: AnyObject): boolean =>
	!(nan(h) || nan(s) || nan(l) || nan(a));

/**
 * Checks if the provided object represents an Hsv color.
 * @param input - The object to be checked.
 * @return True if the object represents an Hsv color, false otherwise.
 */
export const isHsvObject = ({ h, s, v, a = 1 }: AnyObject): boolean =>
	!(nan(h) || nan(s) || nan(v) || nan(a));

/**
 * Checks if the provided object represents a Cmyk color.
 * @param input - The object to be checked.
 * @return True if the object represents a Cmyk color, false otherwise.
 */
export const isCmykObject = ({ c, m, y, k, a = 1 }: AnyObject): boolean =>
	!(nan(c) || nan(m) || nan(y) || nan(k) || nan(a));
