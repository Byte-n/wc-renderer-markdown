import type { MarkdownToken, ParagraphNode } from '../../types'
import { parseInlineTokens } from '../inline-parsers'

export function parseParagraph(
  tokens: MarkdownToken[],
  index: number,
): ParagraphNode {
  const paragraphContentToken = tokens[index + 1]
  const paragraphContent = String(paragraphContentToken.content ?? '')

  return {
    type: 'paragraph',
    children: parseInlineTokens(paragraphContentToken.children || [], paragraphContent),
    raw: paragraphContent,
  }
}
