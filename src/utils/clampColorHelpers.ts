import type { Colors } from "../types";
import {
	normalize8Bit,
	normalizeAlpha,
	normalizeDegrees,
	normalizePercentage,
} from "./colorUtils";

export const clampCmyk = (
	{ c, m, y, k, a }: Colors.AnyCmyk,
	round = false,
): Colors.Cmyk => {
	return {
		c: normalizePercentage(c, round),
		m: normalizePercentage(m, round),
		y: normalizePercentage(y, round),
		k: normalizePercentage(k, round),
		a: normalizeAlpha(a),
	};
};

export const clampHsl = (
	{ h, s, l, a }: Colors.AnyHsl,
	round = false,
): Colors.Hsl => {
	return {
		h: normalizeDegrees(h, round),
		s: normalizePercentage(s, round),
		l: normalizePercentage(l, round),
		a: normalizeAlpha(a),
	};
};

export const clampHsv = (
	{ h, s, v, a }: Colors.AnyHsv,
	round = false,
): Colors.Hsv => {
	return {
		h: normalizeDegrees(h, round),
		s: normalizePercentage(s, round),
		v: normalizePercentage(v, round),
		a: normalizeAlpha(a),
	};
};

export const clampRgb = (
	{ r, g, b, a }: Colors.AnyRgb,
	round = false,
): Colors.Rgb => {
	return {
		r: normalize8Bit(r, round),
		g: normalize8Bit(g, round),
		b: normalize8Bit(b, round),
		a: normalizeAlpha(a),
	};
};
