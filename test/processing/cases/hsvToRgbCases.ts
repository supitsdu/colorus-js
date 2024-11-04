export const hsvToRgbCases = [
	{
		input: { h: 0, s: 100, v: 100, a: 1 },
		expected: { r: 255, g: 0, b: 0, a: 1 },
	}, // red
	{
		input: { h: 120, s: 100, v: 100, a: 1 },
		expected: { r: 0, g: 255, b: 0, a: 1 },
	}, // green
	{
		input: { h: 240, s: 100, v: 100, a: 1 },
		expected: { r: 0, g: 0, b: 255, a: 1 },
	}, // blue
	{
		input: { h: 60, s: 100, v: 100, a: 1 },
		expected: { r: 255, g: 255, b: 0, a: 1 },
	}, // yellow
	{
		input: { h: 180, s: 100, v: 100, a: 1 },
		expected: { r: 0, g: 255, b: 255, a: 1 },
	}, // cyan
	{
		input: { h: 300, s: 100, v: 100, a: 1 },
		expected: { r: 255, g: 0, b: 255, a: 1 },
	}, // magenta
	{
		input: { h: 0, s: 0, v: 0, a: 1 },
		expected: { r: 0, g: 0, b: 0, a: 1 },
	}, // black
	{
		input: { h: 0, s: 0, v: 100, a: 1 },
		expected: { r: 255, g: 255, b: 255, a: 1 },
	}, // white
	{
		input: { h: 0, s: 0, v: 50, a: 1 },
		expected: { r: 128, g: 128, b: 128, a: 1 },
	}, // gray
	{
		input: { h: 350, s: 60, v: 90, a: 1 },
		expected: { r: 230, g: 92, b: 115, a: 1 },
	}, // pastel pink
	{
		input: { h: 280, s: 80, v: 60, a: 1 },
		expected: { r: 112, g: 31, b: 153, a: 1 },
	}, // deep purple
	{
		input: { h: 20, s: 90, v: 95, a: 1 },
		expected: { r: 242, g: 97, b: 24, a: 1 },
	}, // bright coral
	{
		input: { h: 140, s: 40, v: 70, a: 1 },
		expected: { r: 107, g: 179, b: 131, a: 1 },
	}, // muted sage
	{
		input: { h: 50, s: 90, v: 95, a: 1 },
		expected: { r: 242, g: 206, b: 24, a: 1 },
	}, // rich gold
];
