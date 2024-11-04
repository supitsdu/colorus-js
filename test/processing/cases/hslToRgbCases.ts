export const hslToRgbCases = [
	{
		input: { h: 0, s: 100, l: 50, a: 1 },
		expected: { r: 255, g: 0, b: 0, a: 1 },
	}, // red
	{
		input: { h: 120, s: 100, l: 50, a: 1 },
		expected: { r: 0, g: 255, b: 0, a: 1 },
	}, // green
	{
		input: { h: 240, s: 100, l: 50, a: 1 },
		expected: { r: 0, g: 0, b: 255, a: 1 },
	}, // blue
	{
		input: { h: 60, s: 100, l: 50, a: 1 },
		expected: { r: 255, g: 255, b: 0, a: 1 },
	}, // yellow
	{
		input: { h: 180, s: 100, l: 50, a: 1 },
		expected: { r: 0, g: 255, b: 255, a: 1 },
	}, // cyan
	{
		input: { h: 300, s: 100, l: 50, a: 1 },
		expected: { r: 255, g: 0, b: 255, a: 1 },
	}, // magenta
	{
		input: { h: 0, s: 0, l: 0, a: 1 },
		expected: { r: 0, g: 0, b: 0, a: 1 },
	}, // black
	{
		input: { h: 0, s: 0, l: 100, a: 1 },
		expected: { r: 255, g: 255, b: 255, a: 1 },
	}, // white
	{
		input: { h: 0, s: 0, l: 50, a: 1 },
		expected: { r: 128, g: 128, b: 128, a: 1 },
	}, // gray
	{
		input: { h: 350, s: 60, l: 90, a: 1 },
		expected: { r: 245, g: 214, b: 219, a: 1 },
	}, // pastel pink
	{
		input: { h: 280, s: 80, l: 30, a: 1 },
		expected: { r: 97, g: 15, b: 138, a: 1 },
	}, // deep purple
	{
		input: { h: 20, s: 90, l: 70, a: 1 },
		expected: { r: 247, g: 156, b: 110, a: 1 },
	}, // bright coral
	{
		input: { h: 140, s: 40, l: 70, a: 1 },
		expected: { r: 148, g: 209, b: 168, a: 1 },
	}, // muted sage
	{
		input: { h: 50, s: 90, l: 70, a: 1 },
		expected: { r: 247, g: 224, b: 110, a: 1 },
	}, // rich gold
];
