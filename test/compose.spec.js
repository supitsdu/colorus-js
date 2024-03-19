import compose from '../src/compose'

describe('modBy', () => {
  test('should correctly modify a value', () => {
    const value = 50
    const amount = 0.4
    const result = compose.modBy(value, amount)
    expect(result).toBeCloseTo(70)
  })

  test('should return the same value if amount is NaN', () => {
    const value = 50
    const amount = NaN
    const result = compose.modBy(value, amount)
    expect(result).toBe(value)
  })
})

describe('mix', () => {
  test('should mix two RGB colors correctly', () => {
    const primaryColor = { r: 255, g: 0, b: 0 }
    const secondaryColor = { r: 0, g: 255, b: 0 }
    const amount = 0.5
    const result = compose.mix(primaryColor, secondaryColor, amount)
    expect(result).toEqual({ r: 127.5, g: 127.5, b: 0, a: 1 })
  })

  test('should clamp alpha value to 100', () => {
    const primaryColor = { r: 255, g: 0, b: 0, a: 0.5 }
    const secondaryColor = { r: 0, g: 255, b: 0, a: 0.5 }
    const amount = 0.5
    const result = compose.mix(primaryColor, secondaryColor, amount)
    expect(result.a).toBe(1)
  })
})

describe('lighten', () => {
  test('should lighten an HSL color correctly', () => {
    const color = { h: 120, s: 50, l: 50 }
    const amount = 0.2
    const result = compose.lighten(color, amount)
    expect(result.l).toBe(60)
  })

  test('should not modify hue and saturation', () => {
    const color = { h: 180, s: 70, l: 30 }
    const amount = 0.1
    const result = compose.lighten(color, amount)
    expect(result.h).toBe(color.h)
    expect(result.s).toBe(color.s)
  })
})

describe('saturate', () => {
  test('should saturate an HSL color correctly', () => {
    const color = { h: 180, s: 50, l: 50 }
    const amount = 0.3
    const result = compose.saturate(color, amount)
    expect(result.s).toBe(65)
  })

  test('should not modify hue and lightness', () => {
    const color = { h: 240, s: 80, l: 70 }
    const amount = 0.1
    const result = compose.saturate(color, amount)
    expect(result.h).toBe(color.h)
    expect(result.l).toBe(color.l)
  })
})

describe('hue', () => {
  test('should adjust hue of an HSL color correctly', () => {
    const color = { h: 180, s: 50, l: 50 }
    const amount = 0.3
    const result = compose.hue(color, amount)
    expect(result.h).toBe(234)
  })

  test('should not modify saturation and lightness', () => {
    const color = { h: 240, s: 80, l: 70 }
    const amount = 0.1
    const result = compose.hue(color, amount)
    expect(result.s).toBe(color.s)
    expect(result.l).toBe(color.l)
  })
})
