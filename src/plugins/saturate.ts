import { dye } from "../dye";
import { hslToRgb } from "../processing/interconversions";
import { modBy } from "../utils/colorUtils";
import { createPlugin } from "../utils/pluginHelpers";

export const saturate = createPlugin(
	"saturate",
	function (amount: number = 0.1) {
		return dye(
			hslToRgb({ ...this.hsl, s: modBy(this.hsl.s, amount) }),
			this.options,
		);
	},
);

export const desaturate = createPlugin(
	"desaturate",
	function (amount: number = 0.1) {
		return saturate.call(this, -amount);
	},
);
