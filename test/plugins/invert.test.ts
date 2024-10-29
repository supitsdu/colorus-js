import { dye } from "../../src/dye";
import { invert } from "../../src/plugins/invert";

describe("invert plugin", () => {
	it("should invert the colors correctly", () => {
		const inputColor = dye({ r: 100, g: 150, b: 200, a: 1 });
		const expectedColor = dye({ r: 155, g: 105, b: 55, a: 1 });

		const result = invert.call(inputColor);

		expect(result.rgb).toEqual(expectedColor.rgb);
	});

	it("should handle edge case of black color", () => {
		const inputColor = dye({ r: 0, g: 0, b: 0, a: 1 });
		const expectedColor = dye({ r: 255, g: 255, b: 255, a: 1 });

		const result = invert.call(inputColor);

		expect(result.rgb).toEqual(expectedColor.rgb);
	});

	it("should handle edge case of white color", () => {
		const inputColor = dye({ r: 255, g: 255, b: 255, a: 1 });
		const expectedColor = dye({ r: 0, g: 0, b: 0, a: 1 });

		const result = invert.call(inputColor);

		expect(result.rgb).toEqual(expectedColor.rgb);
	});
});
