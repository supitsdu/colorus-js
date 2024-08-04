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
export const utmost = (v, max) => Math.max(Math.min(Number(v), max), 0)

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

/**
 * Check if input is NOT a Number (NaN)
 * @param {*} v - The value to check against.
 * @return {Boolean} `true` if it is not an number, `false` otherwise.
 */
export const nan = v => typeof v != 'number' || isNaN(v) || !isFinite(v)

/**
 * Check if input is NOT a Object (NaO)
 * @param {*} v - The object to check against.
 * @return {Boolean} `true` if it is not an object, `false` otherwise.
 */
export const nao = v => typeof v !== 'object' || Array.isArray(v)

/**
 * Check if the plugin is Not a Plugin
 * @param {Object} plugins An key-value object with plugin functions to apply.
 * @param {string} name Method name of the Plugin
 * @return {boolean|undefined} True if the plugins is not valid, undefined in case it's valid.
 */
export const isNotPlugin = function (plugins, name) {
  if (!Object.hasOwnProperty.call(plugins, name)) return true

  if (typeof plugins[name] !== 'function') {
    throw new TypeError(`Invalid plugin for '${name}': Expected a function.`)
  }
}

/**
 * Checks if the provided object represents an RGB color.
 * @param {object} obj - The object to be checked.
 * @return {boolean} True if the object represents an RGB color, false otherwise.
 */
export const isRgbObject = ({ r, g, b, a = 1 }) => !(nan(r) || nan(g) || nan(b) || nan(a))

/**
 * Checks if the provided object represents an HSL color.
 * @param {object} obj - The object to be checked.
 * @return {boolean} True if the object represents an HSL color, false otherwise.
 */
export const isHslObject = ({ h, s, l, a = 1 }) => !(nan(h) || nan(s) || nan(l) || nan(a))

/**
 * Checks if the provided object represents an HSV color.
 * @param {object} obj - The object to be checked.
 * @return {boolean} True if the object represents an HSV color, false otherwise.
 */
export const isHsvObject = ({ h, s, v, a = 1 }) => !(nan(h) || nan(s) || nan(v) || nan(a))

/**
 * Checks if the provided object represents a CMYK color.
 * @param {object} obj - The object to be checked.
 * @return {boolean} True if the object represents a CMYK color, false otherwise.
 */
export const isCmykObject = ({ c, m, y, k, a = 1 }) => !(nan(c) || nan(m) || nan(y) || nan(k) || nan(a))
