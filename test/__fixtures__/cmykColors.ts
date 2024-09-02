import type { TestColors } from ".";

export const cmykColors: TestColors["cmyk"] = {
	black: {
		object: { c: 0, m: 0, y: 0, k: 100, a: 1 },
		string: "cmyk(0%, 0%, 0%, 100%)",
	},
	white: {
		object: { c: 0, m: 0, y: 0, k: 0, a: 1 },
		string: "cmyk(0%, 0%, 0%, 0%)",
	},
	red: {
		object: { c: 0, m: 100, y: 100, k: 0, a: 1 },
		string: "cmyk(0%, 100%, 100%, 0%)",
	},
	lime: {
		object: { c: 100, m: 0, y: 100, k: 0, a: 1 },
		string: "cmyk(100%, 0%, 100%, 0%)",
	},
	blue: {
		object: { c: 100, m: 100, y: 0, k: 0, a: 1 },
		string: "cmyk(100%, 100%, 0%, 0%)",
	},
	yellow: {
		object: { c: 0, m: 0, y: 100, k: 0, a: 1 },
		string: "cmyk(0%, 0%, 100%, 0%)",
	},
	aqua: {
		object: { c: 100, m: 0, y: 0, k: 0, a: 1 },
		string: "cmyk(100%, 0%, 0%, 0%)",
	},
	fuchsia: {
		object: { c: 0, m: 100, y: 0, k: 0, a: 1 },
		string: "cmyk(0%, 100%, 0%, 0%)",
	},
	orange: {
		object: { c: 0, m: 33, y: 100, k: 0, a: 1 },
		string: "cmyk(0%, 33%, 100%, 0%)",
		rgb: { r: 255, g: 170.85, b: 0, a: 1 },
	},
	brown: {
		object: { c: 0, m: 75, y: 75, k: 35, a: 1 },
		string: "cmyk(0%, 75%, 75%, 35%)",
		rgb: { r: 165.75, g: 41.44, b: 41.44, a: 1 },
	},
	lightgray: {
		object: { c: 0, m: 0, y: 0, k: 17, a: 1 },
		string: "cmyk(0%, 0%, 0%, 17%)",
		rgb: { r: 211.65, g: 211.65, b: 211.65, a: 1 },
	},
};
