<template>
  <div class="container">
    <div class="editor-panel">
      <h3>Markdown Input</h3>
      <textarea v-model="markdown" class="editor" />
    </div>
    <div class="preview-panel">
      <h3>Preview</h3>
      <div class="preview-content">
        <Markdown :content="markdown" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Markdown from 'wc-renderer-markdown-vue'

const markdown = ref(`# Welcome to WC Markdown Renderer

This is a **Vue 3** playground for testing the markdown renderer.

## Features

- Lists support
- **Bold** and *italic* text
- \`inline code\`
- And much more!

\`\`\`javascript
function hello() {
  console.log('Hello from code block!')
}
\`\`\`

### Table Example

| Name | Age | City |
|------|-----|------|
| Alice | 25 | NYC |
| Bob | 30 | LA |
`)
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
  gap: 1rem;
  padding: 1rem;
}

.editor-panel,
.preview-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.editor {
  flex: 1;
  font-family: monospace;
  padding: 0.5rem;
  font-size: 14px;
  resize: none;
  border: 1px solid #ccc;
}

.preview-content {
  flex: 1;
  border: 1px solid #ccc;
  padding: 1rem;
  overflow: auto;
}

h3 {
  margin-bottom: 0.5rem;
}
</style>
