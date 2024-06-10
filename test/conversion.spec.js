import { rgbToHex, hexToRgb, hslToHsv, hsvToHsl, rgbToHsv, hsvToRgb, hslToRgb, rgbToNamedColor } from '../src/conversion'

describe('rgbToHex()', () => {
  const validRgb = { r: 100, g: 200, b: 30 }
  const validRgba = { r: 100, g: 200, b: 30, a: 0.5 }

  it('converts a valid RGB object to a HEX string', () => {
    const rgb = validRgb
    const result = rgbToHex(rgb)

    expect(result).toBe('#64C81E')
  })

  it('converts a valid RGB object to a HEX shortened string if possible', () => {
    const rgb = { r: 51, g: 51, b: 51, a: 0.8 }
    const result = rgbToHex(rgb, { minify: true })

    expect(result).toBe('#333C')
  })

  it('converts a valid RGBA object to a HEX string with an alpha channel', () => {
    const rgba = validRgba
    const result = rgbToHex(rgba)

    expect(result).toBe('#64C81E80')
  })

  it('returns #000000 when given an RGB object with r, g, and b equal to 0', () => {
    const rgb = { r: 0, g: 0, b: 0 }
    const result = rgbToHex(rgb)

    expect(result).toBe('#000000')
  })
})

describe('hexToRgb', () => {
  const validHex = '64c81e'
  const validHexAlpha = '64c81ecc'

  it('converts a valid HEX string to an RGB object', () => {
    const hex = validHex

    const rgb = hexToRgb(hex)

    expect(rgb.r).toBe(100)
    expect(rgb.g).toBe(200)
    expect(rgb.b).toBe(30)
    expect(rgb.a).toBe(1)
  })

  it('converts a valid HEX string with an alpha channel to an RGB object with alpha', () => {
    const hex = validHexAlpha

    const rgb = hexToRgb(hex)

    expect(rgb.r).toBe(100)
    expect(rgb.g).toBe(200)
    expect(rgb.b).toBe(30)
    expect(rgb.a).toBe(0.8)
  })

  it('returns an RGB object with r, g, and b equal to 0 when given #000000', () => {
    const hex = '000000'

    const rgb = hexToRgb(hex)

    expect(rgb.r).toBe(0)
    expect(rgb.g).toBe(0)
    expect(rgb.b).toBe(0)
    expect(rgb.a).toBe(1)
  })
})

describe('hslToHsv()', () => {
  it('converts an HSL color object to HSV correctly', () => {
    const hsl = { h: 120, s: 50, l: 75 }
    const hsv = hslToHsv(hsl)

    expect(hsv.h).toBe(120)
    expect(hsv.s).toBe(28.57)
    expect(hsv.v).toBe(87.5)
  })

  it('converts an HSLA color object to HSVA correctly', () => {
    const hsl = { h: 120, s: 50, l: 75, a: 0.5 }
    const hsv = hslToHsv(hsl)

    expect(hsv.h).toBe(120, 5)
    expect(hsv.s).toBe(28.57, 5)
    expect(hsv.v).toBe(87.5, 5)
    expect(hsv.a).toBe(0.5, 5)
  })

  it('handles saturation of 0 correctly', () => {
    const hsl = { h: 120, s: 0, l: 75, a: 0.5 }
    const hsv = hslToHsv(hsl)

    expect(hsv.h).toBe(120, 5)
    expect(hsv.s).toBe(0, 5)
    expect(hsv.v).toBe(75, 5)
    expect(hsv.a).toBe(0.5, 5)
  })

  it('handles lightness of 0 and 100 correctly', () => {
    const hsl1 = { h: 120, s: 50, l: 0, a: 0.5 }
    const hsl2 = { h: 120, s: 50, l: 100, a: 0.5 }
    const hsv1 = hslToHsv(hsl1)
    const hsv2 = hslToHsv(hsl2)

    expect(hsv1.h).toBe(120, 5)
    expect(hsv1.s).toBe(0, 5)
    expect(hsv1.v).toBe(0, 5)
    expect(hsv1.a).toBe(0.5, 5)

    expect(hsv2.h).toBe(120, 5)
    expect(hsv2.s).toBe(0, 5)
    expect(hsv2.v).toBe(100, 5)
    expect(hsv2.a).toBe(0.5, 5)
  })
})

describe('hsvToHsl()', () => {
  it('converts an HSV color object to HSL correctly', () => {
    const hsv = { h: 120, s: 100, v: 100 }
    const hsl = hsvToHsl(hsv)

    expect(hsl.h).toBe(120)
    expect(hsl.s).toBe(100)
    expect(hsl.l).toBe(50)
  })

  it('converts an HSVA color object to HSLA correctly', () => {
    const hsv = { h: 120, s: 100, v: 100, a: 0.5 }
    const hsl = hsvToHsl(hsv)

    expect(hsl.h).toBe(120)
    expect(hsl.s).toBe(100)
    expect(hsl.l).toBe(50)
    expect(hsl.a).toBe(0.5)
  })

  it('handles saturation of 0 correctly', () => {
    const hsv = { h: 120, s: 0, v: 75, a: 0.5 }
    const hsl = hsvToHsl(hsv)

    expect(hsl.h).toBe(120)
    expect(hsl.s).toBe(0)
    expect(hsl.l).toBe(75)
    expect(hsl.a).toBe(0.5)
  })

  it('handles lightness of 0 and 100 correctly', () => {
    const hsv1 = { h: 120, s: 50, v: 0 }
    const hsv2 = { h: 120, s: 50, v: 100 }
    const hsl1 = hsvToHsl(hsv1)
    const hsl2 = hsvToHsl(hsv2)

    expect(hsl1.h).toBe(120)
    expect(hsl1.s).toBe(0)
    expect(hsl1.l).toBe(0)

    expect(hsl2.h).toBe(120)
    expect(hsl2.s).toBe(100)
    expect(hsl2.l).toBe(75)
  })
})

describe('rgbToHsv()', () => {
  it('converts an RGB color object to HSV correctly', () => {
    const rgb = { r: 230, g: 24, b: 120 }
    const hsv = rgbToHsv(rgb)

    expect(hsv.h).toBe(332.04)
    expect(hsv.s).toBe(89.57)
    expect(hsv.v).toBe(90.2)
    expect(hsv.a).toBe(1)
  })

  it('converts an RGBA color object to HSVA correctly', () => {
    const rgb = { r: 230, g: 24, b: 120, a: 0.5 }
    const hsv = rgbToHsv(rgb)

    expect(hsv.h).toBe(332.04)
    expect(hsv.s).toBe(89.57)
    expect(hsv.v).toBe(90.2)
    expect(hsv.a).toBe(0.5)
  })

  it('handles maximum red value correctly', () => {
    const rgb = { r: 255, g: 0, b: 0 }
    const hsv = rgbToHsv(rgb)

    expect(hsv.h).toBe(0)
    expect(hsv.s).toBe(100)
    expect(hsv.v).toBe(100)
    expect(hsv.a).toBe(1)
  })

  it('handles maximum green value correctly', () => {
    const rgb = { r: 0, g: 255, b: 0 }
    const hsv = rgbToHsv(rgb)

    expect(hsv.h).toBe(120)
    expect(hsv.s).toBe(100)
    expect(hsv.v).toBe(100)
    expect(hsv.a).toBe(1)
  })

  it('handles maximum blue value correctly', () => {
    const rgb = { r: 0, g: 0, b: 255 }
    const hsv = rgbToHsv(rgb)

    expect(hsv.h).toBe(240)
    expect(hsv.s).toBe(100)
    expect(hsv.v).toBe(100)
    expect(hsv.a).toBe(1)
  })

  it('handles grayscale values correctly', () => {
    const rgb = { r: 128, g: 128, b: 128 }
    const hsv = rgbToHsv(rgb)

    expect(hsv.h).toBe(0)
    expect(hsv.s).toBe(0)
    expect(hsv.v).toBe(50.2)
    expect(hsv.a).toBe(1)
  })
})

describe('hsvToRgb()', () => {
  // Test case 1: Validate basic conversion
  it('converts an HSV color object to RGB correctly', () => {
    const hsv = { h: 120, s: 100, v: 100 }
    const rgb = hsvToRgb(hsv)

    expect(rgb.r).toBe(0)
    expect(rgb.g).toBe(255)
    expect(rgb.b).toBe(0)
    expect(rgb.a).toBe(1)
  })

  // Test case 2: Validate conversion with alpha channel
  it('converts an HSVA color object to RGBA correctly', () => {
    const hsv = { h: 120, s: 100, v: 100, a: 0.5 }
    const rgb = hsvToRgb(hsv)

    expect(rgb.r).toBe(0)
    expect(rgb.g).toBe(255)
    expect(rgb.b).toBe(0)
    expect(rgb.a).toBe(0.5)
  })

  // Test case 3: Validate boundary for saturation
  it('handles saturation of 0 correctly', () => {
    const hsv = { h: 120, s: 0, v: 75 }
    const rgb = hsvToRgb(hsv)

    expect(rgb.r).toBe(191.25)
    expect(rgb.g).toBe(191.25)
    expect(rgb.b).toBe(191.25)
    expect(rgb.a).toBe(1)
  })

  // Test case 4: Validate boundary for lightness
  it('handles lightness of 0 correctly', () => {
    const hsv = { h: 120, s: 50, v: 0 }
    const rgb = hsvToRgb(hsv)

    expect(rgb.r).toBe(0)
    expect(rgb.g).toBe(0)
    expect(rgb.b).toBe(0)
    expect(rgb.a).toBe(1)
  })

  // Test case 5: Validate lightness of 100
  it('handles lightness of 100 correctly', () => {
    const hsv = { h: 120, s: 50, v: 100 }
    const rgb = hsvToRgb(hsv)

    expect(rgb.r).toBe(127.5)
    expect(rgb.g).toBe(255)
    expect(rgb.b).toBe(127.5)
    expect(rgb.a).toBe(1)
  })
})

describe('hslToRgb', () => {
  it('converts valid HSL to RGB', () => {
    const input = { h: 120, s: 50, l: 30, a: 1 }
    const rgb = hslToRgb(input)

    expect(rgb.r).toBe(38.25)
    expect(rgb.g).toBe(114.75)
    expect(rgb.b).toBe(38.25)
    expect(rgb.a).toBe(1)
  })

  it('handles max hue', () => {
    const input = { h: 360, s: 50, l: 30, a: 1 }
    const rgb = hslToRgb(input)

    expect(rgb.r).toBe(114.75)
    expect(rgb.g).toBe(38.25)
    expect(rgb.b).toBe(38.25)
    expect(rgb.a).toBe(1)
  })

  it('handles min hue', () => {
    const input = { h: 0, s: 50, l: 30, a: 1 }
    const rgb = hslToRgb(input)

    expect(rgb.r).toBe(114.75)
    expect(rgb.g).toBe(38.25)
    expect(rgb.b).toBe(38.25)
    expect(rgb.a).toBe(1)
  })

  it('handles max saturation', () => {
    const input = { h: 120, s: 100, l: 30, a: 1 }
    const rgb = hslToRgb(input)

    expect(rgb.r).toBe(0)
    expect(rgb.g).toBe(153)
    expect(rgb.b).toBe(0)
    expect(rgb.a).toBe(1)
  })

  it('handles min saturation', () => {
    const input = { h: 120, s: 0.1, l: 30, a: 1 }
    const rgb = hslToRgb(input)

    expect(rgb.r).toBe(76.42)
    expect(rgb.g).toBe(76.58)
    expect(rgb.b).toBe(76.42)
    expect(rgb.a).toBe(1)
  })

  it('handles max lightness', () => {
    const input = { h: 120, s: 50, l: 100, a: 1 }
    const rgb = hslToRgb(input)

    expect(rgb.r).toBe(255)
    expect(rgb.g).toBe(255)
    expect(rgb.b).toBe(255)
    expect(rgb.a).toBe(1)
  })

  it('handles min lightness', () => {
    const input = { h: 120, s: 50, l: 0, a: 1 }
    const rgb = hslToRgb(input)

    expect(rgb.r).toBe(0)
    expect(rgb.g).toBe(0)
    expect(rgb.b).toBe(0)
    expect(rgb.a).toBe(1)
  })
})

describe('rgbToNamedColor', () => {
  it('converts a red color from RGB to CSS named color correctly', () => {
    const input = { r: 255, g: 0, b: 0, a: 1 }
    const named = rgbToNamedColor(input)

    expect(named).toBe('red')
  })

  it('converts a green color from RGB to CSS named color correctly', () => {
    const input = { r: 0, g: 128, b: 0, a: 1 }
    const named = rgbToNamedColor(input)

    expect(named).toBe('green')
  })

  it('converts a blue color from RGB to CSS named color correctly', () => {
    const input = { r: 0, g: 0, b: 255, a: 1 }
    const named = rgbToNamedColor(input)

    expect(named).toBe('blue')
  })
})
