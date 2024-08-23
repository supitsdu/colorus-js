// Assuming you have the ColorPlugin type defined

import {
	hexString,
	isObject,
	nan,
	padString,
	precision,
	utmost,
} from "../src/helpers";

describe("Helper Functions", () => {
	describe("Number Utilities", () => {
		describe("utmost", () => {
			it("should clamp values within the specified range", () => {
				expect(utmost(50, 100)).toBe(50); // Within range
				expect(utmost(150, 100)).toBe(100); // Above max
				expect(utmost(-50, 100)).toBe(0); // Below min
				expect(utmost("75", 100)).toBe(75); // String input
				expect(utmost("120", 100)).toBe(100); // String input above max
			});
		});

		describe("precision", () => {
			it("should round to two decimal places", () => {
				expect(precision(3.1419)).toBe(3.14);
				expect(precision(12.3456)).toBe(12.35);
				expect(precision(10)).toBe(10); // Integer remains unchanged
			});
		});
	});

	describe("String Utilities", () => {
		describe("hexString", () => {
			it("should convert numbers to uppercase hex strings with padding", () => {
				expect(hexString(255, 2)).toBe("FF");
				expect(hexString(255, 4)).toBe("00FF");
				expect(hexString(4095, 3)).toBe("FFF");
				expect(hexString(4095, 6)).toBe("000FFF");
			});
		});

		describe("padString", () => {
			it("should pad short hex strings", () => {
				expect(padString("abc")).toBe("aabbcc");
				expect(padString("f0f")).toBe("ff00ff");
				expect(padString("123a")).toBe("112233aa");
			});

			it("should not pad long hex strings", () => {
				expect(padString("abcdef")).toBe("abcdef");
				expect(padString("12345678")).toBe("12345678");
			});
		});
	});

	describe("Type Checks", () => {
		describe("nan", () => {
			it("should correctly identify NaN values", () => {
				expect(nan(Number.NaN)).toBeTruthy();
				expect(nan("not a number")).toBeTruthy();
				expect(nan(Number.POSITIVE_INFINITY)).toBeTruthy();
				expect(nan(Number.NEGATIVE_INFINITY)).toBeTruthy();
				expect(nan(123)).toBeFalsy();
				expect(nan(0)).toBeFalsy();
				expect(nan(3.14)).toBeFalsy();
			});
		});

		describe("isObject", () => {
			it("should correctly identify objects", () => {
				expect(isObject({})).toBeTruthy();
				expect(isObject({ a: 1, b: "hello" })).toBeTruthy();
				expect(isObject([])).toBeFalsy(); // Array is not considered an object in this context
				expect(isObject(null)).toBeFalsy();
				expect(isObject(undefined)).toBeFalsy();
				expect(isObject("string")).toBeFalsy();
				expect(isObject(123)).toBeFalsy();
			});
		});
	});
});
