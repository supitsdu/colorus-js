// Color channels used to check dictionary-like objects.

/** This array contains the color channels of a RGB color. */
export const chRgb = ["r", "g", "b", "a"];

/** This array contains the color channels of a HSL color. */
export const chHsl = ["h", "s", "l", "a"];

/** This array contains the color channels of a HSV color. */
export const chHsv = ["h", "s", "v", "a"];

/** This array contains the color channels of a CMYK color. */
export const chCmyk = ["c", "m", "y", "k", "a"];

// Color Regular Expressions used to match color strings.
// These expressions should match the color strings and extract the color channels.

/**
 * This regular expression matches a hexadecimal color string.
 * @example
 * regexHex.test("f00"); // true
 * regexHex.test("#ff0000"); // true
 * regexHex.test("#ff0000ff"); // true
 */
export const regexHex = /^#?([a-f0-9]{8}|[a-f0-9]{6}|[a-f0-9]{3,4})$/iy;

/**
 * This regular expression matches a RGB color string.
 * @example
 * regexRgb.test("rgb(255 0 0)"); // true
 * regexRgb.test("rgb(255 0 0 / 1)"); // true
 * regexRgb.test("rgba(255, 0, 0, 1)"); // true
 */
export const regexRgb =
	/^rgba?\(\s*(\d{1,3})(?:\s*,\s*|\s+)(\d{1,3})(?:\s*,\s*|\s+)(\d{1,3})(?:\s*(?:,|\/)\s*(0?\.\d+|1|0))?\s*\)$/iy;

/**
 * This regular expression matches a HSL color string.
 * @example
 * regexHsl.test("hsl(0 100% 50%)"); // true
 * regexHsl.test("hsla(0, 100%, 50%, 1)"); // true
 * regexHsl.test("hsl(0deg 100% 50%)"); // true
 * regexHsl.test("hsla(0deg, 100%, 50%, 1)"); // true
 */
export const regexHsl =
	/^hsla?\(\s*(\d{1,3})(?:\s*(?:deg|°))?(?:\s*,\s*|\s+)(\d{1,3})%?(?:\s*,\s*|\s+)(\d{1,3})%?(?:\s*(?:,|\/)\s*(0?\.\d+|1|0))?\s*\)$/iy;

/**
 * This regular expression matches a HSV color string.
 * @example
 * regexHsv.test("hsv(0 100% 100%)"); // true
 * regexHsv.test("hsva(0, 100%, 100%, 1)"); // true
 * regexHsv.test("hsv(0deg 100% 100%)"); // true
 * regexHsv.test("hsva(0deg, 100%, 100%, 1)"); // true
 */
export const regexHsv =
	/^hsva?\(\s*(\d{1,3})(?:\s*(?:deg|°))?(?:\s*,\s*|\s+)(\d{1,3})%?(?:\s*,\s*|\s+)(\d{1,3})%?(?:\s*(?:,|\/)\s*(0?\.\d+|1|0))?\s*\)$/iy;

/**
 * This regular expression matches a CMYK color string.
 * @example
 * regexCmyk.test("cmyk(0 100% 100% 0)"); // true
 * regexCmyk.test("cmyka(0, 100%, 100%, 0, 1)"); // true
 * regexCmyk.test("cmyk(0% 100% 100% 0%)"); // true
 * regexCmyk.test("cmyka(0%, 100%, 100%, 0%, 1)"); // true
 */
export const regexCmyk =
	/^cmyka?\(\s*(\d{1,3})%?(?:\s*,\s*|\s+)(\d{1,3})%?(?:\s*,\s*|\s+)(\d{1,3})%?(?:\s*,\s*|\s+)(\d{1,3})%?(?:\s*(?:,|\/)\s*(0?\.\d+|1|0))?\s*\)$/iy;
