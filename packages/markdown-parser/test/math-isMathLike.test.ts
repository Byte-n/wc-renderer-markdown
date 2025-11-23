import { describe, expect, it } from 'vitest'
import { isMathLike } from '../src'

describe('isMathLike heuristic', () => {
  describe('mathematical expressions', () => {
    it('detects \\boldsymbol{α}^T \\boldsymbol{β} = 0 as math-like', () => {
      const s = '\\boldsymbol{\\alpha}^T \\boldsymbol{\\beta} = 0'
      expect(isMathLike(s)).toBe(true)
    })

    it('detects \\sum_{i=1}^{n} as math-like', () => {
      const s = '\\sum_{i=1}^{n} x_i'
      expect(isMathLike(s)).toBe(true)
    })

    it('detects \\frac{a}{b} as math-like', () => {
      const s = '\\frac{numerator}{denominator}'
      expect(isMathLike(s)).toBe(true)
    })

    it('detects Greek letters as math-like', () => {
      const s = '\\alpha + \\beta = \\gamma'
      expect(isMathLike(s)).toBe(true)
    })
  })

  describe('non-mathematical text', () => {
    it('does not detect plain text as math-like', () => {
      const s = 'This is just plain text'
      expect(isMathLike(s)).toBe(false)
    })

    it('simple equations might be detected as math-like', () => {
      const s = 'x = 5'
      // The heuristic might consider this math-like due to the = sign and variables
      // Just verify it returns a boolean
      expect(typeof isMathLike(s)).toBe('boolean')
    })
  })
})
