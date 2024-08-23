import { invertRgb } from "../../src/plugins/invert";

describe("RGB Color Manipulation", () => {
	describe("invertRgb", () => {
		it("should invert basic RGB colors", () => {
			expect(invertRgb({ r: 255, g: 0, b: 0, a: 1 })).toEqual({
				r: 0,
				g: 255,
				b: 255,
				a: 1,
			}); // Red to Cyan
			expect(invertRgb({ r: 0, g: 255, b: 0, a: 1 })).toEqual({
				r: 255,
				g: 0,
				b: 255,
				a: 1,
			}); // Green to Magenta
			expect(invertRgb({ r: 0, g: 0, b: 255, a: 1 })).toEqual({
				r: 255,
				g: 255,
				b: 0,
				a: 1,
			}); // Blue to Yellow
		});

		it("should handle alpha values correctly", () => {
			expect(invertRgb({ r: 255, g: 0, b: 0, a: 0.5 })).toEqual({
				r: 0,
				g: 255,
				b: 255,
				a: 0.5,
			});
		});

		it("should handle grayscale colors correctly", () => {
			expect(invertRgb({ r: 128, g: 128, b: 128, a: 1 })).toEqual({
				r: 127,
				g: 127,
				b: 127,
				a: 1,
			});
		});
	});
});
