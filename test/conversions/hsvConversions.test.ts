import { hsvToHsl, hsvToRgb } from "../../src/conversions/hsvConversions";

describe("HSV Color Conversions", () => {
	describe("hsvToHsl", () => {
		it("should convert basic HSV colors to HSL", () => {
			expect(hsvToHsl({ h: 0, s: 100, v: 100, a: 1 })).toEqual({
				h: 0,
				s: 100,
				l: 50,
				a: 1,
			});
			expect(hsvToHsl({ h: 120, s: 50, v: 75, a: 1 })).toEqual({
				h: 120,
				s: 42.86,
				l: 56.25,
				a: 1,
			});
			expect(hsvToHsl({ h: 240, s: 25, v: 25, a: 1 })).toEqual({
				h: 240,
				s: 14.29,
				l: 21.88,
				a: 1,
			});
		});

		it("should handle alpha values correctly", () => {
			expect(hsvToHsl({ h: 0, s: 100, v: 100, a: 0.5 })).toEqual({
				h: 0,
				s: 100,
				l: 50,
				a: 0.5,
			});
		});

		it("should handle edge cases correctly", () => {
			expect(hsvToHsl({ h: 270, s: 0, v: 100, a: 0.5 })).toEqual({
				h: 270,
				s: 0,
				l: 100,
				a: 0.5,
			});

			expect(hsvToHsl({ h: 270, s: 100, v: 0, a: 0.5 })).toEqual({
				h: 270,
				s: 0,
				l: 0,
				a: 0.5,
			});
		});
	});

	describe("hsvToRgb", () => {
		it("should convert basic HSV colors to RGB", () => {
			expect(hsvToRgb({ h: 0, s: 100, v: 100, a: 1 })).toEqual({
				r: 255,
				g: 0,
				b: 0,
				a: 1,
			});
			expect(hsvToRgb({ h: 120, s: 50, v: 75, a: 1 })).toEqual({
				r: 95.63,
				g: 191.25,
				b: 95.63,
				a: 1,
			});
			expect(hsvToRgb({ h: 240, s: 25, v: 25, a: 1 })).toEqual({
				r: 47.81,
				g: 47.81,
				b: 63.75,
				a: 1,
			});
		});

		it("should handle alpha values correctly", () => {
			expect(hsvToRgb({ h: 0, s: 100, v: 100, a: 0.5 })).toEqual({
				r: 255,
				g: 0,
				b: 0,
				a: 0.5,
			});
		});
	});
});
