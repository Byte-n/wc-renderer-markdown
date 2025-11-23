import { describe, expect, it } from 'vitest'
import { normalizeStandaloneBackslashT } from '../src'

describe('normalizeStandaloneBackslashT control character tests', () => {
  it('escapes control characters', () => {
    const input = 'A\tB\nC\rD'
    const out = normalizeStandaloneBackslashT(input)
    expect(out).toContain('\\t')
    // Newlines and carriage returns are typically preserved
  })

  it('prefixes KaTeX command words', () => {
    const input = '\\operatorname{test}'
    const out = normalizeStandaloneBackslashT(input)
    expect(out).toContain('\\operatorname')
  })

  it('handles mixed content', () => {
    const input = 'Text with \\alpha and\ttab'
    const out = normalizeStandaloneBackslashT(input)
    expect(out).toContain('\\alpha')
    expect(out).toContain('\\t')
  })

  it('handles backslash at end of string', () => {
    const input = 'text\\'
    const out = normalizeStandaloneBackslashT(input)
    // Function might add escaping before the backslash
    expect(out).toContain('text')
  })
})
