# API Reference

Detailed information about the core functionalities, methods, and types available in the library.

## Core Method

### `dye(input: Colors.Input, options?: Dye.Options): Dye.Instance`

The primary function for creating a color instance.

**Parameters:**

- `input`: A color input, which can be either a color string (e.g., `"#FF5733"`, `"rgb(255, 0, 0)"`, `"hsl(120, 100%, 50%)"`, etc.) or an object representing RGB values.
- `options`: An optional configuration object to customize parsing and plugin behavior.
  - `plugins`: An object containing custom plugins to extend functionality.
  - `parsers`: An array of `ColorParser` instances to use for the input.
  - `formatOptions`: Options for output formatting.

**Returns:** An instance of `Dye.Instance` with methods for color manipulation.

**Example:**

```javascript
import { dye } from "colorus-js"

const color = dye("rgb(255, 0, 0)")
console.log(color.hsl) // { h: 0, s: 100, l: 50, a: 1 }
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
const color = dye("hsl(120, 100%, 50%)")
console.log(color.rgb) // { r: 0, g: 255, b: 0, a: 1 }
```

## Built-in Parsers

For detailed information about the built-in parsers available in Colorus.js, please refer to the [Working with Parsers](/docs/guide/WORKING_WITH_PARSERS.md).

## Built-in Plugins

For detailed information about the built-in plugins available in Colorus.js, please refer to the [Working with Plugins](/docs/guide/WORKING_WITH_PLUGINS.md).
