import {
	type Dye,
	createPlugin,
	dye,
	hslParser,
	lighten,
	saturate,
	toHsl,
	toHsv,
	toRgb,
} from "../src/main";

const redColor = { r: 255, g: 0, b: 0, a: 1 };
const blackColor = { r: 0, g: 0, b: 0, a: 1 };
const whiteColor = { r: 255, g: 255, b: 255, a: 1 };
const invalidColorString = "invalid color";
const invalidRgbObject = { r: 300, g: -20, b: "invalid" };
const invalidRgbString = "rgb(300, -20, invalid)";
const hslColorString = "hsl(0, 60%, 50%)";
const customHslInput = "hsl(0, 100%, 50%)";
const customPluginColor = "rgb(255, 0, 0)";
const chainColor = { r: 128, g: 100, b: 100, a: 1 };
const expectedResults = {
	lightenedColor: { r: 140.81, g: 110.02, b: 110.02, a: 1 },
	saturatedColor: { r: 129.41, g: 98.61, b: 98.61, a: 1 },
	lightenedAndSaturatedColor: { r: 142.34, g: 108.46, b: 108.46, a: 1 },
};

describe("dye function", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("Color Calculations", () => {
		it("should calculate the correct luminance for a given color", () => {
			expect(dye(redColor).luminance).toBe(0.21); // Luminance for red
			expect(dye(blackColor).luminance).toBe(0);
			expect(dye(whiteColor).luminance).toBe(1);
		});

		it("should calculate the correct HSL values for a given color", () => {
			expect(dye(redColor).hsl).toEqual({ h: 0, s: 100, l: 50, a: 1 });
		});

		it("should calculate the correct HSV values for a given color", () => {
			const color = dye(redColor);
			expect(color.hsv).toEqual({ h: 0, s: 100, v: 100, a: 1 });
		});

		it("should calculate the correct CMYK values for a given color", () => {
			const color = dye(redColor);
			expect(color.cmyk).toEqual({ c: 0, m: 100, y: 100, k: 0, a: 1 });
		});

		it("should return the correct RGB values for a given color", () => {
			const color = dye(redColor);
			expect(color.rgb).toEqual({ r: 255, g: 0, b: 0, a: 1 });
		});

		it("should return the correct alpha value for a given color", () => {
			const color = dye("rgb(255, 0, 0, 0.5)");
			expect(color.alpha).toBe(0.5);
		});

		it("should return the correct hue value for a given color", () => {
			const color = dye(
				{ h: 243, s: 50, l: 30, a: 1 },
				{ parsers: [hslParser] },
			);
			expect(color.hue).toBe(243);
		});
	});

	describe("Error Handling", () => {
		it("should return an error object when the color string parsing fails", () => {
			const invalidColor = dye(invalidColorString);
			expect(invalidColor.error?.message).toMatch(
				"Failed to parse color input:",
			);
		});

		it("should handle non-object type input types gracefully", () => {
			const color = dye([] as unknown as string);
			expect(color.error?.message).toMatch("Failed to parse color input:");
		});

		it("should handle null input gracefully", () => {
			const color = dye(null as unknown as string);
			expect(color.error?.message).toMatch("No color input provided");
		});

		it("should handle undefined input gracefully", () => {
			const color = dye(undefined as unknown as string);
			expect(color.error?.message).toMatch("No color input provided");
		});

		it("should handle empty string input gracefully", () => {
			const color = dye("");
			expect(color.error?.message).toMatch("No color input provided");
		});

		it("should handle non-string and non-object input gracefully", () => {
			// @ts-expect-error Testing invalid input
			const color = dye(123);
			expect(color.error?.message).toMatch("Failed to parse color input:");
		});

		it("should handle invalid RGB object input gracefully", () => {
			const color = dye(invalidRgbObject as unknown as string);
			expect(color.error?.message).toMatch("Failed to parse color input:");
		});

		it("should handle invalid color format gracefully", () => {
			const color = dye(invalidRgbString);
			expect(color.error?.message).toMatch("Failed to parse color input:");
		});

		it("should handle known color format without parsers gracefully", () => {
			const color = dye(hslColorString);
			expect(color.error?.message).toMatch("Failed to parse color input:");
		});
	});

	describe("Custom Parsers", () => {
		it("should use custom parsers correctly", () => {
			const result = dye(customHslInput, { parsers: [hslParser] });

			expect(result.source).toEqual({
				value: { h: "0", s: "100", l: "50", a: undefined },
				model: "hsl",
				isValid: true,
			});
			expect(result.rgb).toEqual({ r: 255, g: 0, b: 0, a: 1 });
		});
	});

	describe("Custom Plugins", () => {
		it("should expose custom plugins correctly", () => {
			const customPlugin = createPlugin("customPlugin", function () {
				return `Custom plugin called with color: ${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}`;
			});

			const color = dye(customPluginColor, {
				plugins: { customPlugin },
			});

			expect(color.customPlugin()).toBe(
				"Custom plugin called with color: 255, 0, 0",
			);
		});
	});

	describe("Chaining Plugin Functions", () => {
		const chain = createPlugin("chain", function () {
			return dye(this.rgb, this.options);
		});

		let o: Dye.Instance<{
			lighten: typeof lighten;
			chain: typeof chain;
			saturate: typeof saturate;
		}>;

		beforeEach(() => {
			o = dye(chainColor, {
				plugins: {
					chain,
					lighten,
					saturate,
				},
			});
		});

		it("should return the original color", () => {
			expect(o.rgb).toEqual(chainColor);
		});

		it("should lighten the color", () => {
			expect(o.lighten().rgb).toEqual(expectedResults.lightenedColor);
		});

		it("should saturate the color", () => {
			expect(o.chain().saturate().rgb).toEqual(expectedResults.saturatedColor);
		});

		it("should chain saturate calls", () => {
			expect(o.chain().chain().saturate().rgb).toEqual(
				expectedResults.saturatedColor,
			);
		});

		it("should chain lighten calls", () => {
			expect(o.chain().chain().chain().lighten().rgb).toEqual(
				expectedResults.lightenedColor,
			);
		});

		it("should chain lighten and saturate calls", () => {
			expect(o.chain().lighten().chain().chain().rgb).toEqual(
				expectedResults.lightenedColor,
			);
			expect(o.lighten().chain().saturate().chain().rgb).toEqual(
				expectedResults.lightenedAndSaturatedColor,
			);
		});
	});

	describe("Repeated Use of Color with Edge Cases", () => {
		const input = "rgb(100 100 200)";
		it("should handle HSL color string with different format options", () => {
			const minifyEnable = dye(input, {
				plugins: { toHsl },
				formatOptions: { minify: true },
			}).toHsl();
			const cssNextEnable = dye(input, {
				plugins: { toHsl },
				formatOptions: { cssNext: true },
			}).toHsl();

			expect(minifyEnable).toBe("hsl(240,48,59)");
			expect(cssNextEnable).toBe("hsl(240 48% 59%)");
		});

		test("should handle HSV color string with different format options", () => {
			const minifyEnable = dye(input, {
				plugins: { toHsv },
				formatOptions: { minify: true },
			}).toHsv();
			const cssNextEnable = dye(input, {
				plugins: { toHsv },
				formatOptions: { cssNext: true },
			}).toHsv();

			expect(minifyEnable).toBe("hsv(240,50,78)");
			expect(cssNextEnable).toBe("hsv(240 50% 78%)");
		});

		test("should handle RGB color string with different format options", () => {
			const minifyEnable = dye(input, {
				plugins: { toRgb },
				formatOptions: { minify: true },
			}).toRgb();
			const cssNextEnable = dye(input, {
				plugins: { toRgb },
				formatOptions: { cssNext: true },
			}).toRgb();

			expect(minifyEnable).toBe("rgb(100,100,200)");
			expect(cssNextEnable).toBe("rgb(100 100 200)");
		});
	});
});
