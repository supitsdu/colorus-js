import { Clamp } from "../core/colorNormalizer";
import type { AnyObject, Rgb } from "../types";

/**
 * Converts a HEX color into an Rgb color object representation.
 * @param hex - A valid HEX color without the hashtag  "#". The alpha  channel is optional.
 */
export function hexToRgb(hex: string): Rgb {
	const delta = Number.parseInt(hex, 16);
	const value: AnyObject = {};

	if (hex.length === 6) {
		value.r = (delta >> 16) & 255;
		value.g = (delta >> 8) & 255;
		value.b = delta & 255;
		value.a = 1;
	} else {
		value.r = (delta >> 24) & 255;
		value.g = (delta >> 16) & 255;
		value.b = (delta >> 8) & 255;
		value.a = (delta & 255) / 255;
	}

	return Clamp.rgb(value);
}
