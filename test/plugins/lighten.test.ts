import { darken, lighten } from "../../src/plugins/lighten";

describe("lighten plugin", () => {
	it("should lighten the color by the given amount", () => {
		const color = { hsl: { h: 0, s: 100, l: 50 }, options: {} };
		const result = lighten.call(color, 0.1);
		expect(result.hsl.l).toBeCloseTo(55);
	});

	it("should not exceed the lightness value of 1", () => {
		const color = { hsl: { h: 0, s: 100, l: 95 }, options: {} };
		const result = lighten.call(color, 0.1);
		expect(result.hsl.l).toBeLessThanOrEqual(100);
	});
});

describe("darken plugin", () => {
	it("should darken the color by the given amount", () => {
		const color = { hsl: { h: 0, s: 100, l: 50 }, options: {} };
		const result = darken.call(color, 0.1);
		expect(result.hsl.l).toBeCloseTo(45);
	});

	it("should not go below the lightness value of 0", () => {
		const color = { hsl: { h: 0, s: 100, l: 5 }, options: {} };
		const result = darken.call(color, 0.1);
		expect(result.hsl.l).toBeGreaterThanOrEqual(0);
	});
});
