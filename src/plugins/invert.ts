import { dye } from "../dye";
import { createPlugin } from "../utils/pluginHelpers";

export const invert = createPlugin("invert", function () {
	return dye(
		{
			r: 255 - this.rgb.r,
			g: 255 - this.rgb.g,
			b: 255 - this.rgb.b,
			a: this.rgb.a,
		},
		this.options,
	);
});
