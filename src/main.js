import colorObject from './colorObject'
import colorString from './colorString'
import conversion from './conversion'
import stringify from './stringify'

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
  if (!colorObject.isNull(input)) return colorObject.serialize(input)

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
    return stringify.fromObject('rgb')(this.rgb, options)
  }

  /**
   * Returns the HSL string representation of the instantiated color.
   * @param {object} options - An optional options object to alter output.
   * @return {string} RGB string representation.
   */
  toHsl(options) {
    return stringify.fromObject('hsl')(this.hsl, options)
  }

  /**
   * Returns the HSV string representation of the instantiated color.
   * @param {object} options - An optional options object to alter output.
   * @return {string} RGB string representation.
   */
  toHsv(options) {
    return stringify.fromObject('hsv')(this.hsv, options)
  }
}

export default Colorus
