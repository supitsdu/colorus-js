declare module 'colorus' {
  type RGB = { r: number | string; g: number | string; b: number | string; a?: number | string }
  type HSL = { h: number | string; s: number | string; l: number | string; a?: number | string }
  type HSV = { h: number | string; s: number | string; v: number | string; a?: number | string }
  type CMYK = { c: number | string; m: number | string; y: number | string; k: number | string; a?: number | string }
  type ColorType = 'rgb' | 'hsl' | 'hsv' | 'cmyk'
  type Colors = RGB | HSL | HSV | CMYK
  type AnyColor = string | Colors
  type FormatOptions = {
    /** Whether to attempt to minify the output. */
    minify?: boolean
    /**  Whether to use CSSNext compatible formatting. */
    CSSNext?: boolean
  }
  type HexFormatOptions = Omit<FormatOptions, 'CSSNext'>
  /** Utility that provides methods for working with colors. */
  export default class Colorus {
    /** Creates a new Colorus instance with the provided input.
     * @param input - The color input string or object. */
    constructor(input?: AnyColor)
    get colorType(): ColorType | undefined
    /** Get the `RGB` object representation of the current color. */
    get rgb(): RGB
    /** Get the `HSL` object representation of the current color. */
    get hsl(): HSL
    /** Get the `HSV` object representation of the current color. */
    get hsv(): HSV
    /** Get the `CMYK` object representation of the current color. */
    get cmyk(): CMYK
    /** Convert the current color to hexadecimal format.
     * @param options - Formatting options.
     * @return The hexadecimal representation of the color. */
    toHex(options?: HexFormatOptions): string
    /** Convert the current color to RGB format.
     * @param options - Formatting options.
     * @return The RGB representation of the color. */
    toRgb(options?: FormatOptions): string
    /** Convert the current color to HSL format.
     * @param options - Formatting options.
     * @return The HSL representation of the color. */
    toHsl(options?: FormatOptions): string
    /** Convert the current color to HSV format.
     * @param options - Formatting options.
     * @return The HSV representation of the color. */
    toHsv(options?: FormatOptions): string
    /** Convert the current color to CMYK format.
     * @param options - Formatting options.
     * @return The CMYK representation of the color. */
    toCmyk(options?: FormatOptions): string
    /** Mixes the current color with another color.
     * @param input - The color to mix with.
     * @param amount - The amount of mixing. (Default: `0.1`)
     * @return A new Colorus instance representing the mixed color. */
    mix(input: AnyColor, amount?: number): Colorus
    /** Lightens the current color.
     * @param amount - The amount of lightening. (Default: `0.1`)
     * @return A new Colorus instance representing the lightened color. */
    lighten(amount?: number): Colorus
    /** Saturates the current color.
     * @param amount - The amount of saturation. (Default: `0.1`)
     * @return A new Colorus instance representing the saturated color. */
    saturate(amount?: number): Colorus
    /** Changes the hue of the current color.
     * @param amount - The amount of hue change. (Default: `0.1`)
     * @return A new Colorus instance representing the color with changed hue. */
    hue(amount?: number): Colorus
    /** Changes the alpha (opacity) of the current color.
     * @param amount - The amount of alpha change. (Default: `0.1`)
     * @return A new Colorus instance representing the color with changed alpha. */
    alpha(amount?: number): Colorus
  }
}
