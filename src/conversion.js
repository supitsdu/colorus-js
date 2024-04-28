import { Clamp, Round, eightBit } from './colorNormalizer'
import { hexString } from './helpers'

/**
 * Calculates the hue component of an HSV color object.
 * @param {object} rgb - An RGB color object.
 * @param {object} params - Parameters including segment, maxRgb, and minRgb.
 * @return {number} The hue component of the HSV color.
 */
export function computeHsvHue({ r, g, b }, { segment, maxRgb, minRgb }) {
  let h = 0

  if (segment === h) return h

  const delta = maxRgb - minRgb
  const rDelta = (r - minRgb) / delta
  const gDelta = (g - minRgb) / delta
  const bDelta = (b - minRgb) / delta

  // Calculate hue based on which color component is the max
  if (r === maxRgb) {
    h = (60 * (gDelta - bDelta)) % 360
  } else if (g === maxRgb) {
    h = 60 * (bDelta - rDelta) + 120
  } else {
    h = 60 * (rDelta - gDelta) + 240
  }

  // Ensure hue is within [0, 360)
  if (h < 0) {
    h += 360
  }

  return h
}

/**
 * Check if an HEX color is shortanable by comparing the RGB components.
 * @param {number} r the red channel component of RGB color
 * @param {number} g the green channel component of RGB color
 * @param {number} b the blue channel component of RGB color
 * @param {number} a the alpha channel component of RGBA color
 * @return {boolean}
 */
export const isRgbShortanable = (r, g, b, a = 1) => r % 17 === 0 && g % 17 === 0 && b % 17 === 0 && a % 17 === 0

/**
 * Converts RGB color object to HEX color string.
 * @param {object} rgb an valid RGB color object
 * @param {object} [options={}] options to  customize output format and precision
 * @param {boolean} [options.minify=false]  set `true` for minified hexadecimal notation.
 * @return {string} an HEX string
 */
export function rgbToHex({ r, g, b, a } = {}, { minify = false } = {}) {
  const { r: R, g: G, b: B, a: A } = Round.rgb({ r, g, b, a })

  const alphaInEightBit = eightBit(A * 255)

  let value = hexString((R << 16) | (G << 8) | B, 6)

  if (alphaInEightBit < 255) {
    const alphaHex = hexString(alphaInEightBit, 2)
    value += alphaHex
  }

  if (minify && isRgbShortanable(R, G, B, alphaInEightBit)) {
    value = value.replace(/(.)\1/g, '$1')
  }

  return `#${value}`
}

/**
 * Converts a HEX color into an RGB color object representation.
 * @param {string} hex - A valid HEX color without the hashtag  "#". The alpha  channel is optional.
 * @return {object} An RGB color object representation.
 */
export function hexToRgb(hex) {
  const delta = parseInt(hex, 16)
  const value = {}

  if (hex.length === 6) {
    value.r = (delta >> 16) & 255
    value.g = (delta >> 8) & 255
    value.b = delta & 255
    value.a = 1
  } else {
    value.r = (delta >> 24) & 255
    value.g = (delta >> 16) & 255
    value.b = (delta >> 8) & 255
    value.a = (delta & 255) / 255
  }

  return Clamp.rgb(value)
}

/**
 * Converts an HSL color to its HSV representation.
 * @param {object} hsl - An HSL color object.
 * @return {object} - An HSV color object representation.
 */
export function hslToHsv({ h, s, l, a = 1 }) {
  const deltaS = (s * (l < 50 ? l : 100 - l)) / 100
  const v = l + deltaS

  s = deltaS > 0 ? ((2 * deltaS) / (l + deltaS)) * 100 : 0

  return Clamp.hsv({ h, s, v, a })
}

/**
 * Converts HSV color object into its HSL representation using interconversion.
 * @param {object} hsv - An HSV color object.
 * @return {object} - An HSL color object representation.
 */
export function hsvToHsl({ h, s, v, a = 1 }) {
  const deltaL = ((200 - s) * v) / 100

  const l = deltaL / 2

  if (deltaL > 0 && deltaL < 200) {
    s = ((s * v) / 100 / (deltaL <= 100 ? deltaL : 200 - deltaL)) * 100
  } else {
    s = 0
  }

  return Clamp.hsl({ h, s, l, a })
}

/**
 * Converts an RGB color object into its HSV representation.
 * @param {object} rgb - An RGB color object.
 * @return {object} - An HSV color object representation.
 */
export function rgbToHsv({ r, g, b, a = 1 }) {
  // Find maximum and minimum values among RGB components
  const maxRgb = Math.max(r, g, b)
  const minRgb = Math.min(r, g, b)
  const segment = maxRgb - minRgb

  // Calculate value (brightness)
  const v = (maxRgb / 255) * 100
  const s = (maxRgb > 0 ? segment / maxRgb : 0) * 100
  const h = computeHsvHue({ r, g, b }, { segment, maxRgb, minRgb })

  return Clamp.hsv({ h, s, v, a })
}

/**
 * Converts an RGB color object into its CMYK representation.
 * @param {object} rgb - An RGB color object.
 * @return {object} An CMYK color object representation.
 */
export function rgbToCmyk({ r, g, b, a = 1 }) {
  r /= 255
  g /= 255
  b /= 255

  const k = 1 - Math.max(r, g, b)
  const c = (1 - r - k) / (1 - k)
  const m = (1 - g - k) / (1 - k)
  const y = (1 - b - k) / (1 - k)

  return Clamp.cmyk({ c: c * 100, m: m * 100, y: y * 100, k: k * 100, a })
}

/**
 * Converts an CMYK color object into its RGB representation.
 * @param {object} cmyk - An CMYK color object.
 * @return {object} An RGB color object representation.
 */
export function cmykToRgb({ c, m, y, k, a = 1 }) {
  c /= 100
  m /= 100
  y /= 100
  k /= 100

  const r = 255 * ((1 - c) * (1 - k))
  const g = 255 * ((1 - m) * (1 - k))
  const b = 255 * ((1 - y) * (1 - k))

  return Clamp.rgb({ r, g, b, a })
}

/**
 * Converts an HSV color object into its RGB representation.
 * @param {object} hsv - An HSV color object.
 * @return {object} An RGB color object representation.
 */
export function hsvToRgb({ h, s, v, a = 1 }) {
  // Convert degrees to the range [0, 6]
  const hueRange = (h / 60) % 6
  // Normalize saturation and value to the range [0, 1]
  const saturation = s / 100
  const value = v / 100

  // Calculate chroma, second largest component, and minimum component
  const chroma = value * saturation
  const secondLargestComponent = chroma * (1 - Math.abs((hueRange % 2) - 1))
  const minComponent = value - chroma

  let red
  let green
  let blue

  // Determine the RGB components based on the hue range
  if (0 <= hueRange && hueRange < 1) {
    ;[red, green, blue] = [chroma, secondLargestComponent, 0]
  } else if (1 <= hueRange && hueRange < 2) {
    ;[red, green, blue] = [secondLargestComponent, chroma, 0]
  } else if (2 <= hueRange && hueRange < 3) {
    ;[red, green, blue] = [0, chroma, secondLargestComponent]
  } else if (3 <= hueRange && hueRange < 4) {
    ;[red, green, blue] = [0, secondLargestComponent, chroma]
  } else if (4 <= hueRange && hueRange < 5) {
    ;[red, green, blue] = [secondLargestComponent, 0, chroma]
  } else {
    ;[red, green, blue] = [chroma, 0, secondLargestComponent]
  }

  // Clamp and return RGB values
  return Clamp.rgb({
    r: (red + minComponent) * 255,
    g: (green + minComponent) * 255,
    b: (blue + minComponent) * 255,
    a: a
  })
}

/**
 * Converts HSL color object into its RGB representation using HSV interconversion.
 * @param {object} input - An HSL color object.
 * @return {object} An RGB color object representation.
 */
export function hslToRgb({ h, s, l, a = 1 }) {
  return hsvToRgb(hslToHsv({ h, s, l, a }))
}

/**
 * Converts RGB color object into its HSL representation using HSV interconversion.
 * @param {object} input - An RGB color object.
 * @return {object} An HSL color object representation.
 */
export function rgbToHsl({ r, g, b, a = 1 }) {
  return hsvToHsl(rgbToHsv({ r, g, b, a }))
}
