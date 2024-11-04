export const rgbToHexCases = [
	{ input: { r: 255, g: 0, b: 0, a: 0.5 }, expected: "#ff000080" }, // red
	{ input: { r: 255, g: 0, b: 0, a: 1 }, expected: "#ff0000" }, // red
	{ input: { r: 0, g: 255, b: 0, a: 1 }, expected: "#00ff00" }, // green
	{ input: { r: 0, g: 0, b: 255, a: 1 }, expected: "#0000ff" }, // blue
	{ input: { r: 255, g: 255, b: 0, a: 1 }, expected: "#ffff00" }, // yellow
	{ input: { r: 0, g: 255, b: 255, a: 1 }, expected: "#00ffff" }, // cyan
	{ input: { r: 255, g: 0, b: 255, a: 1 }, expected: "#ff00ff" }, // magenta
	{ input: { r: 0, g: 0, b: 0, a: 1 }, expected: "#000000" }, // black
	{ input: { r: 255, g: 255, b: 255, a: 1 }, expected: "#ffffff" }, // white
	{ input: { r: 128, g: 128, b: 128, a: 1 }, expected: "#808080" }, // gray
	{ input: { r: 230, g: 92, b: 115, a: 1 }, expected: "#e65c73" }, // pastel pink
	{ input: { r: 112, g: 31, b: 153, a: 1 }, expected: "#701f99" }, // deep purple
	{ input: { r: 242, g: 97, b: 24, a: 1 }, expected: "#f26118" }, // bright coral
	{ input: { r: 107, g: 179, b: 131, a: 1 }, expected: "#6bb383" }, // muted sage
	{ input: { r: 242, g: 206, b: 24, a: 1 }, expected: "#f2ce18" }, // rich gold
];
