import { describe, expect, it } from 'vitest'
import { getMarkdown, parseMarkdownToStructure } from '../src'

const md = getMarkdown()

describe('ordered list start parsing', () => {
  it('captures start on second ordered list separated by code block', () => {
    const markdown = [
      '1. First, let\'s set up the project:',
      '',
      '```',
      'code',
      '```',
      '',
      '2. Create the main Electron file:',
    ].join('\n')

    const nodes = parseMarkdownToStructure(markdown, md)
    // find list nodes
    const lists = nodes.filter(n => n.type === 'list')
    expect(lists.length).toBe(2)
    const first = lists[0] as any
    const second = lists[1] as any

    expect(first.ordered).toBe(true)
    expect(first.start === undefined || first.start === 1).toBeTruthy()
    expect(second.ordered).toBe(true)
    // second should have start=2
    expect(second.start).toBe(2)
  })
})
