import type { Dye } from "../types";

/**
 * Creates a new plugin with the specified name and methods.
 *
 * @param name the name of the plugin
 * @param plugin the plugin function
 * @returns the plugin with the specified name
 */
export const createPlugin = <T extends Dye.PluginFunction, K extends string>(
	name: K extends string ? (K extends keyof Dye.Properties ? never : K) : never,
	plugin: T,
): T => Object.defineProperty(plugin, "name", { value: name }) as T;

/**
 * Extends the main Dye instance with custom methods.
 * This function ensures that no main methods are overwritten by plugins.
 *
 * @param instance the Dye instance to extend with plugins
 * @param plugins the custom plugins to add to the Dye instance
 * @returns the extended Dye instance
 */
export const integratePlugins = <P extends Dye.DefaultPlugins>(
	instance: Dye.Properties<P>,
	plugins?: P,
): Dye.Instance<P> => {
	if (!plugins) return instance as Dye.Instance<P>;

	for (const methodName in plugins) {
		try {
			if (typeof plugins[methodName] !== "function") {
				throw new TypeError(
					`Plugin '${methodName}' must be a function, received ${typeof plugins[methodName]}`,
				);
			}

			if (methodName in instance) continue; // Prevent overwriting main methods

			Object.defineProperties(instance, {
				// Add the plugin method to the Dye instance
				[methodName]: {
					value: (plugins[methodName] as Dye.PluginFunction).bind(instance),
					writable: false,
					enumerable: false,
					configurable: true,
				},
				// Add the plugin name as a property, helpful for debugging
				[`${methodName}.name`]: {
					value: methodName,
					writable: false,
					enumerable: false,
					configurable: true,
				},
			});
		} catch (e) {
			Object.assign(instance, {
				error: { message: (e as Error).message },
			});
		}
	}

	return instance as Dye.Instance<P>;
};
