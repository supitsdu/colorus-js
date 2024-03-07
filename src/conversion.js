import clamp from './clamp'
import { hexString } from './helpers'

/**
 * **(Helper Functions)** Calculates the hue component of an HSV color object.
 *
 * @param {Object} rgb - An RGB color object.
 * @param {Object} params - Parameters including segment, maxRgb, and minRgb.
 * @return {number} The hue component of the HSV color.
 */
function computeHsvHue({ r, g, b }, { segment, maxRgb, minRgb }) {
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
const isRgbShortanable = (r, g, b, a = 1) => r % 17 === 0 && g % 17 === 0 && b % 17 === 0 && a % 17 === 0

/**
 * **(Color Conversion Functions)** Converts RGB color object to HEX color string.
 *
 * @param {object} rgb an valid RGB color object
 * @param {Object} [options={}] options to  customize output format and precision
 * @param {boolean} [options.minify=false]  set `true` for minified hexadecimal notation.
 * @return {string} an HEX string
 */
function rgbToHex({ r, g, b, a = 1 }, { minify = false } = {}) {
  r = Math.round(r)
  g = Math.round(g)
  b = Math.round(b)
  a = Math.round(clamp.eightBit(a * 255))

  let value = hexString((r << 16) | (g << 8) | b, 6)

  if (a < 255) {
    const alphaHex = hexString(a, 2)
    value += alphaHex
  }

  if (minify && isRgbShortanable(r, g, b, a)) {
    value = value.replace(/(.)\1/g, '$1')
  }

  return `#${value}`
}

/**
 * **(Color Conversion Functions)** Converts a HEX color into an RGB color object representation.
 *
 * @param {string} hex - A valid HEX color without the hashtag  "#". The alpha  channel is optional.
 * @return {Object} An RGB color object representation.
 */
function hexToRgb(hex) {
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

  return clamp.rgb(value)
}

/**
 * **(Color Conversion Functions)** Converts an HSL color to its HSV representation.
 * @param {Object} hsl - An HSL color object.
 * @return {Object} - An HSV color object representation.
 */
function hslToHsv({ h, s, l, a = 1 }) {
  const deltaS = (s * (l < 50 ? l : 100 - l)) / 100
  const v = l + deltaS

  s = deltaS > 0 ? ((2 * deltaS) / (l + deltaS)) * 100 : 0

  return clamp.hsv({ h, s, v, a })
}

/**
 * **(Color Conversion Functions)** Converts HSV color object into its HSL representation using interconversion.
 * @param {Object} hsv - An HSV color object.
 * @return {Object} - An HSL color object representation.
 */
function hsvToHsl({ h, s, v, a = 1 }) {
  const deltaL = ((200 - s) * v) / 100

  const l = deltaL / 2

  if (deltaL > 0 && deltaL < 200) {
    s = ((s * v) / 100 / (deltaL <= 100 ? deltaL : 200 - deltaL)) * 100
  } else {
    s = 0
  }

  return clamp.hsl({ h, s, l, a })
}

/**
 * **(Color Conversion Functions)** Converts an RGB color object into its HSV representation.
 *
 * @param {Object} rgb - An RGB color object.
 * @return {Object} - An HSV color object representation.
 */
function rgbToHsv({ r, g, b, a = 1 }) {
  // Find maximum and minimum values among RGB components
  const maxRgb = Math.max(r, g, b)
  const minRgb = Math.min(r, g, b)
  const segment = maxRgb - minRgb

  // Calculate value (brightness)
  const v = (maxRgb / 255) * 100
  const s = (maxRgb > 0 ? segment / maxRgb : 0) * 100
  const h = computeHsvHue({ r, g, b }, { segment, maxRgb, minRgb })

  return clamp.hsv({ h, s, v, a })
}

/**
 * **(Color Conversion Functions)** Converts an HSV color object into its RGB representation.
 *
 * @param {Object} hsv - An HSV color object.
 * @return {Object} An RGB color object representation.
 */
function hsvToRgb({ h, s, v, a = 1 }) {
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
  return clamp.rgb({
    r: (red + minComponent) * 255,
    g: (green + minComponent) * 255,
    b: (blue + minComponent) * 255,
    a: a
  })
}

/**
 * **(Color Conversion Functions)** Converts HSL color object into its RGB representation using HSV interconversion.
 *
 * @param {Object} input - An HSL color object.
 * @return {Object} An RGB color object representation.
 */
function hslToRgb({ h, s, l, a = 1 }) {
  return hsvToRgb(hslToHsv({ h, s, l, a }))
}

/**
 * **(Color Conversion Functions)** Converts RGB color object into its HSL representation using HSV interconversion.
 *
 * @param {Object} input - An RGB color object.
 * @return {Object} An HSL color object representation.
 */
function rgbToHsl({ r, g, b, a = 1 }) {
  return hsvToHsl(rgbToHsv({ r, g, b, a }))
}

export default { hexToRgb, rgbToHex, rgbToHsv, rgbToHsl, hsvToRgb, hsvToHsl, hslToHsv, hslToRgb, hsvToHsl }
