import { toCmyk } from "../../src/plugins/toCmyk";
import { clampCmyk } from "../../src/utils/clampColorHelpers";
import { generateColorComponents } from "../../src/utils/colorUtils";

jest.mock("../../src/utils/colorUtils", () => ({
	generateColorComponents: jest.fn(),
}));

jest.mock("../../src/utils/clampColorHelpers", () => ({
	clampCmyk: jest.fn(),
}));

describe("toCmyk plugin", () => {
	it("should convert the color to a CMYK string", () => {
		const mockThis = {
			alpha: 1,
			cmyk: { c: 0, m: 1, y: 2, k: 3 },
			options: { formatOptions: {} },
		};

		// @ts-expect-error mock implementation
		clampCmyk.mockReturnValue(mockThis.cmyk);
		// @ts-expect-error mock implementation
		generateColorComponents.mockReturnValue([", ", "", "", "%"]);

		const pluginFunction = toCmyk.bind(mockThis);
		const result = pluginFunction();

		expect(clampCmyk).toHaveBeenCalledWith(mockThis.cmyk, true);
		expect(generateColorComponents).toHaveBeenCalledWith(
			mockThis.alpha,
			mockThis.options.formatOptions,
		);
		expect(result).toBe("cmyk(0%, 1%, 2%, 3%)");
	});

	it("should return a CMYK string with alpha channel", () => {
		const mockThis = {
			cmyk: { c: 0, m: 1, y: 2, k: 3, a: 0.5 },
			alpha: 0.5,
			options: { formatOptions: {} },
		};

		// @ts-expect-error mock implementation
		clampCmyk.mockReturnValue(mockThis.cmyk);

		// @ts-expect-error mock implementation
		generateColorComponents.mockReturnValue([", ", ", 0.5", "a", "%"]);

		const pluginFunction = toCmyk.bind(mockThis);

		const result = pluginFunction();

		expect(clampCmyk).toHaveBeenCalledWith(mockThis.cmyk, true);

		expect(generateColorComponents).toHaveBeenCalledWith(
			mockThis.alpha,
			mockThis.options.formatOptions,
		);

		expect(result).toBe("cmyka(0%, 1%, 2%, 3%, 0.5)");
	});
});
