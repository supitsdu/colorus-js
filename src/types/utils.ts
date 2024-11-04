export namespace Utils {
	export type NormalizeFunction = (
		value?: number | string,
		fn?: (value: number) => number,
	) => number;

	export type ClampFunction<T> = (color: T) => T;
}
