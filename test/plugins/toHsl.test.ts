import { toHsl } from "../../src/plugins/toHsl";
import { clampHsl } from "../../src/utils/clampColorHelpers";
import { generateColorComponents } from "../../src/utils/colorUtils";

jest.mock("../../src/utils/colorUtils", () => ({
	generateColorComponents: jest.fn(),
}));

jest.mock("../../src/utils/clampColorHelpers", () => ({
	clampHsl: jest.fn(),
}));

describe("toHsl plugin", () => {
	it("should convert the color to a HSL string", () => {
		const mockThis = {
			alpha: 1,
			hsl: { h: 0, s: 1, l: 2 },
			options: { formatOptions: {} },
		};

		// @ts-expect-error mock implementation
		clampHsl.mockReturnValue(mockThis.hsl);
		// @ts-expect-error mock implementation
		generateColorComponents.mockReturnValue([", ", "", "", "%"]);

		const pluginFunction = toHsl.bind(mockThis);
		const result = pluginFunction();

		expect(clampHsl).toHaveBeenCalledWith(mockThis.hsl, true);
		expect(generateColorComponents).toHaveBeenCalledWith(
			mockThis.alpha,
			mockThis.options.formatOptions,
		);
		expect(result).toBe("hsl(0, 1%, 2%)");
	});

	it("should return a HSL string with alpha channel", () => {
		const mockThis = {
			alpha: 0.5,
			hsl: { h: 0, s: 1, l: 2, a: 0.5 },
			options: { formatOptions: {} },
		};

		// @ts-expect-error mock implementation
		clampHsl.mockReturnValue(mockThis.hsl);

		// @ts-expect-error mock implementation
		generateColorComponents.mockReturnValue([", ", ", 0.5", "a", "%"]);

		const pluginFunction = toHsl.bind(mockThis);

		const result = pluginFunction();

		expect(clampHsl).toHaveBeenCalledWith(mockThis.hsl, true);

		expect(generateColorComponents).toHaveBeenCalledWith(
			mockThis.alpha,
			mockThis.options.formatOptions,
		);

		expect(result).toBe("hsla(0, 1%, 2%, 0.5)");
	});
});
