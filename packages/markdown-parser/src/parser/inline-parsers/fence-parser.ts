import type { CodeBlockNode, MarkdownToken } from '../../types'

function splitUnifiedDiff(content: string) {
  const orig: string[] = []
  const updated: string[] = []
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine
    // skip diff metadata lines
    if (/^(?:diff |index |--- |\+\+\+ |@@ )/.test(line))
      continue

    if (line.startsWith('- ')) {
      orig.push(` ${line.slice(1)}`)
    }
    else if (line.startsWith('+ ')) {
      updated.push(` ${line.slice(1)}`)
    }
    else {
      // fallback: treat as context (no prefix)
      orig.push(line)
      updated.push(line)
    }
  }
  return {
    original: orig.join('\n'),
    updated: updated.join('\n'),
  }
}

export function parseFenceToken(token: MarkdownToken): CodeBlockNode {
  const hasMap = Array.isArray(token.map) && token.map.length === 2
  const tokenMeta = (token.meta ?? {}) as unknown as { closed?: boolean }
  const closed = typeof tokenMeta.closed === 'boolean' ? tokenMeta.closed : undefined
  const info = String(token.info ?? '')
  const diff = info.startsWith('diff')
  const language = diff ? String(info.split(' ')[1] ?? '') : info

  // Defensive sanitization: sometimes a closing fence line (e.g. ``` or ``)
  // can accidentally end up inside `token.content` (for example when
  // the parser/mapping is confused). Remove a trailing line that only
  // contains backticks and optional whitespace so we don't render stray
  // ` or `` characters at the end of the code output. This is a
  // conservative cleanup and only strips a final line that looks like a
  // fence marker (starts with optional spaces then one or more ` and
  // only whitespace until end-of-string).
  let content = String(token.content ?? '')
  const trailingFenceLine = /\r?\n[ \t]*`+\s*$/
  if (trailingFenceLine.test(content))
    content = content.replace(trailingFenceLine, '')

  if (diff) {
    const { original, updated } = splitUnifiedDiff(content)
    // 返回时保留原来的 code 字段为 updated（编辑后代码），并额外附加原始与更新的文本
    return {
      type: 'code_block',
      language,
      code: String(updated ?? ''),
      raw: String(content ?? ''),
      diff,
      loading: closed === true ? false : closed === false ? true : !hasMap,
      originalCode: original,
      updatedCode: updated,
    }
  }

  return {
    type: 'code_block',
    language,
    code: String(content ?? ''),
    raw: String(content ?? ''),
    diff,
    loading: closed === true ? false : closed === false ? true : !hasMap,
  }
}
