export namespace Colors {
	export type Object<Keys extends string = any> = {
		[Key in Keys]: Key extends "a" ? number | undefined : number;
	};

	export type AnyRgb = Object<"r" | "g" | "b" | "a">;
	export type AnyHsl = Object<"h" | "s" | "l" | "a">;
	export type AnyHsv = Object<"h" | "s" | "v" | "a">;
	export type AnyCmyk = Object<"c" | "m" | "y" | "k" | "a">;

	export interface Rgb extends AnyRgb {
		a: number;
	}

	export interface Hsl extends AnyHsl {
		a: number;
	}

	export interface Hsv extends AnyHsv {
		a: number;
	}

	export interface Cmyk extends AnyCmyk {
		a: number;
	}

	export type Channels =
		| keyof AnyRgb
		| keyof AnyHsl
		| keyof AnyHsv
		| keyof AnyCmyk;

	export type All = Rgb | Hsl | Hsv | Cmyk;

	export type Any = AnyRgb | AnyHsl | AnyHsv | AnyCmyk;

	export type Input = string | Object<any>;

	export type MatchArray<V extends string | number = number> = Array<V>;
}
