import { chRgb, regexRgb } from "../patterns";
import { ColorParser } from "../processing/colorParser";
import type { Colors } from "../types";
import { clampRgb } from "../utils/clampColorHelpers";

export const rgbParser = new ColorParser({
	model: "rgb",
	extract: match =>
		({
			r: match[0],
			g: match[1],
			b: match[2],
			a: match[3],
		}) as Colors.Rgb,
	serialize: rgb => rgb,
	clamp: clampRgb,
	regex: regexRgb,
	channels: chRgb,
});
