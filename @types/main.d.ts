/**
 * The `colorus-js` module allows for easy manipulation and conversion of colors between different formats.
 */
declare module 'colorus-js' {
  export type RgbObject = { r: number | string; g: number | string; b: number | string; a?: number | string }

  export type HslObject = { h: number | string; s: number | string; l: number | string; a?: number | string }

  export type HsvObject = { h: number | string; s: number | string; v: number | string; a?: number | string }

  export type CmykObject = { c: number | string; m: number | string; y: number | string; k: number | string; a?: number | string }

  export type AnyColorType = 'rgb' | 'hsl' | 'hsv' | 'cmyk'

  export type AnyColorObject = RgbObject | HslObject | HsvObject | CmykObject

  export type AnyColor = string | AnyColorObject

  type FormatOptions = {
    /**
     * Whether to attempt to minify the output.
     * @example
     * // Minified: 'hsl(240,20,30,0.5)'
     * // Default: 'hsl(240°, 20%, 30%, 0.5)'
     */
    minify?: boolean

    /**
     * Whether to generate CSSNext compatible formatting.
     * @example
     * // CSSNext: 'rgb(2 2 30 / 0.5)'
     * // Legacy: 'rgba(2, 2, 30, 0.5)'
     */
    CSSNext?: boolean
  }

  type HexFormatOptions = {
    /**
     * Whether to attempt to minify the output.
     * @example
     * // Minified: '#FFF'
     * // Default: '#FFFFFF'
     */
    minify?: boolean
  }

  /**
   * Utility that provides methods for working with colors.
   *
   * @remarks
   * The `Colorus` class allows for creating, manipulating, and formatting colors in various formats.
   * It provides methods for converting between different color formats, modifying colors,
   * calculating contrast ratios, and inverting colors.
   *
   * @example
   * ```
   * // Create a new Colorus instance
   * const color = new Colorus('rgb(255, 0, 0)');
   *
   * color.colorType; // Returns: 'rgb'
   * color.lighten(0.2).toHex(); // Returns: '#FF3333'
   * ```
   */
  export class Colorus {
    /**
     * Creates a new Colorus instance with the provided input.
     * @param input - The color input string or object.
     * @throws If the input is not `undefined` or valid color format (e.g. `string` or `object`).
     */
    constructor(input?: AnyColor)

    /** Analitycal method to quickly tests the `input` for any valid color.
     * @param input - The color input string or object.
     * @return The type of the color (e.g.: `'rgb'`) if color is valid, otherwise `null`.
     * @example
     * Colorus.test('#F33') // Returns: 'hex'
     * Colorus.test({ r: 255, g: 0, b: 0 }) // Returns: 'rgb'
     * Colorus.test('#c(') // Returns: null
     */
    static test(input?: unknown): AnyColorType | null

    /** Get the type of the current color. */
    get colorType(): AnyColorType | undefined

    /**
     * Get the relative luminance of the current color.
     * @see {@link https://www.w3.org/TR/WCAG20-TECHS/G17.html | Techniques for WCAG 2.0 - G17}
     * @return The relative luminance.
     */
    get luminance(): number

    /** Get the `sRGB` object representation of the current color. */
    get rgb(): RgbObject

    /** Get the `HSL` object representation of the current color. */
    get hsl(): HslObject

    /** Get the `HSV` object representation of the current color. */
    get hsv(): HsvObject

    /** Get the `CMYK` object representation of the current color. */
    get cmyk(): CmykObject

    /**
     * Convert the current color to hexadecimal format.
     * @param options Formatting options.
     * @return The hexadecimal representation of the color.
     * @example
     * new Colorus('rgb(0, 0, 0)').toHex({ minify: true }) // Returns: '#000'
     */
    toHex(options?: HexFormatOptions): string

    /**
     * Convert the current color to RgbObject format.
     * @param options Formatting options.
     * @return The RgbObject representation of the color.
     */
    toRgb(options?: FormatOptions): string

    /**
     * Convert the current color to HslObject format.
     * @param options Formatting options.
     * @return The HslObject representation of the color.
     */
    toHsl(options?: FormatOptions): string

    /**
     * Convert the current color to HsvObject format.
     * @param options Formatting options.
     * @return The HsvObject representation of the color.
     */
    toHsv(options?: FormatOptions): string

    /**
     * Convert the current color to CmykObject format.
     * @param options Formatting options.
     * @return The CmykObject representation of the color.
     */
    toCmyk(options?: FormatOptions): string

    /**
     * Mixes the current color with another color.
     * @param input The color to mix with.
     * @param amount The amount of mixing. (Default: `0.1`)
     * @return A new Colorus instance representing the mixed color.
     * @example
     * const color = new Colorus('#f00')
     * color.mix('#fff9e6', 0.45).toHex() // Returns: '#FF7068'
     */
    mix(input: AnyColor, amount?: number): Colorus

    /**
     * Lightens the current color.
     * @param amount The amount of lightening. (Default: `0.1`)
     * @return A new Colorus instance representing the lightened color.
     */
    lighten(amount?: number): Colorus

    /**
     * Darkens the current color.
     * @param amount The amount of darkening.
     * @return A new Colorus instance representing the darkened color.
     */
    darken(amount?: number): Colorus

    /**
     * Saturates the current color.
     * @param amount The amount of saturation. (Default: `0.1`)
     * @return A new Colorus instance representing the saturated color.
     */
    saturate(amount?: number): Colorus

    /**
     * Desaturates the current color.
     * @param amount - The amount of desaturation.
     * @return A new Colorus instance representing the desaturated color.
     */
    desaturate(amount?: number): Colorus

    /**
     * Changes the hue of the current color.
     * @param amount The amount of hue change. (Default: `0.1`)
     * @return A new Colorus instance representing the color with changed hue.
     */
    hue(amount?: number): Colorus

    /**
     * Changes the alpha (opacity) of the current color.
     * @param amount The amount of alpha change. (Default: `0.1`)
     * @return A new Colorus instance representing the color with changed alpha.
     */
    alpha(amount?: number): Colorus

    /**
     * Gets the contrast ratio between an foreground color and its adjacent background.
     * @param backgroundColor the background color.
     * @return The contrast ratio between the instantiated color and provided background color.
     * @example
     * new Colorus('#000').contrastRatio('#f3f3f3') // Returns: 18.92
     */
    contrastRatio(backgroundColor: AnyColor): number

    /**
     * Inverts the color using sRGB values.
     * @return A new Colorus instance representing the color with inverted color values.
     */
    invert(): Colorus
  }
}
