import ColorFormatter from '../src/colorFormatter'

describe('RGB string representation', () => {
  it('should create legacy RGB string', () => {
    expect(new ColorFormatter().rgb({ r: 20, g: 100, b: 5, a: 0.5 })).toBe('rgba(20, 100, 5, 0.5)')
  })

  it('should create modern RGB color', () => {
    expect(new ColorFormatter({ CSSNext: true }).rgb({ r: 20, g: 100, b: 5, a: 0.5 })).toBe('rgb(20 100 5 / 0.5)')
  })

  it('should create minified legacy RGB color', () => {
    expect(new ColorFormatter({ minify: true }).rgb({ r: 20, g: 100, b: 5, a: 0.5 })).toBe('rgba(20,100,5,0.5)')
  })

  it('should create minified modern RGB color', () => {
    expect(new ColorFormatter({ minify: true, CSSNext: true }).rgb({ r: 20, g: 100, b: 5, a: 0.5 })).toBe('rgb(20 100 5/0.5)')
  })

  it('should omit the alpha channel when its value is equal to one.', () => {
    expect(new ColorFormatter().rgb({ r: 20, g: 100, b: 5, a: 1 })).toBe('rgb(20, 100, 5)')
    expect(new ColorFormatter({ minify: true }).rgb({ r: 20, g: 100, b: 5, a: 1 })).toBe('rgb(20,100,5)')
    expect(new ColorFormatter({ CSSNext: true }).rgb({ r: 20, g: 100, b: 5, a: 1 })).toBe('rgb(20 100 5)')
    expect(new ColorFormatter({ minify: true, CSSNext: true }).rgb({ r: 20, g: 100, b: 5, a: 1 })).toBe('rgb(20 100 5)')
  })
})

describe('HSL string representation', () => {
  it('should create legacy HSL string', () => {
    expect(new ColorFormatter().hsl({ h: 30, s: 40, l: 85, a: 0.5 })).toBe('hsla(30°, 40%, 85%, 0.5)')
  })

  it('should create modern HSL color', () => {
    expect(new ColorFormatter({ CSSNext: true }).hsl({ h: 30, s: 40, l: 85, a: 0.5 })).toBe('hsl(30° 40% 85% / 0.5)')
  })

  it('should create minified legacy HSL color', () => {
    expect(new ColorFormatter({ minify: true }).hsl({ h: 30, s: 40, l: 85, a: 0.5 })).toBe('hsla(30,40,85,0.5)')
  })

  it('should create minified modern HSL color', () => {
    expect(new ColorFormatter({ minify: true, CSSNext: true }).hsl({ h: 30, s: 40, l: 85, a: 0.5 })).toBe('hsl(30 40 85/0.5)')
  })

  it('should omit the alpha channel when its value is equal to one.', () => {
    expect(new ColorFormatter().hsl({ h: 30, s: 40, l: 85, a: 1 })).toBe('hsl(30°, 40%, 85%)')
    expect(new ColorFormatter({ minify: true }).hsl({ h: 30, s: 40, l: 85, a: 1 })).toBe('hsl(30,40,85)')
    expect(new ColorFormatter({ CSSNext: true }).hsl({ h: 30, s: 40, l: 85, a: 1 })).toBe('hsl(30° 40% 85%)')
    expect(new ColorFormatter({ minify: true, CSSNext: true }).hsl({ h: 30, s: 40, l: 85, a: 1 })).toBe('hsl(30 40 85)')
  })
})

describe('HSV string representation', () => {
  it('should create legacy HSV string', () => {
    expect(new ColorFormatter().hsv({ h: 30, s: 40, v: 85, a: 0.5 })).toBe('hsva(30°, 40%, 85%, 0.5)')
  })

  it('should create modern HSV color', () => {
    expect(new ColorFormatter({ CSSNext: true }).hsv({ h: 30, s: 40, v: 85, a: 0.5 })).toBe('hsv(30° 40% 85% / 0.5)')
  })

  it('should create minified legacy HSV color', () => {
    expect(new ColorFormatter({ minify: true }).hsv({ h: 30, s: 40, v: 85, a: 0.5 })).toBe('hsva(30,40,85,0.5)')
  })

  it('should create minified modern HSV color', () => {
    expect(new ColorFormatter({ minify: true, CSSNext: true }).hsv({ h: 30, s: 40, v: 85, a: 0.5 })).toBe('hsv(30 40 85/0.5)')
  })

  it('should omit the alpha channel when its value is equal to one.', () => {
    expect(new ColorFormatter().hsv({ h: 30, s: 40, v: 85, a: 1 })).toBe('hsv(30°, 40%, 85%)')
    expect(new ColorFormatter({ minify: true }).hsv({ h: 30, s: 40, v: 85, a: 1 })).toBe('hsv(30,40,85)')
    expect(new ColorFormatter({ CSSNext: true }).hsv({ h: 30, s: 40, v: 85, a: 1 })).toBe('hsv(30° 40% 85%)')
    expect(new ColorFormatter({ minify: true, CSSNext: true }).hsv({ h: 30, s: 40, v: 85, a: 1 })).toBe('hsv(30 40 85)')
  })
})

describe('CMYK string representation', () => {
  it('should create legacy CMYK string', () => {
    expect(new ColorFormatter().cmyk({ c: 30, m: 2, y: 10, k: 1, a: 0.5 })).toBe('cmyka(30%, 2%, 10%, 1%, 0.5)')
  })

  it('should create modern CMYK color', () => {
    expect(new ColorFormatter({ CSSNext: true }).cmyk({ c: 30, m: 2, y: 10, k: 1, a: 0.5 })).toBe('cmyk(30% 2% 10% 1% / 0.5)')
  })

  it('should create minified legacy CMYK color', () => {
    expect(new ColorFormatter({ minify: true }).cmyk({ c: 30, m: 2, y: 10, k: 1, a: 0.5 })).toBe('cmyka(30,2,10,1,0.5)')
  })

  it('should create minified modern CMYK color', () => {
    expect(new ColorFormatter({ minify: true, CSSNext: true }).cmyk({ c: 30, m: 2, y: 10, k: 1, a: 0.5 })).toBe('cmyk(30 2 10 1/0.5)')
  })

  it('should omit the alpha channel when its value is equal to one.', () => {
    expect(new ColorFormatter().cmyk({ c: 30, m: 2, y: 10, k: 1, a: 1 })).toBe('cmyk(30%, 2%, 10%, 1%)')
    expect(new ColorFormatter({ minify: true }).cmyk({ c: 30, m: 2, y: 10, k: 1, a: 1 })).toBe('cmyk(30,2,10,1)')
    expect(new ColorFormatter({ CSSNext: true }).cmyk({ c: 30, m: 2, y: 10, k: 1, a: 1 })).toBe('cmyk(30% 2% 10% 1%)')
    expect(new ColorFormatter({ minify: true, CSSNext: true }).cmyk({ c: 30, m: 2, y: 10, k: 1, a: 1 })).toBe('cmyk(30 2 10 1)')
  })
})
