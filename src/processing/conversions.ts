import type { Colors } from "../types";
import {
	clampCmyk,
	clampHsl,
	clampHsv,
	clampRgb,
} from "../utils/clampColorHelpers";
import { expandHexString, hexToInt, toHexString } from "../utils/colorUtils";

export const convertCmykToRgb = (
	{ c, m, y, k, a }: Colors.Cmyk,
	round: boolean = false,
): Colors.Rgb => {
	const fn = (value: number) => 255 * (1 - value / 100) * (1 - k / 100);
	return clampRgb(
		{
			r: fn(c),
			g: fn(m),
			b: fn(y),
			a,
		},
		round,
	);
};

export const convertHexToRgb = (
	color: string,
	round: boolean = false,
): Colors.Rgb => {
	const hex = expandHexString(color);

	return clampRgb(
		{
			r: hexToInt(hex),
			g: hexToInt(hex, 2),
			b: hexToInt(hex, 4),
			a: hexToInt(hex, 6) / 255,
		},
		round,
	);
};

export const convertHslToHsv = (
	{ h, s, l, a }: Colors.Hsl,
	round: boolean = false,
): Colors.Hsv => {
	const sPercent = s / 100;
	const lPercent = l / 100;
	const v = lPercent + sPercent * Math.min(lPercent, 1 - lPercent);
	const saturation = v === 0 ? 0 : (2 * (v - lPercent)) / v;

	return clampHsv({ h, s: saturation * 100, v: v * 100, a }, round);
};

export const convertHsvToHsl = (
	{ h, s, v, a }: Colors.Hsv,
	round: boolean = false,
): Colors.Hsl => {
	const sPercent = s / 100;
	const vPercent = v / 100;

	const l = ((2 - sPercent) * vPercent) / 2;
	const lightnessSaturation =
		(sPercent * vPercent) / (l <= 0.5 ? l * 2 : 2 - l * 2);

	return clampHsl(
		{
			h,
			s: lightnessSaturation * 100,
			l: l * 100,
			a,
		},
		round,
	);
};

export const convertHsvToRgb = (
	{ h, s, v, a }: Colors.Hsv,
	round: boolean = false,
): Colors.Rgb => {
	const normalizedH = h / 360;
	const normalizedS = s / 100;
	const normalizedV = v / 100;

	const chroma = normalizedV * normalizedS;
	const huePrime = normalizedH * 6;
	const x = chroma * (1 - Math.abs((huePrime % 2) - 1));

	const rgbValues = [
		[chroma, x, 0],
		[x, chroma, 0],
		[0, chroma, x],
		[0, x, chroma],
		[x, 0, chroma],
		[chroma, 0, x],
	];

	const [r, g, b] = rgbValues[Math.floor(huePrime) % 6];

	return clampRgb(
		{
			r: (normalizedV - chroma + r) * 255,
			g: (normalizedV - chroma + g) * 255,
			b: (normalizedV - chroma + b) * 255,
			a,
		},
		round,
	);
};

export const convertRgbToCmyk = (
	{ r, g, b, a }: Colors.Rgb,
	round: boolean = false,
): Colors.Cmyk => {
	const rNormalized = r / 255;
	const gNormalized = g / 255;
	const bNormalized = b / 255;

	const k = 1 - Math.max(rNormalized, gNormalized, bNormalized);

	const fn = (ch: number) => ((1 - ch - k) / (1 - k)) * 100;

	return clampCmyk(
		{
			c: fn(rNormalized),
			m: fn(gNormalized),
			y: fn(bNormalized),
			k: k * 100,
			a,
		},
		round,
	);
};

export const convertRgbToHex = (rgb: Colors.Rgb): string => {
	const { r, g, b, a } = clampRgb(rgb, true);
	let hexMap = [r, g, b].map(value => toHexString(value, 2)).join("");

	if (a < 1) hexMap += toHexString(Math.round(a * 255), 2);

	return `#${hexMap}`;
};

export const convertRgbToHsv = (
	{ r, g, b, a }: Colors.Rgb,
	round: boolean = false,
): Colors.Hsv => {
	const rPercent = r / 255;
	const gPercent = g / 255;
	const bPercent = b / 255;

	const max = Math.max(rPercent, gPercent, bPercent);
	const min = Math.min(rPercent, gPercent, bPercent);

	const delta = max - min;
	const v = max;
	const s = max === 0 ? 0 : delta / max;

	let h = 0;
	if (delta !== 0) {
		if (rPercent === max) {
			h = (gPercent - bPercent) / delta;
		} else if (gPercent === max) {
			h = 2 + (bPercent - rPercent) / delta;
		} else {
			h = 4 + (rPercent - gPercent) / delta;
		}
		h *= 60;
		if (h < 0) {
			h += 360;
		}
	}

	return clampHsv(
		{
			h: h,
			s: s * 100,
			v: v * 100,
			a,
		},
		round,
	);
};
