import { parseColor } from "../../src/core/colorParser";
import { forEachColorFormat } from "../__fixtures__";

describe("parseColor Function", () => {
	describe("Handling Error", () => {
		it("should return null for an invalid color string", () => {
			expect(parseColor("invalidcolor")).toBeNull();
		});

		it("should return null for an empty string", () => {
			expect(parseColor("")).toBeNull();
		});

		it("should return null for undefined input", () => {
			expect(parseColor()).toBeNull();
			expect(parseColor(undefined)).toBeNull();
		});
	});

	describe("Color String Parsing", () => {
		forEachColorFormat(
			"should parse from a %s string",
			(format, color) => {
				expect(parseColor(color.string)).toEqual({
					originalInput: color.string,
					isValid: true,
					value: color.object,
					format,
				});
			},
			["hex", "rgb", "hsl", "hsv", "cmyk"],
		);
	});
});
