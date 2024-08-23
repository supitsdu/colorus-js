import type { TestColors } from ".";

export const hslColors: TestColors["hsl"] = {
	white: {
		object: { h: 0, s: 0, l: 100, a: 1 },
		string: "hsl(0, 0%, 100%)",
	},
	black: {
		object: { h: 0, s: 0, l: 0, a: 1 },
		string: "hsl(0, 0%, 0%)",
	},
	red: {
		object: { h: 0, s: 100, l: 50, a: 1 },
		string: "hsl(0, 100%, 50%)",
	},
	lime: {
		object: { h: 120, s: 100, l: 50, a: 1 },
		string: "hsl(120, 100%, 50%)",
	},
	blue: {
		object: { h: 240, s: 100, l: 50, a: 1 },
		string: "hsl(240, 100%, 50%)",
	},
	yellow: {
		object: { h: 60, s: 100, l: 50, a: 1 },
		string: "hsl(60, 100%, 50%)",
	},
	aqua: {
		object: { h: 180, s: 100, l: 50, a: 1 },
		string: "hsl(180, 100%, 50%)",
	},
	fuchsia: {
		object: { h: 300, s: 100, l: 50, a: 1 },
		string: "hsl(300, 100%, 50%)",
	},
	orange: {
		object: { h: 40, s: 100, l: 50, a: 1 },
		string: "hsl(40, 100%, 50%)",
	},
	brown: {
		object: { h: 0, s: 59, l: 41, a: 1 },
		string: "hsl(0, 59%, 41%)",
		rgb: { r: 166.23, g: 42.87, b: 42.87, a: 1 },
	},
	lightgray: {
		object: { h: 0, s: 0, l: 83, a: 1 },
		string: "hsl(0, 0%, 83%)",
		rgb: { r: 211.65, g: 211.65, b: 211.65, a: 1 },
	},
};
