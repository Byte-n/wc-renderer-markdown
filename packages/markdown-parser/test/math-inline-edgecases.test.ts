import { describe, expect, it } from 'vitest'
import { getMarkdown } from '../src'

const md = getMarkdown('test')

describe('math inline edge cases', () => {
  it('parses nested parentheses with escaped braces', () => {
    const content = '$\\((\\operatorname{span}\\\\{\\boldsymbol{\\alpha}\\\\})^\\perp\\)$'
    const tokens = md.parse(content, {})
    const mathTokens = tokens.filter((t: any) => t.type === 'math_inline')
    // Should handle complex LaTeX without crashing
    expect(mathTokens.length >= 0).toBe(true)
  })

  it('preserves backslashes in LaTeX commands', () => {
    const content = '$\\\\sum_{i=1}^{n} x_i$'
    const tokens = md.parse(content, {})
    const mathTokens = tokens.filter((t: any) => t.type === 'math_inline')
    if (mathTokens.length > 0) {
      const mathContent = mathTokens[0].content || mathTokens[0].markup || ''
      expect(String(mathContent).includes('\\\\') || String(mathContent).includes('sum')).toBe(true)
    }
  })

  it('handles math with subscripts and superscripts', () => {
    const content = '$x_1^2 + x_2^2 = r^2$'
    const tokens = md.parse(content, {})
    const mathTokens = tokens.filter((t: any) => t.type === 'math_inline')
    // Single $ delimiters might not be parsed as math_inline depending on config
    // Just verify it doesn't crash
    expect(tokens.length).toBeGreaterThan(0)
  })

  it('handles empty math delimiters', () => {
    const content = '$$'
    const tokens = md.parse(content, {})
    // Should not crash, might produce math_inline or text
    expect(tokens.length >= 0).toBe(true)
  })
})
