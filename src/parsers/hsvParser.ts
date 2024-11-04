import { chHsv, regexHsv } from "../patterns";
import { ColorParser } from "../processing/colorParser";
import { convertHsvToRgb } from "../processing/conversions";
import type { Colors } from "../types";
import { clampHsv } from "../utils/clampColorHelpers";

export const hsvParser = new ColorParser({
	model: "hsv",
	extract: match =>
		({
			h: match[0],
			s: match[1],
			v: match[2],
			a: match[3],
		}) as Colors.Hsv,
	serialize: convertHsvToRgb,
	clamp: clampHsv,
	regex: regexHsv,
	channels: chHsv,
});
