import { Clamp } from "../core/colorNormalizer";
import type { HslColor, HsvColor, RgbColor } from "../types";
import { hsvToRgb } from "./hsvConversions";

/**
 * Converts an HslColor color to its HsvColor representation.
 * @param {object} hsl - An HslColor color object.
 * @return {object} - An HsvColor color object representation.
 */
export function hslToHsv({ h, s, l, a = 1 }: HslColor): HsvColor {
	const deltaS = (s * (l < 50 ? l : 100 - l)) / 100;
	const v = l + deltaS;

	const S = deltaS > 0 ? ((2 * deltaS) / (l + deltaS)) * 100 : 0;

	return Clamp.hsv({ h, s: S, v, a });
}

/**
 * Converts HslColor color object into its RgbColor representation using HsvColor interconversion.
 * @param {object} input - An HslColor color object.
 * @return {object} An RgbColor color object representation.
 */
export function hslToRgb({ h, s, l, a = 1 }: HslColor): RgbColor {
	return hsvToRgb(hslToHsv({ h, s, l, a }));
}
