import { Clamp } from './colorNormalizer'
import { hexToRgb, hslToRgb, hsvToRgb, cmykToRgb } from './conversion'
import { padString } from './helpers'

const colorPatterns = [
  ['hex', /^#([a-f\d]{8}|[a-f\d]{6}|[a-f\d]{3,4})$/iy],
  ['rgb', /^rgba?\(\s*(\d{1,3})(?:\s*\,\s*|\s+)(\d{1,3})(?:\s*\,\s*|\s+)(\d{1,3})(?:\s*(?:\,|\/)\s*(0?\.\d+|1|0))?\s*\)$/iy],
  ['hsl', /^hsla?\(\s*(\d{1,3})(?:deg|°)?(?:\s*\,\s*|\s+)(\d{1,3})%?(?:\s*\,\s*|\s+)(\d{1,3})%?(?:\s*(?:\,|\/)\s*(0?\.\d+|1|0))?\s*\)$/iy],
  ['hsv', /^hsva?\(\s*(\d{1,3})(?:deg|°)?(?:\s*\,\s*|\s+)(\d{1,3})%?(?:\s*\,\s*|\s+)(\d{1,3})%?(?:\s*(?:\,|\/)\s*(0?\.\d+|1|0))?\s*\)$/iy],
  [
    'cmyk',
    /^cmyka?\(\s*(\d{1,3})%?(?:\s*\,\s*|\s+)(\d{1,3})%?(?:\s*\,\s*|\s+)(\d{1,3})%?(?:\s*\,\s*|\s+)(\d{1,3})%?(?:\s*(?:\,|\/)\s*(0?\.\d+|1|0))?\s*\)$/iy
  ]
]

const colorSpaces = {
  hex: match => ({ colorType: 'hex', rgb: hexToRgb(padString(match[1])) }),
  rgb: match => ({
    colorType: 'rgb',
    rgb: Clamp.rgb({ r: match[1], g: match[2], b: match[3], a: match[4] || 1 })
  }),
  hsl: match => ({
    colorType: 'hsl',
    rgb: hslToRgb(Clamp.hsl({ h: match[1], s: match[2], l: match[3], a: match[4] || 1 }))
  }),
  hsv: match => ({
    colorType: 'hsv',
    rgb: hsvToRgb(Clamp.hsv({ h: match[1], s: match[2], v: match[3], a: match[4] || 1 }))
  }),
  cmyk: match => ({
    colorType: 'cmyk',
    rgb: cmykToRgb(Clamp.cmyk({ c: match[1], m: match[2], y: match[3], k: match[4], a: match[5] || 1 }))
  })
}

/**
 * Takes in a string and returns an object with the color type and its RGB representation.
 * @param {string} color  - The color to convert to an standardized  format.
 * @return  {{colorType, rgb}} A object containing the type of color and its RGB value.
 * @throws  Error if no valid color representation could be found in the input
 */
const serialize = color => {
  for (const [colorType, pattern] of colorPatterns) {
    pattern.lastIndex = 0

    const match = pattern.exec(color)

    if (match !== null) {
      return colorSpaces[colorType](match)
    }
  }

  throw new Error('Unrecognized color format!')
}

export default { serialize }
