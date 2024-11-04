import { createPlugin, integratePlugins } from "../../src/utils/pluginHelpers";

describe("createPlugin", () => {
	it("should create a plugin with the specified name", () => {
		const plugin = () => {};
		const namedPlugin = createPlugin("testPlugin", plugin);
		expect(namedPlugin.name).toBe("testPlugin");
	});
});

describe("integratePlugins", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it("should integrate custom plugins into the Dye instance", () => {
		const props = { existingMethod: () => "existing" };
		const plugins = {
			newMethod: () => {
				return "new";
			},
		};

		// @ts-expect-error - we're calling the plugin function directly
		const extendedProps = integratePlugins(props, plugins);

		// @ts-expect-error - we're testing the plugin function directly
		expect(extendedProps.existingMethod()).toBe("existing");
		expect(extendedProps.newMethod()).toBe("new");
	});

	it("should not overwrite existing methods in the Dye instance", () => {
		const props = { existingMethod: () => "existing" };
		const plugins = {
			existingMethod: () => {
				return "new";
			},
		};

		// @ts-expect-error - we're calling the plugin function directly
		const extendedProps = integratePlugins(props, plugins);
		expect(extendedProps.existingMethod()).toBe("existing");
	});

	it("should handle errors gracefully", () => {
		const props = {};
		const plugins = { invalidPlugin: "not a function" };

		// @ts-expect-error - we're calling the plugin function directly
		const extendedProps = integratePlugins(props, plugins);
		expect(extendedProps).toEqual({
			error: {
				message: "Plugin 'invalidPlugin' must be a function, received string",
			},
		});
	});
});
