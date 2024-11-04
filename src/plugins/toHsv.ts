import { clampHsv } from "../utils/clampColorHelpers";
import { generateColorComponents } from "../utils/colorUtils";
import { createPlugin } from "../utils/pluginHelpers";

export const toHsv = createPlugin("toHsv", function () {
	const [separator, a, suffix, percent] = generateColorComponents(
		this.alpha,
		this.options.formatOptions,
	);

	const { h, s, v } = clampHsv(this.hsv, true);

	return `hsv${suffix}(${h}${separator}${s}${percent}${separator}${v}${percent}${a})`;
});
