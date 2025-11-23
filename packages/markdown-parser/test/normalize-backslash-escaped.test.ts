import { describe, expect, it } from 'vitest'
import { normalizeStandaloneBackslashT } from '../src'

describe('normalizeStandaloneBackslashT already-escaped tests', () => {
  it('does not double-escape already escaped commands', () => {
    const input = '\\\\text{Hello}'
    const out = normalizeStandaloneBackslashT(input)
    // Should not add more escaping
    expect(out).toBe(input)
  })

  it('handles custom command options', () => {
    const input = '\\alpha \\beta \\gamma'
    const out = normalizeStandaloneBackslashT(input, { commands: ['\\alpha', '\\beta'] })
    expect(out).toContain('\\alpha')
    expect(out).toContain('\\beta')
  })

  it('preserves newlines and other whitespace', () => {
    const input = '\\text{line1}\n\\text{line2}'
    const out = normalizeStandaloneBackslashT(input)
    expect(out).toContain('\n')
  })

  it('handles empty input', () => {
    const out = normalizeStandaloneBackslashT('')
    expect(out).toBe('')
  })
})
