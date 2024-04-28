/**
 * Calculate the relative luminance of an sRGB color.
 * @param {object} color - An object containing the sRGB components of the color.
 * @return {number} The luminance value of the color.
 */
export const relativeLuminance = ({ r, g, b }) => {
  const fn = c => {
    c /= 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }

  return fn(r) * 0.2126 + fn(g) * 0.7152 + fn(b) * 0.0722
}

/**
 * Calculate the contrast ratio between two relative luminance values.
 * @param {number} L1 - The relative luminance of the lighter color.
 * @param {number} L2 - The relative luminance of the darker color.
 * @return {number} The contrast ratio between the two colors.
 */
export const calculateContrastRatio = (L1, L2) => (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)

/**
 * Calculate the contrast ratio between a foreground color and its adjacent background.
 * @param {object} fg - The sRGB color values of the foreground.
 * @param {object} bg - The sRGB color values of the background.
 * @return {number} The contrast ratio between the two colors.
 */
export const contrastRatio = (fg, bg) => calculateContrastRatio(relativeLuminance(fg), relativeLuminance(bg))
