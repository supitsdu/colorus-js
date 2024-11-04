import { hexParser } from "../../src/parsers/hexParser";

describe("hexParser", () => {
	it("parses valid hex string", () => {
		const input = "#ff00ff";
		expect(hexParser.parse(input)).toEqual([
			input,
			{ r: 255, g: 0, b: 255, a: 1 },
			{ value: "ff00ff", model: "hex", isValid: true },
		]);
	});

	it("returns null for invalid hex string", () => {
		expect(hexParser.parse("invalid")).toBeNull();
	});
});
