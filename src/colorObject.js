import * as conversion from './conversion'
import { Clamp } from './colorNormalizer'

/**
 * Check if input is NOT a Number (NaN)
 * @param  {*} v - The value to check against.
 * @return  {Boolean} `true` if it is not an number, `false` otherwise.
 */
const nan = v => typeof v != 'number' || isNaN(v) || !isFinite(v)

/**
 * Check if input is NOT a Object (NaO)
 * @param  {*} v - The object to check against.
 * @return  {Boolean} `true` if it is not an object, `false` otherwise.
 */
const nao = v => typeof v !== 'object' || Array.isArray(v) || v === null

const colorSpaces = [
  ['rgb', ({ r, g, b, a = 1 }) => (nan(r) || nan(g) || nan(b) || nan(a) ? null : Clamp.rgb({ r, g, b, a }))],
  ['hsl', ({ h, s, l, a = 1 }) => (nan(h) || nan(s) || nan(l) || nan(a) ? null : Clamp.hsl({ h, s, l, a }))],
  ['hsv', ({ h, s, v, a = 1 }) => (nan(h) || nan(s) || nan(v) || nan(a) ? null : Clamp.hsv({ h, s, v, a }))],
  ['cmyk', ({ c, m, y, k, a = 1 }) => (nan(c) || nan(m) || nan(y) || nan(k) || nan(a) ? null : Clamp.cmyk({ c, m, y, k, a }))]
]

/**
 * Serializes an color string into an object with the color type and rgb values.
 *
 * @param {object} color any color space object
 * @return {object}  An object containing the color type and its rgba value
 * @throws  Error if no valid color representation could be found in the input
 */
const serialize = color => {
  for (const [colorType, normalize] of colorSpaces) {
    const colorMatch = normalize(color)

    if (colorMatch !== null) {
      return {
        colorType,
        rgb: colorType === 'rgb' ? colorMatch : conversion[`${colorType}ToRgb`](colorMatch)
      }
    }
  }

  throw new Error('Unrecognized color format!')
}

export default { serialize, nao, nan }
