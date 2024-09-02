import { errorMessages } from "../constants/errorMessages";
import type { DyePlugins } from "../types";

/**
 * Check if the plugin is Not a Plugin
 * @param plugins An key-value object with plugin functions to apply.
 * @param name Method name of the Plugin
 * @return True if the plugins is not valid, undefined in case it's valid.
 */
export const isValidPlugin = (
	plugins: DyePlugins,
	name: string,
): name is keyof typeof plugins => {
	if (!Object.hasOwn(plugins, name)) return false;

	if (typeof plugins[name] !== "function") {
		throw new TypeError(errorMessages.invalidPlugin(name));
	}

	return true;
};
