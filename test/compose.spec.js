import { modBy, mix, lighten, saturate, hue, alpha, rgbToGray, invert } from '../src/compose'

describe('modBy', () => {
  test('should correctly modify a value', () => {
    const value = 50
    const amount = 0.4
    const result = modBy(value, amount)
    expect(result).toBeCloseTo(70)
  })

  test('should return the same value if amount is NaN', () => {
    const value = 50
    const amount = NaN
    const result = modBy(value, amount)
    expect(result).toBe(value)
  })
})

describe('mix', () => {
  test('should mix two RGB colors correctly', () => {
    const primaryColor = { r: 255, g: 0, b: 0 }
    const secondaryColor = { r: 0, g: 255, b: 0 }
    const amount = 0.5
    const result = mix(primaryColor, secondaryColor, amount)
    expect(result).toEqual({ r: 127.5, g: 127.5, b: 0, a: 1 })
  })

  test('should clamp alpha value to 100', () => {
    const primaryColor = { r: 255, g: 0, b: 0, a: 0.5 }
    const secondaryColor = { r: 0, g: 255, b: 0, a: 0.5 }
    const amount = 0.5
    const result = mix(primaryColor, secondaryColor, amount)
    expect(result.a).toBe(1)
  })
})

describe('lighten', () => {
  test('should lighten an HSL color correctly', () => {
    const color = { h: 120, s: 50, l: 50 }
    const amount = 0.2
    const result = lighten(color, amount)
    expect(result.l).toBe(60)
  })

  test('should not modify hue and saturation', () => {
    const color = { h: 180, s: 70, l: 30 }
    const amount = 0.1
    const result = lighten(color, amount)
    expect(result.h).toBe(color.h)
    expect(result.s).toBe(color.s)
  })
})

describe('saturate', () => {
  test('should saturate an HSL color correctly', () => {
    const color = { h: 180, s: 50, l: 50 }
    const amount = 0.3
    const result = saturate(color, amount)
    expect(result.s).toBe(65)
  })

  test('should not modify hue and lightness', () => {
    const color = { h: 240, s: 80, l: 70 }
    const amount = 0.1
    const result = saturate(color, amount)
    expect(result.h).toBe(color.h)
    expect(result.l).toBe(color.l)
  })
})

describe('invert', () => {
  test('should invert black to white correctly', () => {
    const color = { r: 255, g: 255, b: 255 }
    const result = invert(color)
    expect(result.r).toBe(0)
    expect(result.g).toBe(0)
    expect(result.b).toBe(0)
  })

  test('should invert white to black correctly', () => {
    const color = { r: 0, g: 0, b: 0 }
    const result = invert(color)
    expect(result.r).toBe(255)
    expect(result.g).toBe(255)
    expect(result.b).toBe(255)
  })
})

describe('hue', () => {
  test('should adjust hue of an HSL color correctly', () => {
    const color = { h: 180, s: 50, l: 50 }
    const amount = 0.3
    const result = hue(color, amount)
    expect(result.h).toBe(234)
  })

  test('should not modify saturation and lightness', () => {
    const color = { h: 240, s: 80, l: 70 }
    const amount = 0.1
    const result = hue(color, amount)
    expect(result.s).toBe(color.s)
    expect(result.l).toBe(color.l)
  })
})

describe('alpha', () => {
  test('should adjust alpha channel of an RGB color correctly', () => {
    const color = { h: 180, s: 50, l: 50, a: 0.54 }
    const amount = 0.3
    const result = alpha(color, amount)
    expect(result.a).toBe(0.7)
  })

  test('should not modify R, G, and B channels', () => {
    const color = { r: 90, g: 80, b: 70, a: 0.54 }
    const amount = 0.1
    const result = alpha(color, amount)
    expect(result.r).toBe(color.r)
    expect(result.g).toBe(color.g)
    expect(result.b).toBe(color.b)
  })
})

describe('rgbToGray', () => {
  // Test for converting RGB to grayscale without using the NTSC formula
  it('should convert RGB to grayscale without NTSC formula', () => {
    const color = { r: 50, g: 168, b: 82, a: 1 }
    const result = rgbToGray(color)
    expect(result).toEqual({ r: 136.704, g: 136.704, b: 136.704, a: 1 })
  })

  // Test for converting RGB to grayscale using the NTSC formula
  it('should convert RGB to grayscale with NTSC formula', () => {
    const color = { r: 50, g: 168, b: 82, a: 1 }
    const result = rgbToGray(color, true)
    expect(result).toEqual({ r: 122.914, g: 122.914, b: 122.914, a: 1 })
  })

  // Test for converting black (0, 0, 0) to grayscale without NTSC formula
  it('should convert black color to grayscale without NTSC formula', () => {
    const color = { r: 0, g: 0, b: 0, a: 1 }
    const result = rgbToGray(color)
    expect(result).toEqual({ r: 0, g: 0, b: 0, a: 1 })
  })

  // Test for converting white (255, 255, 255) to grayscale using the NTSC formula
  it('should convert white color to grayscale with NTSC formula', () => {
    const color = { r: 255, g: 255, b: 255, a: 1 }
    const result = rgbToGray(color, true)
    expect(result).toEqual({ r: 255, g: 255, b: 255, a: 1 })
  })

  // Test for converting a color with alpha channel
  it('should preserve alpha channel when converting to grayscale', () => {
    const color = { r: 120, g: 60, b: 200, a: 0.5 }
    const result = rgbToGray(color)
    expect(result).toEqual({ r: 82.864, g: 82.864, b: 82.864, a: 0.5 })
  })
})
