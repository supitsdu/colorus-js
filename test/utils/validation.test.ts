import {
	createColorAnalyzer,
	isColorValue,
	isObject,
	testCmyk,
	testHsl,
	testHsv,
	testRgb,
} from "../../src/utils/validation";

describe("createColorAnalyzer", () => {
	const keys = ["r", "g", "b"];
	const regex =
		/^rgba?\(\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}(:?\s*,\s*\d?\.\d{1,})?\)$/i;

	const modelChecker = createColorAnalyzer(keys, regex);

	it("should return the joined keys if the object matches the model", () => {
		expect(modelChecker({ r: 255, g: 255, b: 255 })).toBe("rgb");
		expect(modelChecker({ r: "255", g: "255", b: "255" })).toBe("rgb");
		expect(modelChecker("rgb(255, 255, 255)")).toBe("rgb");
		expect(modelChecker("rgba(255, 255, 255, 0.2)")).toBe("rgb");
	});

	it("should return null if the object does not match the model", () => {
		expect(modelChecker({ r: 255, g: 255 })).toBeNull();
		expect(modelChecker({ r: 255, g: 255, b: "abc" })).toBeNull();
		expect(modelChecker({ r: 255, g: 255, m: 0, k: 1 })).toBeNull();
		expect(modelChecker({ a: 1 })).toBeNull();
		expect(modelChecker("#")).toBeNull();
	});

	it("should handle string values correctly", () => {
		expect(modelChecker({ r: "0", g: "0", b: "0" })).toBe("rgb");
		expect(modelChecker({ r: "255", g: "255", b: "255" })).toBe("rgb");
		expect(modelChecker({ r: "256", g: "255", b: "255" })).toBe("rgb");
		expect(modelChecker({ r: "abc", g: "255", b: "255" })).toBeNull();
	});

	describe("when the first parameter is a string", () => {
		const hexRegex = /^#([0-9A-F]{3}){1,2}$/i;
		const hexChecker = createColorAnalyzer("hex", hexRegex);

		it("should return the string key if the value matches the regex", () => {
			expect(hexChecker("#FFF")).toBe("hex");
			expect(hexChecker("#FFFFFF")).toBe("hex");
		});

		it("should return null if the value does not match the regex", () => {
			expect(hexChecker("#FFFF")).toBeNull();
			expect(hexChecker("FFF")).toBeNull();
			expect(hexChecker("#ZZZ")).toBeNull();
			expect(hexChecker({ hex: "#FFF" })).toBeNull();
		});
	});
});

describe("isColorModel", () => {
	describe("testRgb", () => {
		test("should validate valid RGB color codes", () => {
			expect(testRgb({ r: 255, g: 255, b: 255 })).toBe("rgba");
			expect(testRgb({ r: 0, g: 0, b: 0 })).toBe("rgba");
			expect(testRgb({ r: 255, g: 87, b: 51 })).toBe("rgba");
			expect(testRgb({ r: 255, g: 255, b: 255 })).toBe("rgba");
		});

		test("should invalidate invalid RGB color codes", () => {
			expect(testRgb({ r: 256, g: 255, b: undefined })).toBe(null);
			expect(testRgb({ r: 255, g: 255 })).toBe(null);
		});
	});

	describe("testHsl", () => {
		test("should validate valid HSL color codes", () => {
			expect(testHsl({ h: 360, s: 100, l: 100 })).toBe("hsla");
			expect(testHsl({ h: 0, s: 0, l: 0 })).toBe("hsla");
			expect(testHsl({ h: 180, s: 50, l: 50 })).toBe("hsla");
			expect(testHsl({ h: 360, s: 100, l: 100 })).toBe("hsla");
		});

		test("should invalidate invalid HSL color codes", () => {
			expect(testHsl({ h: 361, s: 100, l: undefined })).toBe(null);
			expect(testHsl({ h: 360, s: 100 })).toBe(null);
		});
	});

	describe("testHsv", () => {
		test("should validate valid HSV color codes", () => {
			expect(testHsv({ h: 360, s: 100, v: 100 })).toBe("hsva");
			expect(testHsv({ h: 0, s: 0, v: 0 })).toBe("hsva");
			expect(testHsv({ h: 180, s: 50, v: 50 })).toBe("hsva");
			expect(testHsv({ h: 360, s: 100, v: 100 })).toBe("hsva");
		});

		test("should invalidate invalid HSV color codes", () => {
			expect(testHsv({ h: 361, s: 100, v: undefined })).toBe(null);
			expect(testHsv({ h: 360, s: 100 })).toBe(null);
		});
	});

	describe("testCmyk", () => {
		test("should validate valid CMYK color codes", () => {
			expect(testCmyk({ c: 0, m: 0, y: 0, k: 0 })).toBe("cmyka");
			expect(testCmyk({ c: 100, m: 100, y: 100, k: 100 })).toBe("cmyka");
			expect(testCmyk({ c: 50, m: 50, y: 50, k: 50 })).toBe("cmyka");
		});

		test("should invalidate invalid CMYK color codes", () => {
			expect(testCmyk({ c: 0, m: 0, y: undefined })).toBe(null);
			expect(testCmyk({ c: 100, m: 100, y: 100 })).toBe(null);
		});
	});
});

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
