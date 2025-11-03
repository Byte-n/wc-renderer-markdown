import type { MarkdownToken, MathBlockNode } from '../../types'

// Parse a math_block token (block/display math expressions)
export function parseMathBlock(token: MarkdownToken): MathBlockNode {
  return {
    type: 'math_block',
    content: String(token.content ?? ''),
    loading: !!token.loading,
    raw: String(token.raw ?? ''),
  }
}
