import { cmykParser } from "../../src/parsers/cmykParser";

describe("cmykParser", () => {
	it("parses valid CMYK object", () => {
		const input = { c: 0, m: 100, y: 0, k: 0 };
		expect(cmykParser.parse(input)).toEqual([
			input,
			{ r: 255, g: 0, b: 255, a: 1 },
			{ value: { c: 0, m: 100, y: 0, k: 0 }, model: "cmyk", isValid: true },
		]);
	});

	it("returns null for invalid CMYK object", () => {
		// @ts-expect-error Testing invalid input
		expect(cmykParser.parse({ c: 0, m: "invalid", y: 0, k: 0 })).toBeNull();
	});
});
