import { hslToRgb, rgbToHsl } from "../../src/processing/interconversions";
import { hslToRgbCases } from "./cases/hslToRgbCases";
import { rgbToHslCases } from "./cases/rgbToHslCases";
import { runColorConversionTests } from "./conversionsTestHelpers";

describe("rgbToHsl", () => {
	runColorConversionTests(
		rgbToHslCases,
		rgbToHsl,
		input => `converts RGB ${JSON.stringify(input)} to HSV`,
	);
});

describe("hslToRgb", () => {
	runColorConversionTests(
		hslToRgbCases,
		hslToRgb,
		input => `converts RGB ${JSON.stringify(input)} to HSV`,
	);
});
