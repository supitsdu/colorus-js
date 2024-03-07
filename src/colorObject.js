import clamp from './clamp'
import conversion from './conversion'

const nan = v => typeof v != 'number' || isNaN(v) || !isFinite(v)

const isNull = v => typeof v !== 'object' || Array.isArray(v) || v === null

const entries = {
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
  let match = null
  let colorType = ''
  let colorMatched = {}

  for (const key in entries) {
    if (!entries.hasOwnProperty(key)) continue

    match = entries[key](color)

    if (match == null) continue

    colorType = key
    colorMatched = match
  }

  switch (colorType) {
    case 'rgb':
      return { colorType, rgb: colorMatched }
    case 'hsl':
      return { colorType, rgb: conversion.hslToRgb(colorMatched) }
    case 'hsv':
      return { colorType, rgb: conversion.hsvToRgb(colorMatched) }

    default:
      throw new Error('Unrecognized color format!')
  }
}

export default { serialize, isNull, nan }
