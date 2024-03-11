import clamp from './clamp'

/**
 * Interpolates between two RGB colors based on a given amount.
 * @param {Object} primary - The primary color in RGB format.
 * @param {Object} secondary - The secondary color in RGB format.
 * @param {number} amount - A value between 0 and 1, indicating the strength of interpolation.
 * @return {Object} An object containing interpolated RGB and optional alpha values.
 */
const mix = ({ r, g, b, a = 1 }, { r: R, g: G, b: B, a: A = 1 }, amount = 0.1) => {
  const mixBy = (p, s) => p * (1 - amount) + s * amount

  return clamp.rgb({
    r: mixBy(r, R),
    g: mixBy(g, G),
    b: mixBy(b, B),
    a: mixBy(a * 100, A * 100)
  })
}

export default { mix }
