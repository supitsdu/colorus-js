import type { TestColors } from ".";

export const hsvColors: TestColors["hsv"] = {
	white: {
		object: { h: 0, s: 0, v: 100, a: 1 },
		string: "hsv(0, 0%, 100%)",
	},
	black: {
		object: { h: 0, s: 0, v: 0, a: 1 },
		string: "hsv(0, 0%, 0%)",
	},
	red: {
		object: { h: 0, s: 100, v: 100, a: 1 },
		string: "hsv(0, 100%, 100%)",
	},
	lime: {
		object: { h: 120, s: 100, v: 100, a: 1 },
		string: "hsv(120, 100%, 100%)",
	},
	blue: {
		object: { h: 240, s: 100, v: 100, a: 1 },
		string: "hsv(240, 100%, 100%)",
	},
	yellow: {
		object: { h: 60, s: 100, v: 100, a: 1 },
		string: "hsv(60, 100%, 100%)",
	},
	aqua: {
		object: { h: 180, s: 100, v: 100, a: 1 },
		string: "hsv(180, 100%, 100%)",
	},
	fuchsia: {
		object: { h: 300, s: 100, v: 100, a: 1 },
		string: "hsv(300, 100%, 100%)",
	},
	orange: {
		object: { h: 40, s: 100, v: 100, a: 1 },
		string: "hsv(40, 100%, 100%)",
	},
	brown: {
		object: { h: 0, s: 75, v: 65, a: 1 },
		string: "hsv(0, 75%, 65%)",
		rgb: { r: 165.75, g: 41.44, b: 41.44, a: 1 },
	},
	lightgray: {
		object: { h: 0, s: 0, v: 83, a: 1 },
		string: "hsv(0, 0%, 83%)",
		rgb: { r: 211.65, g: 211.65, b: 211.65, a: 1 },
	},
};
