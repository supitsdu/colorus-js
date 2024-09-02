<p align="center">
  <img src="https://raw.githubusercontent.com/supitsdu/colorus-js/main/favicon.svg" width="256">
<p>

# Colorus.js

[![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white&labelColor=black&color=black)](https://www.npmjs.com/package/colorus-js)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white&labelColor=black&color=black)](https://www.typescriptlang.org/)
[![GitHub stars](https://img.shields.io/github/stars/supitsdu/colorus-js?style=for-the-badge&logo=Github&logoColor=white&labelColor=black&color=black)](https://github.com/supitsdu/colorus-js)

A versatile and powerful color manipulation library for JavaScript.

## Features

- **Intuitive API:** Work with colors effortlessly using a simple and expressive function-based API.
- **Multiple Color Models:** Supports various color models, including RGB, HSL, HSV, and CMYK.
- **Flexible Input/Output:** Accepts color inputs in different formats (hex, rgb, hsl, etc.) and provides various output options.
- **Color Conversions:** Easily convert between different color models and formats.
- **Color Adjustments:** Perform common color adjustments like lightening, darkening, saturating, desaturating, and more.
- **Accessibility:** Calculate relative luminance and contrast ratios for improved accessibility.
- **Extensible:** Extend the core functionality with custom plugins.
- **TypeScript Support:** Provides full TypeScript support for enhanced type safety and developer experience.

### Usage

```javascript
import { dye } from "colorus-js"

const color = dye("#ff0000") // Create a color from a hex code

console.log(color.rgb) // Output: { r: 255, g: 0, b: 0, a: 1 }
console.log(color.toHsl()) // Output: hsl(0, 100%, 50%)

const lighterColor = color.lighten(0.2) // Lighten the color by 20%
console.log(lighterColor.toHex()) // Output: #ff6666
```

### Plugins

Extend the `dye` function with custom methods using plugins.

```javascript
const colorWithPlugin = dye("#0000ff", {
  plugins: {
    isBlue() {
      return this.rgb.b > 200
    }
  }
})

console.log(colorWithPlugin.isBlue()) // Output: true
```

For more information see [Working with Plugins Guide](docs/WORKING_WITH_PLUGINS.md).

## Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md).

[**Leave a star and help spread the hues! 🎨⭐**](https://github.com/supitsdu/colorus-js)
