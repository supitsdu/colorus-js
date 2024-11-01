# Contributing to Colorus.js 🎉

Thank you for considering a contribution to **Colorus.js**! From fixing bugs to improving documentation or expanding functionality with plugins and parsers, every contribution is valuable.

## Design Choice

The design choice ensures that colors are parsed, transformed, and returned in predictable and reliable ways, even if it means some operations may be slower than highly optimized alternatives.

Despite this focus, **Colorus.js** performs efficiently in most use cases. While the library might not aim to be the absolute fastest, it’s still capable of handling high-demand operations quickly. If you identify areas where optimizations can be made without sacrificing validation, please feel free to propose changes or submit a pull request.

## Core and Extensible Features 🔒

| Feature                           | Extensible via Plugins or Parsers             |
| --------------------------------- | --------------------------------------------- |
| Color creation (`dye`)            | [Parsers](docs/guide/WORKING_WITH_PARSERS.md) |
| Color conversions and adjustments | [Plugins](docs/guide/WORKING_WITH_PLUGINS.md) |

The plugin and parser systems in version 2.0.0 allow easy extensibility, making it possible to add custom features while preserving the core library’s structure.

## How to Contribute 🛠️

1. **Significant Changes:** Open an issue first to discuss.
2. **Minor Fixes (e.g., typos):** Open a pull request directly.
3. **Steps:**
   - Fork the repository, create a branch, and make your changes.
   - Ensure documentation and tests accompany your updates.
   - Submit a pull request with a clear, concise description.

## Documentation and Type Support 📚

Complete documentation and robust TypeScript support are priorities for **Colorus.js**. Contributions that improve docs, examples, or types are always welcome.

## Type Safety and Chaining 🔒⛓️

Type safety is critical to **Colorus.js**, particularly in the chaining API. Please ensure typings are preserved or improved when contributing any functions affecting chaining behavior.

**Thank you for supporting Colorus.js!** 🙏
