import { hsvParser } from "../../src/parsers/hsvParser";

describe("hsvParser", () => {
	it("parses valid HSV object", () => {
		const input = { h: 300, s: 100, v: 100 };
		expect(hsvParser.parse(input)).toEqual([
			input,
			{ r: 255, g: 0, b: 255, a: 1 },
			{ value: { h: 300, s: 100, v: 100 }, model: "hsv", isValid: true },
		]);
	});

	it("returns null for invalid HSV object", () => {
		// @ts-expect-error Testing invalid input
		expect(hsvParser.parse({ h: 300, s: "invalid", v: 100 })).toBeNull();
	});
});
