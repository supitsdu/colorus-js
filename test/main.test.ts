import * as main from "../src/main";

describe("main exports", () => {
	it("should export dye", () => {
		expect(main.dye).toBeDefined();
	});

	it("should export cmykParser", () => {
		expect(main.cmykParser).toBeDefined();
	});

	it("should export hexParser", () => {
		expect(main.hexParser).toBeDefined();
	});

	it("should export hslParser", () => {
		expect(main.hslParser).toBeDefined();
	});

	it("should export hsvParser", () => {
		expect(main.hsvParser).toBeDefined();
	});

	it("should export rgbParser", () => {
		expect(main.rgbParser).toBeDefined();
	});

	it("should export invert", () => {
		expect(main.invert).toBeDefined();
	});

	it("should export toCmyk", () => {
		expect(main.toCmyk).toBeDefined();
	});

	it("should export toHex", () => {
		expect(main.toHex).toBeDefined();
	});

	it("should export toHsl", () => {
		expect(main.toHsl).toBeDefined();
	});

	it("should export toHsv", () => {
		expect(main.toHsv).toBeDefined();
	});

	it("should export toRgb", () => {
		expect(main.toRgb).toBeDefined();
	});

	it("should export ColorParser", () => {
		expect(main.ColorParser).toBeDefined();
	});

	it("should export clamp", () => {
		expect(main.clamp).toBeDefined();
	});

	it("should export formatDecimal", () => {
		expect(main.formatDecimal).toBeDefined();
	});

	it("should export normalize8Bit", () => {
		expect(main.normalize8Bit).toBeDefined();
	});

	it("should export normalizeAlpha", () => {
		expect(main.normalizeAlpha).toBeDefined();
	});

	it("should export normalizeDegrees", () => {
		expect(main.normalizeDegrees).toBeDefined();
	});

	it("should export normalizePercentage", () => {
		expect(main.normalizePercentage).toBeDefined();
	});

	it("should export generateColorComponents", () => {
		expect(main.generateColorComponents).toBeDefined();
	});

	it("should export createPlugin", () => {
		expect(main.createPlugin).toBeDefined();
	});
});
