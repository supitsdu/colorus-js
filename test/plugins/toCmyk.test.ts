import { toCmyk } from "../../src/plugins/toCmyk";

describe("toCmyk plugin", () => {
	test("should convert to CMYK with minify enabled", () => {
		const result = toCmyk.call({
			cmyk: { c: 50, m: 50, y: 0, k: 20, a: 1 },
			alpha: 1,
			options: { formatOptions: { minify: true } },
		});
		expect(result).toBe("cmyk(50,50,0,20)");
	});

	test("should convert to CMYK with minify disabled", () => {
		const result = toCmyk.call({
			cmyk: { c: 50, m: 50, y: 0, k: 20, a: 1 },
			alpha: 1,
			options: { formatOptions: { minify: false } },
		});

		expect(result).toBe("cmyk(50%, 50%, 0%, 20%)");
	});

	test("should convert to CMYK with CSS Next enabled", () => {
		const result = toCmyk.call({
			cmyk: { c: 50, m: 50, y: 0, k: 20, a: 1 },
			alpha: 1,
			options: { formatOptions: { cssNext: true } },
		});

		expect(result).toBe("cmyk(50% 50% 0% 20%)");
	});

	test("should convert to CMYK with CSS Next disabled", () => {
		const result = toCmyk.call({
			cmyk: { c: 50, m: 50, y: 0, k: 20, a: 1 },
			alpha: 1,
			options: { formatOptions: { cssNext: false } },
		});

		expect(result).toBe("cmyk(50%, 50%, 0%, 20%)");
	});

	test("should convert to CMYK with combined options", () => {
		const result = toCmyk.call({
			cmyk: { c: 50, m: 50, y: 0, k: 20, a: 1 },
			alpha: 1,
			options: { formatOptions: { cssNext: true, minify: true } },
		});

		expect(result).toBe("cmyk(50 50 0 20)");
	});
});
