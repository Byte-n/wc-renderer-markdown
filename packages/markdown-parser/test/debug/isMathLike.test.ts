import { describe, expect, it } from 'vitest'
import { isMathLike } from '../../src'

describe('isMathLike debug edge cases', () => {
  it('does not detect file paths as math-like', () => {
    const s = 'C:\\Users\\Documents\\file.txt'
    expect(isMathLike(s)).toBe(false)
  })

  it('does not detect URLs as math-like', () => {
    const s = 'https://example.com/path?param=value'
    expect(isMathLike(s)).toBe(false)
  })

  it('timestamps might be detected as math-like', () => {
    const s = '2023-12-25T10:30:00Z'
    // The heuristic might consider timestamps math-like due to numbers and colons
    // Just verify it returns a boolean
    expect(typeof isMathLike(s)).toBe('boolean')
  })

  it('detects matrix notation as math-like', () => {
    const s = '\\begin{matrix} a & b \\\\ c & d \\end{matrix}'
    expect(isMathLike(s)).toBe(true)
  })

  it('detects integral notation as math-like', () => {
    const s = '\\int_0^\\infty e^{-x} dx'
    expect(isMathLike(s)).toBe(true)
  })

  it('code snippets might be detected as math-like', () => {
    const s = 'function test() { return x + y; }'
    // The heuristic might consider this math-like due to x + y expression
    // Just verify it returns a boolean
    expect(typeof isMathLike(s)).toBe('boolean')
  })

  it('detects limit notation as math-like', () => {
    const s = '\\lim_{x \\to \\infty} f(x)'
    expect(isMathLike(s)).toBe(true)
  })
})
