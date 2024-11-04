# Colorus.js

**Colorus.js** is a flexible color manipulation library with multi-format support and TypeScript compatibility.

## Features

- 🌈 **Model-Agnostic Design** – Supports HEX, RGB, HSL, HSV, CMYK, and is extendable to any color model.
- ⚡️ **Effortless Chaining** – Chain transformations with seamless TypeScript support for clarity and reliability.
- 🧩 **Extensible by Design** – Add custom parsers and plugins to unlock new models and functions.
- 🔒 **Solid Type Safety** – Robust TypeScript types deliver consistent, predictable color transformations.

## Quick Start

```javascript
import { dye } from "colorus-js"

const color = dye("rgb(255 0 0)")

console.log(color.hsl) // { h: 0, s: 100, l: 50, a: 1 }
console.log(color.luminance) // 0.21
console.log(color.source.isValid) // true
console.log(color.source.model) // "rgb"
```

### Multi-Format Support

```javascript
import { dye, hslParser } from "colorus-js"

const color = dye("hsl(120deg 50% 30%)", { parsers: [hslParser] })

console.log(color.luminance) // 0.13
console.log(color.rgb) // { r: 38.25, g: 114.75, b: 38.25, a: 1 }
```

**Built-in Parsers:** `cmykParser`, `hexParser`, `hslParser`, `hsvParser`, `rgbParser` (default)

### Custom Plugins

```javascript
import { createPlugin, dye } from "colorus-js"

// Custom grayscale plugin definition
const grayscale = createPlugin("grayscale", function () {
  const avg = (this.rgb.r + this.rgb.g + this.rgb.b) / 3
  return dye({ r: avg, g: avg, b: avg, a: this.rgb.a }, this.options)
})

// Usage
const color = dye("rgb(255, 0, 0)", { plugins: { grayscale } })

console.log(color.grayscale().rgb) // { r: 85, g: 85, b: 85, a: 1 }
```

**Built-in Plugins:** `invert`, `lighten`, `darken`, `saturate`, `desaturate`, `toCmyk`, `toHex`, `toHsl`, `toHsv`, `toRgb`

## Further Reading

- [API Reference](docs/API.md)
- [Working with Plugins](docs/guide/WORKING_WITH_PLUGINS.md)
- [Working with Parsers](docs/guide/WORKING_WITH_PARSERS.md)

## Contributing

Contributions are welcome! See the [Contributing Guide](CONTRIBUTING.md).
