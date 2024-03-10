import colorString from '../src/colorString'

describe('colorString.serialize', () => {
  it('converts a hex color to RGB', () => {
    expect(colorString.serialize('#ff0000')).toEqual({ colorType: 'hex', rgb: { r: 255, g: 0, b: 0, a: 1 } })
  })

  it('converts a rgb color to RGB', () => {
    expect(colorString.serialize('rgb(255, 0, 0)')).toEqual({ colorType: 'rgb', rgb: { r: 255, g: 0, b: 0, a: 1 } })
  })

  it('converts a hsl color to RGB', () => {
    expect(colorString.serialize('hsl(0 100% 50%)')).toEqual({ colorType: 'hsl', rgb: { r: 255, g: 0, b: 0, a: 1 } })
  })

  it('converts a hsv color to RGB', () => {
    expect(colorString.serialize('hsv(0, 100%, 100%)')).toEqual({ colorType: 'hsv', rgb: { r: 255, g: 0, b: 0, a: 1 } })
  })

  it('converts a cmyk color to RGB', () => {
    expect(colorString.serialize('cmyk(0% 26% 99% 1%)')).toEqual({ colorType: 'cmyk', rgb: { r: 252.45, g: 186.81, b: 2.52, a: 1 } })
  })

  it('throws an error for an invalid color format', () => {
    expect(() => colorString.serialize('color(20 20 30)')).toThrow('Unrecognized color format!')
  })
})
