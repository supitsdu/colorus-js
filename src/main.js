import { contrastRatio, relativeLuminance } from './accessibility'
import ColorFormatter from './colorFormatter'
import * as compose from './compose'
import * as conversion from './conversion'
import * as serialize from './serialize'

/**
 * Utility class providing methods for working with colors.
 */
export class Colorus {
  #data = {}

  /**
   * Constructs a new Colorus instance with the given input.
   * @param {string|Object} input - The color input string or object.
   */
  constructor(input) {
    this.#data = serialize.fromUserInput(input)
  }

  /** Tests the `input` for a valid color.
   * @param {unknown} input - The color input string or object.
   * @return {string|null} The type of the string (e.g.: `rgb`) if color is valid, otherwise `null`.
   */
  static test(input) {
    return serialize.fromUserInput(input, { analytical: true }).colorType || null
  }

  /**
   * Gets the type of the current color.
   * @return {string} The color type.
   */
  get colorType() {
    return this.#data.colorType
  }

  /**
   * Gets the relative luminance of the current color.
   * @link [WCAG 2.0 Adherence](https://www.w3.org/TR/WCAG20-TECHS/G17.html)
   * @return {number} The relative luminance.
   */
  get luminance() {
    return relativeLuminance(this.rgb)
  }

  /**
   * Gets the RGB object representation of the current color.
   * @return {object} The RGB representation.
   */
  get rgb() {
    return this.#data.colorObject
  }

  /**
   * Gets the HSL object representation of the current color.
   * @return {object} The HSL representation.
   */
  get hsl() {
    return conversion.rgbToHsl(this.rgb)
  }

  /**
   * Gets the HSV representation of the current color.
   * @return {object} The HSV representation.
   */
  get hsv() {
    return conversion.rgbToHsv(this.rgb)
  }

  /**
   * Gets the CMYK representation of the current color.
   * @return {object} The CMYK representation.
   */
  get cmyk() {
    return conversion.rgbToCmyk(this.rgb)
  }

  /**
   * Converts the current color to hexadecimal format.
   * @param {object} [options] - Formatting options.
   * @return {string} The hexadecimal representation of the color.
   */
  toHex = options => conversion.rgbToHex(this.rgb, options)

  /**
   * Converts the current color to RGB format.
   * @param {object} [options] - Formatting options.
   * @return {string} The RGB representation of the color.
   */
  toRgb = options => new ColorFormatter(options).rgb(this.rgb)

  /**
   * Converts the current color to HSL format.
   * @param {object} [options] - Formatting options.
   * @return {string} The HSL representation of the color.
   */
  toHsl = options => new ColorFormatter(options).hsl(this.hsl)

  /**
   * Converts the current color to HSV format.
   * @param {object} [options] - Formatting options.
   * @return {string} The HSV representation of the color.
   */
  toHsv = options => new ColorFormatter(options).hsv(this.hsv)

  /**
   * Converts the current color to CMYK format.
   * @param {object} [options] - Formatting options.
   * @return {string} The CMYK representation of the color.
   */
  toCmyk = options => new ColorFormatter(options).cmyk(this.cmyk)

  /**
   * Converts the current color to its nearest CSS named color representation.
   * @return {string} The CSS named color.
   */
  toNamed = () => conversion.rgbToNamedColor(this.rgb)

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
   * Calculates the contrast ratio between a foreground color and its adjacent background.
   * @param {object} backgroundColor - The background color.
   * @return {number} The contrast ratio between the instantiated color and the provided background color.
   */
  contrastRatio(backgroundColor) {
    return contrastRatio(this.rgb, new Colorus(backgroundColor).rgb)
  }

  /**
   * Inverts the color using sRGB values.
   * @return {Colorus} A new Colorus instance representing the color with inverted color values.
   */
  invert() {
    return new Colorus(compose.invert(this.rgb))
  }

  /**
   * Converts the current color to grayscale.
   * @param {boolean} [useNTSCFormula=false] - Whether to use the NTSC formula for conversion. (Default: `false`)
   * @return {Colorus} A new Colorus object representing the grayscale color.
   */
  grayscale(useNTSCFormula = false) {
    return new Colorus(compose.rgbToGray(this.rgb, useNTSCFormula))
  }
}
