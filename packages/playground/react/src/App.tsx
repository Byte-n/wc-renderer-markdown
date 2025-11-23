import React, { useState } from 'react'
import Markdown from 'wc-renderer-markdown-react'

const defaultMarkdown = `# Welcome to WC Markdown Renderer

This is a **React 16** playground for testing the markdown renderer.

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

function App() {
  const [markdown, setMarkdown] = useState(defaultMarkdown)

  return (
    <div style={{ display: 'flex', height: '100vh', gap: '1rem', padding: '1rem' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3>Markdown Input</h3>
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          style={{ flex: 1, fontFamily: 'monospace', padding: '0.5rem', fontSize: '14px' }}
        />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <h3>Preview</h3>
        <div style={{ flex: 1, border: '1px solid #ccc', padding: '1rem', overflow: 'auto' }}>
          <Markdown content={markdown} />
        </div>
      </div>
    </div>
  )
}

export default App
