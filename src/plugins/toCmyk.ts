import { clampCmyk } from "../utils/clampColorHelpers";
import { generateColorComponents } from "../utils/colorUtils";
import { createPlugin } from "../utils/pluginHelpers";

export const toCmyk = createPlugin("toCmyk", function () {
	const [separator, a, suffix, percent] = generateColorComponents(
		this.alpha,
		this.options.formatOptions,
	);

	const { c, m, y, k } = clampCmyk(this.cmyk, true);

	return `cmyk${suffix}(${c}${percent}${separator}${m}${percent}${separator}${y}${percent}${separator}${k}${percent}${a})`;
});
