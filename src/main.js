import ColorFormatter from './colorFormatter'
import colorObject from './colorObject'
import colorString from './colorString'
import compose from './compose'
import conversion from './conversion'


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
   * Gets the color type from the latest instace.
   * @return {string}  The color type ('rgb', 'hsl', etc.).
   */
  get type() {
    return this.#data.colorType
  }

  /**
   * Gets the RGB object representation of the instantiated color.
   * @return {Object} RGB object representation.
   */
  get rgb() {
    return this.#data.rgb
  }

  /**
   * Gets the HSL object representation of the instantiated color.
   * @return {Object} HSL object representation.
   */
  get hsl() {
    return conversion.rgbToHsl(this.#data.rgb)
  }

  /**
   * Gets the HSV object representation of the instantiated color.
   * @return {Object} HSV object representation.
   */
  get hsv() {
    return conversion.rgbToHsv(this.#data.rgb)
  }

  /**
   * Gets the CMYK object representation of the instantiated color.
   * @return {Object} CMYK object representation.
   */
  get cmyk() {
    return conversion.rgbToCmyk(this.#data.rgb)
  }

  /**
   * Returns the HEX string representation of the instantiated color.
   * @param {object} options - An optional options object to alter output.
   * @return {string} HEX string representation.
   */
  toHex(options) {
    return conversion.rgbToHex(this.rgb, options)
  }

  /**
   * Returns the RGB string representation of the instantiated color.
   * @param {object} options - An optional options object to alter output.
   * @return {string} RGB string representation.
   */
  toRgb(options) {
    return new ColorFormatter(options).rgb(this.rgb)
  }

  /**
   * Returns the HSL string representation of the instantiated color.
   * @param {object} options - An optional options object to alter output.
   * @return {string} RGB string representation.
   */
  toHsl(options) {
    return new ColorFormatter(options).hsl(this.hsl)
  }

  /**
   * Returns the HSV string representation of the instantiated color.
   * @param {object} options - An optional options object to alter output.
   * @return {string} RGB string representation.
   */
  toHsv(options) {
    return new ColorFormatter(options).hsv(this.hsv)
  }

  /**
   * Returns the CMYK string representation of the instantiated color.
   * @param {object} options - An optional options object to alter output.
   * @return {string} RGB string representation.
   */
  toCmyk(options) {
    return new ColorFormatter(options).cmyk(this.cmyk)
  }

  /**
   * Interpolate between two colors.
   * @param {object} input - The color to interpolate towards.
   * @param {number} amount - The amount to interpolate (0-1).
   * @return {Colorus} A new Colorus instance representing the interpolated color
   */
  mix(input, amount = 0.1) {
    return new Colorus(compose.mix(this.rgb, new Colorus(input).rgb, amount))
  }

  /**
   * Lightens the color by a certain amount.
   * ```
   * const myColor = new Colorus('#f00');
   * const lighterColor = myColor.lighten(0.1); // Lightens the red color slightly
   * ```
   * @param {number} amount - The amount to lighten the color by. A value between 0 and 1.
   * @return {Colorus} A new Colorus object with the lightened color.
   */
  lighten(amount = 0.1) {
    return new Colorus(compose.lighten(this.hsl, amount))
  }

  /**
   * Saturate the color by a certain amount.
   * ```
   * const myColor = new Colorus('#ec3');
   * const lighterColor = myColor.saturate(0.1); // Saturate the red color slightly
   * ```
   * @param {number} amount - The amount to saturate the color by. A value between 0 and 1.
   * @return {Colorus} A new Colorus object with the saturated color.
   */
  saturate(amount = 0.1) {
    return new Colorus(compose.saturate(this.hsl, amount))
  }

  /**
   * Adjust the hue of a HSL color.
   * ```
   * const myColor = new Colorus('#ec3');
   * const lighterColor = myColor.hue(0.01); // Adjust the hue slightly
   * ```
   * @param {number} amount - The amount to saturate the color by. A value between 0 and 1.
   * @return {Colorus} A new Colorus object with the saturated color.
   */
  hue(amount = 0.1) {
    return new Colorus(compose.hue(this.hsl, amount))
  }

  /**
   * Adjust the alpha channel of a RGB color.
   * @param {number} amount The amount to adjust the alpha by. A values between 0 and 1.
   * @return {Colorus} A new Colorus object with the saturated color.
   */
  alpha(amount = 0.1) {
    return new Colorus(compose.alpha(this.rgb, amount))
  }
}

export default Colorus
