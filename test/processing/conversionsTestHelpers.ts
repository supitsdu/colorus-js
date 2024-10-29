import type { Colors } from "../../src/types";
import {} from "../../src/utils/clampColorHelpers";

export const runColorConversionTests = <InputType, ExpectedType>(
	testCases: { input: InputType; expected: ExpectedType }[],
	convertFn: (input: InputType, round: boolean) => ExpectedType,
	description: (input: InputType) => string,
	round = true,
) => {
	testCases.forEach(({ input, expected }) => {
		it(description(input), () => {
			const result = convertFn(input, true);
			if (round) {
				expect(result as Colors.All).toEqual(expected as Colors.All);
			} else {
				expect(result).toEqual(expected);
			}
		});
	});
};
