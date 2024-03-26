import ColorFormatter from './colorFormatter'
import colorObject from './colorObject'
import colorString from './colorString'
import compose from './compose'
import conversion from './conversion'

/**
 * Default fallback color object.
 * @type {Object}
 */
const defaultFallbackColor = {
  colorType: undefined,
  rgb: { r: 0, g: 0, b: 0, a: 1 }
}

/**
 * Serialize input to extract color information.
 * @param {string|Object} input - The color input string or object.
 * @return {Object} Serialized color value containing space and RGB representation. Or `null` if the input is undefined.
 * @throws  Will throw if the input is not valid.
 */
const serializeInput = input => {
  if (typeof input === 'undefined') return null
  if (typeof input === 'string') return colorString.serialize(input)
  if (!colorObject.nao(input)) return colorObject.serialize(input)

  throw new TypeError('Unknown input type. Colors must be either objects or strings.')
}

/**
 * Utility that provides methods for working with colors.
 */
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
   * @returns {string} The color type.
   */
  get colorType() {
    return this.#data.colorType
  }

  /**
   * Get the RGB object representation of the current color.
   * @returns {Object} The RGB representation.
   */
  get rgb() {
    return this.#data.rgb
  }

  /**
   * Get the HSL object representation of the current color.
   * @returns {Object} The HSL representation.
   */
  get hsl() {
    return conversion.rgbToHsl(this.#data.rgb)
  }

  /**
   * Get the HSV representation of the current color.
   * @returns {Object} The HSV representation.
   */
  get hsv() {
    return conversion.rgbToHsv(this.#data.rgb)
  }

  /**
   * Get the CMYK representation of the current color.
   * @returns {Object} The CMYK representation.
   */
  get cmyk() {
    return conversion.rgbToCmyk(this.#data.rgb)
  }

  /**
   * Convert the current color to hexadecimal format.
   * @param {Object} [options] - Formatting options.
   * @returns {string} The hexadecimal representation of the color.
   */
  toHex = options => conversion.rgbToHex(this.rgb, options)

  /**
   * Convert the current color to RGB format.
   * @param {Object} [options] - Formatting options.
   * @returns {string} The RGB representation of the color.
   */
  toRgb = options => new ColorFormatter(options).rgb(this.rgb)

  /**
   * Convert the current color to HSL format.
   * @param {Object} [options] - Formatting options.
   * @returns {string} The HSL representation of the color.
   */
  toHsl = options => new ColorFormatter(options).hsl(this.hsl)

  /**
   * Convert the current color to HSV format.
   * @param {Object} [options] - Formatting options.
   * @returns {string} The HSV representation of the color.
   */
  toHsv = options => new ColorFormatter(options).hsv(this.hsv)

  /**
   * Convert the current color to CMYK format.
   * @param {Object} [options] - Formatting options.
   * @returns {string} The CMYK representation of the color.
   */
  toCmyk = options => new ColorFormatter(options).cmyk(this.cmyk)

  /**
   * Mixes the current color with another color.
   * @param {string|Object} input - The color to mix with.
   * @param {number} [amount=0.1] - The amount of mixing.
   * @returns {Colorus} A new Colorus instance representing the mixed color.
   */
  mix(input, amount = 0.1) {
    return new Colorus(compose.mix(this.rgb, new Colorus(input).rgb, amount))
  }

  /**
   * Lightens the current color.
   * @param {number} [amount=0.1] - The amount of lightening.
   * @returns {Colorus} A new Colorus instance representing the lightened color.
   */
  lighten(amount = 0.1) {
    return new Colorus(compose.lighten(this.hsl, amount))
  }

  /**
   * Saturates the current color.
   * @param {number} [amount=0.1] - The amount of saturation.
   * @returns {Colorus} A new Colorus instance representing the saturated color.
   */
  saturate(amount = 0.1) {
    return new Colorus(compose.saturate(this.hsl, amount))
  }

  /**
   * Changes the hue of the current color.
   * @param {number} [amount=0.1] - The amount of hue change.
   * @returns {Colorus} A new Colorus instance representing the color with changed hue.
   */
  hue(amount = 0.1) {
    return new Colorus(compose.hue(this.hsl, amount))
  }

  /**
   * Changes the alpha (opacity) of the current color.
   * @param {number} [amount=0.1] - The amount of alpha change.
   * @returns {Colorus} A new Colorus instance representing the color with changed alpha.
   */
  alpha(amount = 0.1) {
    return new Colorus(compose.alpha(this.rgb, amount))
  }
}

export default Colorus
