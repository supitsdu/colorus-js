import { isRgbShortanable, toHex } from "../../src/plugins/toHex";

describe("toHex plugin", () => {
	it("should check if RGB is shortanable", () => {
		expect(isRgbShortanable({ r: 255, g: 0, b: 0, a: 1 })).toBe(true);
		expect(isRgbShortanable({ r: 255, g: 255, b: 255, a: 1 })).toBe(true);
		expect(isRgbShortanable({ r: 0, g: 0, b: 0, a: 1 })).toBe(true);
		expect(isRgbShortanable({ r: 0, g: 255, b: 0, a: 1 })).toBe(true);
		expect(isRgbShortanable({ r: 0, g: 0, b: 255, a: 1 })).toBe(true);
	});

	it("should check if RGB is not shortanable", () => {
		expect(isRgbShortanable({ r: 255, g: 0, b: 0, a: 0.5 })).toBe(false);
		expect(isRgbShortanable({ r: 255, g: 255, b: 255, a: 0.5 })).toBe(false);
		expect(isRgbShortanable({ r: 0, g: 0, b: 0, a: 0.5 })).toBe(false);
		expect(isRgbShortanable({ r: 0, g: 255, b: 0, a: 0.5 })).toBe(false);
		expect(isRgbShortanable({ r: 0, g: 0, b: 255, a: 0.5 })).toBe(false);
		// @ts-ignore - Testing edge case
		expect(isRgbShortanable({ r: 0, g: 30, b: 25 })).toBe(false);
	});

	it("should convert RGB to HEX", () => {
		const mockDyeInstance = { rgb: { r: 255, g: 0, b: 0 } };

		const plugin = toHex.bind(mockDyeInstance);

		expect(plugin()).toBe("#ff0000");
	});

	it("should handle RGB with alpha channel", () => {
		const mockDyeInstance = { rgb: { r: 255, g: 0, b: 0, a: 0.5 } };

		const plugin = toHex.bind(mockDyeInstance);

		expect(plugin()).toBe("#ff000080");
	});

	it("should handle RGB with default alpha channel", () => {
		const mockDyeInstance = { rgb: { r: 0, g: 255, b: 0, a: 1 } };

		const plugin = toHex.bind(mockDyeInstance);

		expect(plugin()).toBe("#00ff00");
	});

	it("should minify HEX color", () => {
		const mockDyeInstance = {
			rgb: { r: 255, g: 255, b: 255, a: 1 },
			options: { formatOptions: { minify: true } },
		};

		const plugin = toHex.bind(mockDyeInstance);

		expect(plugin()).toBe("#fff");
	});
});
