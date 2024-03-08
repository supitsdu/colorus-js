import clamp from './clamp'
import conversion from './conversion'
import { padString } from './helpers'

const colorPatterns = {
  hex: /^#?([a-f\d]{3,4}|[a-f\d]{6}|[a-f\d]{8})$/gim,
  rgb: /^(?:rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*([01](?:\.\d*)?))?\s*\)|rgba?\(\s*(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})\s*(?:\/\s*([01](?:\.\d*)?))?\s*\))$/gim,
  hsl: /^(?:hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%?\s*,\s*(\d{1,3})%?\s*(?:,\s*([01](?:\.\d*)?))?\s*\)|hsla?\(\s*(\d{1,3})\s+(\d{1,3})%?\s+(\d{1,3})%?\s*(?:\/\s*([01](?:\.\d*)?))?\s*\))$/gim,
  hsv: /^(?:hsva?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%?\s*,\s*(\d{1,3})%?\s*(?:,\s*([01](?:\.\d*)?))?\s*\)|hsva?\(\s*(\d{1,3})\s+(\d{1,3})%?\s+(\d{1,3})%?\s*(?:\/\s*([01](?:\.\d*)?))?\s*\))$/gim
}

const colorSpaces = {
  hex: match => ({ colorType: 'hex', rgb: conversion.hexToRgb(padString(match[1])) }),
  rgb: match => ({
    colorType: 'rgb',
    rgb: clamp.rgb({ r: match[1] || match[5], g: match[2] || match[6], b: match[3] || match[7], a: match[4] || match[8] })
  }),
  hsl: match => ({
    colorType: 'hsl',
    rgb: conversion.hslToRgb(
      clamp.hsl({ h: match[1] || match[5], s: match[2] || match[6], l: match[3] || match[7], a: match[4] || match[8] })
    )
  }),
  hsv: match => ({
    colorType: 'hsv',
    rgb: conversion.hsvToRgb(
      clamp.hsv({ h: match[1] || match[5], s: match[2] || match[6], v: match[3] || match[7], a: match[4] || match[8] })
    )
  })
}

/**
 *  Takes in a string and returns an object with the color type and its RGB representation.
 * @param {string} color  - The color to convert to an standardized  format.
 * @return  {{colorType, rgb}} A object containing the type of color and its RGB value.
 * @throws  Error if no valid color representation could be found in the input
 */
const serialize = color => {
  for (const [colorType, pattern] of Object.entries(colorPatterns)) {
    const match = pattern.exec(color)

    if (match !== null) return colorSpaces[colorType](match)
  }

  throw new Error('Unrecognized color format!')
}

export default { serialize }
