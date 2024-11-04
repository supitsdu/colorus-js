export const hexToRgbCases = [
	{ input: "#ff0000", expected: { r: 255, g: 0, b: 0, a: 1 } }, // red
	{ input: "#00ff00", expected: { r: 0, g: 255, b: 0, a: 1 } }, // green
	{ input: "#0000ff", expected: { r: 0, g: 0, b: 255, a: 1 } }, // blue
	{ input: "#ffff00", expected: { r: 255, g: 255, b: 0, a: 1 } }, // yellow
	{ input: "#00ffff", expected: { r: 0, g: 255, b: 255, a: 1 } }, // cyan
	{ input: "#ff00ff", expected: { r: 255, g: 0, b: 255, a: 1 } }, // magenta
	{ input: "#000000", expected: { r: 0, g: 0, b: 0, a: 1 } }, // black
	{ input: "#ffffff", expected: { r: 255, g: 255, b: 255, a: 1 } }, // white
	{ input: "#808080", expected: { r: 128, g: 128, b: 128, a: 1 } }, // gray
	{ input: "#e65c73", expected: { r: 230, g: 92, b: 115, a: 1 } }, // pastel pink
	{ input: "#701f99", expected: { r: 112, g: 31, b: 153, a: 1 } }, // deep purple
	{ input: "#f26118", expected: { r: 242, g: 97, b: 24, a: 1 } }, // bright coral
	{ input: "#6bb383", expected: { r: 107, g: 179, b: 131, a: 1 } }, // muted sage
	{ input: "#f2ce18", expected: { r: 242, g: 206, b: 24, a: 1 } }, // rich gold
];
