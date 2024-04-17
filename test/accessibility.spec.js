import { relativeLuminance } from '../src/accessibility'

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
