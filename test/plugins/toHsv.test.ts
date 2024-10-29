import { toHsv } from "../../src/plugins/toHsv";
import { clampHsv } from "../../src/utils/clampColorHelpers";
import { generateColorComponents } from "../../src/utils/colorUtils";

jest.mock("../../src/utils/colorUtils", () => ({
	generateColorComponents: jest.fn(),
}));

jest.mock("../../src/utils/clampColorHelpers", () => ({
	clampHsv: jest.fn(),
}));
describe("toHsv plugin", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should convert the color to an HSV string", () => {
		const mockThis = {
			alpha: 1,
			hsv: { h: 0, s: 100, v: 12 },
			options: { formatOptions: {} },
		};

		// @ts-expect-error mock implementation
		clampHsv.mockReturnValue(mockThis.hsv);
		// @ts-expect-error mock implementation
		generateColorComponents.mockReturnValue([", ", "", "", "%"]);

		const pluginFunction = toHsv.bind(mockThis);
		const result = pluginFunction();

		expect(clampHsv).toHaveBeenCalledWith(mockThis.hsv, true);
		expect(generateColorComponents).toHaveBeenCalledWith(
			mockThis.alpha,
			mockThis.options.formatOptions,
		);
		expect(result).toBe("hsv(0, 100%, 12%)");
	});

	it("should return an HSV string with alpha channel", () => {
		const mockThis = {
			alpha: 0.5,
			hsv: { h: 0, s: 90, v: 12, a: 0.5 },
			options: { formatOptions: {} },
		};

		// @ts-expect-error mock implementation
		clampHsv.mockReturnValue(mockThis.hsv);
		// @ts-expect-error mock implementation
		generateColorComponents.mockReturnValue([", ", ", 0.5", "a", "%"]);

		const pluginFunction = toHsv.bind(mockThis);
		const result = pluginFunction();

		expect(clampHsv).toHaveBeenCalledWith(mockThis.hsv, true);
		expect(generateColorComponents).toHaveBeenCalledWith(
			mockThis.alpha,
			mockThis.options.formatOptions,
		);
		expect(result).toBe("hsva(0, 90%, 12%, 0.5)");
	});
});
