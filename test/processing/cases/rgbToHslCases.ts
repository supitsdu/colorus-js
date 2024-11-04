export const rgbToHslCases = [
	{
		input: { r: 255, g: 0, b: 0, a: 1 },
		expected: { h: 0, s: 100, l: 50, a: 1 },
	}, // red
	{
		input: { r: 0, g: 255, b: 0, a: 1 },
		expected: { h: 120, s: 100, l: 50, a: 1 },
	}, // green
	{
		input: { r: 0, g: 0, b: 255, a: 1 },
		expected: { h: 240, s: 100, l: 50, a: 1 },
	}, // blue
	{
		input: { r: 255, g: 255, b: 0, a: 1 },
		expected: { h: 60, s: 100, l: 50, a: 1 },
	}, // yellow
	{
		input: { r: 0, g: 255, b: 255, a: 1 },
		expected: { h: 180, s: 100, l: 50, a: 1 },
	}, // cyan
	{
		input: { r: 255, g: 0, b: 255, a: 1 },
		expected: { h: 300, s: 100, l: 50, a: 1 },
	}, // magenta
	{
		input: { r: 0, g: 0, b: 0, a: 1 },
		expected: { h: 0, s: 0, l: 0, a: 1 },
	}, // black
	{
		input: { r: 255, g: 255, b: 255, a: 1 },
		expected: { h: 0, s: 0, l: 100, a: 1 },
	}, // white
	{
		input: { r: 128, g: 128, b: 128, a: 1 },
		expected: { h: 0, s: 0, l: 50, a: 1 },
	}, // gray
	{
		input: { r: 230, g: 92, b: 115, a: 1 },
		expected: { h: 350, s: 73, l: 63, a: 1 },
	}, // pastel pink
	{
		input: { r: 112, g: 31, b: 153, a: 1 },
		expected: { h: 280, s: 66, l: 36, a: 1 },
	}, // deep purple
	{
		input: { r: 242, g: 97, b: 24, a: 1 },
		expected: { h: 20, s: 89, l: 52, a: 1 },
	}, // bright coral
	{
		input: { r: 107, g: 179, b: 131, a: 1 },
		expected: { h: 140, s: 32, l: 56, a: 1 },
	}, // muted sage
	{
		input: { r: 242, g: 206, b: 24, a: 1 },
		expected: { h: 50, s: 89, l: 52, a: 1 },
	}, // rich gold
];
