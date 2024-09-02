import { namedColorsMap } from "../constants/namedColors";
import { Clamp, Round, eightBit } from "../core/colorNormalizer";
import {
	computeColorDistance,
	computeHsvHue,
	isRgbShortanable,
} from "../core/conversionHelpers";
import { hexString } from "../helpers";
import type { Cmyk, FormatOptions, Hsl, Hsv, Rgb } from "../types";
import { hexToRgb } from "./hexConversions";
import { hsvToHsl } from "./hsvConversions";

/**
 * Converts Rgb values to the nearest CSS named color.
 * @param color - The Rgb color object.
 */
export function rgbToNamedColor({ r, g, b }: Rgb): string {
	let closestColor = "black";
	let shortestDistance = Number.POSITIVE_INFINITY;

	for (const [name, color] of Object.entries(namedColorsMap)) {
		const distance = computeColorDistance({ r, g, b }, hexToRgb(color));

		if (distance < shortestDistance) {
			shortestDistance = distance;
			closestColor = name;
		}
	}

	return closestColor;
}

/**
 * Converts Rgb color object to HEX color string.
 * @param rgb an valid Rgb color object
 * @param options options to  customize output format and precision
 * @param options.minify  set `true` for minified hexadecimal notation.
 */
export function rgbToHex(
	{ r, g, b, a = 1 }: Rgb,
	options?: FormatOptions,
): string {
	const { minify } = { minify: false, ...options };

	const { r: R, g: G, b: B, a: A } = Round.rgb({ r, g, b, a });

	const alphaInEightBit = eightBit(A * 255);

	let value = hexString((R << 16) | (G << 8) | B, 6);

	if (alphaInEightBit < 255) {
		const alphaHex = hexString(alphaInEightBit, 2);
		value += alphaHex;
	}

	if (minify && isRgbShortanable(R, G, B, alphaInEightBit)) {
		value = value.replace(/(.)\1/g, "$1");
	}

	return `#${value}`;
}

/**
 * Converts an Rgb color object into its Hsv representation.
 * @param {object} rgb - An Rgb color object.
 * @return {object} - An Hsv color object representation.
 */
export function rgbToHsv({ r, g, b, a = 1 }: Rgb): Hsv {
	const maxRgb = Math.max(r, g, b);
	const minRgb = Math.min(r, g, b);
	const segment = maxRgb - minRgb;

	const v = (maxRgb / 255) * 100;
	const s = (maxRgb > 0 ? segment / maxRgb : 0) * 100;
	const h = computeHsvHue({ r, g, b }, { segment, maxRgb, minRgb });

	return Clamp.hsv({ h, s, v, a });
}

/**
 * Converts an Rgb color object into its Cmyk representation.
 * @param {object} rgb - An Rgb color object.
 * @return {object} An Cmyk color object representation.
 */
export function rgbToCmyk({ r, g, b, a = 1 }: Rgb): Cmyk {
	const R = r / 255;
	const G = g / 255;
	const B = b / 255;

	const k = 1 - Math.max(R, G, B);
	const c = (1 - R - k) / (1 - k);
	const m = (1 - G - k) / (1 - k);
	const y = (1 - B - k) / (1 - k);

	return Clamp.cmyk({ c: c * 100, m: m * 100, y: y * 100, k: k * 100, a });
}

/**
 * Converts Rgb color object into its Hsl representation using Hsv interconversion.
 * @param {object} input - An Rgb color object.
 * @return {object} An Hsl color object representation.
 */
export function rgbToHsl({ r, g, b, a = 1 }: Rgb): Hsl {
	return hsvToHsl(rgbToHsv({ r, g, b, a }));
}
