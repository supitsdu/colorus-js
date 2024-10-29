import { chCmyk, regexCmyk } from "../patterns";
import { ColorParser } from "../processing/colorParser";
import { convertCmykToRgb } from "../processing/conversions";
import type { Colors } from "../types";
import { clampCmyk } from "../utils/clampColorHelpers";

export const cmykParser = new ColorParser({
	model: "cmyk",
	extract: match =>
		({
			c: match[0],
			m: match[1],
			y: match[2],
			k: match[3],
			a: match[4],
		}) as Colors.Cmyk,
	serialize: convertCmykToRgb,
	clamp: clampCmyk,
	regex: regexCmyk,
	channels: chCmyk,
});
