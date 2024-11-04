import { toHsv } from "../../src/plugins/toHsv";

describe("toHsv plugin", () => {
	test("should convert to HSV with minify enabled", () => {
		const result = toHsv.call({
			hsv: { h: 240, s: 47.62, v: 58.82, a: 1 },
			alpha: 1,
			options: { formatOptions: { minify: true } },
		});
		expect(result).toBe("hsv(240,48,59)");
	});

	test("should convert to HSV with minify disabled", () => {
		const result = toHsv.call({
			hsv: { h: 240, s: 47.62, v: 58.82, a: 1 },
			alpha: 1,
			options: { formatOptions: { minify: false } },
		});

		expect(result).toBe("hsv(240, 48%, 59%)");
	});

	test("should convert to HSV with CSS Next enabled", () => {
		const result = toHsv.call({
			hsv: { h: 240, s: 47.62, v: 58.82, a: 1 },
			alpha: 1,
			options: { formatOptions: { cssNext: true } },
		});

		expect(result).toBe("hsv(240 48% 59%)");
	});

	test("should convert to HSV with CSS Next disabled", () => {
		const result = toHsv.call({
			hsv: { h: 240, s: 47.62, v: 58.82, a: 1 },
			alpha: 1,
			options: { formatOptions: { cssNext: false } },
		});

		expect(result).toBe("hsv(240, 48%, 59%)");
	});

	test("should convert to HSV with combined options", () => {
		const result = toHsv.call({
			hsv: { h: 240, s: 47.62, v: 58.82, a: 1 },
			alpha: 1,
			options: { formatOptions: { cssNext: true, minify: true } },
		});

		expect(result).toBe("hsv(240 48 59)");
	});
});
