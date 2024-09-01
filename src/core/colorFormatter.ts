import { Round } from "./colorNormalizer";

import type { FormatOptions, Cmyk, Hsl, Hsv, Rgb } from "../types";

interface FormatPrefs {
	spacer: string;
	percent: string;
	suffix: (a?: number) => string;
	alpha: (a?: number) => string;
}

const processFormatOptions = ({
	minify,
	cssNext,
}: FormatOptions = {}): FormatPrefs => {
	const space = !minify ? " " : "";
	const alphaSpacer = cssNext ? `${space}/${space}` : `,${space}`;

	return {
		spacer: cssNext ? " " : `,${space}`,
		percent: !minify ? "%" : "",
		suffix: (a?: number) => (a === 1 || cssNext ? "" : "a"),
		alpha: (a?: number) => (a === 1 ? "" : `${alphaSpacer}${a}`),
	};
};

export default {
	/**
	 * Converts an RGB Object into its string representation.
	 * @param input An valid RGB object.
	 * @returns an color string supported by CSS and other styling tools.
	 */
	rgb(input: Rgb, options?: FormatOptions) {
		const { r, g, b, a } = Round.rgb(input);
		const { suffix, spacer, alpha } = processFormatOptions(options);
		return `rgb${suffix(a)}(${r}${spacer}${g}${spacer}${b}${alpha(a)})`;
	},

	/**
	 * Converts an HSL Object into its string representation.
	 * @param input An valid HSL object.
	 * @returns a color string supported by CSS and other styling tools.
	 */
	hsl(input: Hsl, options?: FormatOptions): string {
		const { h, s, l, a } = Round.hsl(input);
		const { suffix, spacer, percent, alpha } = processFormatOptions(options);
		return `hsl${suffix(a)}(${h}${spacer}${s}${percent}${spacer}${l}${percent}${alpha(a)})`;
	},

	/**
	 * Converts an HSV Object into its string representation.
	 * @param input An valid HSV object.
	 * @returns a color string supported by CSS and other styling tools.
	 */
	hsv(input: Hsv, options?: FormatOptions): string {
		const { h, s, v, a } = Round.hsv(input);
		const { suffix, spacer, percent, alpha } = processFormatOptions(options);
		return `hsv${suffix(a)}(${h}${spacer}${s}${percent}${spacer}${v}${percent}${alpha(a)})`;
	},

	/**
	 * Converts an CMYK Object into its string representation.
	 * @param input An valid CMYK object.
	 * @returns a color string supported by CSS and other styling tools.
	 */
	cmyk(input: Cmyk, options?: FormatOptions): string {
		const { c, m, k, y, a } = Round.cmyk(input);
		const { suffix, spacer, percent, alpha } = processFormatOptions(options);
		return `cmyk${suffix(a)}(${c}${percent}${spacer}${m}${percent}${spacer}${y}${percent}${spacer}${k}${percent}${alpha(a)})`;
	},
};
