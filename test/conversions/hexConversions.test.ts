import { hexToRgb } from "../../src/conversions/hexConversions";

describe("HEX Color Conversion", () => {
	describe("hexToRgb", () => {
		it("should convert basic 6-digit hex colors to RGB", () => {
			expect(hexToRgb("ff0000")).toEqual({ r: 255, g: 0, b: 0, a: 1 });
			expect(hexToRgb("00ff00")).toEqual({ r: 0, g: 255, b: 0, a: 1 });
			expect(hexToRgb("0000ff")).toEqual({ r: 0, g: 0, b: 255, a: 1 });
		});

		it("should handle 8-digit hex colors with alpha correctly", () => {
			expect(hexToRgb("ff000080")).toEqual({ r: 255, g: 0, b: 0, a: 0.5 });
			expect(hexToRgb("00ff00ff")).toEqual({ r: 0, g: 255, b: 0, a: 1 });
		});
	});
});
