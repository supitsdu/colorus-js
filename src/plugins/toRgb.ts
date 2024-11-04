import { clampRgb } from "../utils/clampColorHelpers";
import { generateColorComponents } from "../utils/colorUtils";
import { createPlugin } from "../utils/pluginHelpers";

export const toRgb = createPlugin("toRgb", function () {
	const [separator, a, suffix] = generateColorComponents(
		this.alpha,
		this.options.formatOptions,
	);

	const { r, g, b } = clampRgb(this.rgb, true);

	return `rgb${suffix}(${r}${separator}${g}${separator}${b}${a})`;
});
