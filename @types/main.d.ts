/**
 * The `colorus-js` module allows for easy manipulation and conversion of colors between different formats.
 */
declare module 'colorus-js' {
  export interface RgbObject {
    r: number | string
    g: number | string
    b: number | string
    a?: number | string
  }

  export interface HslObject {
    h: number | string
    s: number | string
    l: number | string
    a?: number | string
  }

  export interface HsvObject {
    h: number | string
    s: number | string
    v: number | string
    a?: number | string
  }

  export interface CmykObject {
    c: number | string
    m: number | string
    y: number | string
    k: number | string
    a?: number | string
  }

  export type AnyColorType = 'rgb' | 'hsl' | 'hsv' | 'cmyk'

  export type AnyColorObject = RgbObject | HslObject | HsvObject | CmykObject

  export type AnyColor = string | AnyColorObject

  export interface FormatOptions {
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

  export interface HexFormatOptions {
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

    /**
     * Analytical method to quickly test the `input` for any valid color.
     * @param input - The color input string or object.
     * @returns The type of the color (e.g.: `'rgb'`) if the color is valid, otherwise `null`.
     * @example
     * Colorus.test('#F33'); // Returns: 'hex'
     * Colorus.test({ r: 255, g: 0, b: 0 }); // Returns: 'rgb'
     * Colorus.test('#c('); // Returns: null
     */
    static test(input?: unknown): AnyColorType | null

    /** Get the type of the current color. */
    get colorType(): AnyColorType | undefined

    /**
     * Get the relative luminance of the current color.
     * @see {@link https://www.w3.org/TR/WCAG20-TECHS/G17.html | Techniques for WCAG 2.0 - G17}
     * @returns The relative luminance.
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
     * @returns The hexadecimal representation of the color.
     * @example
     * new Colorus('rgb(0, 0, 0)').toHex({ minify: true }); // Returns: '#000'
     */
    toHex(options?: HexFormatOptions): string

    /**
     * Convert the current color to `RGB` string format.
     * @param options Formatting options.
     * @returns The `RGB` string representation of the color.
     */
    toRgb(options?: FormatOptions): string

    /**
     * Convert the current color to `HSL` string format.
     * @param options Formatting options.
     * @returns The `HSL` representation of the color.
     */
    toHsl(options?: FormatOptions): string

    /**
     * Convert the current color to `HSV` string format.
     * @param options Formatting options.
     * @returns The `HSV` string representation of the color.
     */
    toHsv(options?: FormatOptions): string

    /**
     * Convert the current color to `CMYK` string format.
     * @param options Formatting options.
     * @returns The `CMYK` string representation of the color.
     */
    toCmyk(options?: FormatOptions): string

    /**
     * Mixes the current color with another color.
     * @param input The color to mix with.
     * @param amount The amount of mixing. (Default: `0.1`)
     * @returns A new Colorus instance representing the mixed color.
     * @example
     * const color = new Colorus('#f00');
     * color.mix('#fff9e6', 0.45).toHex(); // Returns: '#FF7068'
     */
    mix(input: AnyColor, amount?: number): Colorus

    /**
     * Lightens the current color.
     * @param amount The amount of lightening. (Default: `0.1`)
     * @returns A new Colorus instance representing the lightened color.
     */
    lighten(amount?: number): Colorus

    /**
     * Darkens the current color.
     * @param amount The amount of darkening.
     * @returns A new Colorus instance representing the darkened color.
     */
    darken(amount?: number): Colorus

    /**
     * Saturates the current color.
     * @param amount The amount of saturation. (Default: `0.1`)
     * @returns A new Colorus instance representing the saturated color.
     */
    saturate(amount?: number): Colorus

    /**
     * Desaturates the current color.
     * @param amount The amount of desaturation.
     * @returns A new Colorus instance representing the desaturated color.
     */
    desaturate(amount?: number): Colorus

    /**
     * Changes the hue of the current color.
     * @param amount The amount of hue change. (Default: `0.1`)
     * @returns A new Colorus instance representing the color with changed hue.
     */
    hue(amount?: number): Colorus

    /**
     * Changes the alpha (opacity) of the current color.
     * @param amount The amount of alpha change. (Default: `0.1`)
     * @returns A new Colorus instance representing the color with changed alpha.
     */
    alpha(amount?: number): Colorus

    /**
     * Gets the contrast ratio between the foreground color and its adjacent background.
     * @param backgroundColor The background color.
     * @returns The contrast ratio between the instantiated color and the provided background color.
     * @example
     * new Colorus('#000').contrastRatio('#f3f3f3'); // Returns: 18.92
     */
    contrastRatio(backgroundColor: AnyColor): number

    /**
     * Inverts the color using sRGB values.
     * @returns A new Colorus instance representing the color with inverted color values.
     */
    invert(): Colorus

    /**
     * Converts the current color to grayscale.
     * @param useNTSCFormula Whether to use the NTSC formula for conversion. (Default: `false`)
     * @returns A new Colorus instance representing the grayscale color.
     * @example
     * // Create a Colorus instance representing an RGB color
     * const color = new Colorus('rgb(50 168 82)');
     * color.grayscale().toRgb(); // Returns: 'rgb(137, 137, 137)'
     * // Convert using the NTSC formula
     * color.grayscale(true).toRgb(); // Returns 'rgb(123, 123, 123)'
     */
    grayscale(useNTSCFormula?: boolean): Colorus
  }
}
