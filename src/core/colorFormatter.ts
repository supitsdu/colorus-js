import { Round } from "./colorNormalizer";

import type { ColorObject, FormatOptions } from "../types";

/**
 * A class for formatting color values into various CSS-compatible string representations.
 * ```
 * new ColorFormatter().rgb({ r: 63.74, g: 191.25, b: 63.74, a: 1 }) // 'rgb(64, 191, 64)'
 * ```
 */
export class ColorFormatter {
	// Private fields to store formatting settings
	private readonly spacer: string;
	private readonly percent: string;
	private readonly suffix: (a?: number) => string;
	private readonly alpha: (a?: number) => string;

	/**
	 * Constructs a ColorFormatter object.
	 * @param {FormatOptions} [options] - Options for formatting.
	 * @param {boolean} [options.minify=false] - Whether to minify the output.
	 * @param {boolean} [options.cssNext=false] - Whether to use CSSNext compatible formatting.
	 */
	constructor({ minify, cssNext }: FormatOptions = {}) {
		const space = !minify ? " " : "";
		const alphaSpacer = cssNext ? `${space}/${space}` : `,${space}`;

		// Set formatting options based on the provided options
		this.spacer = cssNext ? " " : `,${space}`;
		this.percent = !minify ? "%" : "";
		this.suffix = a => (a === 1 || cssNext ? "" : "a");
		this.alpha = a => (a === 1 ? "" : `${alphaSpacer}${a}`);
	}

	/**
	 * Converts an RGB Object into its string representation.
	 * @param input An valid RGB object.
	 * @returns an color string supported by CSS and other styling tools.
	 */
	rgb(input: ColorObject): string {
		const { r, g, b, a } = Round.rgb(input);
		return `rgb${this.suffix(a)}(${r}${this.spacer}${g}${this.spacer}${b}${this.alpha(a)})`;
	}

	/**
	 * Converts an HSL Object into its string representation.
	 * @param input An valid HSL object.
	 * @returns a color string supported by CSS and other styling tools.
	 */
	hsl(input: ColorObject): string {
		const { h, s, l, a } = Round.hsl(input);
		return `hsl${this.suffix(a)}(${h}${this.spacer}${s}${this.percent}${this.spacer}${l}${this.percent}${this.alpha(a)})`;
	}

	/**
	 * Converts an HSV Object into its string representation.
	 * @param input An valid HSV object.
	 * @returns a color string supported by CSS and other styling tools.
	 */
	hsv(input: ColorObject): string {
		const { h, s, v, a } = Round.hsv(input);
		return `hsv${this.suffix(a)}(${h}${this.spacer}${s}${this.percent}${this.spacer}${v}${this.percent}${this.alpha(a)})`;
	}

	/**
	 * Converts an CMYK Object into its string representation.
	 * @param input An valid CMYK object.
	 * @returns a color string supported by CSS and other styling tools.
	 */
	cmyk(input: ColorObject): string {
		const { c, m, k, y, a } = Round.cmyk(input);
		return `cmyk${this.suffix(a)}(${c}${this.percent}${this.spacer}${m}${this.percent}${this.spacer}${y}${this.percent}${this.spacer}${k}${this.percent}${this.alpha(a)})`;
	}
}
