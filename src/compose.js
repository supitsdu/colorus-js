import { nan, precision } from './helpers'
import { Clamp } from './colorNormalizer'

/**
 * Modifies the given `value` by a certain `amount`.
 *
 * @param {number} value - The value to modify.
 * @param {number} amount - The amount to modify the `value` by, a value between 0 and 1.
 * @return {number} The modified `value`.
 */
export const modBy = (value, amount) => {
  amount = Number(amount)

  if (nan(amount)) return value

  return precision((1 + amount) * value)
}

/**
 * Interpolates between two RGB colors based on a given amount.
 * @param {object} primary - The primary color in RGB format.
 * @param {object} secondary - The secondary color in RGB format.
 * @param {number} amount - A value between 0 and 1, indicating the strength of interpolation.
 * @return {object} An object containing interpolated RGB and optional alpha values.
 */
export const mix = ({ r, g, b, a = 1 }, { r: R, g: G, b: B, a: A = 1 }, amount = 0.1) => {
  const mixBy = (p, s) => p * (1 - amount) + s * amount

  return Clamp.rgb({ r: mixBy(r, R), g: mixBy(g, G), b: mixBy(b, B), a: mixBy(a * 100, A * 100) })
}

/**
 * Lightens an HSL color by the specified amount.
 * @param {object} color - HSL color object to lighten.
 * @param {number} amount - A value between 0 and 1.
 * @return {object} New HSL color object.
 */
export const lighten = ({ h, s, l, a = 1 }, amount) => {
  return Clamp.hsl({ h, s, l: modBy(l, amount), a })
}

/**
 * Saturate an HSL color by the specified amount.
 * @param {object} color - HSL color object to lighten.
 * @param {number} amount - A value between 0 and 1.
 * @return {object} New HSL color object.
 */
export const saturate = ({ h, s, l, a = 1 }, amount) => {
  return Clamp.hsl({ h, s: modBy(s, amount), l: l, a })
}

/**
 * Adjust the hue of a HSL color.
 * @param {object} color - HSL color object..
 * @param {number} amount - A value between 0 and 1.
 * @return {object} New HSL color object.
 */
export const hue = ({ h, s, l, a = 1 }, amount) => {
  return Clamp.hsl({ h: modBy(h, amount), s, l, a })
}

/**
 * Adjust the alpha channel of a RGB color.
 * @param {object} color - RGB color object..
 * @param {number} amount - A value between 0 and 1.
 * @return {object} New RGB color object.
 */
export const alpha = ({ r, g, b, a = 1 }, amount) => {
  return Clamp.rgb({ r, g, b, a: modBy(a, amount) })
}

/**
 * Invert an RGB color.
 * @param {object} color - RGB color object.
 * @return {object} New RGB color object.
 */
export const invert = ({ r, g, b, a = 1 }) => ({ r: 255 - r, g: 255 - g, b: 255 - b, a })

/**
 * Converts an RGB color to grayscale.
 * @param {Object} color - An object representing an RGBA color.
 * @param {boolean} [useNTSCFormula=false] - Whether to use the NTSC formula for conversion. (Default: `false`)
 * @return {Object} An object representing the grayscale color.
 */
export const rgbToGray = ({ r, g, b, a = 1 }, useNTSCFormula = false) => {
  const y = useNTSCFormula ? 0.299 * r + 0.587 * g + 0.114 * b : 0.2126 * r + 0.7152 * g + 0.0722 * b

  return { r: y, g: y, b: y, a }
}
