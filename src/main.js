import { contrastRatio, relativeLuminance } from './accessibility'
import ColorFormatter from './colorFormatter'
import colorObject from './colorObject'
import colorString from './colorString'
import * as compose from './compose'
import * as conversion from './conversion'

/** Default fallback color object. */
const defaultFallbackColor = {
  colorType: undefined,
  rgb: { r: 0, g: 0, b: 0, a: 1 }
}

/**
 * Serialize input to extract color information.
 * @param {string|Object} input - The color input string or object.
 * @return {object} Serialized color value containing space and RGB representation. Or `null` if the input is undefined.
 * @throws Will throw if the input is not valid.
 */
const serializeInput = input => {
  if (typeof input === 'undefined') return null
  if (typeof input === 'string') return colorString.serialize(input)
  if (!colorObject.nao(input)) return colorObject.serialize(input)

  throw new TypeError('Unknown input type. Colors must be either objects or strings.')
}

/** Utility that provides methods for working with colors. */
class Colorus {
  #data = {}

  /**
   * Creates a new Colorus instance with the provided input.
   * @param {string|Object} input - The color input string or object.
   */
  constructor(input) {
    this.#data = serializeInput(input) ?? defaultFallbackColor
  }

  /**
   * Get the color type of the current color.
   * @return {string} The color type.
   */
  get colorType() {
    return this.#data.colorType
  }

  /**
   * Get the relative luminance of the current color.
   * @link [WCAG 2.0 Adherence](https://www.w3.org/TR/WCAG20-TECHS/G17.html)
   */
  get luminance() {
    return relativeLuminance(this.rgb)
  }

  /**
   * Get the RGB object representation of the current color.
   * @return {object} The RGB representation.
   */
  get rgb() {
    return this.#data.rgb
  }

  /**
   * Get the HSL object representation of the current color.
   * @return {object} The HSL representation.
   */
  get hsl() {
    return conversion.rgbToHsl(this.#data.rgb)
  }

  /**
   * Get the HSV representation of the current color.
   * @return {object} The HSV representation.
   */
  get hsv() {
    return conversion.rgbToHsv(this.#data.rgb)
  }

  /**
   * Get the CMYK representation of the current color.
   * @return {object} The CMYK representation.
   */
  get cmyk() {
    return conversion.rgbToCmyk(this.#data.rgb)
  }

  /**
   * Convert the current color to hexadecimal format.
   * @param {object} [options] - Formatting options.
   * @return {string} The hexadecimal representation of the color.
   */
  toHex = options => conversion.rgbToHex(this.rgb, options)

  /**
   * Convert the current color to RGB format.
   * @param {object} [options] - Formatting options.
   * @return {string} The RGB representation of the color.
   */
  toRgb = options => new ColorFormatter(options).rgb(this.rgb)

  /**
   * Convert the current color to HSL format.
   * @param {object} [options] - Formatting options.
   * @return {string} The HSL representation of the color.
   */
  toHsl = options => new ColorFormatter(options).hsl(this.hsl)

  /**
   * Convert the current color to HSV format.
   * @param {object} [options] - Formatting options.
   * @return {string} The HSV representation of the color.
   */
  toHsv = options => new ColorFormatter(options).hsv(this.hsv)

  /**
   * Convert the current color to CMYK format.
   * @param {object} [options] - Formatting options.
   * @return {string} The CMYK representation of the color.
   */
  toCmyk = options => new ColorFormatter(options).cmyk(this.cmyk)

  /**
   * Mixes the current color with another color.
   * @param {string|Object} input - The color to mix with.
   * @param {number} [amount=0.1] - The amount of mixing.
   * @return {Colorus} A new Colorus instance representing the mixed color.
   */
  mix(input, amount = 0.1) {
    return new Colorus(compose.mix(this.rgb, new Colorus(input).rgb, amount))
  }

  /**
   * Lightens the current color.
   * @param {number} [amount=0.1] - The amount of lightening.
   * @return {Colorus} A new Colorus instance representing the lightened color.
   */
  lighten(amount = 0.1) {
    return new Colorus(compose.lighten(this.hsl, amount))
  }

  /**
   * Darkens the current color.
   * @param {number} [amount=0.1] - The amount of darkening.
   * @return {Colorus} A new Colorus instance representing the darkened color.
   */
  darken(amount = 0.1) {
    return new Colorus(compose.lighten(this.hsl, -amount))
  }

  /**
   * Saturates the current color.
   * @param {number} [amount=0.1] - The amount of saturation.
   * @return {Colorus} A new Colorus instance representing the saturated color.
   */
  saturate(amount = 0.1) {
    return new Colorus(compose.saturate(this.hsl, amount))
  }

  /**
   * Desaturates the current color.
   * @param {number} [amount=0.1] - The amount of desaturation.
   * @return {Colorus} A new Colorus instance representing the desaturated color.
   */
  desaturate(amount = 0.1) {
    return new Colorus(compose.saturate(this.hsl, -amount))
  }

  /**
   * Changes the hue of the current color.
   * @param {number} [amount=0.1] - The amount of hue change.
   * @return {Colorus} A new Colorus instance representing the color with changed hue.
   */
  hue(amount = 0.1) {
    return new Colorus(compose.hue(this.hsl, amount))
  }

  /**
   * Changes the alpha (opacity) of the current color.
   * @param {number} [amount=0.1] - The amount of alpha change.
   * @return {Colorus} A new Colorus instance representing the color with changed alpha.
   */
  alpha(amount = 0.1) {
    return new Colorus(compose.alpha(this.rgb, amount))
  }

  /**
   * Gets the contrast ratio between an foreground color and its adjacent background.
   * @param {object} backgroundColor the background color.
   * @return {number} The contrast ratio between the instantiated color and provided background color.
   */
  contrastRatio(backgroundColor) {
    return contrastRatio(this.rgb, new Colorus(backgroundColor).rgb)
  }

  /**
   * Invert an RGB color.
   * @return {object} New RGB color object.
   */
  invert() {
    return new Colorus(compose.invert(this.#data.rgb))
  }
}

export default Colorus
