import conversion from './conversion'
import { padString } from './helpers'

const rgbCh = /(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)/.source
const comma = /\s*,\s*/.source
const space = /\s+/.source
const legacyAlpha = /(?:(?:\s*,\s*)([0-1]|0?\.[0-9]+))?/.source
const alpha = /(?:(?:\s*\/\s*)([0-1]|0?\.[0-9]+))?/.source
const hueCh = /(0|360|3[0-5]\d|[12]\d\d|0?\d?\d)/.source
const percent = /(0|100|\d{1,2})%?/.source

/**
 * patterns object contains different color formats as keys and their corresponding regular expression patterns as values
 * @type {{hex: [RegExp], rgb: [RegExp, RegExp], hsl: [RegExp, RegExp], hsv: [RegExp, RegExp]}}
 */
const patterns = {
  hex: [/^#?([a-f\d]{3,4}|[a-f\d]{6}|[a-f\d]{8})$/i],

  rgb: [
    new RegExp(/^rgba?\(\s*/.source + rgbCh + comma + rgbCh + comma + rgbCh + legacyAlpha + /\s*\)$/.source, 'i'),
    new RegExp(/^rgba?\(\s*/.source + rgbCh + space + rgbCh + space + rgbCh + alpha + /\s*\)$/.source, 'i')
  ],

  hsl: [
    new RegExp(/^hsla?\(\s*/.source + hueCh + comma + percent + comma + percent + legacyAlpha + /\s*\)$/.source, 'i'),
    new RegExp(/^hsla?\(\s*/.source + hueCh + space + percent + space + percent + alpha + /\s*\)$/.source, 'i')
  ],

  hsv: [
    new RegExp(/^hsva?\(\s*/.source + hueCh + comma + percent + comma + percent + legacyAlpha + /\s*\)$/.source, 'i'),
    new RegExp(/^hsva?\(\s*/.source + hueCh + space + percent + space + percent + alpha + /\s*\)$/.source, 'i')
  ]
}

/**
 * Serializes an color string into an object with the color type and rgb values
 * @param {string} color - The color to serialize in string format
 * @return {{colorType: string, rgb: {r: number, g: number, b: number, a: number}}}
 */
const serialize = color => {
  let match = null
  let colorType = ''
  let colorMatched = []

  for (const key in patterns) {
    if (!patterns.hasOwnProperty(key)) continue

    match = (patterns[key][0] || patterns[key][1])?.exec(color)

    if (match === null) continue

    colorType = key
    colorMatched = match.slice(1)
  }

  switch (colorType) {
    case 'hex':
      return { colorType, rgb: conversion.hexToRgb(padString(colorMatched[0])) }
    case 'rgb':
      return { colorType, rgb: { r: colorMatched[0], g: colorMatched[1], b: colorMatched[2], a: colorMatched[3] } }
    case 'hsl':
      return { colorType, rgb: conversion.hslToRgb({ h: colorMatched[0], s: colorMatched[1], l: colorMatched[2], a: colorMatched[3] }) }
    case 'hsv':
      return { colorType, rgb: conversion.hsvToRgb({ h: colorMatched[0], s: colorMatched[1], v: colorMatched[2], a: colorMatched[3] }) }

    default:
      throw new Error('Unrecognized color format!')
  }
}

export default { serialize }
