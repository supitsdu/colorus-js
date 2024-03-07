import stringify from '../src/stringify'

describe('fromObject', () => {
  test('should return a valid RGB CSS color string with default options', () => {
    const getColorString = stringify.fromObject('rgb')

    expect(getColorString({ r: 7, g: 7, b: 7 })).toBe('rgb(7, 7, 7)')
    expect(getColorString({ r: 7, g: 7, b: 7, a: 0.75 })).toBe('rgba(7, 7, 7, 0.75)')
  })

  test('should return a valid HSV CSS color string with default options', () => {
    const getColorString = stringify.fromObject('hsv')

    expect(getColorString({ h: 7, s: 7, v: 7 })).toBe('hsv(7, 7%, 7%)')
    expect(getColorString({ h: 7, s: 7, v: 7, a: 0.75 })).toBe('hsva(7, 7%, 7%, 0.75)')
  })

  test('should return null for invalid input', () => {
    const getColorString = stringify.fromObject('rgb')

    expect(getColorString({ r: 'invalid', g: 0, b: 0 })).toBeNull()
  })

  test('should return a valid CSS color string with custom options', () => {
    const getColorString = stringify.fromObject('hsl')
    const colorObject = { h: 120, s: 50, l: 50, a: 0.5 }

    expect(getColorString(colorObject, { minify: true })).toBe('hsla(120, 50, 50, 0.5)')
    expect(getColorString(colorObject, { CSSNext: true })).toBe('hsl(120 50% 50% / 0.5)')
    expect(getColorString(colorObject, { minify: true, CSSNext: true })).toBe('hsl(120 50 50 / 0.5)')
  })
})
