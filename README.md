# WSX Framework

A lightweight, zero-runtime Next.js alternative built on top of [WSX](https://github.com/wsxjs/wsxjs) (Web Components + JSX).

## Features

- 🚀 **Zero Runtime Overhead** - Built on native Web Components
- ⚡ **Server-Side Rendering** - Fast initial page loads
- 📁 **File-based Routing** - Convention over configuration
- 🔧 **TypeScript First** - Full type safety out of the box
- 🎨 **JSX Syntax** - Familiar React-like development experience
- 🌐 **Web Standards** - Uses native browser APIs

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
cd examples/demo
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Project Structure

```
wsx-framework/
├── packages/
│   ├── core/           # Core framework functionality
│   └── cli/            # CLI tools and dev server
└── examples/
    └── demo/           # Demo application
        └── pages/      # File-based routes
            ├── index.tsx
            ├── about.tsx
            └── blog/
                ├── index.tsx
                └── [slug].tsx
```

## Architecture

WSX Framework combines the best of both worlds:

- **WSX Components**: Zero-runtime JSX with Web Components for optimal performance
- **Server-Side Rendering**: Fast initial loads with seamless client-side hydration
- **File-based Routing**: Automatic route generation from the `pages/` directory
- **TypeScript Integration**: Full type safety across server and client code

## Pages and Routing

Create pages by adding components to the `pages/` directory:

```tsx
// pages/index.tsx
import { WebComponent, autoRegister } from '@wsx-framework/core';

@autoRegister()
export class HomePage extends WebComponent {
  render() {
    return <h1>Hello WSX!</h1>;
  }
}

export default HomePage;
```

### Dynamic Routes

Use brackets for dynamic route segments:

```tsx
// pages/blog/[slug].tsx
export class BlogPostPage extends WebComponent {
  static async getServerSideProps({ params }) {
    return {
      slug: params.slug,
      title: `Post: ${params.slug}`
    };
  }
}
```

## Development

This is a monorepo using pnpm workspaces:

```bash
# Install all dependencies
pnpm install

# Build all packages
pnpm build

# Run all tests
pnpm test

# Start demo in development
cd examples/demo && pnpm dev
```

## License

MIT