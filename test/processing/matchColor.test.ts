import { ColorParser } from "../../src/processing/colorParser";
import { matchColor } from "../../src/processing/matchColor";
import type { Colors, Dye } from "../../src/types";

describe("matchColor", () => {
	class MockParser extends ColorParser<any, any> {
		// @ts-expect-error Mocking parse method to return a valid color object
		parse(input: Colors.Input): [Colors.Input, any, Dye.Source<any>] | null {
			if (input === "validColor") {
				return [
					"validColor",
					{ color: "parsedColor" },
					{ value: "parsedColor", model: "mock", isValid: true },
				];
			}
			return null;
		}
	}

	it("should throw an error if no input is provided", () => {
		expect(() => matchColor()).toThrow("No color input provided");
	});

	it("should throw an error if no parsers are provided", () => {
		expect(() => matchColor("someColor")).toThrow(
			"No parsers were provided for the color input. Ensure at least one parser is available",
		);
	});

	it("should throw an error if an invalid parser is provided", () => {
		expect(() => matchColor.call({ parsers: [{}] }, "someColor")).toThrow(
			"Invalid parser provided",
		);
	});

	it("should return parsed color if a valid parser is provided", () => {
		const parsers = [
			new MockParser({
				model: "mock",
				extract: match => match[0],
				serialize: value => value,
				regex: /validColor/,
			}),
		];
		const result = matchColor.call({ parsers }, "validColor");
		expect(result).toEqual([
			"validColor",
			{ color: "parsedColor" },
			{ value: "parsedColor", model: "mock", isValid: true },
		]);
	});

	it("should throw an error if no valid parser is found for the input", () => {
		const parsers = [
			new MockParser({
				model: "mock",
				extract: match => match[0],
				serialize: value => value,
				regex: /validColor/,
			}),
		];
		expect(() => matchColor.call({ parsers }, "invalidColor")).toThrow(
			"Failed to parse color input: No valid parser found for 'string'",
		);
	});

	it("should throw an error if parser throws an error", () => {
		class ErrorParser extends ColorParser<any, any> {
			// @ts-expect-error Mocking parse method to throw an error
			parse(): Dye.ParserMatchArray | null {
				throw new Error("Parser error");
			}
		}
		const parsers = [
			new ErrorParser({
				model: "mock",
				extract: match => match[0],
				serialize: value => value,
				regex: /validColor/,
			}),
		];
		expect(() => matchColor.call({ parsers }, "someColor")).toThrow(
			"Failed to parse color input: Parser error",
		);
	});

	it("should handle multiple parsers and return the first valid parsed color", () => {
		class AnotherMockParser extends ColorParser<any, any> {
			// @ts-expect-error Mocking parse method to return a valid color object
			parse(input: Colors.Input) {
				if (input === "anotherValidColor") {
					return [
						"anotherValidColor",
						{ color: "anotherParsedColor" },
						{
							value: "anotherParsedColor",
							model: "anotherMock",
							isValid: true,
						},
					];
				}
				return null;
			}
		}
		const parsers = [
			new MockParser({
				model: "mock",
				extract: match => match[0],
				serialize: value => value,
				regex: /validColor/,
			}),
			new AnotherMockParser({
				model: "anotherMock",
				extract: match => match[0],
				serialize: value => value,
				regex: /anotherValidColor/,
			}),
		];
		const result = matchColor.call({ parsers }, "anotherValidColor");
		expect(result).toEqual([
			"anotherValidColor",
			{ color: "anotherParsedColor" },
			{ value: "anotherParsedColor", model: "anotherMock", isValid: true },
		]);
	});

	it("should handle multiple parsers and return the first valid parsed color even if the first parser fails", () => {
		class FailingParser extends ColorParser<any, any> {
			// @ts-expect-error Mocking parse method to throw an error
			parse(): Dye.ParserMatchArray | null {
				throw new Error("Parser error");
			}
		}
		const parsers = [
			new FailingParser({
				model: "mock",
				extract: match => match[0],
				serialize: value => value,
				regex: /validColor/,
			}),
			new MockParser({
				model: "mock",
				extract: match => match[0],
				serialize: value => value,
				regex: /validColor/,
			}),
		];
		const result = matchColor.call({ parsers }, "validColor");
		expect(result).toEqual([
			"validColor",
			{ color: "parsedColor" },
			{ value: "parsedColor", model: "mock", isValid: true },
		]);
	});
});
