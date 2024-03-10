import colorObject from '../src/colorObject'

describe('serialize function', () => {
  it('should return correct serialized object for valid RGB color input', () => {
    const color = { r: 255, g: 0, b: 0 }
    const result = colorObject.serialize(color)
    expect(result).toEqual({ colorType: 'rgb', rgb: { r: 255, g: 0, b: 0, a: 1 } })
  })

  it('should return correct serialized object for valid HSL color input', () => {
    const color = { h: 120, s: 100, l: 50 }
    const result = colorObject.serialize(color)
    expect(result).toEqual({ colorType: 'hsl', rgb: { r: 0, g: 255, b: 0, a: 1 } })
  })

  it('should return correct serialized object for valid HSV color input', () => {
    const color = { h: 120, s: 45, v: 50 }
    const result = colorObject.serialize(color)
    expect(result).toEqual({ colorType: 'hsv', rgb: { r: 70.13, g: 127.5, b: 70.13, a: 1 } })
  })

  it('should return correct serialized object for valid CMYK color input', () => {
    const color = { c: 0, m: 26, y: 99, k: 1 }
    const result = colorObject.serialize(color)
    expect(result).toEqual({ colorType: 'cmyk', rgb: { r: 252.45, g: 186.81, b: 2.52, a: 1 } })
  })

  it('should throw an error for invalid color input', () => {
    const color = { h: 'invalid', s: 'color', l: 'input' }
    expect(() => colorObject.serialize(color)).toThrow('Unrecognized color format!')
  })
})
