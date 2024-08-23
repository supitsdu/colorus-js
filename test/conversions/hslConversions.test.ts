import { hslToHsv, hslToRgb } from "../../src/conversions/hslConversions";

describe("HSL Color Conversions", () => {
	describe("hslToHsv", () => {
		it("should convert basic HSL colors to HSV", () => {
			expect(hslToHsv({ h: 0, s: 100, l: 50, a: 1 })).toEqual({
				h: 0,
				s: 100,
				v: 100,
				a: 1,
			});
			expect(hslToHsv({ h: 120, s: 50, l: 62.5, a: 1 })).toEqual({
				h: 120,
				s: 46.15,
				v: 81.25,
				a: 1,
			});
			expect(hslToHsv({ h: 240, s: 25, l: 12.5, a: 1 })).toEqual({
				h: 240,
				s: 40,
				v: 15.63,
				a: 1,
			});
		});

		it("should handle alpha values correctly", () => {
			expect(hslToHsv({ h: 0, s: 100, l: 50, a: 0.5 })).toEqual({
				h: 0,
				s: 100,
				v: 100,
				a: 0.5,
			});
		});

		it("should handle edge cases correctly", () => {
			expect(hslToHsv({ h: 270, s: 0, l: 100, a: 0.5 })).toEqual({
				h: 270,
				s: 0,
				v: 100,
				a: 0.5,
			});

			expect(hslToHsv({ h: 270, s: 100, l: 0, a: 0.5 })).toEqual({
				h: 270,
				s: 0,
				v: 0,
				a: 0.5,
			});
		});
	});

	describe("hslToRgb", () => {
		it("should convert basic HSL colors to RGB", () => {
			expect(hslToRgb({ h: 0, s: 100, l: 50, a: 1 })).toEqual({
				r: 255,
				g: 0,
				b: 0,
				a: 1,
			});
			expect(hslToRgb({ h: 120, s: 50, l: 50, a: 1 })).toEqual({
				r: 63.74,
				g: 191.25,
				b: 63.74,
				a: 1,
			});
			expect(hslToRgb({ h: 240, s: 100, l: 50, a: 1 })).toEqual({
				r: 0,
				g: 0,
				b: 255,
				a: 1,
			});
		});

		it("should handle alpha values correctly", () => {
			expect(hslToRgb({ h: 0, s: 100, l: 50, a: 0.5 })).toEqual({
				r: 255,
				g: 0,
				b: 0,
				a: 0.5,
			});
		});

		it("should handle grayscale colors correctly", () => {
			expect(hslToRgb({ h: 0, s: 0, l: 0, a: 1 })).toEqual({
				r: 0,
				g: 0,
				b: 0,
				a: 1,
			});
			expect(hslToRgb({ h: 0, s: 0, l: 100, a: 1 })).toEqual({
				r: 255,
				g: 255,
				b: 255,
				a: 1,
			});
		});
	});
});
