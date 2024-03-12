import compose from '../src/compose'

describe('mix', () => {
  it('Interpolates colors and handles missing alpha', () => {
    const primary = { r: 255, g: 0, b: 0, a: 1 }
    const secondary = { r: 0, g: 255, b: 0, a: 1 }
    const result = compose.mix(primary, secondary, 0.5)
    expect(result).toEqual({ r: 127.5, g: 127.5, b: 0, a: 1 })
  })

  it('Clamps RGB values to the range of 0-255', () => {
    const primary = { r: 300, g: 200, b: 100, a: 1 }
    const secondary = { r: 50, g: 150, b: 255, a: 1 }
    const result = compose.mix(primary, secondary, 0.5)
    expect(result).toEqual({ r: 175, g: 175, b: 177.5, a: 1 })
  })

  it('Does not alter colors when amount is 0', () => {
    const primary = { r: 255, g: 0, b: 0, a: 1 }
    const secondary = { r: 0, g: 255, b: 0, a: 1 }
    const result = compose.mix(primary, secondary, 0)
    expect(result).toEqual(primary)
  })

  it('Returns secondary color when amount is 1', () => {
    const primary = { r: 255, g: 0, b: 0, a: 1 }
    const secondary = { r: 0, g: 255, b: 0, a: 1 }
    const result = compose.mix(primary, secondary, 1)
    expect(result).toEqual(secondary)
  })
})

describe('modBy', () => {
  it('Modifies the value by a given amount without relative flag', () => {
    expect(compose.modBy(5, 0.8)).toBe(85)
    expect(compose.modBy(10, -0.2)).toBe(-10)
  })

  it('Modifies the value by relative amount', () => {
    expect(compose.modBy(5, 0.3, true)).toBe(6.5)
    expect(compose.modBy(10, -0.375, true)).toBe(6.25)
  })

  it('Returns the same value if amount is not a number', () => {
    expect(compose.modBy(5, 'foo')).toBe(5)
    expect(compose.modBy(10, null)).toBe(10)
  })
})

describe('lighten', () => {
  it('Lightens the HSL color with a given amount without relative flag', () => {
    const color = { h: 120, s: 50, l: 30, a: 1 }
    const lightenedColor = compose.lighten(color, 0.2)
    expect(lightenedColor.l).toBeCloseTo(50)
  })

  it('Lightens the HSL color with a given relative amount', () => {
    const color = { h: 120, s: 50, l: 30, a: 1 }
    const lightenedColor = compose.lighten(color, 0.2, true)
    expect(lightenedColor.l).toBeCloseTo(36)
  })

  it('Returns the same color if amount is not a number', () => {
    const color = { h: 120, s: 50, l: 30, a: 1 }
    const sameColor = compose.lighten(color, 'foo')
    expect(sameColor).toEqual(color)
  })

  it('Clamps the HSL values', () => {
    const color = { h: 120, s: 1, l: 0, a: 1 }
    const clampedColor = compose.lighten(color, 0.5)
    expect(clampedColor.l).toBeCloseTo(50) // l should be around 50 with precision
  })
})

describe('saturate', () => {
  it('Saturate an HSL color by the specified amount', () => {
    const color = { h: 0, s: 50, l: 50, a: 1 }
    const amount = 0.2

    const result = compose.saturate(color, amount)

    expect(result.s).toBeCloseTo(70)
  })

  it('Does not modify the value if relative is false', () => {
    const color = { h: 0, s: 50, l: 50, a: 1 }
    const amount = 0.2

    const result = compose.saturate(color, amount, false)

    expect(result.s).toBe(70)
  })

  it('Modify the value relative to its current value if relative is true', () => {
    const color = { h: 0, s: 50, l: 50, a: 1 }
    const amount = 0.2

    const result = compose.saturate(color, amount, true)

    expect(result.s).toBeCloseTo(60)
  })

  it('Does not modify the alpha channel', () => {
    const color = { h: 0, s: 50, l: 50, a: 0.7 }
    const amount = 0.2

    const result = compose.saturate(color, amount)

    expect(result.a).toBe(0.7)
  })
})
