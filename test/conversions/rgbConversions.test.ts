import {
	rgbToCmyk,
	rgbToHex,
	rgbToHsl,
	rgbToHsv,
	rgbToNamedColor,
} from "../../src/conversions/rgbConversions";
import { forEachColorFormat } from "../__fixtures__";

describe("RGB Color Conversions", () => {
	describe("rgbToNamedColor", () => {
		forEachColorFormat(
			"should return the correct named color for basic colors",
			(_, color, rgb) => {
				expect(rgbToNamedColor(rgb)).toBe(color.colorName);
			},
			["rgb"],
		);

		it("should return the closest named color for non-exact matches", () => {
			expect(rgbToNamedColor({ r: 250, g: 8, b: 7, a: 1 })).toBe("red"); // Slightly off-red
			expect(rgbToNamedColor({ r: 8, g: 255, b: 7, a: 1 })).toBe("lime"); // Slightly off-lime
			expect(rgbToNamedColor({ r: 8, g: 7, b: 255, a: 1 })).toBe("blue"); // Slightly off-blue
		});
	});

	describe("rgbToHex", () => {
		forEachColorFormat(
			"should convert basic rgb colors to %s",
			(_, color, rgb) => {
				expect(rgbToHex(rgb)).toBe(color.string.toUpperCase());
			},
			["hex"],
		);

		it("should handle alpha values correctly", () => {
			expect(rgbToHex({ r: 255, g: 0, b: 0, a: 0.5 })).toBe("#FF000080");
		});

		it("should minify hex values when possible", () => {
			expect(rgbToHex({ r: 255, g: 0, b: 0, a: 1 }, { minify: true })).toBe(
				"#F00",
			);
		});
	});

	describe("rgbToHsv", () => {
		it("should convert basic RGB colors to HSV", () => {
			expect(rgbToHsv({ r: 255, g: 0, b: 0, a: 1 })).toEqual({
				h: 0,
				s: 100,
				v: 100,
				a: 1,
			});
			expect(rgbToHsv({ r: 0, g: 255, b: 0, a: 1 })).toEqual({
				h: 120,
				s: 100,
				v: 100,
				a: 1,
			});
			expect(rgbToHsv({ r: 0, g: 0, b: 255, a: 1 })).toEqual({
				h: 240,
				s: 100,
				v: 100,
				a: 1,
			});
		});

		it("should handle alpha values correctly", () => {
			expect(rgbToHsv({ r: 255, g: 0, b: 0, a: 0.5 })).toEqual({
				h: 0,
				s: 100,
				v: 100,
				a: 0.5,
			});
		});

		it("should handle grayscale colors correctly", () => {
			expect(rgbToHsv({ r: 128, g: 128, b: 128, a: 1 })).toEqual({
				h: 0,
				s: 0,
				v: 50.2,
				a: 1,
			});
		});
	});

	describe("rgbToCmyk", () => {
		it("should convert basic RGB colors to CMYK", () => {
			expect(rgbToCmyk({ r: 255, g: 0, b: 0, a: 1 })).toEqual({
				c: 0,
				m: 100,
				y: 100,
				k: 0,
				a: 1,
			});
			expect(rgbToCmyk({ r: 0, g: 255, b: 0, a: 1 })).toEqual({
				c: 100,
				m: 0,
				y: 100,
				k: 0,
				a: 1,
			});
			expect(rgbToCmyk({ r: 0, g: 0, b: 255, a: 1 })).toEqual({
				c: 100,
				m: 100,
				y: 0,
				k: 0,
				a: 1,
			});
		});

		it("should handle alpha values correctly", () => {
			expect(rgbToCmyk({ r: 255, g: 0, b: 0, a: 0.5 })).toEqual({
				c: 0,
				m: 100,
				y: 100,
				k: 0,
				a: 0.5,
			});
		});

		it("should handle grayscale colors correctly", () => {
			expect(rgbToCmyk({ r: 128, g: 128, b: 128, a: 1 })).toEqual({
				c: 0,
				m: 0,
				y: 0,
				k: 49.8,
				a: 1,
			});
		});
	});

	describe("rgbToHsl", () => {
		it("should convert basic RGB colors to HSL", () => {
			expect(rgbToHsl({ r: 255, g: 0, b: 0, a: 1 })).toEqual({
				h: 0,
				s: 100,
				l: 50,
				a: 1,
			});
			expect(rgbToHsl({ r: 0, g: 255, b: 0, a: 1 })).toEqual({
				h: 120,
				s: 100,
				l: 50,
				a: 1,
			});
			expect(rgbToHsl({ r: 0, g: 0, b: 255, a: 1 })).toEqual({
				h: 240,
				s: 100,
				l: 50,
				a: 1,
			});
		});

		it("should handle alpha values correctly", () => {
			expect(rgbToHsl({ r: 255, g: 0, b: 0, a: 0.5 })).toEqual({
				h: 0,
				s: 100,
				l: 50,
				a: 0.5,
			});
		});

		it("should handle grayscale colors correctly", () => {
			expect(rgbToHsl({ r: 128, g: 128, b: 128, a: 1 })).toEqual({
				h: 0,
				s: 0,
				l: 50.2,
				a: 1,
			});
		});
	});
});
