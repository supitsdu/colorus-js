import { parse, fromObject, determineColorType, fromUserInput } from '../src/serialize'

describe('determineColorType function', () => {
  it('should return "rgb" for a valid RGB color object', () => {
    const colorObject = { r: 255, g: 0, b: 128 }
    expect(determineColorType(colorObject)).toBe('rgb')
  })

  it('should return "hsl" for a valid HSL color object', () => {
    const colorObject = { h: 180, s: 50, l: 50 }
    expect(determineColorType(colorObject)).toBe('hsl')
  })

  it('should return "hsv" for a valid HSV color object', () => {
    const colorObject = { h: 240, s: 100, v: 100 }
    expect(determineColorType(colorObject)).toBe('hsv')
  })

  it('should return "cmyk" for a valid CMYK color object', () => {
    const colorObject = { c: 0, m: 100, y: 100, k: 0 }
    expect(determineColorType(colorObject)).toBe('cmyk')
  })

  it('should return undefined for an invalid color object', () => {
    const colorObject = { invalidProp: 'invalidValue' }
    expect(determineColorType(colorObject)).toBeUndefined()
  })

  it('should return undefined for a null color object', () => {
    const colorObject = null
    expect(determineColorType(colorObject)).toBeUndefined()
  })

  it('should return undefined for an undefined color object', () => {
    const colorObject = undefined
    expect(determineColorType(colorObject)).toBeUndefined()
  })
})

describe('fromObject function', () => {
  it('should return the input object unchanged if skipSerialization is true', () => {
    const input = { colorType: 'rgb', colorObject: { r: 255, g: 0, b: 128 } }
    const result = fromObject(input, true)
    expect(result).toEqual(input)
  })

  it('should serialize RGB color object if skipSerialization is false', () => {
    const input = { colorObject: { r: 255, g: 0, b: 128 } }
    const expectedOutput = { colorType: 'rgb', colorObject: { r: 255, g: 0, b: 128, a: 1 } }
    const result = fromObject(input)
    expect(result.colorType).toBe(expectedOutput.colorType)
    expect(result.colorObject).toEqual(expectedOutput.colorObject)
  })

  it('should serialize HSL color object if skipSerialization is false', () => {
    const input = { colorObject: { h: 360, s: 0, l: 100, a: 1 } }
    const expectedOutput = { colorType: 'hsl', colorObject: { r: 255, g: 255, b: 255, a: 1 } }
    const result = fromObject(input)
    expect(result.colorType).toBe(expectedOutput.colorType)
    expect(result.colorObject).toEqual(expectedOutput.colorObject)
  })

  it('should serialize HSV color object if skipSerialization is false', () => {
    const input = { colorObject: { h: 360, s: 0, v: 100, a: 1 } }
    const expectedOutput = { colorType: 'hsv', colorObject: { r: 255, g: 255, b: 255, a: 1 } }
    const result = fromObject(input)
    expect(result.colorType).toBe(expectedOutput.colorType)
    expect(result.colorObject).toEqual(expectedOutput.colorObject)
  })

  it('should serialize CMYK color object if skipSerialization is false', () => {
    const input = { colorObject: { c: 100, m: 0, y: 0, k: 0, a: 1 } }
    const expectedOutput = { colorType: 'cmyk', colorObject: { r: 0, g: 255, b: 255, a: 1 } }
    const result = fromObject(input)
    expect(result.colorType).toBe(expectedOutput.colorType)
    expect(result.colorObject).toEqual(expectedOutput.colorObject)
  })

  it('should determine type from colorObject if input colorType is not recognized', () => {
    const input = { colorType: 'invalid', colorObject: { r: 255, g: 0, b: 128 } }
    const fallbackColor = { colorType: 'rgb', colorObject: { r: 255, g: 0, b: 128, a: 1 } }
    const result = fromObject(input)
    expect(result.colorType).toBe(fallbackColor.colorType)
    expect(result.colorObject).toEqual(fallbackColor.colorObject)
  })

  it('should return fallback color if input object is undefined', () => {
    const result = fromObject(undefined)
    const fallbackColor = { colorType: undefined, colorObject: { r: 0, g: 0, b: 0, a: 1 } }
    expect(result.colorType).toBe(fallbackColor.colorType)
    expect(result.colorObject).toEqual(fallbackColor.colorObject)
  })
})

describe('parse function', () => {
  it('should parse RGB color string', () => {
    const input = 'rgb(255, 0, 128)'
    const expectedOutput = { colorType: 'rgb', colorObject: { r: 255, g: 0, b: 128, a: 1 } }
    const result = parse(input)
    expect(result.colorType).toBe(expectedOutput.colorType)
    expect(result.colorObject).toEqual(expectedOutput.colorObject)
  })

  it('should parse RGBA color string', () => {
    const input = 'rgba(255, 0, 128, 0.5)'
    const expectedOutput = { colorType: 'rgb', colorObject: { r: 255, g: 0, b: 128, a: 0.5 } }
    const result = parse(input)
    expect(result.colorType).toBe(expectedOutput.colorType)
    expect(result.colorObject).toEqual(expectedOutput.colorObject)
  })

  it('should parse HSL color string', () => {
    const input = 'hsl(360, 100%, 50%)'
    const expectedOutput = { colorType: 'hsl', colorObject: { h: 360, s: 100, l: 50, a: 1 } }
    const result = parse(input)
    expect(result.colorType).toBe(expectedOutput.colorType)
    expect(result.colorObject).toEqual(expectedOutput.colorObject)
  })

  it('should parse HSLA color string', () => {
    const input = 'hsla(360, 100%, 50%, 0.5)'
    const expectedOutput = { colorType: 'hsl', colorObject: { h: 360, s: 100, l: 50, a: 0.5 } }
    const result = parse(input)
    expect(result.colorType).toBe(expectedOutput.colorType)
    expect(result.colorObject).toEqual(expectedOutput.colorObject)
  })

  it('should parse HSV color string', () => {
    const input = 'hsv(120, 100%, 100%)'
    const expectedOutput = { colorType: 'hsv', colorObject: { h: 120, s: 100, v: 100, a: 1 } }
    const result = parse(input)
    expect(result.colorType).toBe(expectedOutput.colorType)
    expect(result.colorObject).toEqual(expectedOutput.colorObject)
  })

  it('should parse HSVA color string', () => {
    const input = 'hsva(120, 100%, 100%, 0.5)'
    const expectedOutput = { colorType: 'hsv', colorObject: { h: 120, s: 100, v: 100, a: 0.5 } }
    const result = parse(input)
    expect(result.colorType).toBe(expectedOutput.colorType)
    expect(result.colorObject).toEqual(expectedOutput.colorObject)
  })

  it('should parse CMYK color string', () => {
    const input = 'cmyk(100%, 0%, 0%, 0%)'
    const expectedOutput = { colorType: 'cmyk', colorObject: { c: 100, m: 0, y: 0, k: 0, a: 1 } }
    const result = parse(input)
    expect(result.colorType).toBe(expectedOutput.colorType)
    expect(result.colorObject).toEqual(expectedOutput.colorObject)
  })

  it('should parse CMYKA color string', () => {
    const input = 'cmyka(100%, 0%, 0%, 0%, 0.5)'
    const expectedOutput = { colorType: 'cmyk', colorObject: { c: 100, m: 0, y: 0, k: 0, a: 0.5 } }
    const result = parse(input)
    expect(result.colorType).toBe(expectedOutput.colorType)
    expect(result.colorObject).toEqual(expectedOutput.colorObject)
  })

  it('should parse CSS named color string', () => {
    const input = 'red'
    const expectedOutput = { colorType: 'named', colorObject: { r: 255, g: 0, b: 0, a: 1 } }
    const result = parse(input)
    expect(result.colorType).toBe(expectedOutput.colorType)
    expect(result.colorObject).toEqual(expectedOutput.colorObject)
  })

  it('should return null for invalid color string', () => {
    const input = 'invalid color string'
    const result = parse(input)
    expect(result).toBeNull()
  })

  it('should return only colorType when skipParsing is true', () => {
    const input = 'rgb(255, 0, 128)'
    const result = parse(input, true)
    expect(result.colorType).toBe('rgb')
    expect(result.colorObject).toBeUndefined()
  })
})

describe('fromUserInput function', () => {
  it('should return fallback color for undefined input', () => {
    const result = fromUserInput(undefined)
    const fallbackColor = { colorType: undefined, colorObject: { r: 0, g: 0, b: 0, a: 1 } }
    expect(result.colorType).toBe(fallbackColor.colorType)
    expect(result.colorObject).toEqual(fallbackColor.colorObject)
  })

  it('should parse and serialize RGB color string input', () => {
    const input = 'rgb(255, 0, 128)'
    const expectedOutput = { colorType: 'rgb', colorObject: { r: 255, g: 0, b: 128, a: 1 } }
    const result = fromUserInput(input)
    expect(result.colorType).toBe(expectedOutput.colorType)
    expect(result.colorObject).toEqual(expectedOutput.colorObject)
  })

  it('should parse and serialize CSS named color string input', () => {
    const input = 'aliceblue'
    const expectedOutput = { colorType: 'named', colorObject: { r: 240, g: 248, b: 255, a: 1 } }
    const result = fromUserInput(input)
    expect(result.colorType).toBe(expectedOutput.colorType)
    expect(result.colorObject).toEqual(expectedOutput.colorObject)
  })

  it('should parse and serialize color object input', () => {
    const input = { r: 255, g: 0, b: 128 }
    const expectedOutput = { colorType: 'rgb', colorObject: { r: 255, g: 0, b: 128, a: 1 } }
    const result = fromUserInput(input)
    expect(result.colorType).toBe(expectedOutput.colorType)
    expect(result.colorObject).toEqual(expectedOutput.colorObject)
  })

  it('should throw TypeError for invalid input', () => {
    const input = 123 // Invalid input
    expect(() => {
      fromUserInput(input)
    }).toThrow(TypeError)
  })

  it('should only perform color analysis when analytical option is true', () => {
    const input = 'rgb(255, 0, 128)'
    const result = fromUserInput(input, { analytical: true })
    const expectedOutput = { colorType: 'rgb', colorObject: undefined }
    expect(result.colorType).toBe(expectedOutput.colorType)
    expect(result.colorObject).toBe(expectedOutput.colorObject)
  })
})
