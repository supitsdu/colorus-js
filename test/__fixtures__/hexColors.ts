import { rgbColors } from "./rgbColors";
import type { TestColors } from ".";

export const hexColors: TestColors["hex"] = {
	black: {
		object: rgbColors.black.object,
		string: "#000000",
	},
	white: {
		object: rgbColors.white.object,
		string: "#ffffff",
	},
	red: {
		object: rgbColors.red.object,
		string: "#ff0000",
	},
	lime: {
		object: rgbColors.lime.object,
		string: "#00ff00",
	},
	blue: {
		object: rgbColors.blue.object,
		string: "#0000ff",
	},
	yellow: {
		object: rgbColors.yellow.object,
		string: "#ffff00",
	},
	aqua: {
		object: rgbColors.aqua.object,
		string: "#00ffff",
	},
	fuchsia: {
		object: rgbColors.fuchsia.object,
		string: "#ff00ff",
	},
	orange: {
		object: rgbColors.orange.object,
		string: "#ffaa00",
	},
	brown: {
		object: rgbColors.brown.object,
		string: "#a52a2a",
	},
	lightgray: {
		object: rgbColors.lightgray.object,
		string: "#d3d3d3",
	},
};
