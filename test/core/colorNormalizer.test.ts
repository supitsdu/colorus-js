import {
	alpha,
	Clamp,
	degree,
	eightBit,
	percent,
	Round,
} from "../../src/core/colorNormalizer";

describe("Color Normalizers", () => {
	describe("Value Converters", () => {
		describe("degree", () => {
			it("should convert value to degree (0-360)", () => {
				expect(degree(720)).toBe(360);
				expect(degree(-120)).toBe(0);
				expect(degree(180)).toBe(180);
			});

			it("should round value to nearest integer", () => {
				expect(degree(180.5)).toBe(181);
			});
		});

		describe("percent", () => {
			it("should convert value to percent (0-100)", () => {
				expect(percent(200)).toBe(100);
				expect(percent(-50)).toBe(0);
				expect(percent(75)).toBe(75);
			});

			it("should round value to nearest integer", () => {
				expect(percent(75.5)).toBe(76);
			});
		});

		describe("eightBit", () => {
			it("should convert value to 8-bit integer (0-255)", () => {
				expect(eightBit(512)).toBe(255);
				expect(eightBit(-128)).toBe(0);
				expect(eightBit(192)).toBe(192);
			});

			it("should round value to nearest integer", () => {
				expect(eightBit(192.5)).toBe(193);
			});
		});

		describe("alpha", () => {
			it("should convert value to alpha (0-1)", () => {
				expect(alpha(2)).toBe(1);
				expect(alpha(-0.5)).toBe(0);
				expect(alpha(0.75)).toBe(0.75);
			});

			it("should precision value to 3 decimal places", () => {
				expect(alpha(0.75321)).toBe(0.75);
			});
		});
	});

	describe("Color Object Normalizers", () => {
		describe("Round", () => {
			it("should round RGB values to nearest integer", () => {
				const rgb = { r: 128.5, g: 64.2, b: 192.8, a: 0.5 };
				const roundedRgb = Round.rgb(rgb);
				expect(roundedRgb).toEqual({ r: 129, g: 64, b: 193, a: 0.5 });
			});

			it("should round HSL values to nearest integer", () => {
				const hsl = { h: 120.5, s: 75.2, l: 50.1, a: 0.5 };
				const roundedHsl = Round.hsl(hsl);
				expect(roundedHsl).toEqual({ h: 121, s: 75, l: 50, a: 0.5 });
			});

			it("should round HSV values to nearest integer", () => {
				const hsv = { h: 240.5, s: 80.2, v: 60.2, a: 0.5 };
				const roundedHsv = Round.hsv(hsv);
				expect(roundedHsv).toEqual({ h: 241, s: 80, v: 60, a: 0.5 });
			});

			it("should round CMYK values to nearest integer", () => {
				const cmyk = { c: 50.5, m: 30.2, y: 20.8, k: 10.5, a: 0.5 };
				const roundedCmyk = Round.cmyk(cmyk);
				expect(roundedCmyk).toEqual({ c: 51, m: 30, y: 21, k: 11, a: 0.5 });
			});
		});

		describe("Clamp", () => {
			it("should precision RGB values to 3 decimal places", () => {
				const rgb = { r: 128.512, g: 64.234, b: 192.876, a: 0.512 };
				const clampedRgb = Clamp.rgb(rgb);
				expect(clampedRgb).toEqual({
					r: 128.51,
					g: 64.23,
					b: 192.88,
					a: 0.51,
				});
			});

			it("should precision HSL values to 3 decimal places", () => {
				const hsl = { h: 120.512, s: 75.3, l: 51.2, a: 0.512 };
				const clampedHsl = Clamp.hsl(hsl);
				expect(clampedHsl).toEqual({ h: 120.51, s: 75.3, l: 51.2, a: 0.51 });
			});

			it("should precision HSV values to 3 decimal places", () => {
				const hsv = { h: 240.512, s: 75.3, v: 51.2, a: 0.512 };
				const clampedHsv = Clamp.hsv(hsv);
				expect(clampedHsv).toEqual({ h: 240.51, s: 75.3, v: 51.2, a: 0.51 });
			});

			it("should precision CMYK values to 3 decimal places", () => {
				const cmyk = { c: 50.512, m: 30.234, y: 20.876, k: 10.512, a: 0.512 };
				const clampedCmyk = Clamp.cmyk(cmyk);
				expect(clampedCmyk).toEqual({
					c: 50.51,
					m: 30.23,
					y: 20.88,
					k: 10.51,
					a: 0.51,
				});
			});

			it("should clamp RGB values to valid range", () => {
				const rgb = { r: 300, g: -10, b: 150, a: 2 };
				const clampedRgb = Clamp.rgb(rgb);
				expect(clampedRgb).toEqual({ r: 255, g: 0, b: 150, a: 1 });
			});

			it("should clamp HSL values to valid range", () => {
				const hsl = { h: 420, s: -20, l: 10.21, a: 2 };
				const clampedHsl = Clamp.hsl(hsl);
				expect(clampedHsl).toEqual({ h: 360, s: 0, l: 10.21, a: 1 });
			});

			it("should clamp HSV values to valid range", () => {
				const hsv = { h: 420, s: -20, v: 10.21, a: 2 };
				const clampedHsv = Clamp.hsv(hsv);
				expect(clampedHsv).toEqual({ h: 360, s: 0, v: 10.21, a: 1 });
			});

			it("should clamp CMYK values to valid range", () => {
				const cmyk = { c: 150, m: -20, y: 50, k: 200, a: 2 };
				const clampedCmyk = Clamp.cmyk(cmyk);
				expect(clampedCmyk).toEqual({ c: 100, m: 0, y: 50, k: 100, a: 1 });
			});
		});
	});
});
