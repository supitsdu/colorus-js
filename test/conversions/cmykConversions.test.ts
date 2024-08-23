import { cmykToRgb } from "../../src/conversions/cmykConversions";

describe("CMYK Color Conversion", () => {
	describe("cmykToRgb", () => {
		it("should convert basic CMYK colors to RGB", () => {
			expect(cmykToRgb({ c: 0, m: 100, y: 100, k: 0, a: 1 })).toEqual({
				r: 255,
				g: 0,
				b: 0,
				a: 1,
			}); // Red
			expect(cmykToRgb({ c: 100, m: 0, y: 100, k: 0, a: 1 })).toEqual({
				r: 0,
				g: 255,
				b: 0,
				a: 1,
			}); // Green
			expect(cmykToRgb({ c: 100, m: 100, y: 0, k: 0, a: 1 })).toEqual({
				r: 0,
				g: 0,
				b: 255,
				a: 1,
			}); // Blue
		});

		it("should handle alpha values correctly", () => {
			expect(cmykToRgb({ c: 0, m: 100, y: 100, k: 0, a: 0.5 })).toEqual({
				r: 255,
				g: 0,
				b: 0,
				a: 0.5,
			});
		});

		it("should handle grayscale colors correctly", () => {
			expect(cmykToRgb({ c: 0, m: 0, y: 0, k: 50, a: 1 })).toEqual({
				r: 127.5,
				g: 127.5,
				b: 127.5,
				a: 1,
			});
		});
	});
});
