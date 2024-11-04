import { relativeLuminance } from "../../src/utils/accessibility";

describe("relativeLuminance", () => {
	it("should calculate the correct luminance for black", () => {
		const black = { r: 0, g: 0, b: 0, a: 1 };
		expect(relativeLuminance(black)).toBeCloseTo(0);
	});

	it("should calculate the correct luminance for white", () => {
		const white = { r: 255, g: 255, b: 255, a: 1 };
		expect(relativeLuminance(white)).toBeCloseTo(1);
	});

	it("should calculate the correct luminance for red", () => {
		const red = { r: 255, g: 0, b: 0, a: 1 };
		expect(relativeLuminance(red)).toBeCloseTo(0.2126);
	});

	it("should calculate the correct luminance for green", () => {
		const green = { r: 0, g: 255, b: 0, a: 1 };
		expect(relativeLuminance(green)).toBeCloseTo(0.7152);
	});

	it("should calculate the correct luminance for blue", () => {
		const blue = { r: 0, g: 0, b: 255, a: 1 };
		expect(relativeLuminance(blue)).toBeCloseTo(0.0722);
	});

	it("should calculate the correct luminance for a gray color", () => {
		const gray = { r: 128, g: 128, b: 128, a: 1 };
		expect(relativeLuminance(gray)).toBeCloseTo(0.22, 4);
	});
});
