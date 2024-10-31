# Working with Plugins

Extend **Colorus.js** with plugins to create custom color transformations and calculations.

## Overview

Plugins attach directly to any `Dye.Instance`, allowing flexible extension of core functionality.

## Creating a Plugin

Define a new plugin with `createPlugin`:

```typescript
export const myPlugin = createPlugin("myPlugin", function () {
  console.debug(this.rgb)
  console.debug(this.toHex())
  return "someValue"
})
```

## Adding Plugins to `dye()`

Pass plugins to `dye` to make them accessible in the color instance:

```typescript
const color = dye("#ff0000", {
  plugins: {
    myPlugin,
    isRed(): boolean {
      return this.rgb.r > 200 && this.rgb.g < 50 && this.rgb.b < 50
    }
  }
})

color.myPlugin() // "someValue"
color.isRed() // true
```

## Chaining Plugins

Combine plugins and methods seamlessly:

```typescript
color.lighten(0.2).desaturate(0.7).anotherCustomPlugin().rgb // Fully typed
```

## Type Safety

Colorus.js infers `Dye.Instance` type for `this` within plugins, enabling type-safe access to instance properties and methods.

## Plugin Guidelines

- **Unique Names**: Avoid conflicts by ensuring plugin names don’t overlap with built-in methods.
- **Side Effect-Free**: Plugins should not alter the `Dye.Instance` state directly.
- **Performance**: Optimize for intensive operations to maintain efficiency.
