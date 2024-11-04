import type { Colors } from "../types";
import { formatDecimal } from "./colorUtils";

/**
 * Calculate the relative luminance of an sRGB color.
 * @param color - An object containing the sRGB components of the color.
 * @return The luminance value of the color.
 */
export const relativeLuminance = ({ r, g, b }: Colors.Rgb): number => {
	const fn = (c: number) => {
		const d = c / 255;
		return d <= 0.03928 ? d / 12.92 : ((d + 0.055) / 1.055) ** 2.4;
	};

	return formatDecimal(fn(r) * 0.2126 + fn(g) * 0.7152 + fn(b) * 0.0722);
};
