import { describe, expect, it } from 'vitest'
import { parseFenceToken } from '../src'

describe('fence parser trailing fence cleanup', () => {
  it('removes a trailing line that only contains backticks from token.content', () => {
    const token: any = {
      type: 'fence',
      info: 'ts',
      content: 'const a = 1\n```',
      map: [0, 2],
    }
    const node = parseFenceToken(token as any)
    expect((node as any).code).toBe('const a = 1')
  })

  it('does not remove backticks if they are not the only thing on the last line', () => {
    const token: any = {
      type: 'fence',
      info: 'ts',
      content: 'const a = 1\nconst b = ```',
      map: [0, 2],
    }
    const node = parseFenceToken(token as any)
    expect((node as any).code).toContain('```')
  })

  it('handles content with no trailing backticks', () => {
    const token: any = {
      type: 'fence',
      info: 'js',
      content: 'function test() {\n  return 42\n}',
      map: [0, 3],
    }
    const node = parseFenceToken(token as any)
    expect((node as any).code).toBe('function test() {\n  return 42\n}')
  })
})
