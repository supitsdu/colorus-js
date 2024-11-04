import { regexHex } from "../patterns";
import { ColorParser } from "../processing/colorParser";
import { convertHexToRgb } from "../processing/conversions";

export const hexParser = new ColorParser({
	model: "hex",
	extract: match => match[0] as string,
	serialize: convertHexToRgb,
	regex: regexHex,
});
