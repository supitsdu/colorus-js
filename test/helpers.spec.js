import { hexString, padString, precision, utmost } from '../src/helpers'

describe('utmost', () => {
  it('returns the input value when it is less than the maximum', () => {
    const inputValue = 50
    const maxValue = 100

    expect(utmost(inputValue, maxValue)).toBe(inputValue)
  })

  it('returns the maximum value when the input value equals the maximum', () => {
    const inputValue = 100
    const maxValue = 100

    expect(utmost(inputValue, maxValue)).toBe(maxValue)
  })

  it('returns the maximum value when the input value is greater than the maximum', () => {
    const inputValue = 150
    const maxValue = 100

    expect(utmost(inputValue, maxValue)).toBe(maxValue)
  })

  it('returns 0 when the input value is negative', () => {
    const inputValue = -50
    const maxValue = 100

    expect(utmost(inputValue, maxValue)).toBe(0)
  })

  it('returns 0 when the input value is 0', () => {
    const inputValue = 0
    const maxValue = 100

    expect(utmost(inputValue, maxValue)).toBe(0)
  })

  it('returns the input value when it is slightly greater than 0', () => {
    const inputValue = 0.01
    const maxValue = 100

    expect(utmost(inputValue, maxValue)).toBeCloseTo(inputValue)
  })
})

describe('hexString', () => {
  const defaultMinSize = 6
  const validInputRgb = 42

  it('converts the input to a HEX string with radix 16', () => {
    const input = validInputRgb
    const minSize = defaultMinSize

    const result = hexString(input, minSize)

    expect(result.length).toBe(minSize)
    expect(Number.isNaN(parseInt(result, 16))).toBe(false)
  })

  it('returns the correct HEX string for a single-channel RGB input', () => {
    const input = 10
    const minSize = 2

    const result = hexString(input, minSize)

    expect(result).toBe('0A')
  })

  it('returns the correct HEX string for a three-channel RGB input', () => {
    const input = 12345
    const minSize = 5

    const result = hexString(input, minSize)

    expect(result).toBe('03039')
  })

  it('pads the HEX string with leading zeros if the input is smaller than the minSize', () => {
    const input = 10
    const minSize = 4

    const result = hexString(input, minSize)

    expect(result).toBe('000A')
  })
})

describe('padString', () => {
  test('pads single-character minified HEX strings to 6 characters', () => {
    const input = 'eee'
    const output = padString(input)
    expect(output).toBe('eeeeee')
  })

  test('pads double-character minified HEX strings to 8 characters', () => {
    const input = 'e3ef'
    const output = padString(input)
    expect(output).toBe('ee33eeff')
  })

  test('handles max-length input (6 characters) without padding', () => {
    const input = '00ff00'
    const output = padString(input)
    expect(output).toBe('00ff00')
  })

  test('handles max-length input + 1 (7 characters) without padding', () => {
    const input = '00ff000'
    const output = padString(input)
    expect(output).toBe('00ff000')
  })
})

describe('precision()', () => {
  test('Formats positive numbers with specified precision', () => {
    expect(precision(3.14159)).toBe(3.14)
  })

  test('Formats negative numbers with specified precision', () => {
    expect(precision(-3.14159)).toBe(-3.14)
    expect(precision(-2.71828)).toBe(-2.72)
    expect(precision(-1.61803)).toBe(-1.62)
  })

  test('Preserves integer values without decimal part', () => {
    expect(precision(123)).toBe(123)
    expect(precision(456)).toBe(456)
    expect(precision(789)).toBe(789)
  })

  test('Allows maximum precision of 20 decimal places', () => {
    expect(precision(0.000000000000000012345)).toBe(0)
    expect(precision(0.1234567890123456789)).toBe(0.12)
  })

  test('Uses default max precision of 2 if max parameter is undefined', () => {
    expect(precision(3.14159)).toBeCloseTo(3.14)
    expect(precision(-2.71828)).toBeCloseTo(-2.72)
  })
})
