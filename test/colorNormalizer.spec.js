import { Clamp, Round } from '../src/colorNormalizer'

describe('Clamp', () => {
  it('should clamp RGB values', () => {
    const input = { r: 256, g: -256, b: 212, a: 2 }
    const match = { r: 255, g: 0, b: 212, a: 1 }
    expect(Clamp.rgb(input)).toEqual(match)
  })

  it('should clamp HSL values', () => {
    const input = { h: 500, s: -60, l: 212, a: 2 }
    const match = { h: 360, s: 0, l: 100, a: 1 }
    expect(Clamp.hsl(input)).toEqual(match)
  })

  it('should clamp HSV values', () => {
    const input = { h: 500, s: -60, v: 212, a: 2 }
    const match = { h: 360, s: 0, v: 100, a: 1 }
    expect(Clamp.hsv(input)).toEqual(match)
  })

  it('should clamp CMYK values', () => {
    const input = { c: 500, m: -60, y: 212, k: 12, a: 2 }
    const match = { c: 100, m: 0, y: 100, k: 12, a: 1 }
    expect(Clamp.cmyk(input)).toEqual(match)
  })
})

describe('Round', () => {
  it('should round RGB values', () => {
    const input = { r: 25.2013, g: -0.23, b: 54.7822, a: 2 }
    const match = { r: 25, g: 0, b: 55, a: 1 }
    expect(Round.rgb(input)).toEqual(match)
  })

  it('should round HSL values', () => {
    const input = { h: 250.181, s: 50, l: 80.9128, a: 2 }
    const match = { h: 250, s: 50, l: 81, a: 1 }
    expect(Round.hsl(input)).toEqual(match)
  })

  it('should round HSV values', () => {
    const input = { h: 250.181, s: 50, v: 80.9128, a: 2 }
    const match = { h: 250, s: 50, v: 81, a: 1 }
    expect(Round.hsv(input)).toEqual(match)
  })

  it('should round CMYK values', () => {
    const input = { c: 500, m: -60, y: 12.9, k: 12.1982, a: 2 }
    const match = { c: 100, m: 0, y: 13, k: 12, a: 1 }
    expect(Round.cmyk(input)).toEqual(match)
  })
})
