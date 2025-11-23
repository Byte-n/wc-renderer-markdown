# wc-renderer-markdown

基于 Web Components 的现代化 Markdown 渲染器，提供了 Vue 和 React 的封装版本。

> wc 是 web component 的简称，非"国粹"

📖 **[在线文档](https://byte-n.github.io/wc-renderer-markdown/)**

## 特性

- 🧩 **Web Components** - 基于 Lit 构建的 Web Components，可在任何框架中使用
- 📐 **数学公式** - 支持使用 KaTeX 渲染数学公式
- 🎨 **代码高亮** - 使用 Shiki 提供强大的代码语法高亮支持
- 🔄 **流式解析** - 支持流式 Markdown 解析
- ⚡ **框架集成** - 提供 Vue 和 React 封装，开箱即用

## 安装

### 基础版本

```bash
npm install wc-renderer-markdown  @lit/context^1.0.0 lit^3.1.4
```

### Vue 封装版本

```bash
npm install wc-renderer-markdown @lit/context^1.0.0 lit^3.1.4 wc-renderer-markdown-vue
```

### React 封装版本

```bash
npm install wc-renderer-markdown @lit/context^1.0.0 lit^3.1.4 wc-renderer-markdown-react
```

## 使用

### 原生 Web Components

```html

<script type="module">
  import 'wc-renderer-markdown';
</script>

<wc-markdown content="# Hello World"/>
```

### Vue

```vue

<script setup>
  import WcMarkdown from 'wc-renderer-markdown-vue';

  const content = `
# Hello World

This is **markdown** content.
`
</script>

<template>
  <WcMarkdown
    :content="content"
  />
</template>
```

### React

```jsx
import WcMarkdown from 'wc-renderer-markdown-react';

function App () {
  const content = `
# Hello World

This is **markdown** content.
`
  return (
    <WcMarkdown content={content}/>
  );
}
```

## 开发路线图

- [x] 使用 `lit` 重构所有 UI
- [x] 提供 `react`/`vue` 版本封装，支持直接使用 `react`/`vue` 组件扩展 UI
  - [x] `wc-renderer-markdown-react`
  - [x] `wc-renderer-markdown-vue`
- [x] 加载提示
- [ ] SSR 支持

## 致谢

本项目借鉴了以下开源项目：

- [stream-markdown-parser](https://github.com/Simon-He95/vue-markdown-renderer/tree/main/packages/markdown-parser) -
  Markdown 解析器的实现参考
- UI 设计也参考了该库的设计理念

感谢开源社区的贡献！

## License

MIT

