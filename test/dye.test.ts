import { dye } from "../src/dye";

import { forEachColorFormat, forEachMethod, testColors } from "./__fixtures__";

describe("dye Function", () => {
	describe("Error Handling", () => {
		it("should throw an error for invalid input", () => {
			expect(() => dye("invalid color")).toThrow(TypeError);
			// @ts-expect-error Should ignore error for invalid color format
			expect(() => dye({ x: 10, y: 20 })).toThrow(TypeError);
		});
	});

	describe("Color Instance Properties and Methods", () => {
		it("should calculate luminance correctly", () => {
			const color = dye("#ff0000");
			expect(color.luminance).toBeCloseTo(0.2126);
		});

		describe("Object Representations (Conversions)", () => {
			forEachMethod(
				"should make the Color.%s() getter public",
				method => {
					const color = testColors[method].white;
					const result = dye(color.string);

					expect(result[method]).toEqual(color.object);
				},
				["rgb", "hsl", "hsv", "cmyk"],
			);
		});

		describe("String Representations (Conversions)", () => {
			const methods = {
				toRgb: "rgb",
				toHsl: "hsl",
				toHsv: "hsv",
				toCmyk: "cmyk",
			};
			forEachMethod(
				"should make the Color.%s() getter public",
				method => {
					const color = testColors[methods[method]].white;
					const result = dye(color.object);

					expect(result[method]()).toEqual(color.string);
				},
				["toRgb", "toHsl", "toHsv", "toCmyk"],
			);
		});

		describe("Named Colors (Conversions)", () => {
			forEachColorFormat(
				"should convert from %s to named color",
				(_, color) => {
					const result = dye(color.string);
					expect(result.toNamed()).toBe(color.colorName);
				},
				["hex", "rgb", "hsl", "hsv", "cmyk"],
			);
		});

		describe("Adjustments Methods", () => {
			forEachMethod(
				"should make the Color.%s() method public",
				method => {
					const color = dye("#fff");
					expect(color).toHaveProperty(method);
				},
				[
					"lighten",
					"darken",
					"saturate",
					"desaturate",
					"hue",
					"alpha",
					"contrastRatio",
				],
			);
		});
	});

	describe("Color Instance Creation", () => {
		describe("Object Type", () => {
			forEachColorFormat(
				"should create a Color instance from a %s string",
				(format, color, expectedRgb) => {
					const instance = dye(color.object);

					expect(instance.isValid).toBeTruthy();
					expect(instance.format).toBe(format);
					expect(instance.originalInput).toBe(color.object);
					expect(instance.value).toEqual(expectedRgb);
				},
				["rgb", "hsl", "hsv", "cmyk"],
			);
		});

		describe("String Type", () => {
			forEachColorFormat(
				"should create a Color instance from a %s string",
				(format, color, expectedRgb) => {
					const instance = dye(color.string);

					expect(instance.isValid).toBeTruthy();
					expect(instance.format).toBe(format);
					expect(instance.originalInput).toBe(color.string);
					expect(instance.value).toEqual(expectedRgb);
				},
				["hex", "rgb", "hsl", "hsv", "cmyk"],
			);
		});
	});

	describe("Plugin Functionality", () => {
		forEachColorFormat(
			"should add a plugin for a %s string Color instance",
			(_, color) => {
				const result = dye(color.string, {
					plugins: {
						getHue: function () {
							return this.hsl.h;
						},
					},
				});

				expect(result).toHaveProperty("getHue");
				expect(typeof result.getHue).toBe("function");
			},
			["hex", "rgb", "hsl", "hsv", "cmyk"],
		);

		it("should allow the plugin method to access the Colorus instance data", () => {
			const color = dye("rgb(20, 120, 80)", {
				plugins: {
					getHue: function () {
						return this.hsl.h;
					},
				},
			});

			expect(color.getHue()).toBe(156);
		});

		it("should handle multiple plugin methods", () => {
			const color = dye("#FF0000", {
				plugins: {
					getHue: function () {
						return this.hsl.h;
					},
					isRed: function () {
						return this.rgb.r === 255 && this.rgb.g === 0 && this.rgb.b === 0;
					},
				},
			});

			expect(color.getHue()).toBe(0);
			expect(color.isRed()).toBeTruthy();
		});
	});
});
