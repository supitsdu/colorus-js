import {
	clamp,
	expandHexString,
	formatDecimal,
	generateColorComponents,
	hexToInt,
	modBy,
	normalize8Bit,
	normalizeAlpha,
	normalizeDegrees,
	normalizePercentage,
	toHexString,
} from "../../src/utils/colorUtils";

describe("hexToInt", () => {
	it("should convert a hexadecimal string to an integer", () => {
		expect(hexToInt("ff")).toBe(255);
		expect(hexToInt("0a")).toBe(10);
		expect(hexToInt("ff", 0, 1)).toBe(15);
	});
});

describe("toHexString", () => {
	it("should convert an integer to a hexadecimal string with a specified minimum length", () => {
		expect(toHexString(255, 2)).toBe("ff");
		expect(toHexString(10, 2)).toBe("0a");
		expect(toHexString(10, 4)).toBe("000a");
	});
});

describe("expandHexString", () => {
	it("should expand a shortened hex color to a full 6- or 8-character hex string", () => {
		expect(expandHexString("FFF")).toBe("FFFFFF");
		expect(expandHexString("E3E")).toBe("EE33EE");
		expect(expandHexString("E3EF")).toBe("EE33EEFF");
		expect(expandHexString("#E3EF")).toBe("EE33EEFF");
	});

	it("should return the input string if it is already a full hex string", () => {
		expect(expandHexString("#FFFFFF")).toBe("FFFFFF");
		expect(expandHexString("EE33EE")).toBe("EE33EE");
		expect(expandHexString("EE33EEFF")).toBe("EE33EEFF");
	});
});

describe("modBy", () => {
	test("modifies the value by the given amount", () => {
		expect(modBy(50, 0.2)).toBe(60);
		expect(modBy(100, 0.5)).toBe(100);
		expect(modBy(200, -0.5)).toBe(100);
	});

	test("returns the original value if amount is not a valid color value", () => {
		expect(modBy(50, NaN)).toBe(50);
		expect(modBy(100, Infinity)).toBe(100);
		expect(modBy(200, -Infinity)).toBe(200);
	});

	test("clamps the result to a maximum of 100", () => {
		expect(modBy(100, 1)).toBe(100);
		expect(modBy(150, 0.5)).toBe(100);
		expect(modBy(200, 0.5)).toBe(100);
	});

	test("formats the result to a decimal", () => {
		expect(modBy(33.3333, 0.1)).toBeCloseTo(36.67, 5);
		expect(modBy(66.6667, 0.1)).toBeCloseTo(73.33, 5);
	});
});

describe("formatDecimal", () => {
	it("should format a number to two decimal places if necessary", () => {
		expect(formatDecimal(1.234)).toBe(1.23);
		expect(formatDecimal(1)).toBe(1);
		expect(formatDecimal()).toBe(1);
	});

	it("should handle negative numbers correctly", () => {
		expect(formatDecimal(-1.234)).toBe(-1.23);
		expect(formatDecimal(-1)).toBe(-1);
	});

	it("should handle zero correctly", () => {
		expect(formatDecimal(0)).toBe(0);
		expect(formatDecimal(0.123)).toBe(0.12);
	});

	it("should handle very small numbers correctly", () => {
		expect(formatDecimal(0.0001)).toBe(0);
		expect(formatDecimal(0.0099)).toBe(0.01);
	});

	it("should handle very large numbers correctly", () => {
		expect(formatDecimal(1234567.987654321)).toBe(1234567.99);
		expect(formatDecimal(1000000000)).toBe(1000000000);
	});
});

describe("clamp", () => {
	it("should clamp a number within the range 0 to max", () => {
		expect(clamp(5, 10)).toBe(5);
		expect(clamp(15, 10)).toBe(10);
		expect(clamp(-5, 10)).toBe(0);
	});

	it("should clamp a string number within the range 0 to max", () => {
		expect(clamp("5", 10)).toBe(5);
		expect(clamp("15", 10)).toBe(10);
		expect(clamp("-5", 10)).toBe(0);
	});

	it("should handle non-numeric strings by clamping to 0", () => {
		expect(clamp("abc", 10)).toBe(0);
		expect(clamp("", 10)).toBe(0);
	});

	it("should handle edge cases", () => {
		expect(clamp(0, 10)).toBe(0);
		expect(clamp(10, 10)).toBe(10);
		expect(clamp(0, 0)).toBe(0);
		expect(clamp(10, 0)).toBe(0);
	});
});
describe("normalizeDegrees", () => {
	it("should normalize values within the range 0-360", () => {
		expect(normalizeDegrees(370)).toBe(360);
		expect(normalizeDegrees(-10)).toBe(0);
		expect(normalizeDegrees(180)).toBe(180);
	});
});

describe("normalizePercentage", () => {
	it("should normalize values within the range 0-100", () => {
		expect(normalizePercentage(110)).toBe(100);
		expect(normalizePercentage(-10)).toBe(0);
		expect(normalizePercentage(50)).toBe(50);
	});
});

describe("normalize8Bit", () => {
	it("should normalize values within the range 0-255", () => {
		expect(normalize8Bit(300)).toBe(255);
		expect(normalize8Bit(-10)).toBe(0);
		expect(normalize8Bit(128)).toBe(128);
	});
});

describe("normalizeAlpha", () => {
	it("should normalize values within the range 0-1", () => {
		expect(normalizeAlpha(1.5)).toBe(1);
		expect(normalizeAlpha(-0.5)).toBe(0);
		expect(normalizeAlpha(0.5)).toBe(0.5);
	});

	it("should use the default value of 1 if no value is provided", () => {
		expect(normalizeAlpha()).toBe(1);
	});
});

describe("generateColorComponents", () => {
	it("should return correct symbols for non-minified, non-cssNext format with alpha = 1", () => {
		const alphaValue = 1;
		const result = generateColorComponents(alphaValue);
		expect(result).toEqual([", ", "", "", "%"]);
	});

	it("should return correct symbols for minified, non-cssNext format with alpha = 1", () => {
		const alphaValue = 1;
		const result = generateColorComponents(alphaValue, { minify: true });
		expect(result).toEqual([",", "", "", ""]);
	});

	it("should return correct symbols for non-minified, cssNext format with alpha = 1", () => {
		const alphaValue = 1;
		const result = generateColorComponents(alphaValue, { cssNext: true });
		expect(result).toEqual([" ", "", "", "%"]);
	});

	it("should return correct symbols for minified, cssNext format with alpha = 1", () => {
		const alphaValue = 1;
		const result = generateColorComponents(alphaValue, {
			minify: true,
			cssNext: true,
		});
		expect(result).toEqual([" ", "", "", ""]);
	});

	it("should return correct symbols for non-minified, non-cssNext format with alpha < 1", () => {
		const alphaValue = 0.5;
		const result = generateColorComponents(alphaValue);
		expect(result).toEqual([", ", ", 0.5", "a", "%"]);
	});

	it("should return correct symbols for minified, non-cssNext format with alpha < 1", () => {
		const alphaValue = 0.5;
		const result = generateColorComponents(alphaValue, { minify: true });
		expect(result).toEqual([",", ",0.5", "a", ""]);
	});

	it("should return correct symbols for non-minified, cssNext format with alpha < 1", () => {
		const alphaValue = 0.5;
		const result = generateColorComponents(alphaValue, { cssNext: true });
		expect(result).toEqual([" ", " / 0.5", "", "%"]);
	});

	it("should return correct symbols for minified, cssNext format with alpha < 1", () => {
		const alphaValue = 0.5;
		const result = generateColorComponents(alphaValue, {
			minify: true,
			cssNext: true,
		});
		expect(result).toEqual([" ", "/0.5", "", ""]);
	});
});
