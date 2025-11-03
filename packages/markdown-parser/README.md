# stream-markdown-parser

[![NPM version](https://img.shields.io/npm/v/stream-markdown-parser?color=a1b858&label=)](https://www.npmjs.com/package/stream-markdown-parser)
[![中文版](https://img.shields.io/badge/docs-中文文档-blue)](README.zh-CN.md)
[![NPM downloads](https://img.shields.io/npm/dm/stream-markdown-parser)](https://www.npmjs.com/package/stream-markdown-parser)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/stream-markdown-parser)](https://bundlephobia.com/package/stream-markdown-parser)
[![License](https://img.shields.io/npm/l/stream-markdown-parser)](./LICENSE)

Pure markdown parser and renderer utilities with streaming support - framework agnostic.

This package contains the core markdown parsing logic extracted from `stream-markdown-parser`, making it usable in any JavaScript/TypeScript project without Vue dependencies.

## Features

- 🚀 **Pure JavaScript** - No framework dependencies
- 📦 **Lightweight** - Minimal bundle size
- 🔧 **Extensible** - Plugin-based architecture
- 🎯 **Type-safe** - Full TypeScript support
- ⚡ **Fast** - Optimized for performance
- 🌊 **Streaming-friendly** - Progressive parsing support

## Installation

```bash
pnpm add stream-markdown-parser
# or
npm install stream-markdown-parser
# or
yarn add stream-markdown-parser
```

## Usage

### Basic Example

```typescript
import { getMarkdown, parseMarkdownToStructure } from 'stream-markdown-parser'

// Create a markdown-it instance with default plugins
const md = getMarkdown()

// Parse markdown to HTML
const html = md.render('# Hello World\n\nThis is **bold**.')

// Or parse to AST structure
const nodes = parseMarkdownToStructure('# Hello World', md)
console.log(nodes)
// [{ type: 'heading', level: 1, children: [...] }]
```

### With Math Options

```typescript
import { getMarkdown, setDefaultMathOptions } from 'stream-markdown-parser'

// Set global math options
setDefaultMathOptions({
  commands: ['infty', 'perp', 'alpha'],
  escapeExclamation: true
})

const md = getMarkdown()
```

### With Custom i18n

```typescript
import { getMarkdown } from 'stream-markdown-parser'

// Using translation map
const md = getMarkdown('editor-1', {
  i18n: {
    'common.copy': '复制',
  }
})

// Or using a translation function
const md = getMarkdown('editor-1', {
  i18n: (key: string) => translateFunction(key)
})
```

### With Plugins

```typescript
import customPlugin from 'markdown-it-custom-plugin'
import { getMarkdown } from 'stream-markdown-parser'

const md = getMarkdown('editor-1', {
  plugin: [
    [customPlugin, { /* options */ }]
  ]
})
```

### Advanced: Custom Rules

```typescript
import { getMarkdown } from 'stream-markdown-parser'

const md = getMarkdown('editor-1', {
  apply: [
    (md) => {
      // Add custom inline rule
      md.inline.ruler.before('emphasis', 'custom', (state, silent) => {
        // Your custom logic
        return false
      })
    }
  ]
})
```

## API

### Main Functions

#### `getMarkdown(msgId?, options?)`

Creates a configured markdown-it instance.

**Parameters:**
- `msgId` (string, optional): Unique identifier for this instance. Default: `editor-${Date.now()}`
- `options` (GetMarkdownOptions, optional): Configuration options

**Options:**
```typescript
interface GetMarkdownOptions {
  // Array of markdown-it plugins to use
  plugin?: Array<Plugin | [Plugin, any]>

  // Array of functions to mutate the md instance
  apply?: Array<(md: MarkdownIt) => void>

  // Translation function or translation map
  i18n?: ((key: string) => string) | Record<string, string>
}
```

#### `parseMarkdownToStructure(content, md?, options?)`

Parses markdown content into a structured node tree.

**Parameters:**
- `content` (string): The markdown content to parse
- `md` (MarkdownIt, optional): A markdown-it instance. If not provided, creates one using `getMarkdown()`
- `options` (ParseOptions, optional): Parsing options with hooks

**Returns:** `ParsedNode[]` - An array of parsed nodes

#### `processTokens(tokens)`

Processes raw markdown-it tokens into a flat array.

#### `parseInlineTokens(tokens, md)`

Parses inline markdown-it tokens.

### Configuration Functions

#### `setDefaultMathOptions(options)`

Set global math rendering options.

**Parameters:**
- `options` (MathOptions): Math configuration options

```typescript
interface MathOptions {
  commands?: readonly string[] // LaTeX commands to escape
  escapeExclamation?: boolean // Escape standalone '!' (default: true)
}
```

### Utility Functions

#### `isMathLike(content)`

Heuristic function to detect if content looks like mathematical notation.

**Parameters:**
- `content` (string): Content to check

**Returns:** `boolean`

#### `findMatchingClose(src, startIdx, open, close)`

Find the matching closing delimiter in a string, handling nested pairs.

**Parameters:**
- `src` (string): Source string
- `startIdx` (number): Start index to search from
- `open` (string): Opening delimiter
- `close` (string): Closing delimiter

**Returns:** `number` - Index of matching close, or -1 if not found

#### `parseFenceToken(token)`

Parse a code fence token into a CodeBlockNode.

**Parameters:**
- `token` (MarkdownToken): markdown-it token

**Returns:** `CodeBlockNode`

#### `normalizeStandaloneBackslashT(content, options?)`

Normalize backslash-t sequences in math content.

**Parameters:**
- `content` (string): Content to normalize
- `options` (MathOptions, optional): Math options

**Returns:** `string`

### Plugin Functions

#### `applyMath(md, options?)`

Apply math plugin to markdown-it instance.

**Parameters:**
- `md` (MarkdownIt): markdown-it instance
- `options` (MathOptions, optional): Math rendering options

#### `applyContainers(md)`

Apply container plugins to markdown-it instance.

**Parameters:**
- `md` (MarkdownIt): markdown-it instance

### Constants

#### `KATEX_COMMANDS`

Array of common KaTeX commands for escaping.

#### `TEX_BRACE_COMMANDS`

Array of TeX commands that use braces.

#### `ESCAPED_TEX_BRACE_COMMANDS`

Escaped version of TEX_BRACE_COMMANDS for regex use.

## Types

All TypeScript types are exported:

```typescript
import type {
  // Node types
  CodeBlockNode,
  GetMarkdownOptions,
  HeadingNode,
  ListItemNode,
  ListNode,
  MathOptions,
  ParagraphNode,
  ParsedNode,
  ParseOptions,
  // ... and more
} from 'stream-markdown-parser'
```

### Node Types

The parser exports various node types representing different markdown elements:

- `TextNode`, `HeadingNode`, `ParagraphNode`
- `ListNode`, `ListItemNode`
- `CodeBlockNode`, `InlineCodeNode`
- `LinkNode`, `ImageNode`
- `BlockquoteNode`, `TableNode`
- `MathBlockNode`, `MathInlineNode`
- And many more...

## Default Plugins

This package comes with the following markdown-it plugins pre-configured:

- `markdown-it-sub` - Subscript support (`H~2~O`)
- `markdown-it-sup` - Superscript support (`x^2^`)
- `markdown-it-mark` - Highlight/mark support (`==highlighted==`)
- `markdown-it-emoji` - Emoji support (`:smile:` → 😄)
- `markdown-it-task-checkbox` - Task list support (`- [ ] Todo`)
- `markdown-it-ins` - Insert tag support (`++inserted++`)
- `markdown-it-footnote` - Footnote support
- `markdown-it-container` - Custom container support (`::: warning`, `::: tip`, etc.)
- Math support - LaTeX math rendering with `$...$` and `$$...$$`

## Framework Integration

While this package is framework-agnostic, it's designed to work seamlessly with:

- ✅ **Node.js** - Server-side rendering
- ✅ **Vue 3** - Use with `stream-markdown-parser`
- ✅ **React** - Use parsed nodes for custom rendering
- ✅ **Vanilla JS** - Direct HTML rendering
- ✅ **Any framework** - Parse to AST and render as needed

## Migration from `stream-markdown-parser`

If you're migrating from using the markdown utils in `stream-markdown-parser`:

```typescript
import { getMarkdown } from 'stream-markdown-parser'
```

All APIs remain the same. See [migration guide](../../docs/monorepo-migration.md) for details.

## Performance

- **Lightweight**: ~65KB minified (13KB gzipped)
- **Fast**: Optimized for real-time parsing
- **Tree-shakeable**: Only import what you need
- **Zero dependencies**: Except for markdown-it and its plugins

## Contributing

Issues and PRs welcome! Please read the [contribution guidelines](../../AGENTS.md).

## License

MIT © Simon He

## Related

- [stream-markdown-parser](https://github.com/Simon-He95/vue-markdown-render) - Full-featured Vue 3 Markdown renderer
