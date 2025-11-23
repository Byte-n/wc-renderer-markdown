import { describe, expect, it } from 'vitest'
import { parseCheckboxInputToken, parseCheckboxToken } from '../../src/parser/inline-parsers/checkbox-parser'

describe('checkbox inline parser', () => {
  it('parses checkbox token from meta.checked true', () => {
    const token: any = { meta: { checked: true } }
    const node = parseCheckboxToken(token)
    expect(node.type).toBe('checkbox')
    expect(node.checked).toBe(true)
    expect(node.raw).toBe('[x]')
  })

  it('parses checkbox input token from attrGet', () => {
    const token: any = {
      attrGet: (name: string) => {
        if (name === 'checked')
          return 'true'
        return null
      },
    }
    const node = parseCheckboxInputToken(token)
    expect(node.type).toBe('checkbox_input')
    expect(node.checked).toBe(true)
    expect(node.raw).toBe('[x]')
  })
})
