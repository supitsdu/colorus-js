# Working with Parsers

This guide covers how to create and utilize custom parsers with **`dye()`** to handle various color formats.

## What are Parsers?

Parsers convert different color formats (like HSL and HEX) into a `Dye.ParserMatchArray`, which consists of:

1. **Original Input**: The initial color value (string or object).
2. **Parsed Color**: The converted color model.
3. **Metadata**: Model details, extracted values, and validation status.

## HSL Parser

The HSL parser processes HSL values, converting them into a format usable by `dye()` and related transformations. It includes clamping to ensure valid HSL ranges.

### HSL Parser Configuration

- **Model**: `"hsl"`
- **Regex**: Matches HSL strings.
- **Extract**: Converts matched strings into `{ h, s, l, a }` values.
- **Serialize**: Converts HSL values to RGB, always returning a valid RGB color object.
- **Clamp**: Validates HSL values.
- **Channels**: Defines `["h", "s", "l", "a"]` as color properties.

**Configuration Example**:

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

### Example: Using the HSL Parser

When you call `hslParser.parse("hsl(0, 100%, 50%)")`, it returns:

```json
[
  "hsl(0, 100%, 50%)",
  { "r": 255, "g": 0, "b": 0, "a": 1 },
  {
    "value": { "h": "0", "s": "100", "l": "50", "a": undefined },
    "model": "hsl",
    "isValid": true
  }
]
```

When added to the `dye` function, it looks like this:

```typescript
const color = dye("hsl(120, 100%, 50%)", {
  parsers: [hslParser]
})

console.log(color.rgb) // { "r": 0, "g": 255, "b": 0, "a": 1 }
console.log(color.source.model) // "hsl"
console.log(color.source.isValid) // true
```

## HEX Parser

**Colorus.js** also features a HEX parser for formats like `#FF5733`, converting them to RGB.

### HEX Parser Configuration

- **Model**: `"hex"`
- **Regex**: Matches HEX strings.
- **Extract**: Retrieves the matched hex string.
- **Serialize**: Converts the hex color to RGB, ensuring it returns a valid RGB object.

**Configuration Example**:

```typescript
export const hexParser = new ColorParser({
  model: "hex",
  extract: match => match[0] as string,
  serialize: convertHexToRgb,
  regex: regexHex
})
```

### Example: Using the HEX Parser

When you call `hslParser.parse("#ff0000")`, it returns:

```json
[
  "#ff0000",
  { "r": 255, "g": 0, "b": 0, "a": 1 },
  {
    "value": "ff0000",
    "model": "hex",
    "isValid": true
  }
]
```

When added to the `dye` function, it looks like this:

```typescript
const color = dye("#FF5733", {
  parsers: [hexParser]
})

console.log(color.rgb) // { "r": 0, "g": 0, "b": 0, "a": 1 }
console.log(color.source.model) // "hex"
console.log(color.source.isValid) // true
```

## Key Tips

- **Extract Function**: Focus on retrieving only the necessary color values (e.g., `h`, `s`, `l`, `a`) to be used by the clamp function (if included) and the serializer function.
- **Regex Capturing**:

  - Ensure your regex only captures essential color channels, like the HSL regex which captures the following:

```json
["hsl(240, 70, 50)", "240", "70", "50", null]
```

- **Serializer Function**: The serializer should always return a valid RGB color object to ensure consistent output for any color conversion.
