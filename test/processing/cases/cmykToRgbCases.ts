export const cmykToRgbCases = [
	{
		input: { c: 0, m: 100, y: 100, k: 0, a: 1 },
		expected: { r: 255, g: 0, b: 0, a: 1 },
	}, // red
	{
		input: { c: 100, m: 0, y: 100, k: 0, a: 1 },
		expected: { r: 0, g: 255, b: 0, a: 1 },
	}, // green
	{
		input: { c: 100, m: 100, y: 0, k: 0, a: 1 },
		expected: { r: 0, g: 0, b: 255, a: 1 },
	}, // blue
	{
		input: { c: 0, m: 0, y: 100, k: 0, a: 1 },
		expected: { r: 255, g: 255, b: 0, a: 1 },
	}, // yellow
	{
		input: { c: 100, m: 0, y: 0, k: 0, a: 1 },
		expected: { r: 0, g: 255, b: 255, a: 1 },
	}, // cyan
	{
		input: { c: 0, m: 100, y: 0, k: 0, a: 1 },
		expected: { r: 255, g: 0, b: 255, a: 1 },
	}, // magenta
	{
		input: { c: 0, m: 0, y: 0, k: 100, a: 1 },
		expected: { r: 0, g: 0, b: 0, a: 1 },
	}, // black
	{
		input: { c: 0, m: 0, y: 0, k: 0, a: 1 },
		expected: { r: 255, g: 255, b: 255, a: 1 },
	}, // white
	{
		input: { c: 0, m: 0, y: 0, k: 50, a: 1 },
		expected: { r: 128, g: 128, b: 128, a: 1 },
	}, // gray
	{
		input: { c: 0, m: 60, y: 50, k: 10, a: 1 },
		expected: { r: 230, g: 92, b: 115, a: 1 },
	}, // pastel pink
	{
		input: { c: 70, m: 80, y: 0, k: 40, a: 1 },
		expected: { r: 46, g: 31, b: 153, a: 1 },
	}, // deep purple
	{
		input: { c: 0, m: 60, y: 90, k: 5, a: 1 },
		expected: { r: 242, g: 97, b: 24, a: 1 },
	}, // bright coral
	{
		input: { c: 40, m: 0, y: 30, k: 30, a: 1 },
		expected: { r: 107, g: 179, b: 125, a: 1 },
	}, // muted sage
	{
		input: { c: 0, m: 15, y: 90, k: 5, a: 1 },
		expected: { r: 242, g: 206, b: 24, a: 1 },
	}, // rich gold
];
