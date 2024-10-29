import { toRgb } from "../../src/plugins/toRgb";
import { clampRgb } from "../../src/utils/clampColorHelpers";
import { generateColorComponents } from "../../src/utils/colorUtils";

jest.mock("../../src/utils/colorUtils", () => ({
	generateColorComponents: jest.fn(),
}));

jest.mock("../../src/utils/clampColorHelpers", () => ({
	clampRgb: jest.fn(),
}));

describe("toRgb plugin", () => {
	it("should convert the color to an RGB string", () => {
		const mockThis = {
			alpha: 1,
			rgb: { r: 0, g: 1, b: 2 },
			options: { formatOptions: {} },
		};

		// @ts-expect-error mock implementation
		clampRgb.mockReturnValue(mockThis.rgb);
		// @ts-expect-error mock implementation
		generateColorComponents.mockReturnValue([", ", "", "", "%"]);

		const pluginFunction = toRgb.bind(mockThis);
		const result = pluginFunction();

		expect(clampRgb).toHaveBeenCalledWith(mockThis.rgb, true);
		expect(generateColorComponents).toHaveBeenCalledWith(
			mockThis.alpha,
			mockThis.options.formatOptions,
		);
		expect(result).toBe("rgb(0, 1, 2)");
	});

	it("should return an RGB string with alpha channel", () => {
		const mockThis = {
			alpha: 1,
			rgb: { r: 0, g: 1, b: 2, a: 0.5 },
			options: { formatOptions: {} },
		};

		// @ts-expect-error mock implementation
		clampRgb.mockReturnValue(mockThis.rgb);

		// @ts-expect-error mock implementation
		generateColorComponents.mockReturnValue([", ", ", 0.5", "a", "%"]);

		const pluginFunction = toRgb.bind(mockThis);

		const result = pluginFunction();

		expect(clampRgb).toHaveBeenCalledWith(mockThis.rgb, true);

		expect(generateColorComponents).toHaveBeenCalledWith(
			mockThis.alpha,
			mockThis.options.formatOptions,
		);

		expect(result).toBe("rgba(0, 1, 2, 0.5)");
	});
});
