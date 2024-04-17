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
