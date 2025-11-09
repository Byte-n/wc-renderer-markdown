import type { LabelNode, MarkdownToken, ParsedNode } from '../../types'
import { parseInlineTokens } from '../index'

export function parseLabelToken(
  tokens: MarkdownToken[],
  startIndex: number,
): {
  node: LabelNode
  nextIndex: number
} {
  const openToken = tokens[startIndex]
  const forAttr = openToken.attrs?.find(([name]) => name === 'for')?.[1]
  
  const children: ParsedNode[] = []
  let labelText = ''
  let i = startIndex + 1
  const innerTokens: MarkdownToken[] = []

  // Process tokens between label_open and label_close
  while (i < tokens.length && tokens[i].type !== 'label_close') {
    labelText += String(tokens[i].content ?? '')
    innerTokens.push(tokens[i])
    i++
  }

  // Parse inner tokens to handle nested elements
  children.push(...parseInlineTokens(innerTokens))

  const node: LabelNode = {
    type: 'label',
    for: forAttr,
    children,
    raw: labelText,
  }

  // Skip to after label_close
  const nextIndex = i < tokens.length ? i + 1 : tokens.length

  return { node, nextIndex }
}

