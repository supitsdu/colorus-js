import { chHsl, regexHsl } from "../patterns";
import { ColorParser } from "../processing/colorParser";
import { hslToRgb } from "../processing/interconversions";
import type { Colors } from "../types";
import { clampHsl } from "../utils/clampColorHelpers";

export const hslParser = new ColorParser({
	model: "hsl",
	extract: match =>
		({
			h: match[0],
			s: match[1],
			l: match[2],
			a: match[3],
		}) as Colors.Hsl,
	serialize: hslToRgb,
	clamp: clampHsl,
	regex: regexHsl,
	channels: chHsl,
});
