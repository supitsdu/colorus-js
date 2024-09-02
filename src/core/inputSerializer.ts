import { errorMessages } from "../constants/errorMessages";
import { cmykToRgb } from "../conversions/cmykConversions";
import { hslToRgb } from "../conversions/hslConversions";
import { hsvToRgb } from "../conversions/hsvConversions";
import { isObject, isString, isUndefined } from "../helpers";
import type {
	AnyColorData,
	ColorConverters,
	ColorData,
	ColorObject,
} from "../types";
import { Clamp } from "./colorNormalizer";
import { parseColor } from "./colorParser";
import { determineColorType, isColorData } from "./colorTypeAnalyzer";

export const fallbackColor: ColorData = {
	originalInput: undefined,
	isValid: false,
	value: { r: 0, g: 0, b: 0, a: 1 },
	format: undefined,
};

const converters: ColorConverters = {
	rgb: input => Clamp.rgb(input),
	hsl: input => hslToRgb(Clamp.hsl(input)),
	hsv: input => hsvToRgb(Clamp.hsv(input)),
	cmyk: input => cmykToRgb(Clamp.cmyk(input)),
};

/**
 * Converts a color object to a standardized format (Rgb).
 *
 * @param input - The input color object or `AnyColorData`.
 * @returns The standardized `ColorData` with the color represented in Rgb format.
 */
export function fromObject(
	input: AnyColorData | ColorObject | unknown | null,
): ColorData {
	if (!isObject(input)) {
		throw new TypeError(errorMessages.invalidColorType);
	}

	const hasData = isColorData(input);

	const value = hasData ? input.value : input;
	if (!value) {
		throw new TypeError(errorMessages.invalidColorType);
	}

	const originalInput = (
		hasData ? input.originalInput || value : value
	) as ColorObject;

	const colorTypeFromObject = determineColorType(value);
	if (!colorTypeFromObject || !Object.hasOwn(converters, colorTypeFromObject)) {
		throw new TypeError(errorMessages.invalidColorObject(value));
	}

	const format = hasData ? input.format : colorTypeFromObject;

	return {
		originalInput: originalInput,
		isValid: value !== undefined && format !== undefined,
		value: converters[colorTypeFromObject](value as ColorObject),
		format,
	};
}

/**
 * Processes a color input (string or object) and returns its standardized ColorData representation.
 *
 * @param input - The color input (string, color object, or undefined).
 * @returns The standardized ColorData representation of the input color.
 * @throws {TypeError} If the input is not a valid color string or object.
 */
export function processColorInput(
	input?: unknown | string | ColorObject | ColorData,
): ColorData {
	if (isString(input)) {
		const parsedColorData = parseColor(input);
		if (parsedColorData !== null) return fromObject(parsedColorData);

		throw new TypeError(errorMessages.invalidColorString(input));
	}

	if (isUndefined(input)) return fallbackColor;

	return fromObject(input);
}
