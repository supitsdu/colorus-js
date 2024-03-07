/**
 * Creates a function that generates a CSS color string based on the provided color type and color object.
 * @param {string[]} colorType - An array of property keys from a color object that specify the color type.
 * @return {Function} - A function that takes a color object and options object, and returns a CSS color string.
 */
const fromObject = colorType => {
  /**
   * Generates a CSS color string based on the provided color object and options object.
   * @param {Object} colorObject - An object containing the color values.
   * @param {Object} options - An optional object that contains configuration properties.
   * @property {boolean} [options.minify=false] - When true, enables minification of the CSS color string.
   * @property {boolean} [options.CSSNext=false] - When true, enables CSS Next syntax for the CSS color string.
   * @return {string|null} - A CSS color string if the input is valid, null otherwise.
   */
  return function (colorObject, options = {}) {
    options = {
      minify: false,
      CSSNext: false,
      ...options
    }

    let colorFunction = ''
    let alphaChannel = ''
    const spacer = options?.CSSNext ? ' ' : ', '
    const channels = []

    for (const key of colorType) {
      const value = Number(colorObject[key])

      if (isNaN(value)) return null

      colorFunction += key

      let channelValue = Math.round(value).toString()

      if ('slv'.includes(key) && !options?.minify) channelValue += '%'

      channels.push(channelValue)
    }

    if (colorObject.hasOwnProperty('a') && colorObject?.a != 1) {
      alphaChannel = (options?.CSSNext ? ' / ' : ', ') + (Math.round(colorObject?.a * 100) / 100).toString()
      if (!options?.CSSNext) colorFunction += 'a'
    }

    return `${colorFunction}(${channels.join(spacer)}${alphaChannel})`
  }
}

export default { fromObject }
