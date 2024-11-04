import { desaturate, saturate } from "../../src/plugins/saturate";

describe("saturate plugin", () => {
	it("should increase the saturation by the given amount", () => {
		const initContext = { hsl: { h: 0, s: 50, l: 50 }, options: {} };

		const result = saturate.call(initContext, 0.2);
		expect(result.hsl.s).toBeCloseTo(60);
	});
});

describe("desaturate plugin", () => {
	it("should decrease the saturation by the given amount", () => {
		const initContext = { hsl: { h: 0, s: 50, l: 50 }, options: {} };

		const result = desaturate.call(initContext, 0.1);
		expect(result.hsl.s).toBeCloseTo(45);
	});
});
