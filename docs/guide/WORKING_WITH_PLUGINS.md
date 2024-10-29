# Working with Plugins

This guide shows how to create, use, and understand plugins in **Colorus.js**.

## Plugins Overview

Plugins are functions that can attach to any `Dye.Instance` created with `dye()`, allowing you to extend functionality with custom calculations and transformations.

### Defining a Plugin

Plugins are functions using `this` as the color context, with optional additional arguments.

```typescript
import type { createPlugin } from "colorus-js"

export const myPlugin = createPlugin("myPlugin", function () {
  console.debug(this.rgb)
  console.debug(this.toHex())
  return "someValue"
})
```

### Using Plugins with `dye()`

Attach plugins to a `Dye.Instance` via `options.plugins` in the `dye()` function.

```typescript
import { dye } from "colorus-js"
import { myPlugin } from "./myPlugin.ts"

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

### Chaining Plugins

Chain custom plugins with core color methods seamlessly.

```typescript
color.lighten(0.2).desaturate(0.7).myCustomPlugin().rgb // Fully typed
```

### Type Safety

TypeScript automatically types `this` as a `Dye.Instance` within plugins, providing type-safe access to core properties and methods.

### Key Tips

- **Naming:** Use unique names to avoid conflicts with core methods or built-ins.
- **Avoid Side Effects:** Do not modify the original `Dye.Instance` directly.
- **Optimize for Performance:** Ensure efficiency for any intensive calculations.
