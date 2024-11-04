import {
	clampCmyk,
	clampHsl,
	clampHsv,
	clampRgb,
} from "../../src/utils/clampColorHelpers";

describe("clampColor", () => {
	it("should clamp and normalize RGB values correctly", () => {
		const rgb = { r: 300, g: -10, b: 128.35, a: 1.5 };
		const clampedRgb = clampRgb(rgb);
		expect(clampedRgb).toEqual({ r: 255, g: 0, b: 128.35, a: 1 });
	});

	it("should clamp and normalize RGB values correctly with rounding", () => {
		const rgb = { r: 300, g: -10, b: 128.35, a: 1.5 };
		const clampedRgb = clampRgb(rgb, true);
		expect(clampedRgb).toEqual({ r: 255, g: 0, b: 128, a: 1 });
	});

	it("should clamp and normalize HSL values correctly", () => {
		const hsl = { h: 370, s: 90.32, l: -10, a: 0.5 };
		const clampedHsl = clampHsl(hsl);
		expect(clampedHsl).toEqual({ h: 360, s: 90.32, l: 0, a: 0.5 });
	});

	it("should clamp and normalize HSL values correctly with rounding", () => {
		const hsl = { h: 370, s: 90.32, l: -10, a: 0.5 };
		const clampedHsl = clampHsl(hsl, true);
		expect(clampedHsl).toEqual({ h: 360, s: 90, l: 0, a: 0.5 });
	});

	it("should clamp and normalize HSV values correctly", () => {
		const hsv = { h: 370, s: 90.52, v: -10, a: 0.5 };
		const clampedHsv = clampHsv(hsv);
		expect(clampedHsv).toEqual({ h: 360, s: 90.52, v: 0, a: 0.5 });
	});

	it("should clamp and normalize HSV values correctly with rounding", () => {
		const hsv = { h: 370, s: 90.52, v: -10, a: 0.5 };
		const clampedHsv = clampHsv(hsv, true);
		expect(clampedHsv).toEqual({ h: 360, s: 91, v: 0, a: 0.5 });
	});

	it("should clamp and normalize CMYK values correctly", () => {
		const cmyk = { c: 110, m: -10, y: 2.3341, k: 300, a: 1.5 };
		const clampedCmyk = clampCmyk(cmyk);
		expect(clampedCmyk).toEqual({ c: 100, m: 0, y: 2.33, k: 100, a: 1 });
	});

	it("should clamp and normalize CMYK values correctly with rounding", () => {
		const cmyk = { c: 110, m: -10, y: 2.3341, k: 300, a: 1.5 };
		const clampedCmyk = clampCmyk(cmyk, true);
		expect(clampedCmyk).toEqual({ c: 100, m: 0, y: 2, k: 100, a: 1 });
	});
});
