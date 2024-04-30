# Colorus-js

<img src="https://raw.githubusercontent.com/supitsdu/colorus-js/main/favicon.svg" width="196">

Colorus is a versatile tool designed for seamless color manipulation across various formats. Whether you're handling RGB, HSL, HSV, or CMYK colors, Colorus streamlines the process, offering a hassle-free experience for managing colors in your projects.

The key features of Colorus include:

- **Color Format Conversion**: Effortlessly convert between different color formats such as RGB, HSL, HSV, and CMYK using a straightforward API.
- **Color Manipulation**: Adjust colors with ease using functions like lightening, darkening, saturating, desaturating, mixing, or changing hue to achieve your desired effects.
- **Customizable Formatting**: Tailor the output format of colors to your needs with options for minification and CSSNext compatibility.
- **Contrast Ratio Calculation**: Ensure accessibility compliance by calculating the contrast ratio between colors, aiding in meeting web accessibility standards.

## Installation

You can install Colorus via npm:

```sh
npm i colorus-js
```

## Usage

```js
const { Colorus } = require('colorus-js');

// Create a new Colorus instance
const color = new Colorus('rgb(255 0 0)');

console.log(color.colorType); // Returns: 'rgb'
console.log(color.lighten(0.2).toHex({ minify: true })); // Returns: '#F33'
```

## API Reference

### `Colorus`

Utility that provides methods for working with colors.

#### Constructor

Creates a new Colorus instance with the provided input.

```ts
constructor(input?: AnyColor)
```

- `input`: The color input string or object.

#### Properties

- `colorType`: Get the type of the current color.
- `luminance`: Get the relative luminance of the current color.
- `rgb`: Get the `sRGB` object representation of the current color.
- `hsl`: Get the `HSL` object representation of the current color.
- `hsv`: Get the `HSV` object representation of the current color.
- `cmyk`: Get the `CMYK` object representation of the current color.

#### Methods

- `toHex(options): string`: Convert the current color to hexadecimal format.
- `toRgb(options): string`: Convert the current color to RgbObject format.
- `toHsl(options): string`: Convert the current color to HslObject format.
- `toHsv(options): string`: Convert the current color to HsvObject format.
- `toCmyk(options): string`: Convert the current color to CmykObject format.
- `mix(input, amount): Colorus`: Mixes the current color with another color.
- `lighten(amount): Colorus`: Lightens the current color.
- `darken(amount): Colorus`: Darkens the current color.
- `saturate(amount): Colorus`: Saturates the current color.
- `desaturate(amount): Colorus`: Desaturates the current color.
- `hue(amount): Colorus`: Changes the hue of the current color.
- `alpha(amount): Colorus`: Changes the alpha (opacity) of the current color.
- `contrastRatio(backgroundColor): number`: Gets the contrast ratio between a foreground color and its adjacent background.
- `invert(): Colorus`: Inverts the color using sRGB values.

#### Static Methods

- `test(input): string | null`: An analytical method to quickly test the input for any valid color. Returns the type of the color (e.g.: `'rgb'`) if the color is valid, otherwise `null`.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
