import type { Color } from "./Color";
import type { namedColorsMap } from "./constants/namedColors";

export type ColorChannel = number;

export type AnyObject<K extends string = string, V = number> = Record<K, V>;

export type BaseColor<K extends string, T> = {
	[Channel in K]: T;
} & { a?: T };

export type AnyRgb<T = ColorChannel> = BaseColor<"r" | "g" | "b", T>;
export type RgbColor = Required<AnyRgb<number>>;

export type AnyHsl<T = ColorChannel> = BaseColor<"h" | "s" | "l", T>;
export type HslColor = Required<AnyHsl<number>>;

export type AnyHsv<T = ColorChannel> = BaseColor<"h" | "s" | "v", T>;
export type HsvColor = Required<AnyHsv<number>>;

export type AnyCmyk<T = ColorChannel> = BaseColor<"c" | "m" | "y" | "k", T>;
export type CmykColor = Required<AnyCmyk<number>>;

export type SupportedColorFormat =
	| "rgb"
	| "hsl"
	| "hsv"
	| "cmyk"
	| "hex"
	| "named";

export type ColorObject = AnyRgb | AnyHsl | AnyHsv | AnyCmyk;

export type ColorInput = string | ColorObject;

export type ColorData<C = RgbColor> = {
	originalInput?: ColorInput;
	isValid: boolean;
	value: C;
	format?: SupportedColorFormat;
};

export type AnyColorData = Partial<ColorData<ColorObject | undefined>>;

export type NamedColors = keyof typeof namedColorsMap;

export interface FormatOptions {
	/**
	 * Whether to attempt to minify the output.
	 */
	minify?: boolean;

	/**
	 * Whether to generate CSSNext compatible formatting.
	 */
	cssNext?: boolean;
}

export interface HexFormatOptions {
	/**
	 * Whether to attempt to minify the output.
	 */
	minify?: boolean;
}

/**
 * Represents a plugin function that extends the Color instance with custom methods.
 *
 * @param this The Color instance to which the plugin methods will be added.
 * @param args Any additional arguments passed to the plugin method.
 */
export type ColorPluginMethod<T> = (this: Color, ...args: any[]) => T | void;
export type ColorPlugins = Record<string, ColorPluginMethod<any>>;
export interface ColorOptions<T extends ColorPlugins> {
	/**
	 * An object containing the plugin methods to be added to the Colorus instance.
	 *
	 * @example
	 * plugins: {
	 *   getHue() {
	 * 	  return this.hsl.h
	 *   }
	 * }
	 */
	plugins?: T;
}

export type ColorConverters = {
	[MethodKey in Exclude<SupportedColorFormat, "hex" | "named">]: (
		colorObject: ColorObject,
	) => RgbColor;
};
export type ExecMatchClone = {
	pattern: {
		lastIndex: number;
		exec: (input: string) => string[] | null;
	};
};

export type ColorPatterns = [
	SupportedColorFormat,
	RegExp | ExecMatchClone["pattern"],
][];

export type NamedColorsParsers = {
	colors: Record<string, string>;
} & ExecMatchClone;

export type ColorParsers<I, E extends string = ""> = Omit<
	{
		hex: (input: I) => RgbColor;
		rgb: (input: I) => RgbColor;
		hsv: (input: I) => HsvColor;
		hsl: (input: I) => HslColor;
		cmyk: (input: I) => CmykColor;
		named: (input: I) => RgbColor;
	},
	E
>;

export type ColorNormalizers = ColorParsers<AnyObject, "named" | "hex"> & {
	fn: (x: number) => number;
};
