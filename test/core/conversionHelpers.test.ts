import {
	computeColorDistance,
	computeHsvHue,
	isRgbShortanable,
} from "../../src/core/conversionHelpers";
import { testColors } from "../__fixtures__";

const { red, brown, blue, aqua, lime, white, black } = testColors.rgb;

describe("Conversion Helper Functions", () => {
	describe("Color String Shortening", () => {
		describe("isRgbShortanable Function", () => {
			it("should return false for non-shortenable RGB colors", () => {
				expect(isRgbShortanable(128, 128, 128)).toBeFalsy();
				expect(isRgbShortanable(34, 128, 17)).toBeFalsy();
				expect(isRgbShortanable(17, 34, 170, 150)).toBeFalsy();
			});

			it("should return true for shortenable RGB colors", () => {
				expect(isRgbShortanable(34, 51, 17)).toBeTruthy();
				expect(isRgbShortanable(0, 170, 187)).toBeTruthy();
				expect(isRgbShortanable(255, 0, 0)).toBeTruthy();
				expect(isRgbShortanable(0, 255, 0)).toBeTruthy();
				expect(isRgbShortanable(0, 0, 255)).toBeTruthy();
				expect(isRgbShortanable(17, 34, 170, 153)).toBeTruthy();
			});

			it("should handle the default alpha value of 255", () => {
				expect(isRgbShortanable(34, 51, 17)).toBeTruthy();
			});
		});
	});

	describe("Color Distance Calculation", () => {
		describe("computeColorDistance function", () => {
			it("should calculate the distance between two identical colors as 0", () => {
				expect(computeColorDistance(red.object, red.object)).toBe(0);
			});

			it("should calculate the distance between black and white", () => {
				// Euclidean distance in 3D space: sqrt((255-0)^2 + (255-0)^2 + (255-0)^2) = sqrt(3*255^2) = 441.67
				expect(computeColorDistance(black.object, white.object)).toBeCloseTo(
					441.67,
					2,
				);
			});

			it("should calculate the distance between two similar colors", () => {
				expect(computeColorDistance(red.object, brown.object)).toBeCloseTo(
					107.83,
					1,
				);
			});

			it("should handle colors with alpha values (ignoring alpha)", () => {
				const redWithAlpha = { ...red.object, a: 0.65 };
				expect(computeColorDistance(red.object, redWithAlpha)).toBe(0);
			});
		});
	});

	describe("HSV Hue Calculation", () => {
		describe("computeHsvHue function", () => {
			it("should return 0 when segment is 0", () => {
				const params = { segment: 0, maxRgb: 255, minRgb: 255 };
				expect(computeHsvHue(white.object, params)).toBe(0);
			});

			it("should calculate hue correctly when red is max", () => {
				const params = { segment: 255, maxRgb: 255, minRgb: 0 };
				expect(computeHsvHue(red.object, params)).toBe(0);
			});

			it("should calculate hue correctly when green is max", () => {
				const params = { segment: 255, maxRgb: 255, minRgb: 0 };
				expect(computeHsvHue(lime.object, params)).toBe(120);
			});

			it("should calculate hue correctly when blue is max", () => {
				const params = { segment: 255, maxRgb: 255, minRgb: 0 };
				expect(computeHsvHue(blue.object, params)).toBe(240);
			});

			it("should handle intermediate colors", () => {
				const params = { segment: 128, maxRgb: 128, minRgb: 0 };
				expect(computeHsvHue(brown.object, params)).toBeCloseTo(297.65, 1);
			});

			it("should normalize negative hue values", () => {
				const params = { segment: 255, maxRgb: 255, minRgb: 0 };
				const expectedHue = 180;
				expect(computeHsvHue(aqua.object, params)).toBe(expectedHue);
			});
		});
	});
});
