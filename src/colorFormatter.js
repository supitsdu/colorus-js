import { Round } from './colorNormalizer'

// A class for formatting color values into various formats.
class ColorFormatter {
  #spacer
  #percent
  #degree
  #suffix
  #alpha

  /**
   * Constructs a ColorFormatter object.
   * @param {Object} options - Options for formatting.
   * @param {boolean} options.minify - Whether to minify the output.
   * @param {boolean} options.CSSNext - Whether to use CSSNext compatible formatting.
   */
  constructor({ minify, CSSNext } = {}) {
    const space = minify !== true ? ' ' : ''
    const alphaSpacer = CSSNext === true ? `${space}/${space}` : `,${space}`

    this.#spacer = CSSNext === true ? ' ' : `,${space}`
    this.#percent = minify !== true ? '%' : ''
    this.#degree = minify !== true ? '°' : ''
    this.#suffix = a => (a == 1 || CSSNext == true ? '' : 'a')
    this.#alpha = a => (a == 1 ? '' : `${alphaSpacer}${a}`)
  }

  rgb(input) {
    const { r, g, b, a } = Round.rgb(input)
    return `rgb${this.#suffix(a)}(${r}${this.#spacer}${g}${this.#spacer}${b}${this.#alpha(a)})`
  }

  hsl(input) {
    const { h, s, l, a } = Round.hsl(input)
    return `hsl${this.#suffix(a)}(${h}${this.#degree}${this.#spacer}${s}${this.#percent}${this.#spacer}${l}${this.#percent}${this.#alpha(a)})`
  }

  hsv(input) {
    const { h, s, v, a } = Round.hsv(input)
    return `hsv${this.#suffix(a)}(${h}${this.#degree}${this.#spacer}${s}${this.#percent}${this.#spacer}${v}${this.#percent}${this.#alpha(a)})`
  }

  cmyk(input) {
    const { c, m, k, y, a } = Round.cmyk(input)
    return `cmyk${this.#suffix(a)}(${c}${this.#percent}${this.#spacer}${m}${this.#percent}${this.#spacer}${y}${this.#percent}${this.#spacer}${k}${this.#percent}${this.#alpha(a)})`
  }
}

export default ColorFormatter
