import { clampHsl } from "../utils/clampColorHelpers";
import { generateColorComponents } from "../utils/colorUtils";
import { createPlugin } from "../utils/pluginHelpers";

export const toHsl = createPlugin("toHsl", function () {
	const [separator, a, suffix, percent] = generateColorComponents(
		this.alpha,
		this.options.formatOptions,
	);

	const { h, s, l } = clampHsl(this.hsl, true);

	return `hsl${suffix}(${h}${separator}${s}${percent}${separator}${l}${percent}${a})`;
});
