import { isValidPlugin } from "../../src/core/pluginValidation";

describe("Plugin Validation", () => {
	describe("isValidPlugin function", () => {
		it("should correctly identify an valid plugin", () => {
			const plugins = {
				myPlugin: function () {
					return this.object;
				},
			};

			expect(isValidPlugin(plugins, "myPlugin")).toBeTruthy();
		});

		it("should correctly identify an invalid plugin", () => {
			const plugins = {
				notFunction: "hello",
			};

			// @ts-expect-error should report error for invalid type
			expect(() => isValidPlugin(plugins, "notFunction")).toThrow();
		});
	});
});
