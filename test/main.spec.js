import { Colorus } from '../src/main'

describe('Plugin Functionality', () => {
  it('should add a plugin method to the Colorus instance', () => {
    const color = new Colorus('#333', {
      plugins: {
        getHue: function () {
          return this.hsl.h
        }
      }
    })

    expect(color).toHaveProperty('getHue')
    expect(typeof color.getHue).toBe('function')
  })

  it('should allow the plugin method to access the Colorus instance data', () => {
    const color = new Colorus('rgb(20, 120, 80)', {
      plugins: {
        getHue: function () {
          return this.hsl.h
        }
      }
    })

    expect(color.getHue()).toBe(156)
  })

  it('should handle multiple plugin methods', () => {
    const color = new Colorus('#FF0000', {
      plugins: {
        getHue: function () {
          return this.hsl.h
        },
        isRed: function () {
          return this.rgb.r === 255 && this.rgb.g === 0 && this.rgb.b === 0
        }
      }
    })

    expect(color.getHue()).toBe(0)
    expect(color.isRed()).toBe(true)
  })
})

describe('Colorus.darken()', () => {
  it('darkens by default amount', () => {
    expect(new Colorus('#333').darken().toHex()).toBe('#2E2E2E')
  })

  it('darkens by a specific amount', () => {
    expect(new Colorus('#333').darken(0.2).toHex()).toBe('#292929')
  })

  it('darkens to max value from current lightness value', () => {
    expect(new Colorus('#333').darken(1).toHex()).toBe('#000000')
  })

  it('darkens by a specific amount', () => {
    expect(new Colorus('#333').darken(0.2).toHex()).toBe('#292929')
  })

  it('darkening of a light color', () => {
    expect(new Colorus('#FFF').darken().toHex()).toBe('#E6E6E6')
  })

  it('darkening by a large amount', () => {
    expect(new Colorus('#666').darken(0.6).toHex()).toBe('#292929')
  })
})

describe('Colorus.desaturate()', () => {
  it('desaturates by default amount', () => {
    expect(new Colorus('#3646d1').desaturate().toHex()).toBe('#3E4CC9')
  })

  it('desaturates by a specific amount', () => {
    expect(new Colorus('#3646d1').desaturate(0.2).toHex()).toBe('#4652C1')
  })

  it('desaturates to max value from current lightness value', () => {
    expect(new Colorus('#3646d1').desaturate(1).toHex()).toBe('#848484')
  })

  it('desaturates by a specific amount', () => {
    expect(new Colorus('#3646d1').desaturate(0.2).toHex()).toBe('#4652C1')
  })

  it('desaturating of a light color', () => {
    expect(new Colorus('#FFF').desaturate().toHex()).toBe('#FFFFFF')
  })

  it('desaturating by a large amount', () => {
    expect(new Colorus('#3646d1').desaturate(0.8).toHex()).toBe('#747793')
  })
})

describe('Colorus.test()', () => {
  test('should return "hex" for valid hex color input', () => {
    expect(Colorus.test('#F33')).toBe('hex')
    expect(Colorus.test('#FF0000')).toBe('hex')
    expect(Colorus.test('#00ff00')).toBe('hex')
  })

  test('should return "rgb" for valid RGB color object input', () => {
    expect(Colorus.test({ r: 255, g: 0, b: 0 })).toBe('rgb')
    expect(Colorus.test({ r: 0, g: 255, b: 0 })).toBe('rgb')
    expect(Colorus.test({ r: 0, g: 0, b: 255 })).toBe('rgb')
  })

  test('should return "hsl" for valid HSL color object input', () => {
    expect(Colorus.test({ h: 0, s: 100, l: 50 })).toBe('hsl')
    expect(Colorus.test({ h: 240, s: 100, l: 50 })).toBe('hsl')
  })

  test('should return "hsv" for valid HSV color object input', () => {
    expect(Colorus.test({ h: 0, s: 100, v: 100 })).toBe('hsv')
    expect(Colorus.test({ h: 240, s: 100, v: 100 })).toBe('hsv')
  })

  test('should return "cmyk" for valid CMYK color object input', () => {
    expect(Colorus.test({ c: 0, m: 100, y: 100, k: 0 })).toBe('cmyk')
    expect(Colorus.test({ c: 0, m: 0, y: 0, k: 100 })).toBe('cmyk')
  })

  test('should return null for invalid color input', () => {
    expect(Colorus.test('invalid')).toBeNull()
    expect(Colorus.test(null)).toBeNull()
    expect(Colorus.test(undefined)).toBeNull()
  })
})

describe('Colorus.invert()', () => {
  test('should invert colors correctly', () => {
    expect(new Colorus('crimson').invert().toRgb()).toBe('rgb(35, 235, 195)')
  })
})
