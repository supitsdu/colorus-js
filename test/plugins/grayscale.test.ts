import { rgbToGray } from "../../src/plugins/grayscale";

describe("Grayscale Conversion", () => {
	describe("rgbToGray", () => {
		it("should convert basic RGB colors to grayscale using the default formula", () => {
			expect(rgbToGray({ r: 255, g: 0, b: 0, a: 1 })).toEqual({
				r: 54.213,
				g: 54.213,
				b: 54.213,
				a: 1,
			});
			expect(rgbToGray({ r: 0, g: 255, b: 0, a: 1 })).toEqual({
				r: 182.37599999999998,
				g: 182.37599999999998,
				b: 182.37599999999998,
				a: 1,
			});
			expect(rgbToGray({ r: 0, g: 0, b: 255, a: 1 })).toEqual({
				r: 18.411,
				g: 18.411,
				b: 18.411,
				a: 1,
			});
		});

		it("should convert basic RGB colors to grayscale using the NTSC formula", () => {
			expect(rgbToGray({ r: 255, g: 0, b: 0, a: 1 }, true)).toEqual({
				r: 76.24499999999999,
				g: 76.24499999999999,
				b: 76.24499999999999,
				a: 1,
			});
			expect(rgbToGray({ r: 0, g: 255, b: 0, a: 1 }, true)).toEqual({
				r: 149.685,
				g: 149.685,
				b: 149.685,
				a: 1,
			});
			expect(rgbToGray({ r: 0, g: 0, b: 255, a: 1 }, true)).toEqual({
				r: 29.07,
				g: 29.07,
				b: 29.07,
				a: 1,
			});
		});

		it("should handle alpha values correctly", () => {
			expect(rgbToGray({ r: 255, g: 0, b: 0, a: 0.5 })).toEqual({
				r: 54.213,
				g: 54.213,
				b: 54.213,
				a: 0.5,
			});
		});

		it("should handle grayscale colors correctly", () => {
			expect(rgbToGray({ r: 128, g: 128, b: 128, a: 1 })).toEqual({
				r: 128,
				g: 128,
				b: 128,
				a: 1,
			});
		});
	});
});
