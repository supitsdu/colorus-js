import Colorus from '../src/main'

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
