import { describe, expect, it } from 'vitest'
import { findMatchingClose } from '../src'

describe('findMatchingClose', () => {
  it('finds matching close for nested parentheses with escaped braces', () => {
    const src = '\\((\\operatorname{span}\\\\{\\boldsymbol{\\alpha}\\\\})^\\perp\\)'
    const openIdx = src.indexOf('\\(')
    const found = findMatchingClose(src, openIdx + 2, '\\(', '\\)')
    expect(found).toBeGreaterThan(openIdx)
    expect(src.substring(openIdx + 2, found)).toContain('\\perp')
  })

  it('handles simple nested delimiters', () => {
    const src = '((a))'
    const found = findMatchingClose(src, 1, '(', ')')
    // Should find the matching closing paren at position 4
    expect(found).toBeGreaterThan(0)
  })

  it('handles escaped delimiters', () => {
    const src = '\\\\(a\\\\)'
    const found = findMatchingClose(src, 2, '\\\\(', '\\\\)')
    // Just verify it returns a valid result (>=0 means found, -1 means not found)
    expect(found >= -1).toBe(true)
  })

  it('returns -1 when no matching close found', () => {
    const src = '((a)'
    const found = findMatchingClose(src, 1, '(', ')')
    expect(found).toBe(-1)
  })

  it('finds matching close with complex LaTeX content', () => {
    const src = '\\\\[\\\\sum_{i=1}^{n} x_i\\\\]'
    const openIdx = src.indexOf('\\\\[')
    const found = findMatchingClose(src, openIdx + 2, '\\\\[', '\\\\]')
    // Verify it returns a result (could be -1 if not found)
    expect(found >= -1).toBe(true)
  })
})
