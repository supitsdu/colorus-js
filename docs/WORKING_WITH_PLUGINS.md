# Working with Plugins

**Colorus.js** offers a powerful plugin system to extend the capabilities of the `dye()` function, allowing you to add custom methods and functionalities to color objects. This guide will walk you through the process of creating, using, and understanding plugins in Colorus.js.

## What are Plugins? 🤔

Plugins are essentially functions that you can attach to color objects created by the `dye()` function. These functions can access the color's properties and methods, enabling you to perform custom calculations, transformations, or any other color-related operations. 🎨

### Defining a Plugin 🧩

A plugin is defined as a function that takes the color object as its `this` context and any additional arguments you might need

```typescript
import type { Dye } from "colorus-js"

export function myPlugin(this: Dye, ...args: any[]) {
  // Access color properties and methods using 'this' keyword
  console.debug(this.rgb)
  console.debug(this.toHex())

  // Perform custom logic or calculations...

  return someValue // Optionally return a value
}
```

### Using Plugins with `dye()` 🧪

You can attach plugins to a color object by passing them in the `options.plugins` object when calling `dye()`.

```typescript
import { dye } from "colorus-js"
import { myPlugin } from "./myPlugin.ts"

const color = dye("#ff0000", {
  plugins: {
    myPlugin,
    isRed() {
      return this.rgb.r > 200 && this.rgb.g < 50 && this.rgb.b < 50
    }
  }
})

console.debug(color.myPlugin())
console.debug(color.isRed())
```

### Plugin Chaining ⛓️

One of the powerful features of Colorus.js plugins is the ability to chain them with the core color manipulation methods.

```typescript
const lighterColor = color.lighten(0.2)
console.debug(lighterColor.getHue())
```

### Type Safety with Plugins ✅

Colorus.js leverages TypeScript to provide strong type safety when working with plugins.

- The `this` context within plugin methods is automatically typed as a `DyeReturns` object, giving you access to all the core color properties and methods through autocompletion and type checking. 👍
- If your plugin returns a new color object, TypeScript will infer the correct type for the chained calls, ensuring that any subsequent plugin methods are also available. 🔄

### Important Considerations ⚠️

- **Plugin Naming:** Choose descriptive and unique names for your plugin methods to avoid conflicts with core methods or other plugins. 📛
- **Side Effects:** Be mindful of side effects within your plugins. Avoid modifying the original color object directly unless that's the intended behavior. 🧪
- **Performance:** If your plugin performs complex calculations, consider optimizing it for performance, especially if it will be used in computationally intensive scenarios. ⚡

### Conclusion

The plugin system in Colorus.js opens up a world of possibilities for extending and customizing the library to fit your specific needs. We encourage you to explore this feature and create plugins that enhance your color manipulation workflows! 🚀
