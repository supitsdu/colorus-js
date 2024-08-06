import { Round } from "./core/colorNormalizer";

import type {
	CmykColor,
	FormatOptions,
	HslColor,
	HsvColor,
	RgbColor,
} from "./types";

export class ColorFormatter {
	private readonly spacer: string;
	private readonly percent: string;
	private readonly degree: string;
	private readonly suffix: (a?: number) => string;
	private readonly alpha: (a?: number) => string;

	constructor({ minify, cssNext }: FormatOptions = {}) {
		const space = minify !== true ? " " : "";
		const alphaSpacer = cssNext === true ? `${space}/${space}` : `,${space}`;

		this.spacer = cssNext === true ? " " : `,${space}`;
		this.percent = minify !== true ? "%" : "";
		this.degree = minify !== true ? "°" : "";
		this.suffix = a => (a === 1 || cssNext === true ? "" : "a");
		this.alpha = a => (a === 1 ? "" : `${alphaSpacer}${a}`);
	}

	rgb(input: RgbColor): string {
		const { r, g, b, a } = Round.rgb(input);
		return `rgb${this.suffix(a)}(${r}${this.spacer}${g}${this.spacer}${b}${this.alpha(a)})`;
	}

	hsl(input: HslColor): string {
		const { h, s, l, a } = Round.hsl(input);
		return `hsl${this.suffix(a)}(${h}${this.degree}${this.spacer}${s}${this.percent}${this.spacer}${l}${this.percent}${this.alpha(a)})`;
	}

	hsv(input: HsvColor): string {
		const { h, s, v, a } = Round.hsv(input);
		return `hsv${this.suffix(a)}(${h}${this.degree}${this.spacer}${s}${this.percent}${this.spacer}${v}${this.percent}${this.alpha(a)})`;
	}

	cmyk(input: CmykColor): string {
		const { c, m, k, y, a } = Round.cmyk(input);
		return `cmyk${this.suffix(a)}(${c}${this.percent}${this.spacer}${m}${this.percent}${this.spacer}${y}${this.percent}${this.spacer}${k}${this.percent}${this.alpha(a)})`;
	}
}
