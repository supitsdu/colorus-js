# API Reference

Detailed information about the core functionalities, methods, and types available in the library.

## Core Class

### `Colorus`

The `Colorus` class provides methods for color processing and parsing.

**Constructor:**

```typescript
new Colorus(options?: Dye.Options)
```

**Parameters:**

- `options`: An optional configuration object to customize parsing and plugin behavior.
  - `plugins`: An object containing custom plugins to extend functionality.
  - `parsers`: An array of `ColorParser` instances to use for the input.
  - `formatOptions`: Options for output formatting.

**Example:**

```javascript
import { Colorus } from "colorus-js"

const colorus = new Colorus({ parsers: [hslParser] })
const color = colorus.dye("hsl(120deg 50% 30%)")

console.log(color.rgb) // { r: 38.25, g: 114.75, b: 38.25, a: 1 }
```

## Core Methods

### `dye(input: Colors.Input): Dye.Instance`

Creates a color instance with the specified input.

**Parameters:**

- `input`: A color input, which can be either a color string (e.g., `"#FF5733"`, `"rgb(255, 0, 0)"`, `"hsl(120, 100%, 50%)"`, etc.) or an object representing RGB values.

**Returns:** An instance of `Dye.Instance` with methods for color manipulation.

**Example:**

```javascript
const color = colorus.dye("rgb(255, 0, 0)")
console.log(color.hsl) // { h: 0, s: 100, l: 50, a: 1 }
```

### `match(input: Colors.Input): Dye.ParserMatchArray | undefined`

Attempts to match a color input using the configured parsers.

**Parameters:**

- `input`: A color input to parse.

**Returns:** A `ParserMatchArray` if a match is found, or `undefined` if no match is found.

**Example:**

```javascript
const matchResult = colorus.match("rgb(255, 0, 0)")

if (matchResult) {
  console.log("Color matched successfully:", matchResult)
} else {
  console.log("No valid parser found for the input.")
}
```

### `dye(input: Colors.Input, options?: Dye.Options): Dye.Instance`

The `dye` helper function is a convenient wrapper around the `Colorus` class. It simplifies the creation of color instances without explicitly instantiating the `Colorus` class.

**Parameters:**

- `input`: A color input, which can be either a color string (e.g., `"#FF5733"`, `"rgb(255, 0, 0)"`, `"hsl(120, 100%, 50%)"`, etc.) or an object representing RGB values.
- `options`: An optional configuration object to customize parsing and plugin behavior.

**Returns:** An instance of `Dye.Instance` with methods for color manipulation.

**Example:**

```javascript
import { dye } from "colorus-js"

const color = dye("rgb(255, 0, 0)")

console.log(color.hsl) // { h: 0, s: 100, l: 50, a: 1 }
console.log(color.luminance) // 0.21
```

## Color Types

Colorus.js supports various color representations defined as follows:

- **`Colors.Rgb`**: Represents colors in RGB format as `{ r: number, g: number, b: number, a: number }`.
- **`Colors.Hsl`**: Represents colors in HSL format as `{ h: number, s: number, l: number, a: number }`.
- **`Colors.Hsv`**: Represents colors in HSV format as `{ h: number, s: number, v: number, a: number }`.
- **`Colors.Cmyk`**: Represents colors in CMYK format as `{ c: number, m: number, y: number, k: number, a: number }`.

All these formats maintain an alpha channel for transparency, represented as a number (0 to 1).

## Color Properties

Each `Dye.Instance` provides access to various color properties calculated based on the initial input:

- `rgb`: Returns the RGB representation.
- `hsl`: Returns the HSL representation.
- `hsv`: Returns the HSV representation.
- `cmyk`: Returns the CMYK representation.
- `luminance`: Calculates and returns the luminance value.
- `alpha`: Returns the alpha (transparency) value.
- `hue`: Returns the hue value.
- `source`: Metadata and validity.
- `error`: Returns the error message, if any.

**Example:**

```javascript
const color = colorus.dye("hsl(120, 100%, 50%)")
console.log(color.rgb) // { r: 0, g: 255, b: 0, a: 1 }
```

## Built-in Parsers

For detailed information about the built-in parsers available in Colorus.js, please refer to the [Working with Parsers](/docs/guide/WORKING_WITH_PARSERS.md).

## Built-in Plugins

For detailed information about the built-in plugins available in Colorus.js, please refer to the [Working with Plugins](/docs/guide/WORKING_WITH_PLUGINS.md).
