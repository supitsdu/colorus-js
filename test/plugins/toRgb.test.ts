import { toRgb } from "../../src/plugins/toRgb";

describe("toRgb plugin", () => {
	test("should convert to RGB with minify enabled", () => {
		const result = toRgb.call({
			rgb: { r: 100, g: 100, b: 200, a: 1 },
			alpha: 1,
			options: { formatOptions: { minify: true } },
		});
		expect(result).toBe("rgb(100,100,200)");
	});

	test("should convert to RGB with minify disabled", () => {
		const result = toRgb.call({
			rgb: { r: 100, g: 100, b: 200, a: 1 },
			alpha: 1,
			options: { formatOptions: { minify: false } },
		});

		expect(result).toBe("rgb(100, 100, 200)");
	});

	test("should convert to RGB with CSS Next enabled", () => {
		const result = toRgb.call({
			rgb: { r: 100, g: 100, b: 200, a: 1 },
			alpha: 1,
			options: { formatOptions: { cssNext: true } },
		});

		expect(result).toBe("rgb(100 100 200)");
	});

	test("should convert to RGB with CSS Next disabled", () => {
		const result = toRgb.call({
			rgb: { r: 100, g: 100, b: 200, a: 1 },
			alpha: 1,
			options: { formatOptions: { cssNext: false } },
		});

		expect(result).toBe("rgb(100, 100, 200)");
	});

	test("should convert to RGB with combined options", () => {
		const result = toRgb.call({
			rgb: { r: 100, g: 100, b: 200, a: 1 },
			alpha: 1,
			options: { formatOptions: { cssNext: true, minify: true } },
		});

		expect(result).toBe("rgb(100 100 200)");
	});
});
