import { utmost, precision } from './helpers'

// Helper functions to process different types of color values
export const degree = (value, fn = Math.round) => fn(utmost(value, 360)) || 0
export const percent = (value, fn = Math.round) => fn(utmost(value, 100)) || 0
export const eightBit = (value, fn = Math.round) => fn(utmost(value, 255)) || 0
export const alpha = (value, fn = precision) => fn(utmost(value, 1)) || 0

/** Base class for rounding/clamping color values */
class ColorNormalizer {
  /** Rounds or clamps an HSL color object.
   * @param {object} input HSL color object.
   * @return {object} An valid HSL color object
   */
  static hsl({ h, s, l, a = 1 }) {
    return { h: degree(h, this.fn), s: percent(s, this.fn), l: percent(l, this.fn), a: alpha(a) }
  }

  /** Rounds or clamps an HSV color object.
   * @param {object} input HSV color object.
   * @return {object} An valid HSV color object
   */
  static hsv({ h, s, v, a = 1 }) {
    return { h: degree(h, this.fn), s: percent(s, this.fn), v: percent(v, this.fn), a: alpha(a) }
  }

  /** Rounds or clamps an RGB color object.
   * @param {object} input RGB color object.
   * @return {object} An valid RGB color object
   */
  static rgb({ r, g, b, a = 1 }) {
    return { r: eightBit(r, this.fn), g: eightBit(g, this.fn), b: eightBit(b, this.fn), a: alpha(a) }
  }

  /** Rounds or clamps an CMYK color object.
   * @param {object} input CMYK color object.
   * @return {object} An valid CMYK color object
   */
  static cmyk({ c, m, y, k, a = 1 }) {
    return { c: percent(c, this.fn), m: percent(m, this.fn), y: percent(y, this.fn), k: percent(k, this.fn), a: alpha(a) }
  }
}

export const Round = Object.assign(Object.create(ColorNormalizer), { fn: Math.round })
export const Clamp = Object.assign(Object.create(ColorNormalizer), { fn: precision })
