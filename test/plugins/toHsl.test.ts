import { toHsl } from "../../src/plugins/toHsl";

describe("toHsl plugin", () => {
	test("should convert to HSL with minify enabled", () => {
		const result = toHsl.call({
			hsl: { h: 240, s: 50, l: 59, a: 1 },
			alpha: 1,
			options: { formatOptions: { minify: true } },
		});
		expect(result).toBe("hsl(240,50,59)");
	});

	test("should convert to HSL with minify disabled", () => {
		const result = toHsl.call({
			hsl: { h: 240, s: 50, l: 59, a: 1 },
			alpha: 1,
			options: { formatOptions: { minify: false } },
		});

		expect(result).toBe("hsl(240, 50%, 59%)");
	});

	test("should convert to HSL with CSS Next enabled", () => {
		const result = toHsl.call({
			hsl: { h: 240, s: 50, l: 59, a: 1 },
			alpha: 1,
			options: { formatOptions: { cssNext: true } },
		});

		expect(result).toBe("hsl(240 50% 59%)");
	});

	test("should convert to HSL with CSS Next disabled", () => {
		const result = toHsl.call({
			hsl: { h: 240, s: 50, l: 59, a: 1 },
			alpha: 1,
			options: { formatOptions: { cssNext: false } },
		});

		expect(result).toBe("hsl(240, 50%, 59%)");
	});

	test("should convert to HSL with combined options", () => {
		const result = toHsl.call({
			hsl: { h: 240, s: 50, l: 59, a: 1 },
			alpha: 1,
			options: { formatOptions: { cssNext: true, minify: true } },
		});

		expect(result).toBe("hsl(240 50 59)");
	});
});
