import { dye } from "../dye";
import { hslToRgb } from "../processing/interconversions";
import { modBy } from "../utils/colorUtils";
import { createPlugin } from "../utils/pluginHelpers";

export const lighten = createPlugin("lighten", function (amount: number = 0.1) {
	return dye(
		hslToRgb({ ...this.hsl, l: modBy(this.hsl.l, amount) }),
		this.options,
	);
});

export const darken = createPlugin("darken", function (amount: number = 0.1) {
	return lighten.call(this, -amount);
});
