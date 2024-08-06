import { hexToRgb } from "./conversions/hexConversions";
import { execColorStringTest } from "./core/colorTypeAnalyzer";
import { padString } from "./helpers";

import type { AnyColorData, ColorParsers } from "./types";

export const colorParsers: ColorParsers<string[]> = {
	hex: match => hexToRgb(padString(match[1])),
	rgb: match => ({
		r: Number(match[1]),
		g: Number(match[2]),
		b: Number(match[3]),
		a: Number(match[4]) || 1,
	}),
	hsl: match => ({
		h: Number(match[1]),
		s: Number(match[2]),
		l: Number(match[3]),
		a: Number(match[4]) || 1,
	}),
	hsv: match => ({
		h: Number(match[1]),
		s: Number(match[2]),
		v: Number(match[3]),
		a: Number(match[4]) || 1,
	}),
	cmyk: match => ({
		c: Number(match[1]),
		m: Number(match[2]),
		y: Number(match[3]),
		k: Number(match[4]),
		a: Number(match[5]) || 1,
	}),
	named: (match: string[]) => hexToRgb(match[0]),
};

/**
 * Parses a color string and converts it to a color object.
 * ```
 * parse('hsl(360,0,100)') // Returns: { colorType: "hsl", colorObject: { h: 360, s: 0, l: 100, a: 1 } }
 * ```
 * @param input - The input color string.
 */
export function parseColor(input?: string): AnyColorData | null {
	if (!input) return null;

	const [name, match] = execColorStringTest(input) || [];

	if (!name || !match) return null;

	return { colorType: name, colorObject: colorParsers[name](match) };
}
