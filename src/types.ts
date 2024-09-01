import type { namedColorsMap } from "./constants/namedColors";

export type AnyObject<K extends string = string, V = any> = Record<K, V>;

export interface AnyRgb {
	r: number;
	g: number;
	b: number;
	a?: number;
}
export interface Rgb extends AnyRgb {
	a: number;
}

export interface AnyHsl {
	h: number;
	s: number;
	l: number;
	a?: number;
}

export interface Hsl extends AnyHsl {
	a: number;
}

export interface AnyHsv {
	h: number;
	s: number;
	v: number;
	a?: number;
}

export interface Hsv extends AnyHsv {
	a: number;
}

export interface AnyCmyk {
	c: number;
	m: number;
	y: number;
	k: number;
	a?: number;
}

export interface Cmyk extends AnyCmyk {
	a: number;
}

export type SupportedColorFormat =
	| "rgb"
	| "hsl"
	| "hsv"
	| "cmyk"
	| "hex"
	| "named";

export type ColorObject = AnyRgb | AnyHsl | AnyHsv | AnyCmyk;

export type ColorInput = string | ColorObject;

export type ColorData<C = Rgb> = {
	originalInput?: ColorInput;
	isValid: boolean;
	value: C;
	format?: SupportedColorFormat;
};

export type AnyColorData = Partial<ColorData<ColorObject | undefined>>;

export type NamedColors = keyof typeof namedColorsMap;

export type ColorConverters = {
	[MethodKey in Exclude<SupportedColorFormat, "hex" | "named">]: (
		colorObject: ColorObject,
	) => Rgb;
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
		hex: (input: I) => Rgb;
		rgb: (input: I) => Rgb;
		hsv: (input: I) => Hsv;
		hsl: (input: I) => Hsl;
		cmyk: (input: I) => Cmyk;
		named: (input: I) => Rgb;
	},
	E
>;

export type ColorNormalizers = {
	rgb: (input: AnyObject) => Rgb;
	hsv: (input: AnyObject) => Hsv;
	hsl: (input: AnyObject) => Hsl;
	cmyk: (input: AnyObject) => Cmyk;
	fn: (x: number) => number;
};

export interface FormatOptions {
	/** Whether to attempt to minify the output. */
	minify?: boolean;

	/** Whether to generate CSSNext compatible formatting. */
	cssNext?: boolean;
}

/**
 * Represents a plugin function that extends the Color instance with custom methods.
 *
 * @param this The Color instance to which the plugin methods will be added.
 * @param args Any additional arguments passed to the plugin method.
 */
type Plugin<T, ThisArg = Dye<any>> = (
	this: ThisArg,
	...args: any[]
) => T | void;

export type DyePlugins = Record<string, Plugin<any>>;

export interface DyeOptions<T extends DyePlugins> {
	/** An object containing the plugin methods to be added to the Colorus instance. */
	plugins?: T;
	formatOptions?: FormatOptions;
}

export type Dye<P extends DyePlugins = DyePlugins> = {
	/** The color value in RGB format, if available. */
	value?: Rgb;
	/** The original format of the color input (e.g., 'hex', 'rgb', 'hsl'). */
	format?: SupportedColorFormat;
	/** The original input used to create the color. */
	originalInput?: ColorInput;
	/** Indicates whether the color input was valid. */
	isValid?: boolean;
	/** Calculates and returns the relative luminance of the color. */
	luminance: number;
	/** Returns the RGB representation of the color. */
	rgb: Rgb;
	/** Converts and returns the color in HSL format. */
	hsl: Hsl;
	/** Converts and returns the color in HSV format. */
	hsv: Hsv;
	/** Converts and returns the color in CMYK format. */
	cmyk: Cmyk;
	/** Converts the color to a hexadecimal string representation. */
	toHex: () => string;
	/** Converts the color to an RGB string representation. */
	toRgb: () => string;
	/** Converts the color to an HSL string representation. */
	toHsl: () => string;
	/** Converts the color to an HSV string representation. */
	toHsv: () => string;
	/** Converts the color to a CMYK string representation. */
	toCmyk: () => string;
	/** Converts the color to its nearest CSS named color. */
	toNamed: () => string;
	/** Creates a new lighter color. */
	lighten: (amount?: number) => DyeReturns<P>;
	/** Creates a new darker color. */
	darken: (amount?: number) => DyeReturns<P>;
	/** Creates a new more saturated color. */
	saturate: (amount?: number) => DyeReturns<P>;
	/** Creates a new less saturated color. */
	desaturate: (amount?: number) => DyeReturns<P>;
	/** Creates a new color with adjusted hue. */
	hue: (amount?: number) => DyeReturns<P>;
	/** Creates a new color with adjusted alpha (opacity). */
	alpha: (amount?: number) => DyeReturns<P>;
	/** Calculates the contrast ratio between this color and a background color. */
	contrastRatio: (bgColor: ColorInput) => number;
};

/** Represents the return type of the `dye` function, encompassing both the core properties and any additional plugin methods. */
export type DyeReturns<P extends DyePlugins> = Dye<P> & {
	[K in keyof P]: P[K] extends Plugin<infer R>
		? (...params: Parameters<P[K]>) => R extends DyeReturns<P> // Change here
				? DyeReturns<P>
				: R
		: Dye<P>;
};
