import {
	regexCmyk,
	regexHex,
	regexHsl,
	regexHsv,
	regexRgb,
} from "../src/patterns";

describe("regexHex", () => {
	// Run on every test
	beforeEach(() => {
		regexHex.lastIndex = 0;
	});

	it("matches valid hex color", () => {
		expect("#f00").toMatch(regexHex);
		expect("#ff0000").toMatch(regexHex);
		expect("#ff0000ff").toMatch(regexHex);
		expect("FF0000").toMatch(regexHex);
		expect("FCFCFCFC").toMatch(regexHex);
		expect("000").toMatch(regexHex);
	});

	it("extracts correct values from valid hex color", () => {
		const result = regexHex.exec("#ff0000");
		expect(result).not.toBeNull();
		expect(result![1]).toBe("ff0000");
	});

	it("extracts correct values from valid hex with alpha color", () => {
		const result = regexHex.exec("#ff0000c3");
		expect(result).not.toBeNull();
		expect(result![1]).toBe("ff0000c3");
	});

	it("returns null for invalid hex color", () => {
		expect(regexHex.exec("#ff0000ff00")).toBeNull();
		expect(regexHex.exec("#ff0000 extra")).toBeNull();
		expect(regexHex.exec("#ff0000,")).toBeNull();
		expect(regexHex.exec("#ff0000/")).toBeNull();
	});
});

describe("regexRgb", () => {
	// Run on every test
	beforeEach(() => {
		regexRgb.lastIndex = 0;
	});

	it("matches valid RGB color", () => {
		expect("rgb(255 0 255)").toMatch(regexRgb);
		expect("rgb(255 0 255 / 0.2)").toMatch(regexRgb);
		expect("rgb(255 0 255 / 1)").toMatch(regexRgb);
		expect("rgba(255 0 255 / 1)").toMatch(regexRgb);

		expect("rgb(255, 0, 255)").toMatch(regexRgb);
		expect("rgb(255, 0, 255, 0.2)").toMatch(regexRgb);
		expect("rgb(255, 0, 255, 1)").toMatch(regexRgb);
		expect("rgba(255, 0, 255, 1)").toMatch(regexRgb);
	});

	it("extracts correct values from valid RGB color", () => {
		const result = regexRgb.exec("rgb(255 0 255)");
		expect(result).not.toBeNull();
		expect(result![1]).toBe("255");
		expect(result![2]).toBe("0");
		expect(result![3]).toBe("255");
		expect(result![4]).toBeUndefined();
	});

	it("extracts correct values from valid RGBA color", () => {
		const result = regexRgb.exec("rgb(255 0 255 / 0.2)");

		expect(result).not.toBeNull();
		expect(result![1]).toBe("255");
		expect(result![2]).toBe("0");
		expect(result![3]).toBe("255");
		expect(result![4]).toBe("0.2");
	});

	it("returns null for invalid RGB color", () => {
		expect(regexRgb.exec("rgb(255, 0, 255, 255, 0.2)")).toBeNull();
		expect(regexRgb.exec("rgb(255,0,255,255,0.3)")).toBeNull();
		expect(regexRgb.exec("rgb(255, 0, 255) extra")).toBeNull();
		expect(regexRgb.exec("rgb(255, 0, 255,)")).toBeNull();
		expect(regexRgb.exec("rgb(255, 0, 255,/ 0)")).toBeNull();
	});
});

describe("regexHsl", () => {
	// Run on every test
	beforeEach(() => {
		regexHsl.lastIndex = 0;
	});

	it("matches valid HSL color", () => {
		expect("hsl(0 100% 50%)").toMatch(regexHsl);
		expect("hsl(0 100% 50% / 0.2)").toMatch(regexHsl);
		expect("hsl(0, 100%, 50%)").toMatch(regexHsl);
		expect("hsl(0, 100%, 50%, 0.2)").toMatch(regexHsl);
		expect("hsla(0, 100%, 50%, 1)").toMatch(regexHsl);
	});

	it("extracts correct values from valid HSL color", () => {
		const result = regexHsl.exec("hsl(0 100% 50%)");
		expect(result).not.toBeNull();
		expect(result![1]).toBe("0");
		expect(result![2]).toBe("100");
		expect(result![3]).toBe("50");
		expect(result![4]).toBeUndefined();
	});

	it("extracts correct values from valid HSLA color", () => {
		const result = regexHsl.exec("hsl(0 100% 50% / 0.2)");
		expect(result).not.toBeNull();
		expect(result![1]).toBe("0");
		expect(result![2]).toBe("100");
		expect(result![3]).toBe("50");
		expect(result![4]).toBe("0.2");
	});

	it("returns null for invalid HSL color", () => {
		expect(regexHsl.exec("hsl(0, 100%, 50%, 1, 0.2)")).toBeNull();
		expect(regexHsl.exec("hsl(0,100%,50%,1,0.3)")).toBeNull();
		expect(regexHsl.exec("hsl(0, 100%, 50%) extra")).toBeNull();
		expect(regexHsl.exec("hsl(0 100% 50% /)")).toBeNull();
		expect(regexHsl.exec("hsl(0, 100%, 50%,)")).toBeNull();
		expect(regexHsl.exec("hsl(0, 100%, 50%,/ 0)")).toBeNull();
	});
});

describe("regexHsv", () => {
	// Run on every test
	beforeEach(() => {
		regexHsv.lastIndex = 0;
	});

	it("matches valid HSV color", () => {
		expect("hsv(0 100% 100%)").toMatch(regexHsv);
		expect("hsv(0 100% 100% / 0.2)").toMatch(regexHsv);
		expect("hsv(0, 100%, 100%)").toMatch(regexHsv);
		expect("hsv(0, 100%, 100%, 0.2)").toMatch(regexHsv);
		expect("hsva(0, 100%, 100%, 1)").toMatch(regexHsv);
	});

	it("extracts correct values from valid HSV color", () => {
		const result = regexHsv.exec("hsv(0 100% 100%)");
		expect(result).not.toBeNull();
		expect(result![1]).toBe("0");
		expect(result![2]).toBe("100");
		expect(result![3]).toBe("100");
		expect(result![4]).toBeUndefined();
	});

	it("extracts correct values from valid HSVA color", () => {
		const result = regexHsv.exec("hsv(0 100% 100% / 0.2)");
		expect(result).not.toBeNull();
		expect(result![1]).toBe("0");
		expect(result![2]).toBe("100");
		expect(result![3]).toBe("100");
		expect(result![4]).toBe("0.2");
	});

	it("returns null for invalid HSV color", () => {
		expect(regexHsv.exec("hsv(0, 100%, 100%, 1, 0.2)")).toBeNull();
		expect(regexHsv.exec("hsv(0,100%,100%,1,0.3)")).toBeNull();
		expect(regexHsv.exec("hsv(0, 100%, 100%) extra")).toBeNull();
		expect(regexHsv.exec("hsv(0 100% 100% /)")).toBeNull();
		expect(regexHsv.exec("hsv(0, 100%, 100%,)")).toBeNull();
		expect(regexHsv.exec("hsv(0, 100%, 100%,/ 0)")).toBeNull();
	});
});

describe("regexCmyk", () => {
	// Run on every test
	beforeEach(() => {
		regexCmyk.lastIndex = 0;
	});

	it("matches valid CMYK color", () => {
		expect("cmyk(0 100% 100% 0)").toMatch(regexCmyk);
		expect("cmyk(0 100% 100% 0 / 0.2)").toMatch(regexCmyk);
		expect("cmyk(0, 100%, 100%, 0)").toMatch(regexCmyk);
		expect("cmyk(0, 100%, 100%, 0, 0.2)").toMatch(regexCmyk);
		expect("cmyka(0, 100%, 100%, 0, 1)").toMatch(regexCmyk);
	});

	it("extracts correct values from valid CMYK color", () => {
		const result = regexCmyk.exec("cmyk(0 100% 100% 0)");
		expect(result).not.toBeNull();
		expect(result![1]).toBe("0");
		expect(result![2]).toBe("100");
		expect(result![3]).toBe("100");
		expect(result![4]).toBe("0");
		expect(result![5]).toBeUndefined();
	});

	it("extracts correct values from valid CMYKA color", () => {
		const result = regexCmyk.exec("cmyk(0 100% 100% 0 / 0.2)");
		expect(result).not.toBeNull();
		expect(result![1]).toBe("0");
		expect(result![2]).toBe("100");
		expect(result![3]).toBe("100");
		expect(result![4]).toBe("0");
		expect(result![5]).toBe("0.2");
	});

	it("returns null for invalid CMYK color", () => {
		expect(regexCmyk.exec("cmyk(0, 100%, 100%, 0, 0.2, 0.2)")).toBeNull();
		expect(regexCmyk.exec("cmyk(0,100%,100%,0,2,0.3)")).toBeNull();
		expect(regexCmyk.exec("cmyk(0, 100%, 100%, 0) extra")).toBeNull();
		expect(regexCmyk.exec("cmyk(0 100 100 0 /)")).toBeNull();
		expect(regexCmyk.exec("cmyk(0, 100, 100, 0, 1, 0.2)")).toBeNull();
	});
});
