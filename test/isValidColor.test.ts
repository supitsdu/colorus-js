import { isValidColor } from "../src/isValidColor";
import { forEachColorFormat } from "./__fixtures__";

describe("isValidColor", () => {
	it("should return null for an invalid color object", () => {
		expect(isValidColor({ x: 10, y: 20 })).toBeNull();
	});

	it("should return null for an invalid color string", () => {
		expect(isValidColor("invalidcolor")).toBeNull();
	});

	it("should return null for an empty string", () => {
		expect(isValidColor("")).toBeNull();
	});

	it("should return null for undefined", () => {
		expect(isValidColor(undefined)).toBeNull();
	});

	it("should return null for null", () => {
		expect(isValidColor(null)).toBeNull();
	});

	describe("Validation - Color String", () => {
		forEachColorFormat(
			"should parse from a %s string",
			(format, color) => expect(isValidColor(color.string)).toBe(format),
			["hex", "rgb", "hsl", "hsv", "cmyk"],
		);
	});

	describe("Validation - Color Object", () => {
		forEachColorFormat(
			"should parse from a %s string",
			(format, color) => expect(isValidColor(color.object)).toBe(format),
			["rgb", "hsl", "hsv", "cmyk"],
		);
	});
});
