import type { Colors, Dye } from "../types";
import { isColorValue, isObject } from "../utils/validation";

/**
 * `ColorParser` is a configurable utility for parsing and serializing color values
 * in different formats (e.g., RGB, HSL).
 *
 * @throws Error if required config properties (`regex`, `model`, `extract`, `serialize`) are missing or invalid.
 */
export class ColorParser<E, R> {
	private model: string;
	private extract: Dye.ParserExtractor<E>;
	private serialize: Dye.ParserSerializer<E, R>;
	private regex: RegExp;
	private channels?: string[];
	private clamp: (value: E) => E;

	constructor(config: Dye.ParserConfig<E, R>) {
		if (!config.regex || !(config.regex instanceof RegExp)) {
			throw new Error("Missing 'regex' RegExp in the configuration");
		}

		if (!config.model || typeof config.model !== "string") {
			throw new Error("Missing 'model' string in the configuration");
		}

		if (!config.extract || typeof config.extract !== "function") {
			throw new Error("Missing 'extract' function in the configuration");
		}

		if (!config.serialize || typeof config.serialize !== "function") {
			throw new Error(`Missing 'serialize' function in the configuration.`);
		}

		if (config.clamp && typeof config.clamp !== "function") {
			throw new Error(`Invalid 'clamp' function in the configuration.`);
		}

		this.model = config.model;
		this.extract = config.extract;
		this.serialize = config.serialize;
		this.regex = config.regex;
		this.clamp = config.clamp ?? ((value: E): E => value);
		this.channels = config.channels;
	}

	public parse<T extends string | Colors.Object<string>>(
		input: T,
	): Dye.ParserMatchArray<T, R, E> | null {
		const match = this.matchColorString(input) ?? this.matchColorObject(input);

		if (!match) return null;

		const extractedValue = this.extract(match);

		return [
			input,
			this.serialize(this.clamp(extractedValue)),
			{
				value: extractedValue,
				model: this.model,
				isValid: true,
			},
		];
	}

	private matchColorString(
		input: unknown,
	): Colors.MatchArray<string | number> | null {
		if (typeof input !== "string") return null;
		return input.match(this.regex)?.slice(1) ?? null;
	}

	private matchColorObject(
		colorInput: unknown,
	): Colors.MatchArray<string | number> | null {
		if (!this.channels || !isObject(colorInput)) return null;

		const color = colorInput as Colors.Object<string>;

		const values = this.channels.filter(
			k => isColorValue(color[k]) || (k === "a" && color[k] === undefined),
		);

		if (values.length !== this.channels.length) return null;

		return values.map(k => color[k]);
	}
}
