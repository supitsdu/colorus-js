import { ColorParser } from "../../src/processing/colorParser";
import type { Colors } from "../../src/types";

describe("ColorParser", () => {
	let colorParser: ColorParser<string, string>;

	beforeEach(() => {
		/** Testing the ColorParser class with a simple configuration */
		colorParser = new ColorParser<string, string>({
			model: "rgb",
			extract: match => match.join(","),
			serialize: value => `rgb(${value})`,
			regex: /rgb\((\d+),\s*(\d+),\s*(\d+)\)/,
			channels: ["r", "g", "b"],
			clamp: value => value,
		});
	});

	it("should parse a valid color string", () => {
		const input = "rgb(255, 0, 0)";
		const result = colorParser.parse(input);
		expect(result).toEqual([
			input,
			"rgb(255,0,0)",
			{
				value: "255,0,0",
				model: "rgb",
				isValid: true,
			},
		]);
	});

	it("should parse a valid color object", () => {
		const input = { r: 255, g: 0, b: 0 };
		const result = colorParser.parse(input);
		expect(result).toEqual([
			input,
			"rgb(255,0,0)",
			{
				value: "255,0,0",
				model: "rgb",
				isValid: true,
			},
		]);
	});

	it("should return null for an invalid color string", () => {
		const input = "invalid color";
		const result = colorParser.parse(input);
		expect(result).toBeNull();
	});

	it("should return null for an invalid color object", () => {
		const input = { r: "255", g: "0" }; // Missing 'b' channel
		// @ts-expect-error Testing invalid input
		const result = colorParser.parse(input);
		expect(result).toBeNull();
	});

	it("should use the clamp function if provided", () => {
		const clampMock = jest.fn(value => ({
			r: Math.min(255, Math.max(0, Number(value.r))),
			g: Math.min(255, Math.max(0, Number(value.g))),
			b: Math.min(255, Math.max(0, Number(value.b))),
		}));

		const colorParser = new ColorParser({
			model: "rgb",
			extract: match =>
				({ r: match[0], g: match[1], b: match[2] }) as Colors.Rgb,
			serialize: value => `rgb(${value.r},${value.g},${value.b})`,
			regex: /rgb\((\d+),\s*(\d+),\s*(\d+)\)/,
			channels: ["r", "g", "b"],
			clamp: clampMock,
		});

		const input = { r: "300", g: "-10", b: "0" };

		// @ts-expect-error Edge case numerical string input
		const result = colorParser.parse(input);

		expect(clampMock).toHaveBeenCalledWith({ r: "300", g: "-10", b: "0" });
		expect(result).toEqual([
			input,
			"rgb(255,0,0)",
			{
				value: { r: "300", g: "-10", b: "0" },
				model: "rgb",
				isValid: true,
			},
		]);
	});
});

describe("ColorParser - Invalid Configurations", () => {
	it("should throw an error if 'serialize' function is not provided", () => {
		expect(
			() =>
				// @ts-expect-error Testing invalid configuration
				new ColorParser({
					model: "rgb",
					extract: match => match.join(","),
					regex: /rgb\((\d+),\s*(\d+),\s*(\d+)\)/,
					channels: ["r", "g", "b"],
					clamp: value => value,
				}),
		).toThrow("Missing 'serialize' function in the configuration.");
	});

	it("should throw an error if 'regex' is not provided", () => {
		expect(
			() =>
				// @ts-expect-error Testing invalid configuration
				new ColorParser({
					model: "rgb",
					extract: match => match.join(","),
					serialize: value => `rgb(${value})`,
					channels: ["r", "g", "b"],
					clamp: value => value,
				}),
		).toThrow("Missing 'regex' RegExp in the configuration");
	});

	it("should throw an error if 'model' is not provided", () => {
		expect(
			() =>
				// @ts-expect-error Testing invalid configuration
				new ColorParser({
					extract: match => match.join(","),
					serialize: value => `rgb(${value})`,
					regex: /rgb\((\d+),\s*(\d+),\s*(\d+)\)/,
					channels: ["r", "g", "b"],
					clamp: value => value,
				}),
		).toThrow("Missing 'model' string in the configuration");
	});

	it("should throw an error if 'extract' function is not provided", () => {
		expect(
			() =>
				// @ts-expect-error Testing invalid configuration
				new ColorParser({
					model: "rgb",
					serialize: value => `rgb(${value})`,
					regex: /rgb\((\d+),\s*(\d+),\s*(\d+)\)/,
					channels: ["r", "g", "b"],
					clamp: value => value,
				}),
		).toThrow("Missing 'extract' function in the configuration");
	});

	it("should throw an error if 'clamp' function is invalid", () => {
		expect(
			() =>
				new ColorParser({
					model: "rgb",
					extract: match => match.join(","),
					serialize: value => `rgb(${value})`,
					regex: /rgb\((\d+),\s*(\d+),\s*(\d+)\)/,
					channels: ["r", "g", "b"],
					// @ts-expect-error Testing invalid configuration
					clamp: {},
				}),
		).toThrow("Invalid 'clamp' function in the configuration");
	});
});
