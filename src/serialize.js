import { Clamp } from './colorNormalizer'
import { cmykToRgb, hexToRgb, hslToRgb, hsvToRgb } from './conversion'
import { isCmykObject, isHslObject, isHsvObject, isRgbObject, nao, padString } from './helpers'

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

const colorParsers = {
  hex: match => hexToRgb(padString(match[1])),
  rgb: match => ({ r: Number(match[1]), g: Number(match[2]), b: Number(match[3]), a: Number(match[4]) || 1 }),
  hsl: match => ({ h: Number(match[1]), s: Number(match[2]), l: Number(match[3]), a: Number(match[4]) || 1 }),
  hsv: match => ({ h: Number(match[1]), s: Number(match[2]), v: Number(match[3]), a: Number(match[4]) || 1 }),
  cmyk: match => ({ c: Number(match[1]), m: Number(match[2]), y: Number(match[3]), k: Number(match[4]), a: Number(match[5]) || 1 })
}

const colorSerializers = {
  rgb: ({ r, g, b, a }) => Clamp.rgb({ r, g, b, a }),
  hsl: ({ h, s, l, a }) => hslToRgb(Clamp.hsl({ h, s, l, a })),
  hsv: ({ h, s, v, a }) => hsvToRgb(Clamp.hsv({ h, s, v, a })),
  cmyk: ({ c, m, y, k, a }) => cmykToRgb(Clamp.cmyk({ c, m, y, k, a }))
}

export const fallbackColor = { colorType: undefined, colorObject: { r: 0, g: 0, b: 0, a: 1 } }

/**
 * Determine the color type based on the provided color object.
 * @param {object} colorObject - The color object to be analyzed.
 * @return {string} The determined color type ('rgb', 'hsl', 'hsv', 'cmyk').
 */
export const determineColorType = colorObject => {
  if (!colorObject) return undefined

  if (isRgbObject(colorObject)) return 'rgb'
  else if (isHslObject(colorObject)) return 'hsl'
  else if (isHsvObject(colorObject)) return 'hsv'
  else if (isCmykObject(colorObject)) return 'cmyk'

  return undefined
}

/**
 * Converts a color object to a standardized format.
 * ```js
 * fromObject({ colorObject: { h: 360, s: 0, l: 100, a: 1 } }) // Returns: { colorType: "hsl", colorObject: { r: 255, g: 255, b: 255, a: 1 } }
 * ```
 * @param {{colorType:string,colorObject:object}} input - The input color object.
 * @param {boolean} [skipSerialization=false] - If true, only performs type checking without serialization to standardized format.
 * @return {{colorType:string,colorObject:object}} An object containing the type of color and its color values.
 */
export function fromObject(input, skipSerialization = false) {
  const colorTypeFromObject = determineColorType(input?.colorObject)
  const colorType = colorParsers.hasOwnProperty(input?.colorType) ? input?.colorType : colorTypeFromObject

  if (skipSerialization) return { colorType, colorObject: input?.colorObject }

  if (colorSerializers[colorTypeFromObject]) {
    return {
      colorType,
      colorObject: colorSerializers[colorTypeFromObject](input?.colorObject)
    }
  }
  return fallbackColor
}

/**
 * Parses a color string and converts it to a color object.
 * ```
 * parse('hsl(360,0,100)') // Returns: { colorType: "hsl", colorObject: { h: 360, s: 0, l: 100, a: 1 } }
 * ```
 * @param {string} input - The input color string.
 * @param {boolean} [skipParsing=false] - If true, only performs type checking without parsing into a object.
 * @return {{colorType:string,colorObject:object}|null} An object containing the type of color and its color values.
 */
export function parse(input, skipParsing = false) {
  for (const [name, pattern] of colorPatterns) {
    pattern.lastIndex = 0
    const match = pattern.exec(input)
    if (match !== null) {
      return {
        colorType: name,
        colorObject: skipParsing !== true ? colorParsers[name](match) : undefined
      }
    }
  }
  return null
}

/**
 * Attemps to serializes an color input to a standardized color object.
 * @param {unknown} input - The input color string or object.
 * @param {object} [options] - An optional object containing configuration options.
 * @param {boolean} [options.analytical=false] - If true, only performs color analysis without parsing into a standardized format.
 * @return {{colorType:string,colorObject:object}}  An object containing the type of color and its color values.
 * @throws {TypeError} If the input is not a valid color string or object.
 */
export function fromUserInput(input, { analytical } = { analytical: false }) {
  if (typeof input === 'undefined') {
    return fallbackColor
  } else if (typeof input === 'string') {
    return fromObject(parse(input, analytical), analytical)
  } else if (!nao(input)) {
    return fromObject({ colorObject: input }, analytical)
  } else {
    if (analytical) return { colorType: undefined }
    throw new TypeError('Invalid color type, expected and valid color string or object.')
  }
}
