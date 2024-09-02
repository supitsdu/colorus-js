import type { Rgb } from "../types";

/**
 * Calculate the relative luminance of an sRGB color.
 * @param {object} color - An object containing the sRGB components of the color.
 * @return The luminance value of the color.
 */
export const relativeLuminance = ({ r, g, b }: Rgb): number => {
	const fn = (c: number) => {
		const d = c / 255;
		return d <= 0.03928 ? d / 12.92 : ((d + 0.055) / 1.055) ** 2.4;
	};

	return fn(r) * 0.2126 + fn(g) * 0.7152 + fn(b) * 0.0722;
};

/**
 * Calculate the contrast ratio between two relative luminance values.
 * @param L1 - The relative luminance of the lighter color.
 * @param L2 - The relative luminance of the darker color.
 * @return The contrast ratio between the two colors.
 */
export const calculateContrastRatio = (L1: number, L2: number): number =>
	(Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);

/**
 * Calculate the contrast ratio between a foreground color and its adjacent background.
 * @param fg - The sRGB color values of the foreground.
 * @param bg - The sRGB color values of the background.
 * @return The contrast ratio between the two colors.
 */
export const contrastRatio = (fg: Rgb, bg: Rgb) =>
	calculateContrastRatio(relativeLuminance(fg), relativeLuminance(bg));
