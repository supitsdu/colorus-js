import { isColorValue, isObject } from "../../src/utils/validation";

describe("isColorValue", () => {
	it("should return true for finite numbers", () => {
		expect(isColorValue(123)).toBe(true);
		expect(isColorValue(0)).toBe(true);
		expect(isColorValue(+123)).toBe(true);
		expect(isColorValue(-123)).toBe(true);
	});

	it("should return true for numerical strings", () => {
		expect(isColorValue("123")).toBe(true);
		expect(isColorValue("0")).toBe(true);
		expect(isColorValue("0.233")).toBe(true);
	});

	it("should return false for non-numerical strings", () => {
		expect(isColorValue("abc")).toBe(false);
		expect(isColorValue("123abc")).toBe(false);
		expect(isColorValue("NaN")).toBe(false);
	});

	it("should return false for non-number values", () => {
		expect(isColorValue(NaN)).toBe(false);
		expect(isColorValue(null)).toBe(false);
		expect(isColorValue(undefined)).toBe(false);
		expect(isColorValue({})).toBe(false);
		expect(isColorValue([])).toBe(false);
	});
});

describe("isObject", () => {
	it("should return true for dictionary-like objects", () => {
		expect(isObject({})).toBe(true);
		expect(isObject({ key: "value" })).toBe(true);
	});

	it("should return false for non-objects", () => {
		expect(isObject(null)).toBe(false);
		expect(isObject(undefined)).toBe(false);
		expect(isObject(123)).toBe(false);
		expect(isObject("string")).toBe(false);
		expect(isObject([])).toBe(false);
	});
});
