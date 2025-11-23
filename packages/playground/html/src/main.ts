import 'wc-renderer-markdown'

const defaultMarkdown = `# Welcome to WC Markdown Renderer

This is a **Pure HTML** playground for testing the markdown renderer.

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
`

const editor = document.getElementById('editor') as HTMLTextAreaElement
const renderer = document.getElementById('renderer') as any

editor.value = defaultMarkdown
renderer.setAttribute('content', defaultMarkdown)

editor.addEventListener('input', () => {
  renderer.setAttribute('content', editor.value)
})
