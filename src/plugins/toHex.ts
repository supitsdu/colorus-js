import { convertRgbToHex } from "../processing/conversions";
import type { Colors } from "../types";
import { createPlugin } from "../utils/pluginHelpers";

export const isRgbShortanable = ({ r, g, b, a = 1 }: Colors.Rgb): boolean =>
	!(r % 17 !== 0 || g % 17 !== 0 || b % 17 !== 0 || (a * 255) % 17 !== 0);

export const toHex = createPlugin("toHex", function () {
	const { minify } = this.options?.formatOptions || {};

	const hex = convertRgbToHex(this.rgb);

	if (minify && isRgbShortanable(this.rgb)) {
		return `#${hex.slice(1).replace(/(.)\1/g, "$1")}`;
	}

	return hex;
});
