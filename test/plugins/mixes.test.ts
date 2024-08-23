import { interpolateRgb } from "../../src/plugins/mixes";
import { rgbColors } from "../__fixtures__/rgbColors";

const red = rgbColors.red.object;
const blue = rgbColors.blue.object;

describe("RGB Color Interpolation", () => {
	describe("interpolateRgb", () => {
		it("should interpolate between two colors correctly", () => {
			expect(interpolateRgb(red, blue, 0)).toEqual(red);
			expect(interpolateRgb(red, blue, 1)).toEqual(blue);
			expect(interpolateRgb(red, blue, 0.5)).toEqual({
				r: 127.5,
				g: 0,
				b: 127.5,
				a: 1,
			});
		});

		it("should handle alpha values correctly", () => {
			const redColor = { ...red, a: 0.5 };
			const blueColor = { ...blue, a: 0.8 };

			expect(interpolateRgb(redColor, blueColor, 0.5)).toEqual({
				r: 127.5,
				g: 0,
				b: 127.5,
				a: 0.65,
			});
		});

		it("should handle colors with missing alpha values", () => {
			const redColor = { ...red, a: 0 };
			const blueColor = { ...blue, a: 0.8 };

			expect(interpolateRgb(redColor, blueColor, 0.5)).toEqual({
				r: 127.5,
				g: 0,
				b: 127.5,
				a: 0.4,
			});
		});

		it("should clamp the interpolation amount to the valid range (0-1)", () => {
			expect(interpolateRgb(red, blue, -0.5)).toEqual(red);
			expect(interpolateRgb(red, blue, 1.5)).toEqual(blue);
		});
	});
});
