import { calculateContrastRatio, contrastRatio, relativeLuminance } from '../src/accessibility'

describe('relativeLuminance', () => {
  it('should calculate the luminance of a black color correctly', () => {
    const color = { r: 0, g: 0, b: 0 }
    expect(relativeLuminance(color)).toBe(0)
  })

  it('should calculate the luminance of a white color correctly', () => {
    const color = { r: 255, g: 255, b: 255 }
    expect(relativeLuminance(color)).toBe(1)
  })

  it('should calculate the luminance of a gray color correctly', () => {
    const color = { r: 128, g: 128, b: 128 }
    expect(relativeLuminance(color)).toBeCloseTo(0.215, 2)
  })

  it('should calculate the luminance of a custom color correctly', () => {
    const color = { r: 100, g: 200, b: 50 }
    expect(relativeLuminance(color)).toBeCloseTo(0.442, 2)
  })

  it('should calculate the luminance of a color with maximum RGB values correctly', () => {
    const color = { r: 255, g: 255, b: 255 }
    expect(relativeLuminance(color)).toBe(1)
  })

  it('should calculate the luminance of a color with minimum RGB values correctly', () => {
    const color = { r: 0, g: 0, b: 0 }
    expect(relativeLuminance(color)).toBe(0)
  })
})

describe('calculateContrastRatio', () => {
  it('calculates contrast ratio between two luminance values', () => {
    // Test case where L1 > L2
    expect(calculateContrastRatio(0.7, 0.05)).toBeCloseTo(7.5, 2)

    // Test case where L2 > L1
    expect(calculateContrastRatio(0.05, 0.7)).toBeCloseTo(7.5, 2)

    // Test case where L1 = L2
    expect(calculateContrastRatio(0.1, 0.1)).toBeCloseTo(1, 2)
  })
})

describe('contrastRatio', () => {
  it('calculates contrast ratio between foreground and background colors', () => {
    const higherLuminance = { r: 255, g: 255, b: 255 }
    const lowerLuminance = { r: 0, g: 0, b: 0 }

    // Test case where foreground has higher luminance
    expect(contrastRatio(higherLuminance, lowerLuminance)).toBeCloseTo(21, 2)

    // Test case where background has higher luminance
    expect(contrastRatio(lowerLuminance, higherLuminance)).toBeCloseTo(21, 2)

    // Test case where foreground and background have equal luminance
    const equalLuminance = { r: 128, g: 128, b: 128 } // gray
    expect(contrastRatio(equalLuminance, equalLuminance)).toBeCloseTo(1, 3)
  })
})
