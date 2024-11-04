import { rgbParser } from "../../src/parsers/rgbParser";

describe("rgbParser", () => {
	it("parses valid RGB object", () => {
		const input = { r: 255, g: 0, b: 255 };
		expect(rgbParser.parse(input)).toEqual([
			input,
			{ r: 255, g: 0, b: 255, a: 1 },
			{ value: { r: 255, g: 0, b: 255 }, model: "rgb", isValid: true },
		]);
	});

	it("returns null for invalid RGB object", () => {
		// @ts-expect-error Testing invalid input
		expect(rgbParser.parse({ r: 255, g: "invalid", b: 255 })).toBeNull();
	});
});
