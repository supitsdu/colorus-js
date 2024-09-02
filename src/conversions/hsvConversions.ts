import { Clamp } from "../core/colorNormalizer";
import type { Hsl, Hsv, Rgb } from "../types";

/**
 * Converts Hsv color object into its Hsl representation using interconversion.
 * @param hsv - An Hsv color object.
 */
export function hsvToHsl({ h, s, v, a = 1 }: Hsv): Hsl {
	const deltaL = ((200 - s) * v) / 100;

	const l = deltaL / 2;

	if (deltaL > 0 && deltaL < 200) {
		s = ((s * v) / 100 / (deltaL <= 100 ? deltaL : 200 - deltaL)) * 100;
	} else {
		s = 0;
	}

	return Clamp.hsl({ h, s, l, a });
}

/**
 * Converts an Hsv color object into its Rgb representation.
 * @param hsv - An Hsv color object.
 */
export function hsvToRgb({ h, s, v, a = 1 }: Hsv): Rgb {
	const hueRange = (h / 60) % 6;
	const saturation = s / 100;
	const value = v / 100;

	const chroma = value * saturation;
	const secondLargestComponent = chroma * (1 - Math.abs((hueRange % 2) - 1));
	const minComponent = value - chroma;

	let red: number;
	let green: number;
	let blue: number;

	// Determine the Rgb components based on the hue range
	if (0 <= hueRange && hueRange < 1) {
		[red, green, blue] = [chroma, secondLargestComponent, 0];
	} else if (1 <= hueRange && hueRange < 2) {
		[red, green, blue] = [secondLargestComponent, chroma, 0];
	} else if (2 <= hueRange && hueRange < 3) {
		[red, green, blue] = [0, chroma, secondLargestComponent];
	} else if (3 <= hueRange && hueRange < 4) {
		[red, green, blue] = [0, secondLargestComponent, chroma];
	} else if (4 <= hueRange && hueRange < 5) {
		[red, green, blue] = [secondLargestComponent, 0, chroma];
	} else {
		[red, green, blue] = [chroma, 0, secondLargestComponent];
	}

	return Clamp.rgb({
		r: (red + minComponent) * 255,
		g: (green + minComponent) * 255,
		b: (blue + minComponent) * 255,
		a: a,
	});
}
