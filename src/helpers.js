/**
 * Clamps a value between a minimum and maximum limit.
 *
 * - If the input value is greater than the maximum, the maximum will be returned.
 * - If the input value is less than the minimum, the minimum will be returned.
 *
 * The clamped value is guaranteed to be greater than or equal to zero.
 *
 * @param {number} v - The input value to clamp
 * @param {number} max - The maximum value for the input
 * @return {number} The clamped value between 0 and max
 */
export const utmost = (v, max) => Math.max(Math.min(v, max), 0)

/**
 * Returns the input value with a precision level of two decimal places.
 *
 * @param {number} value - The input value to format
 * @return {number} The input value formatted with the specified precision
 */
export const precision = value => (Math.trunc(value) !== value ? Math.round(value * 100) / 100 : value)

/**
 * Converts the input to a string with radix 16 (HEX).
 *
 * @param {number} input - The RGB channel values.
 * @param {number} [minSize=6] - Minimum size of the HEX string. If not provided, defaults to 6.
 * @return {string} An HEX string. (e.g., "FF" or "00FF00" depending on the minSize value.)
 */
export const hexString = (input, minSize) => input.toString(16).padStart(minSize, '0').toUpperCase()

/**
 * Converts a minified HEX color into a HEX 6 or 8.
 *
 * **Warning**: Only use this with minified HEX strings.
 *
 * @param {string} minHex - A minified HEX string. (e.g., "FFF" or "E3EF".)
 * @return {string} A HEX string with a length of 6 or 8.
 */
export const padString = minHex => {
  if (minHex.length > 4) return minHex

  let value = ''

  for (const slice of minHex) {
    value += slice + slice
  }

  return value
}
