import {
	determineColorType,
	execColorStringTest,
	isCmykObject,
	isColorData,
	isHslObject,
	isHsvObject,
	isRgbObject,
} from "../../src/core/colorTypeAnalyzer";
import { forEachColorFormat, testColors } from "../__fixtures__";

describe("Color Type Analyzis", () => {
	describe("Helper Functions", () => {
		describe("isColorData", () => {
			it("should return true for a valid color data object", () => {
				const colorData = { format: "hex", value: "#ff0000" };
				expect(isColorData(colorData)).toBeTruthy();
			});

			it('should return true for a color data object with "value" property', () => {
				const colorData = { value: "rgb(255, 0, 0)" };
				expect(isColorData(colorData)).toBeTruthy();
			});

			it('should return true for a color data object with "isValid" property', () => {
				const colorData = { isValid: true };
				expect(isColorData(colorData)).toBeTruthy();
			});

			it('should return true for a color data object with "originalInput" property', () => {
				const colorData = { originalInput: "hsl(360, 0, 100)" };
				expect(isColorData(colorData)).toBeTruthy();
			});

			it("should return false for an invalid color data object", () => {
				const colorData = { foo: "bar" };
				expect(isColorData(colorData)).toBeFalsy();
			});
		});

		describe("execColorStringTest", () => {
			describe("Handling Error", () => {
				it("should return null for an invalid color string", () => {
					const result = execColorStringTest("invalidcolor");
					expect(result).toBeNull();
				});

				it("should return null for an empty string", () => {
					const result = execColorStringTest("");
					expect(result).toBeNull();
				});
			});

			describe("Default Behavior", () => {
				forEachColorFormat(
					"should recognize %s color string",
					(format, color) => {
						color.object.a = undefined;

						const res = execColorStringTest(color.string);

						expect(res![0]).toBe(format);
						expect(res![1][0]).toEqual(color.string);
					},
					["cmyk", "hex", "hsl", "hsv", "rgb"],
				);
			});
		});
	});

	describe("Color Type Identification", () => {
		describe("determineColorType Function", () => {
			describe("Handling Error", () => {
				it("should return undefined for an invalid color object", () => {
					const invalidColor = { x: 10, y: 20 };
					expect(determineColorType(invalidColor)).toBeUndefined();
				});

				it("should return undefined for null or undefined input", () => {
					// @ts-expect-error
					expect(determineColorType(null)).toBeUndefined();
					expect(determineColorType(undefined)).toBeUndefined();
				});
			});

			describe("Default Behavior", () => {
				forEachColorFormat(
					"should identify %s color object",
					(format, color) => {
						expect(determineColorType(color.object)).toBe(format);
					},
					["rgb", "hsl", "hsv", "cmyk"],
				);
			});
		});

		describe("isRgbObject Function", () => {
			it("should return true for valid RGB color objects", () => {
				expect(isRgbObject(testColors.rgb.red.object)).toBeTruthy();
				expect(
					isRgbObject(testColors.withAlpha(testColors.rgb.red.object)),
				).toBeTruthy();
			});

			it("should return false for invalid RGB color objects", () => {
				expect(isRgbObject({ r: 255, g: 0 })).toBeFalsy();
				expect(isRgbObject({ r: "255", g: 0, b: 0 })).toBeFalsy();
				expect(isRgbObject({ h: 0, s: 100, l: 50 })).toBeFalsy();
			});
		});

		describe("isHslObject Function", () => {
			it("should return true for valid HSL color objects", () => {
				expect(isHslObject(testColors.hsl.red.object)).toBeTruthy();
				expect(
					isHslObject(testColors.withAlpha(testColors.hsl.red.object)),
				).toBeTruthy();
			});

			it("should return false for invalid HSL color objects", () => {
				expect(isHslObject({ h: 255, s: 0 })).toBeFalsy();
				expect(isHslObject({ h: "255", s: 0, l: 0 })).toBeFalsy();
				expect(isHslObject({ r: 0, g: 100, b: 50 })).toBeFalsy();
			});
		});

		describe("isHsvObject Function", () => {
			it("should return true for valid HSV color objects", () => {
				expect(isHsvObject(testColors.hsv.red.object)).toBeTruthy();
				expect(
					isHsvObject(testColors.withAlpha(testColors.hsv.red.object)),
				).toBeTruthy();
			});

			it("should return false for invalid HSV color objects", () => {
				expect(isHsvObject({ h: 255, s: 0 })).toBeFalsy();
				expect(isHsvObject({ h: "255", s: 0, v: 0 })).toBeFalsy();
				expect(isHsvObject({ r: 0, g: 100, b: 50 })).toBeFalsy();
			});
		});

		describe("isCmykObject Function", () => {
			it("should return true for valid CMYK color objects", () => {
				expect(isCmykObject(testColors.cmyk.aqua.object)).toBeTruthy();
				expect(
					isCmykObject(testColors.withAlpha(testColors.cmyk.aqua.object)),
				).toBeTruthy();
			});

			it("should return false for invalid CMYK color objects", () => {
				expect(isCmykObject({ c: 0, m: 100, y: 100 })).toBeFalsy();
				expect(isCmykObject({ c: "0", m: 100, y: 100, k: 0 })).toBeFalsy();
				expect(isCmykObject({ r: 0, g: 100, b: 50 })).toBeFalsy();
			});
		});
	});
});
