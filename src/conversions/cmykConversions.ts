import { Clamp } from "../core/colorNormalizer";
import type { CmykColor, RgbColor } from "../types";

/**
 * Converts an CmykColor color object into its RgbColor representation.
 * @param {object} cmyk - An CmykColor color object.
 * @return {object} An RgbColor color object representation.
 */
export function cmykToRgb({ c, m, y, k, a = 1 }: CmykColor): RgbColor {
	c /= 100;
	m /= 100;
	y /= 100;
	k /= 100;

	const r = 255 * ((1 - c) * (1 - k));
	const g = 255 * ((1 - m) * (1 - k));
	const b = 255 * ((1 - y) * (1 - k));

	return Clamp.rgb({ r, g, b, a });
}
