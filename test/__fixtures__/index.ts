import type { Cmyk, ColorObject, Hsl, Hsv, Rgb } from "../../src/types";
import { cmykColors } from "./cmykColors";
import { hexColors } from "./hexColors";
import { hslColors } from "./hslColors";
import { hsvColors } from "./hsvColors";
import { rgbColors } from "./rgbColors";

export type ColorNames =
	| "black"
	| "white"
	| "red"
	| "lime"
	| "blue"
	| "yellow"
	| "aqua"
	| "fuchsia"
	| "orange"
	| "brown"
	| "lightgray";

export type ColorRepresentations<T extends ColorObject = ColorObject> = {
	object: T;
	string: string;
	rgb?: Rgb;
};

export type FormatColorMap<
	T extends ColorObject = Rgb,
	C extends string = ColorNames,
> = Record<C, ColorRepresentations<T>>;

export interface TestColors {
	rgb: FormatColorMap;
	hsl: FormatColorMap<Hsl>;
	hsv: FormatColorMap<Hsv>;
	cmyk: FormatColorMap<Cmyk>;
	hex: FormatColorMap;
	withAlpha: (color: ColorObject, value?: number) => ColorObject;
}

export const testColors: TestColors = {
	withAlpha: (color, value = 0.5) => ({ ...color, a: value }),
	hex: hexColors,
	rgb: rgbColors,
	hsl: hslColors,
	hsv: hsvColors,
	cmyk: cmykColors,
};

export type Formats = keyof typeof testColors;

export type TestColorObject = ColorRepresentations & { colorName: string };

type TestColorsFunc = (
	format: Formats,
	color: TestColorObject,
	expectedRgb: Rgb,
) => void;

export function forEachColorFormat<
	N extends string,
	F extends Omit<Formats[], "withAlpha">,
>(name: N, func: TestColorsFunc, formats: F) {
	it.each(formats)(name, format => {
		const colors = testColors[format as keyof TestColors] as FormatColorMap;

		for (const [colorName, colorData] of Object.entries(colors)) {
			const expectedRgb = colorData?.rgb || testColors.rgb[colorName].object;
			const color = { ...colorData, colorName };

			func(format, color, expectedRgb);
		}
	});
}

export function forEachMethod<N extends string, M extends string[]>(
	name: N,
	func: (method: string) => void,
	methods: M,
) {
	it.each(methods)(name, method => {
		func(method);
	});
}
