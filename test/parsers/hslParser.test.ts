import { hslParser } from "../../src/parsers/hslPaser";

describe("hslParser", () => {
	it("parses valid HSL object", () => {
		const input = { h: 300, s: 100, l: 50 };

		expect(hslParser.parse(input)).toEqual([
			input,
			{ r: 255, g: 0, b: 255, a: 1 },
			{ value: { h: 300, s: 100, l: 50 }, model: "hsl", isValid: true },
		]);
	});

	it("returns null for invalid HSL object", () => {
		// @ts-expect-error Testing invalid input
		expect(hslParser.parse({ h: 300, s: "invalid", l: 50 })).toBeNull();
	});
});
