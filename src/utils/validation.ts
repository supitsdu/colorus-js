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
