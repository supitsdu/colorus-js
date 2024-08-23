import type { TestColors } from ".";

export const rgbColors: TestColors["rgb"] = {
	black: {
		object: { r: 0, g: 0, b: 0, a: 1 },
		string: "rgb(0, 0, 0)",
	},
	white: {
		object: { r: 255, g: 255, b: 255, a: 1 },
		string: "rgb(255, 255, 255)",
	},
	red: {
		object: { r: 255, g: 0, b: 0, a: 1 },
		string: "rgb(255, 0, 0)",
	},
	lime: {
		object: { r: 0, g: 255, b: 0, a: 1 },
		string: "rgb(0, 255, 0)",
	},
	blue: {
		object: { r: 0, g: 0, b: 255, a: 1 },
		string: "rgb(0, 0, 255)",
	},
	yellow: {
		object: { r: 255, g: 255, b: 0, a: 1 },
		string: "rgb(255, 255, 0)",
	},
	aqua: {
		object: { r: 0, g: 255, b: 255, a: 1 },
		string: "rgb(0, 255, 255)",
	},
	fuchsia: {
		object: { r: 255, g: 0, b: 255, a: 1 },
		string: "rgb(255, 0, 255)",
	},
	orange: {
		object: { r: 255, g: 170, b: 0, a: 1 },
		string: "rgb(255, 170, 0)",
	},
	brown: {
		object: { r: 165, g: 42, b: 42, a: 1 },
		string: "rgb(165, 42, 42)",
	},
	lightgray: {
		object: { r: 211, g: 211, b: 211, a: 1 },
		string: "rgb(211, 211, 211)",
	},
};
