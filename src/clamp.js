import { precision, utmost } from './helpers'

const degree = value => precision(utmost(value, 360))
const percent = value => precision(utmost(value, 100))
const eightBit = value => precision(utmost(value, 255))
const alpha = value => precision(utmost(value, 1))

/**
 * Clamps an HSL color object.
 * @param {{ h: number, s: number, l: number, a?: number }} color - The HSL color object to be clamped.
 * @return {object} - The clamped HSL color object with hue, saturation, lightness, and alpha values.
 */
const hsl = function ({ h, s, l, a = 1 }) {
  return { h: degree(h), s: percent(s), l: percent(l), a: alpha(a) }
}

/**
 * Clamps an HSV color object.
 * @param {{ h: number, s: number, v: number, a?: number }} color - The HSV color object to be clamped.
 * @return {object} - The clamped HSV color object with hue, saturation, value, and alpha values.
 */
const hsv = function ({ h, s, v, a = 1 }) {
  return { h: degree(h), s: percent(s), v: percent(v), a: alpha(a) }
}

/**
 * Clamps an RGB color object.
 * @param {{ r: number, g: number, b: number, a?: number }} color - The RGB color object to be clamped.
 * @return {object} - The clamped RGB color object with red, green, blue, and alpha values.
 */
const rgb = function ({ r, g, b, a }) {
  return { r: eightBit(r), g: eightBit(g), b: eightBit(b), a: alpha(a) }
}

/**
 * The `clamp` object contains helper functions to clamp different types of color values.
 * These functions ensure that the input values fall within a specific range.
 */
export const clamp = { rgb, hsl, hsv, degree, percent, eightBit, alpha }
