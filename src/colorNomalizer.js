import { utmost, precision } from './helpers'

// Helper functions to process different types of color values
const degree = (value, fn = round) => fn(utmost(value, 360)) || 0
const percent = (value, fn = round) => fn(utmost(value, 100)) || 0
const eightBit = (value, fn = round) => fn(utmost(value, 255)) || 0
const alpha = (value, fn = round) => fn(utmost(value, 1)) || 0

// Base class for rounding/clamping color values
class ColorNormalizer {
  static hsl({ h, s, l, a = 1 }) {
    return { h: degree(h, this.fn), s: percent(s, this.fn), l: percent(l, this.fn), a: alpha(a, precision) }
  }

  static hsv({ h, s, v, a = 1 }) {
    return { h: degree(h, this.fn), s: percent(s, this.fn), v: percent(v, this.fn), a: alpha(a, precision) }
  }

  static rgb({ r, g, b, a = 1 }) {
    return { r: eightBit(r, this.fn), g: eightBit(g, this.fn), b: eightBit(b, this.fn), a: alpha(a, precision) }
  }

  static cmyk({ c, m, y, k, a = 1 }) {
    return { c: percent(c, this.fn), m: percent(m, this.fn), y: percent(y, this.fn), k: percent(k, this.fn), a: alpha(a, precision) }
  }
}

const Round = Object.assign(Object.create(ColorNormalizer), { fn: Math.round })
const Clamp = Object.assign(Object.create(ColorNormalizer), { fn: precision })

export { Round, Clamp }
