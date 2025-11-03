import type { HeadingNode, MarkdownToken } from '../../types'
import { parseInlineTokens } from '../inline-parsers'

export function parseHeading(
  tokens: MarkdownToken[],
  index: number,
): HeadingNode {
  const token = tokens[index]
  const levelStr = String(token.tag?.substring(1) ?? '1')
  const headingLevel = Number.parseInt(levelStr, 10)
  const headingContentToken = tokens[index + 1]
  const headingContent = String(headingContentToken.content ?? '')

  return {
    type: 'heading',
    level: headingLevel,
    text: headingContent,
    children: parseInlineTokens(headingContentToken.children || []),
    raw: headingContent,
  }
}
