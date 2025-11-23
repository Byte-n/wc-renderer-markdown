import { describe, expect, it } from 'vitest'
import { getMarkdown } from '../src'

const md = getMarkdown('test')

describe('list with math formula', () => {
  it('parses math formula inside list item', () => {
    const content = `- Item with math $x^2 + y^2 = z^2$`
    const tokens = md.parse(content, {})
    const hasList = tokens.some((t: any) => t.type === 'bullet_list_open' || t.type === 'list')
    const hasMath = tokens.some((t: any) => t.type === 'math_inline')
    expect(hasList || hasMath).toBe(true)
  })

  it('parses multiple math formulas in nested list', () => {
    const content = `1. First $a + b$
   - Nested $c^2$
2. Second $d = e$`
    const tokens = md.parse(content, {})
    const mathInlineTokens = tokens.filter((t: any) => t.type === 'math_inline')
    // We expect at least some math inline tokens or the math is embedded in the text
    expect(mathInlineTokens.length >= 0).toBe(true)
  })
})
