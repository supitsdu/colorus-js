import compose from '../src/compose'

describe('mix', () => {
  it('interpolates colors and handles missing alpha', () => {
    const primary = { r: 255, g: 0, b: 0, a: 1 }
    const secondary = { r: 0, g: 255, b: 0, a: 1 }
    const result = compose.mix(primary, secondary, 0.5)
    expect(result).toEqual({ r: 127.5, g: 127.5, b: 0, a: 1 })
  })

  it('clamps RGB values to the range of 0-255', () => {
    const primary = { r: 300, g: 200, b: 100, a: 1 }
    const secondary = { r: 50, g: 150, b: 255, a: 1 }
    const result = compose.mix(primary, secondary, 0.5)
    expect(result).toEqual({ r: 225, g: 175, b: 177.5, a: 1 })
  })

  it('does not alter colors when amount is 0', () => {
    const primary = { r: 255, g: 0, b: 0, a: 1 }
    const secondary = { r: 0, g: 255, b: 0, a: 1 }
    const result = compose.mix(primary, secondary, 0)
    expect(result).toEqual(primary)
  })

  it('returns secondary color when amount is 1', () => {
    const primary = { r: 255, g: 0, b: 0, a: 1 }
    const secondary = { r: 0, g: 255, b: 0, a: 1 }
    const result = compose.mix(primary, secondary, 1)
    expect(result).toEqual(secondary)
  })
})
