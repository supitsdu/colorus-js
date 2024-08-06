import { parseColor } from "../colorParser";
import { cmykToRgb } from "../conversions/cmykConversions";
import { hslToRgb } from "../conversions/hslConversions";
import { hsvToRgb } from "../conversions/hsvConversions";
import { isNotObject } from "../helpers";
import type {
	AnyColorData,
	ColorConverters,
	ColorData,
	ColorObject,
} from "../types";
import { Clamp } from "./colorNormalizer";
import { determineColorType } from "./colorTypeAnalyzer";

export const fallbackColor: ColorData = {
	colorType: undefined,
	colorObject: { r: 0, g: 0, b: 0, a: 1 },
};

const converters: ColorConverters = {
	rgb: input => Clamp.rgb(input),
	hsl: input => hslToRgb(Clamp.hsl(input)),
	hsv: input => hsvToRgb(Clamp.hsv(input)),
	cmyk: input => cmykToRgb(Clamp.cmyk(input)),
};

/**
 * Converts a color object to a standardized format (RgbColor).
 *
 * @param input - The input color object or `AnyColorData`.
 * @returns The standardized `ColorData` with the color represented in RgbColor format.
 */
export function fromObject(
	input?: AnyColorData | ColorObject | null,
): ColorData | null {
	if (input == null) return null;

	let colorType: ColorData["colorType"];
	let colorObject: ColorObject | undefined;

	if ("colorType" in input && "colorObject" in input) {
		// Input is AnyColorData
		colorType = input.colorType;
		colorObject = input.colorObject;
	} else {
		// Input is AnyColorObject
		colorType = determineColorType(input as ColorObject);
		colorObject = input as ColorObject;
	}

	const colorTypeFromObject = determineColorType(colorObject);

	if (!colorTypeFromObject || !Object.hasOwn(converters, colorTypeFromObject)) {
		return null;
	}

	return {
		colorType, // Always return 'rgb' as the color type
		colorObject: converters[colorTypeFromObject](colorObject as ColorObject), // Explicit type assertion and ensure RgbColor output
	};
}

/**
 * Attemps to serializes an color input to a standardized color object.
 * @param input - The input color string or object.
 * @throws If the input is not a valid color string or object.
 */
export function processColorInput(
	input?: unknown | string | ColorObject | ColorData,
): ColorData {
	if (typeof input === "undefined") {
		return fallbackColor;
	}

	let colorData: ColorData | null;

	if (typeof input === "string") {
		colorData = fromObject(parseColor(input));

		if (colorData == null) {
			throw new TypeError(`Invalid color string: ${input}`);
		}
	}

	if (!isNotObject(input)) {
		colorData = fromObject(input);

		if (colorData == null) {
			throw new TypeError(`Invalid color object: ${input}`);
		}
	}

	throw new TypeError(
		"Invalid color type, expected and valid color string or object.",
	);
}
