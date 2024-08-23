import { precision, utmost } from "../helpers";
import type { ColorNormalizers } from "../types";

type Helper = (
	value: string | number,
	fn?: (value: number) => number,
) => number;

export const degree: Helper = (value, fn = Math.round): number =>
	fn(utmost(value, 360)) || 0;

export const percent: Helper = (value, fn = Math.round): number =>
	fn(utmost(value, 100)) || 0;

export const eightBit: Helper = (value, fn = Math.round): number =>
	fn(utmost(value, 255)) || 0;

export const alpha: Helper = (value, fn = precision): number =>
	fn(utmost(value, 1)) || 0;

export const Round: ColorNormalizers = {
	fn: Math.round,

	rgb({ r, g, b, a = 1 }) {
		return {
			r: eightBit(r, this.fn),
			g: eightBit(g, this.fn),
			b: eightBit(b, this.fn),
			a: alpha(a),
		};
	},

	hsl({ h, s, l, a = 1 }) {
		return {
			h: degree(h, this.fn),
			s: percent(s, this.fn),
			l: percent(l, this.fn),
			a: alpha(a),
		};
	},

	hsv({ h, s, v, a = 1 }) {
		return {
			h: degree(h, this.fn),
			s: percent(s, this.fn),
			v: percent(v, this.fn),
			a: alpha(a),
		};
	},

	cmyk({ c, m, y, k, a = 1 }) {
		return {
			c: percent(c, this.fn),
			m: percent(m, this.fn),
			y: percent(y, this.fn),
			k: percent(k, this.fn),
			a: alpha(a),
		};
	},
};

export const Clamp: ColorNormalizers = Object.assign(Object.create(Round), {
	fn: precision,
});
