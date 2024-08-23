import type { AnyRgb } from "../types";

/**
 * Check if an HEX color is shortanable by comparing the RgbColor components.
 * @param r the red channel component of RgbColor color
 * @param g the green channel component of RgbColor color
 * @param b the blue channel component of RgbColor color
 * @param a the alpha channel component of RGBA color
 */
export const isRgbShortanable = (
	r: number,
	g: number,
	b: number,
	a = 255,
): boolean => !(r % 17 !== 0 || g % 17 !== 0 || b % 17 !== 0 || a % 17 !== 0);

/**
 * Calculates the Euclidean distance between two RgbColor colors.
 * @param primary - The first RgbColor color string.
 * @param secondary - The second RgbColor color string.
 */
export const computeColorDistance = (
	{ r: r1, g: g1, b: b1 }: AnyRgb,
	{ r: r2, g: g2, b: b2 }: AnyRgb,
): number => Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);

interface ComputeHsvHueParams {
	segment: number;
	maxRgb: number;
	minRgb: number;
}

/**
 * Calculates the hue component of an HsvColor color object.
 * @param rgb - An RgbColor color object.
 * @param params - Parameters including segment, maxRgb, and minRgb.
 */
export function computeHsvHue(
	{ r, g, b }: AnyRgb,
	{ segment, maxRgb, minRgb }: ComputeHsvHueParams,
): number {
	let h = 0;

	if (segment === h) return h;

	const delta = maxRgb - minRgb;
	const rDelta = (r - minRgb) / delta;
	const gDelta = (g - minRgb) / delta;
	const bDelta = (b - minRgb) / delta;

	// Calculate hue based on which color component is the max
	if (r === maxRgb) {
		h = (60 * (gDelta - bDelta)) % 360;
	} else if (g === maxRgb) {
		h = 60 * (bDelta - rDelta) + 120;
	} else {
		h = 60 * (rDelta - gDelta) + 240;
	}

	// Ensure hue is within [0, 360)
	if (h < 0) {
		h += 360;
	}

	return h;
}
