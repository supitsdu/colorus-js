import clamp from './clamp'
import colorObject from './colorObject'
import { precision } from './helpers'

/**
 * **(Helper Functions)** Modifies the given `value` by a certain `amount`, with an optional `relative` parameter.
 * If `relative` is true, the `amount` will be added to the `value` after being multiplied by 1 + `amount`.
 * If `relative` is false or omitted, the `amount` will be added to the `value`.
 * Returns the modified `value`.
 *
 * @param {number} value - The value to modify.
 * @param {number} amount - The amount to modify the `value` by.
 * @param {boolean} [relative=false] - Whether to modify the `value` relative to its current value.
 * @return {number} The modified `value`.
 */
const modBy = (value, amount, relative) => {
  amount = Number(amount)
  if (colorObject.nan(amount)) return value
  return precision(relative ? (1 + amount) * value : (value / 100 + amount) * 100)
}

/**
 * Interpolates between two RGB colors based on a given amount.
 * @param {Object} primary - The primary color in RGB format.
 * @param {Object} secondary - The secondary color in RGB format.
 * @param {number} amount - A value between 0 and 1, indicating the strength of interpolation.
 * @return {Object} An object containing interpolated RGB and optional alpha values.
 */
const mix = ({ r, g, b, a = 1 }, { r: R, g: G, b: B, a: A = 1 }, amount = 0.1) => {
  const mixBy = (p, s) => p * (1 - amount) + s * amount

  return clamp.rgb({
    r: mixBy(r, R),
    g: mixBy(g, G),
    b: mixBy(b, B),
    a: mixBy(a * 100, A * 100)
  })
}

/**
 * Lightens an HSL color by the specified amount.
 * @param {Object} color - HSL color object to lighten.
 * @param {number} amount - Amount to lighten color by.
 * @param {number} [relative=false] - Whether to modify the `value` relative to its current value.
 * @return {Object} New HSL color object.
 */
const lighten = ({ h, s, l, a = 1 }, amount, relative) => {
  return clamp.hsl({ h, s, l: modBy(l, amount, relative), a })
}

/**
 * Saturate an HSL color by the specified amount.
 * @param {Object} color - HSL color object to lighten.
 * @param {number} amount - Amount to saturate color by. (Range: 0-1)
 * @param {number} [relative=false] - Whether to modify the `value` relative to its current value.
 * @return {Object} New HSL color object.
 */
const saturate = ({ h, s, l, a = 1 }, amount, relative) => {
  return clamp.hsl({ h, s: modBy(s, amount, relative), l: l, a })
}

export default { mix, lighten, saturate, modBy }
