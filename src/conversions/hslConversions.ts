import { Clamp } from "../core/colorNormalizer";
import type { Hsl, Hsv, Rgb } from "../types";
import { hsvToRgb } from "./hsvConversions";

/**
 * Converts an Hsl color to its Hsv representation.
 * @param {object} hsl - An Hsl color object.
 * @return {object} - An Hsv color object representation.
 */
export function hslToHsv({ h, s, l, a = 1 }: Hsl): Hsv {
	const deltaS = (s * (l < 50 ? l : 100 - l)) / 100;
	const v = l + deltaS;

	const S = deltaS > 0 ? ((2 * deltaS) / (l + deltaS)) * 100 : 0;

	return Clamp.hsv({ h, s: S, v, a });
}

/**
 * Converts Hsl color object into its Rgb representation using Hsv interconversion.
 * @param {object} input - An Hsl color object.
 * @return {object} An Rgb color object representation.
 */
export function hslToRgb({ h, s, l, a = 1 }: Hsl): Rgb {
	return hsvToRgb(hslToHsv({ h, s, l, a }));
}
