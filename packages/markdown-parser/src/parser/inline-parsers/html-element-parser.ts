import type { HtmlElementNode, MarkdownToken, ParsedNode } from '../../types'

export function parseHtmlElement(
  tokens: MarkdownToken[],
  startIndex: number,
  raw?: string,
  parseInline?: (tokens: MarkdownToken[], raw?: string) => ParsedNode[],
): { node: HtmlElementNode, nextIndex: number } | null {
  const token = tokens[startIndex]
  const content = String(token.content ?? '')

  const selfClosingMatch = content.match(/^<(\w+)([^>]*?)\/\s*>$/)
  if (selfClosingMatch) {
    const [, tag, attrsStr] = selfClosingMatch
    const attrs = parseAttributes(attrsStr)
    return {
      node: {
        type: 'html_element',
        tag,
        attrs,
        children: null,
        raw: content,
        openTag: { type: 'text', content, raw: content },
        closeTag: null,
      },
      nextIndex: startIndex + 1,
    }
  }

  const openTagMatch = content.match(/^<(\w+)([^>]*?)>$/)
  if (!openTagMatch) {
    return null
  }

  const [, tag, attrsStr] = openTagMatch
  const attrs = parseAttributes(attrsStr)

  let endIndex = -1
  const closeTag = `</${tag}>`

  for (let i = startIndex + 1; i < tokens.length; i++) {
    if (tokens[i].type === 'html_inline' && tokens[i].content === closeTag) {
      endIndex = i
      break
    }
  }

  const children: ParsedNode[] = []
  const childTokens = tokens.slice(startIndex + 1, endIndex === -1 ? tokens.length : endIndex)

  let childrenRawContent = ''
  if (childTokens.length > 0 && parseInline) {
    children.push(...parseInline(childTokens, raw))
    childrenRawContent = childTokens.map(t => t.content || '').join('')
  }

  const rawContent = endIndex === -1
    ? content + childrenRawContent
    : content + childrenRawContent + closeTag

  return {
    node: {
      type: 'html_element',
      tag,
      attrs,
      children: children.length > 0 ? children : null,
      raw: rawContent,
      openTag: { type: 'text', content, raw: content },
      closeTag: endIndex === -1 ? null : { type: 'text', content: closeTag, raw: closeTag },
    },
    nextIndex: endIndex === -1 ? tokens.length : endIndex + 1,
  }
}

function parseAttributes(attrStr: string): Record<string, string> | null {
  const trimmed = attrStr.trim()
  if (!trimmed) {
    return null
  }

  const attrs: Record<string, string> = {}
  const attrRegex = /(\w+)\s*=\s*(['"])(.*?)\2/g
  let match: RegExpExecArray | null

  while ((match = attrRegex.exec(trimmed)) !== null) {
    const [, name, , value] = match
    attrs[name] = value
  }

  return Object.keys(attrs).length > 0 ? attrs : null
}
