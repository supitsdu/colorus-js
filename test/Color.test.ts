import { Color, defineColor } from "../src/Color";

import { forEachColorFormat, forEachMethod, testColors } from "./__fixtures__";

describe("Color Class", () => {
	describe("Static Methods", () => {
		describe("Color.stringify", () => {
			forEachColorFormat(
				"should convert from %s object to its string representation",
				(_, color) => {
					const result = Color.stringify(color.object);
					expect(result).toBe(color.string);
				},
				["rgb", "hsl", "hsv", "cmyk"],
			);
		});

		describe("Color.parse", () => {
			forEachColorFormat(
				"should convert from %s string to its object representation",
				(_, color) => {
					const result = Color.parse(color.string);
					expect(result).toEqual(color.object);
				},
				["hex", "rgb", "hsl", "hsv", "cmyk"],
			);
		});
	});
});

describe("defineColor Function", () => {
	describe("Error Handling", () => {
		it("should throw an error for invalid input", () => {
			expect(() => defineColor("invalid color")).toThrow(TypeError);
			// @ts-expect-error Should ignore error for invalid color format
			expect(() => defineColor({ x: 10, y: 20 })).toThrow(TypeError);
		});
	});

	describe("Color Instance Properties and Methods", () => {
		it("should calculate luminance correctly", () => {
			const color = defineColor("#ff0000");
			expect(color.luminance).toBeCloseTo(0.2126);
		});

		describe("Object Representations (Conversions)", () => {
			forEachMethod(
				"should make the Color.%s() getter public",
				method => {
					const color = testColors[method].white;
					const result = defineColor(color.string);

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
					const result = defineColor(color.object);

					expect(result[method]()).toEqual(color.string);
				},
				["toRgb", "toHsl", "toHsv", "toCmyk"],
			);
		});

		describe("Named Colors (Conversions)", () => {
			forEachColorFormat(
				"should convert from %s to named color",
				(_, color) => {
					const result = defineColor(color.string);
					expect(result.toNamed()).toBe(color.colorName);
				},
				["hex", "rgb", "hsl", "hsv", "cmyk"],
			);
		});

		describe("Adjustments Methods", () => {
			forEachMethod(
				"should make the Color.%s() method public",
				method => {
					const color = defineColor("#fff");
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
					const instance = defineColor(color.object);

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
					const instance = defineColor(color.string);

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
				const result = defineColor(color.string, {
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
			const color = defineColor("rgb(20, 120, 80)", {
				plugins: {
					getHue: function () {
						return this.hsl.h;
					},
				},
			});

			expect(color.getHue()).toBe(156);
		});

		it("should handle multiple plugin methods", () => {
			const color = defineColor("#FF0000", {
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
