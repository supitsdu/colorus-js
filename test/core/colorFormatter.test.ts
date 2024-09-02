import colorFormatter from "../../src/core/colorFormatter";
import { forEachColorFormat } from "../__fixtures__";

describe("ColorFormatter", () => {
	describe("ColorFormatter - Format Valid Color Object", () => {
		forEachColorFormat(
			"should format valid %s color to string",
			(format, color) => {
				expect(colorFormatter[format](color.object)).toBe(color.string);
			},
			["rgb", "cmyk", "hsl", "hsv"],
		);
	});
});
