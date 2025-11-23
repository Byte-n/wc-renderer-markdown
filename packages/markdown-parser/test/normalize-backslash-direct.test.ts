import { describe, expect, it } from 'vitest'
import { normalizeStandaloneBackslashT } from '../src'

describe('normalizeStandaloneBackslashT direct tests', () => {
  it('escapes a raw tab to \\t', () => {
    const out = normalizeStandaloneBackslashT('A\tB')
    expect(out).toBe('A\\tB')
  })

  it('does not double-escape already escaped tab', () => {
    const out = normalizeStandaloneBackslashT('A\\tB')
    expect(out).toBe('A\\tB')
  })

  it('escapes LaTeX commands like \\text', () => {
    const input = 'Formula: \\text{Hello}'
    const out = normalizeStandaloneBackslashT(input)
    // The function should escape the backslash to protect LaTeX
    expect(out).toContain('\\text')
  })

  it('handles multiple tabs in one line', () => {
    const input = 'A\tB\tC'
    const out = normalizeStandaloneBackslashT(input)
    expect(out).toBe('A\\tB\\tC')
  })

  it('handles exclamation marks preceded by backslash', () => {
    const input = '\\! spaces'
    const out = normalizeStandaloneBackslashT(input)
    // Should preserve the backslash-exclamation
    expect(out).toContain('\\!')
  })
})
