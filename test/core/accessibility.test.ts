import {
	relativeLuminance,
	calculateContrastRatio,
	contrastRatio,
} from "../../src/core/accessibility";
import { testColors } from "../__fixtures__";

describe("Accessibility functions", () => {
	describe("relativeLuminance", () => {
		it("should calculate luminance correctly for black", () => {
			expect(relativeLuminance(testColors.rgb.black.object)).toBe(0);
		});

		it("should calculate luminance correctly for white", () => {
			expect(relativeLuminance(testColors.rgb.white.object)).toBe(1);
		});

		it("should calculate luminance correctly for a lightgray", () => {
			expect(relativeLuminance(testColors.rgb.lightgray.object)).toBeCloseTo(
				0.65,
				1,
			);
		});
	});

	describe("calculateContrastRatio", () => {
		it("should calculate contrast ratio correctly for black and white", () => {
			const blackLuminance = 0;
			const whiteLuminance = 1;
			expect(calculateContrastRatio(whiteLuminance, blackLuminance)).toBe(21);
		});

		it("should handle cases where L1 is less than L2", () => {
			const L1 = 0.3;
			const L2 = 0.7;
			expect(calculateContrastRatio(L1, L2)).toBe(
				calculateContrastRatio(L2, L1),
			);
		});

		it("should handle cases where L1 is equal to L2", () => {
			const L1 = 0.5;
			const L2 = 0.5;
			expect(calculateContrastRatio(L1, L2)).toBe(1);
		});

		it("should handle cases where L1 is close to L2", () => {
			const L1 = 0.4;
			const L2 = 0.41;
			expect(calculateContrastRatio(L1, L2)).toBeCloseTo(1.04, 1);
		});

		it("should handle cases where L1 is much higher than L2", () => {
			const L1 = 0.9;
			const L2 = 0.1;
			expect(calculateContrastRatio(L1, L2)).toBeCloseTo(6.33, 1);
		});

		it("should handle cases where L1 is much lower than L2", () => {
			const L1 = 0.1;
			const L2 = 0.9;
			expect(calculateContrastRatio(L1, L2)).toBeCloseTo(6.33, 1);
		});
	});

	describe("contrastRatio", () => {
		it("should calculate contrast ratio correctly for two colors", () => {
			const { white, black } = testColors.rgb;
			expect(contrastRatio(white.object, black.object)).toBeCloseTo(21);
		});

		it("should calculate contrast ratio correctly for black and light gray", () => {
			const { black, lightgray } = testColors.rgb;
			expect(contrastRatio(lightgray.object, black.object)).toBeCloseTo(
				14.02,
				1,
			);
		});

		it("should calculate contrast ratio correctly for blue and yellow", () => {
			const { yellow, blue } = testColors.rgb;
			expect(contrastRatio(yellow.object, blue.object)).toBeCloseTo(8.0, 1);
		});

		it("should calculate contrast ratio correctly for red and lime", () => {
			const { lime, red } = testColors.rgb;
			expect(contrastRatio(lime.object, red.object)).toBeCloseTo(2.91, 1);
		});
	});
});
