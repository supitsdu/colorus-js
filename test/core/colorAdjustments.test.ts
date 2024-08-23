import {
	alpha,
	hue,
	lighten,
	modBy,
	saturate,
} from "../../src/core/colorAdjustments";
import { testColors } from "../__fixtures__";

const hslColor = testColors.hsl;

describe("Color Adjustment Functions", () => {
	describe("modBy", () => {
		it("should modify a value by the given amount", () => {
			expect(modBy(50, 0.2)).toBe(60); // Increase by 20%
			expect(modBy(100, -0.3)).toBe(70); // Decrease by 30%
		});

		it("should clamp the result to be within 0 and the specified maximum", () => {
			expect(modBy(80, 0.5)).toBe(120); // 80 + (80 * 0.5) = 120
			expect(modBy(80, 1)).toBe(160); // 80 + (80 * 1) = 160
			expect(modBy(50, -1)).toBe(0); // Clamped to 0
		});

		it("should handle string input for value", () => {
			// @ts-expect-error Ignores since the function can actually handle this
			expect(modBy("80", 0.2)).toBe(96);
		});

		it("should return the original value if amount is NaN", () => {
			expect(modBy(50, Number.NaN)).toBe(50);
			// @ts-expect-error Ignores for testing of invalid amount
			expect(modBy(50, "invalid")).toBe(50);
		});

		it("should round the result to two decimal places if necessary", () => {
			expect(modBy(33.3333, 0.1)).toBe(36.67);
		});
	});

	describe("lighten", () => {
		it("should lighten an HSL color by the default amount", () => {
			const lightened = lighten(hslColor.blue.object, 0.1);
			expect(lightened).toEqual({ h: 240, s: 100, l: 55, a: 1 });
		});

		it("should lighten an HSL color by a specific amount", () => {
			const lightened = lighten(hslColor.blue.object, 0.3);
			expect(lightened).toEqual({ h: 240, s: 100, l: 65, a: 1 });
		});
	});

	describe("saturate", () => {
		it("should adjust saturation of HSL color", () => {
			const newColor = saturate(hslColor.orange.object, 0.2);
			expect(newColor).toEqual({ h: 40, s: 100, l: 50, a: 1 });
		});

		it("should clamp saturation value between 0 and 1", () => {
			const color = { h: 120, s: 150, l: 50, a: 1 };
			const newColor = saturate(color, 2);
			expect(newColor).toEqual({ h: 120, s: 100, l: 50, a: 1 });
		});
	});

	describe("hue", () => {
		it("should adjust hue of HSL color", () => {
			const newColor = hue(hslColor.orange.object, 0.2);
			expect(newColor).toEqual({ h: 48, s: 100, l: 50, a: 1 });
		});

		it("should wrap hue value around 360 degrees", () => {
			const color = { h: 350, s: 50, l: 50, a: 1 };
			const newColor = hue(color, 0.2);
			expect(newColor).toEqual({ h: 360, s: 50, l: 50, a: 1 });
		});
	});

	describe("alpha", () => {
		it("should adjust alpha channel of RGB color", () => {
			const color = { r: 255, g: 128, b: 64, a: 0.5 };
			const newColor = alpha(color, 0.2);
			expect(newColor).toEqual({ r: 255, g: 128, b: 64, a: 0.6 });
		});

		it("should handle optional alpha channel", () => {
			const color = { r: 255, g: 128, b: 64 };
			// @ts-expect-error It expects an alpha, but as safe guard should work without
			const newColor = alpha(color, 0.2);
			expect(newColor).toEqual({ r: 255, g: 128, b: 64, a: 1 });
		});
	});
});
