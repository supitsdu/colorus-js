export const hsvToHslCases = [
	{
		input: { h: 0, s: 100, v: 100, a: 1 },
		expected: { h: 0, s: 100, l: 50, a: 1 },
	}, // red
	{
		input: { h: 120, s: 100, v: 100, a: 1 },
		expected: { h: 120, s: 100, l: 50, a: 1 },
	}, // green
	{
		input: { h: 240, s: 100, v: 100, a: 1 },
		expected: { h: 240, s: 100, l: 50, a: 1 },
	}, // blue
	{
		input: { h: 60, s: 100, v: 100, a: 1 },
		expected: { h: 60, s: 100, l: 50, a: 1 },
	}, // yellow
	{
		input: { h: 180, s: 100, v: 100, a: 1 },
		expected: { h: 180, s: 100, l: 50, a: 1 },
	}, // cyan
	{
		input: { h: 300, s: 100, v: 100, a: 1 },
		expected: { h: 300, s: 100, l: 50, a: 1 },
	}, // magenta
	{
		input: { h: 0, s: 0, v: 0, a: 1 },
		expected: { h: 0, s: 0, l: 0, a: 1 },
	}, // black
	{
		input: { h: 0, s: 0, v: 100, a: 1 },
		expected: { h: 0, s: 0, l: 100, a: 1 },
	}, // white
	{
		input: { h: 0, s: 0, v: 50, a: 1 },
		expected: { h: 0, s: 0, l: 50, a: 1 },
	}, // gray
	{
		input: { h: 350, s: 12, v: 96, a: 1 },
		expected: { h: 350, s: 59, l: 90, a: 1 },
	}, // pastel pink
	{
		input: { h: 280, s: 89, v: 54, a: 1 },
		expected: { h: 280, s: 80, l: 30, a: 1 },
	}, // deep purple
	{
		input: { h: 20, s: 56, v: 97, a: 1 },
		expected: { h: 20, s: 90, l: 70, a: 1 },
	}, // bright coral
	{
		input: { h: 140, s: 29, v: 82, a: 1 },
		expected: { h: 140, s: 40, l: 70, a: 1 },
	}, // muted sage
	{
		input: { h: 50, s: 56, v: 97, a: 1 },
		expected: { h: 50, s: 90, l: 70, a: 1 },
	}, // rich gold
];
