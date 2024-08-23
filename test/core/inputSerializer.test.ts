import {
	processColorInput,
	fallbackColor,
	fromObject,
} from "../../src/core/inputSerializer";
import type { AnyObject, ColorData } from "../../src/types";
import { forEachColorFormat, testColors } from "../__fixtures__";

describe("Color Input Processing", () => {
	describe("fromObject Helper", () => {
		describe("Error Handling", () => {
			it("should throw error for null or undefined input", () => {
				expect(() => fromObject(null)).toThrow();
				expect(() => fromObject(undefined)).toThrow();
			});

			it("should throw error for unsupported color types", () => {
				const input: AnyObject = { x: 100, y: 200 }; // Unsupported color type
				expect(() => fromObject(input)).toThrow();
			});
		});
	});

	describe("processColorInput Function", () => {
		describe("Error Handling", () => {
			it("should throw TypeError for invalid color strings", () => {
				const input = "invalid color";
				expect(() => processColorInput(input)).toThrow(TypeError);
			});

			it("should throw TypeError for invalid color objects", () => {
				const input: AnyObject = { x: 100, y: 200 };
				expect(() => processColorInput(input)).toThrow(TypeError);
			});
		});

		describe("Default Behavior", () => {
			it("should return fallbackColor for undefined input", () => {
				expect(processColorInput(undefined)).toEqual(fallbackColor);
			});

			it("should handle ColorData input and return the same ColorData", () => {
				const input = {
					isValid: true,
					format: "rgb",
					value: testColors.rgb.white.object,
				};

				const expectedOutput = {
					originalInput: input.value,
					isValid: true,
					value: input.value,
					format: input.format,
				};

				expect(processColorInput(input)).toEqual(expectedOutput);
			});
		});

		describe("Color Conversions", () => {
			describe("Object Type Conversions", () => {
				forEachColorFormat(
					"should handle valid %s color object",
					(format, color, expectedRgb) => {
						const result = processColorInput(color.object);

						expect(result.format).toBe(format);
						expect(result.isValid).toBeTruthy();
						expect(result.value).toEqual(expectedRgb);
						expect(result.originalInput).toEqual(color.object);
					},
					["rgb", "hsl", "hsv", "cmyk"],
				);
			});

			describe("String Type Conversions", () => {
				forEachColorFormat(
					"should handle valid %s color strings",
					(format, color, expectedRgb) => {
						const result = processColorInput(color.string);

						expect(result.format).toBe(format);
						expect(result.isValid).toBeTruthy();
						expect(result.value).toEqual(expectedRgb);
						expect(result.originalInput).toEqual(color.string);
					},
					["hex", "rgb", "hsl", "hsv", "cmyk"],
				);
			});
		});
	});
});
