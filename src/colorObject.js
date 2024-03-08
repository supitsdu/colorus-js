import clamp from './clamp'
import conversion from './conversion'

const nan = v => typeof v != 'number' || isNaN(v) || !isFinite(v)

const isNull = v => typeof v !== 'object' || Array.isArray(v) || v === null

const colorSpaces = {
  rgb: ({ r, g, b, a = 1 }) => (nan(r) || nan(g) || nan(b) || nan(a) ? null : clamp.rgb({ r, g, b, a })),
  hsl: ({ h, s, l, a = 1 }) => (nan(h) || nan(s) || nan(l) || nan(a) ? null : clamp.hsl({ h, s, l, a })),
  hsv: ({ h, s, v, a = 1 }) => (nan(h) || nan(s) || nan(v) || nan(a) ? null : clamp.hsv({ h, s, v, a }))
}

/**
 * Serializes an color string into an object with the color type and rgb values.
 *
 * @param {object} color any color space object
 * @return {Object}  An object containing the color type and its rgba value
 * @throws  Error if no valid color representation could be found in the input
 */
const serialize = color => {
  for (const colorType in colorSpaces) {
    if (!colorSpaces.hasOwnProperty(colorType)) continue

    const colorMatch = colorSpaces[colorType](color)

    if (colorMatch !== null) {
      return {
        colorType,
        rgb: colorType === 'rgb' ? colorMatch : conversion[`${colorType}ToRgb`](colorMatch)
      }
    }
  }

  throw new Error('Unrecognized color format!')
}

export default { serialize, isNull, nan }
