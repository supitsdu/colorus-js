import {
	convertCmykToRgb,
	convertHexToRgb,
	convertHslToHsv,
	convertHsvToHsl,
	convertHsvToRgb,
	convertRgbToCmyk,
	convertRgbToHex,
	convertRgbToHsv,
} from "../../src/processing/conversions";
import { cmykToRgbCases } from "./cases/cmykToRgbCases";
import { hexToRgbCases } from "./cases/hexToRgbCases";
import { hslToHsvCases } from "./cases/hslToHsvCases";
import { hsvToHslCases } from "./cases/hsvToHslCases";
import { hsvToRgbCases } from "./cases/hsvToRgbCases";
import { rgbToCmykCases } from "./cases/rgbToCmykCases";
import { rgbToHexCases } from "./cases/rgbToHexCases";
import { rgbToHsvCases } from "./cases/rgbToHsvCases";
import { runColorConversionTests } from "./conversionsTestHelpers";

describe("Conversions", () => {
	describe("convertCmykToRgb", () => {
		runColorConversionTests(
			cmykToRgbCases,
			convertCmykToRgb,
			input => `converts CMYK ${JSON.stringify(input)} to RGB`,
		);
	});

	describe("convertHexToRgb", () => {
		runColorConversionTests(
			hexToRgbCases,
			convertHexToRgb,
			input => `converts HEX ${input} to RGB`,
		);
	});

	describe("convertHslToHsv", () => {
		runColorConversionTests(
			hslToHsvCases,
			convertHslToHsv,
			input => `converts HSL ${JSON.stringify(input)} to HSV`,
		);
	});

	describe("convertHsvToHsl", () => {
		runColorConversionTests(
			hsvToHslCases,
			convertHsvToHsl,
			input => `converts HSV ${JSON.stringify(input)} to HSL`,
		);
	});

	describe("convertHsvToRgb", () => {
		runColorConversionTests(
			hsvToRgbCases,
			convertHsvToRgb,
			input => `converts HSV ${JSON.stringify(input)} to RGB`,
		);
	});

	describe("convertRgbToCmyk", () => {
		runColorConversionTests(
			rgbToCmykCases,
			convertRgbToCmyk,
			input => `converts RGB ${JSON.stringify(input)} to CMYK`,
		);
	});

	describe("convertRgbToHex", () => {
		runColorConversionTests(
			rgbToHexCases,
			convertRgbToHex,
			input => `converts RGB ${JSON.stringify(input)} to HEX`,
			false,
		);
	});

	describe("convertRgbToHsv", () => {
		runColorConversionTests(
			rgbToHsvCases,
			convertRgbToHsv,
			input => `converts RGB ${JSON.stringify(input)} to HSV`,
		);
	});
});
