import type { Colors } from "../types";
import {
	convertHslToHsv,
	convertHsvToHsl,
	convertHsvToRgb,
	convertRgbToHsv,
} from "./conversions";

export const rgbToHsl = (color: Colors.Rgb, round = false): Colors.Hsl => {
	return convertHsvToHsl(convertRgbToHsv(color), round);
};

export const hslToRgb = (color: Colors.Hsl, round = false): Colors.Rgb => {
	return convertHsvToRgb(convertHslToHsv(color), round);
};
