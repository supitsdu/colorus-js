# Working with Parsers

Extend **Colorus.js** with custom parsers to convert diverse color formats into a `Dye.Instance`.

## What are Parsers?

Parsers transform color formats (like HSL and HEX) into `Dye.ParserMatchArray`, providing:

- **Original Input**: The initial color value.
- **Parsed Color**: The standardized color model.
- **Metadata**: Model details, color values, and validation status.

## HSL Parser

Processes HSL color values to enable transformations within `dye()`, with built-in clamping for valid HSL ranges.

### HSL Parser - Configuration

- **Model**: `"hsl"`
- **Regex**: Pattern to match HSL strings.
- **Extract**: Converts matches to `{ h, s, l, a }`.
- **Serialize**: Converts HSL to RGB, ensuring valid output.
- **Clamp**: Confirms HSL value limits.
- **Channels**: Specifies `["h", "s", "l", "a"]` as color properties.

```typescript
export const hslParser = new ColorParser({
  model: "hsl",
  extract: match => ({
    h: match[0],
    s: match[1],
    l: match[2],
    a: match[3]
  }),
  serialize: hslToRgb,
  clamp: clampHsl,
  regex: regexHsl,
  channels: chHsl
})
```

### HSL Parser - Example Usage

```typescript
const color = dye("hsl(120, 100%, 50%)", { parsers: [hslParser] })

console.log(color.rgb) // { "r": 0, "g": 255, "b": 0, "a": 1 }
console.log(color.source.model) // "hsl"
console.log(color.source.isValid) // true
```

## HEX Parser

A HEX parser for colors like `#FF5733`, converting them into RGB.

### HEX Parser - Configuration

- **Model**: `"hex"`
- **Regex**: Pattern to match HEX values.
- **Extract**: Retrieves the hex string.
- **Serialize**: Converts HEX to RGB, ensuring valid output.

```typescript
export const hexParser = new ColorParser({
  model: "hex",
  extract: match => match[0] as string,
  serialize: convertHexToRgb,
  regex: regexHex
})
```

### HEX Parser - Example Usage

```typescript
const color = dye("#FF5733", { parsers: [hexParser] })

console.log(color.rgb) // { "r": 255, "g": 87, "b": 51, "a": 1 }
console.log(color.source.model) // "hex"
console.log(color.source.isValid) // true
```

## Key Tips for Parsers

- **Extract Function**: Focus on obtaining essential color values.
- **Regex Capturing**: Ensure the regex captures only necessary channels, e.g., for HSL:

```jsonc
// regexHsl.match("hsl(240, 70, 50)")
["hsl(240, 70, 50)", "240", "70", "50", null]
```

- **Serializer Function**: Always return a valid RGB object to maintain consistent conversion.
