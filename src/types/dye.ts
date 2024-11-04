import type { ColorParser } from "../processing/colorParser";
import type { Colors } from "./colorModels";

export namespace Dye {
	export interface Source<V = Colors.Any> {
		model: string;
		value: V;
		isValid?: boolean;
	}

	export type ParserMatchArray<
		I = Colors.Input,
		C = Colors.Rgb,
		V = Colors.Input | Colors.Object<string>,
	> = [I, C, Source<V>];

	export type ParserExtractor<E> = (
		match: Colors.MatchArray<string | number>,
	) => E;

	export type ParserSerializer<E, R> = (value: E) => R;

	export interface ParserConfig<E, R> {
		model: string;
		extract: ParserExtractor<E>;
		serialize: ParserSerializer<E, R>;
		regex: RegExp;
		clamp?: (value: E) => E;
		channels?: string[];
	}

	export interface FormatOptions {
		minify?: boolean;
		cssNext?: boolean;
	}

	export type PluginFunction<
		Returns = void,
		Params extends any[] = any[],
		Props = Properties,
	> = (this: Props, ...params: Params) => Returns;

	export type DefaultPlugins = Record<never, never>;

	export type Plugins<T extends DefaultPlugins = DefaultPlugins> =
		T extends DefaultPlugins
			? DefaultPlugins
			: {
					[K in keyof T]: T[K] extends PluginFunction<infer R, infer P>
						? PluginFunction<R, P>
						: never;
				};

	export interface Options<E extends Plugins = Plugins> {
		plugins?: {
			[K in keyof E]: K extends keyof Properties ? never : E[K];
		};
		formatOptions?: FormatOptions;
		fallback?: Colors.Rgb;
		parsers?: ColorParser<any, any>[];
	}

	export interface Properties<P extends Plugins = Plugins> {
		error?: { message?: string };
		source: Source;
		get luminance(): number;
		get rgb(): Colors.Rgb;
		get hsl(): Colors.Hsl;
		get hsv(): Colors.Hsv;
		get cmyk(): Colors.Cmyk;
		get alpha(): number;
		get hue(): number;
		options: Options<P>;
	}

	export type Instance<E extends Plugins = Plugins> = Properties<E> & {
		[K in keyof E]: E[K] extends PluginFunction<infer R, infer P>
			? (...params: P) => R extends Instance<DefaultPlugins> ? Instance<E> : R
			: never;
	};
}
