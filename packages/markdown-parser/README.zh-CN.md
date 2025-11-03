# stream-markdown-parser

[![NPM version](https://img.shields.io/npm/v/stream-markdown-parser?color=a1b858&label=)](https://www.npmjs.com/package/stream-markdown-parser)
[![English Docs](https://img.shields.io/badge/docs-English-blue)](README.md)
[![NPM downloads](https://img.shields.io/npm/dm/stream-markdown-parser)](https://www.npmjs.com/package/stream-markdown-parser)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/stream-markdown-parser)](https://bundlephobia.com/package/stream-markdown-parser)
[![License](https://img.shields.io/npm/l/stream-markdown-parser)](./LICENSE)

纯 JavaScript Markdown 解析器和渲染工具，支持流式处理 - 框架无关。

该包包含从 `stream-markdown-parser` 中提取的核心 Markdown 解析逻辑，使其可以在任何 JavaScript/TypeScript 项目中使用，无需 Vue 依赖。

## 特性

- 🚀 **纯 JavaScript** - 无框架依赖
- 📦 **轻量级** - 最小打包体积
- 🔧 **可扩展** - 基于插件的架构
- 🎯 **类型安全** - 完整的 TypeScript 支持
- ⚡ **高性能** - 性能优化
- 🌊 **流式友好** - 支持渐进式解析

## 安装

```bash
pnpm add stream-markdown-parser
# 或
npm install stream-markdown-parser
# 或
yarn add stream-markdown-parser
```

## 使用

### 基础示例

```typescript
import { getMarkdown, parseMarkdownToStructure } from 'stream-markdown-parser'

// 创建一个带有默认插件的 markdown-it 实例
const md = getMarkdown()

// 将 Markdown 解析为 HTML
const html = md.render('# Hello World\n\nThis is **bold**.')

// 或解析为 AST 结构
const nodes = parseMarkdownToStructure('# Hello World', md)
console.log(nodes)
// [{ type: 'heading', level: 1, children: [...] }]
```

### 配置数学公式选项

```typescript
import { getMarkdown, setDefaultMathOptions } from 'stream-markdown-parser'

// 设置全局数学公式选项
setDefaultMathOptions({
  commands: ['infty', 'perp', 'alpha'],
  escapeExclamation: true
})

const md = getMarkdown()
```

### 自定义国际化

```typescript
import { getMarkdown } from 'stream-markdown-parser'

// 使用翻译映射
const md = getMarkdown('editor-1', {
  i18n: {
    'common.copy': '复制',
  }
})

// 或使用翻译函数
const md = getMarkdown('editor-1', {
  i18n: (key: string) => translateFunction(key)
})
```

### 使用插件

```typescript
import customPlugin from 'markdown-it-custom-plugin'
import { getMarkdown } from 'stream-markdown-parser'

const md = getMarkdown('editor-1', {
  plugin: [
    [customPlugin, { /* 选项 */ }]
  ]
})
```

### 高级：自定义规则

```typescript
import { getMarkdown } from 'stream-markdown-parser'

const md = getMarkdown('editor-1', {
  apply: [
    (md) => {
      // 添加自定义内联规则
      md.inline.ruler.before('emphasis', 'custom', (state, silent) => {
        // 你的自定义逻辑
        return false
      })
    }
  ]
})
```

## API

### 主要函数

#### `getMarkdown(msgId?, options?)`

创建一个配置好的 markdown-it 实例。

**参数：**
- `msgId` (string, 可选): 该实例的唯一标识符。默认值：`editor-${Date.now()}`
- `options` (GetMarkdownOptions, 可选): 配置选项

**选项：**
```typescript
interface GetMarkdownOptions {
  // 要使用的 markdown-it 插件数组
  plugin?: Array<Plugin | [Plugin, any]>

  // 修改 md 实例的函数数组
  apply?: Array<(md: MarkdownIt) => void>

  // 翻译函数或翻译映射
  i18n?: ((key: string) => string) | Record<string, string>
}
```

#### `parseMarkdownToStructure(content, md?, options?)`

将 Markdown 内容解析为结构化节点树。

**参数：**
- `content` (string): 要解析的 Markdown 内容
- `md` (MarkdownIt, 可选): markdown-it 实例。如果未提供，则使用 `getMarkdown()` 创建
- `options` (ParseOptions, 可选): 带有钩子的解析选项

**返回值：** `ParsedNode[]` - 解析后的节点数组

#### `processTokens(tokens)`

将原始 markdown-it tokens 处理为扁平数组。

#### `parseInlineTokens(tokens, md)`

解析内联 markdown-it tokens。

### 配置函数

#### `setDefaultMathOptions(options)`

设置全局数学公式渲染选项。

**参数：**
- `options` (MathOptions): 数学公式配置选项

```typescript
interface MathOptions {
  commands?: readonly string[] // 要转义的 LaTeX 命令
  escapeExclamation?: boolean // 转义独立的 '!' (默认: true)
}
```

### 工具函数

#### `isMathLike(content)`

启发式函数，用于检测内容是否类似数学符号。

**参数：**
- `content` (string): 要检查的内容

**返回值：** `boolean`

#### `findMatchingClose(src, startIdx, open, close)`

在字符串中查找匹配的闭合分隔符，处理嵌套对。

**参数：**
- `src` (string): 源字符串
- `startIdx` (number): 开始搜索的索引
- `open` (string): 开启分隔符
- `close` (string): 闭合分隔符

**返回值：** `number` - 匹配闭合的索引，如果未找到则返回 -1

#### `parseFenceToken(token)`

将代码围栏 token 解析为 CodeBlockNode。

**参数：**
- `token` (MarkdownToken): markdown-it token

**返回值：** `CodeBlockNode`

#### `normalizeStandaloneBackslashT(content, options?)`

规范化数学内容中的反斜杠-t 序列。

**参数：**
- `content` (string): 要规范化的内容
- `options` (MathOptions, 可选): 数学选项

**返回值：** `string`

### 插件函数

#### `applyMath(md, options?)`

将数学插件应用到 markdown-it 实例。

**参数：**
- `md` (MarkdownIt): markdown-it 实例
- `options` (MathOptions, 可选): 数学渲染选项

#### `applyContainers(md)`

将容器插件应用到 markdown-it 实例。

**参数：**
- `md` (MarkdownIt): markdown-it 实例

### 常量

#### `KATEX_COMMANDS`

用于转义的常用 KaTeX 命令数组。

#### `TEX_BRACE_COMMANDS`

使用大括号的 TeX 命令数组。

#### `ESCAPED_TEX_BRACE_COMMANDS`

用于正则表达式的 TEX_BRACE_COMMANDS 转义版本。

## 类型

所有 TypeScript 类型都已导出：

```typescript
import type {
  // 节点类型
  CodeBlockNode,
  GetMarkdownOptions,
  HeadingNode,
  ListItemNode,
  ListNode,
  MathOptions,
  ParagraphNode,
  ParsedNode,
  ParseOptions,
  // ... 更多
} from 'stream-markdown-parser'
```

### 节点类型

解析器导出各种表示不同 Markdown 元素的节点类型：

- `TextNode`, `HeadingNode`, `ParagraphNode`
- `ListNode`, `ListItemNode`
- `CodeBlockNode`, `InlineCodeNode`
- `LinkNode`, `ImageNode`
- `BlockquoteNode`, `TableNode`
- `MathBlockNode`, `MathInlineNode`
- 以及更多...

## 默认插件

该包预配置了以下 markdown-it 插件：

- `markdown-it-sub` - 下标支持（`H~2~O`）
- `markdown-it-sup` - 上标支持（`x^2^`）
- `markdown-it-mark` - 高亮/标记支持（`==highlighted==`）
- `markdown-it-emoji` - Emoji 支持（`:smile:` → 😄）
- `markdown-it-task-checkbox` - 任务列表支持（`- [ ] Todo`）
- `markdown-it-ins` - 插入标签支持（`++inserted++`）
- `markdown-it-footnote` - 脚注支持
- `markdown-it-container` - 自定义容器支持（`::: warning`, `::: tip` 等）
- 数学公式支持 - 使用 `$...$` 和 `$$...$$` 渲染 LaTeX 数学公式

## 框架集成

虽然该包与框架无关，但它被设计为可以无缝配合以下框架使用：

- ✅ **Node.js** - 服务器端渲染
- ✅ **Vue 3** - 配合 `stream-markdown-parser` 使用
- ✅ **React** - 使用解析的节点进行自定义渲染
- ✅ **Vanilla JS** - 直接 HTML 渲染
- ✅ **任何框架** - 解析为 AST 并按需渲染

## 从 `stream-markdown-parser` 迁移

如果你正在从 `stream-markdown-parser` 中的 markdown 工具迁移：

```typescript
import { getMarkdown } from 'stream-markdown-parser'
```

所有 API 保持不变。详见[迁移指南](../../docs/monorepo-migration.md)。

## 性能

- **轻量级**: ~65KB 压缩后（13KB gzipped）
- **快速**: 针对实时解析优化
- **Tree-shakeable**: 只导入你需要的部分
- **零依赖**: 除了 markdown-it 及其插件

## 贡献

欢迎提交 Issues 和 PRs！请阅读[贡献指南](../../AGENTS.md)。

## 许可证

MIT © Simon He

## 相关项目

- [stream-markdown-parser](https://github.com/Simon-He95/vue-markdown-render) - 功能完整的 Vue 3 Markdown 渲染器
