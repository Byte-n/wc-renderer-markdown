import { describe, expect, it } from 'vitest'
import { getMarkdown, parseMarkdownToStructure } from '../../src'

describe('containers plugin', () => {
  it('parses admonition container via ::: note', () => {
    const md = getMarkdown('t')
    const content = `::: note\nThis is a note\n:::`
    const nodes = parseMarkdownToStructure(content, md)

    // Find container node
    const containers = nodes.filter(n => n.type === 'container' || n.type === 'admonition')
    expect(containers.length).toBeGreaterThan(0)

    const container = containers[0] as any
    expect(container.kind || container.containerType).toBe('note')
  })

  it('parses multiple container types', () => {
    const md = getMarkdown('t')
    const content = `::: warning\nWarn\n:::\n\n::: tip\nTip\n:::`
    const nodes = parseMarkdownToStructure(content, md)

    const containers = nodes.filter(n => n.type === 'container' || n.type === 'admonition')
    expect(containers.length).toBe(2)

    expect((containers[0] as any).kind || (containers[0] as any).containerType).toBe('warning')
    expect((containers[1] as any).kind || (containers[1] as any).containerType).toBe('tip')
  })

  it('parses warning block with expected structure', () => {
    const md = getMarkdown('play')
    const content = `::: warning\n这是一个警告块。\n:::`
    const nodes = parseMarkdownToStructure(content, md)

    const containers = nodes.filter(n => n.type === 'container' || n.type === 'admonition')
    expect(containers.length).toBeGreaterThan(0)

    const container = containers[0] as any
    expect(container.kind || container.containerType).toBe('warning')

    // Check that it has children with content
    const hasContent = JSON.stringify(container).includes('这是一个警告块')
    expect(hasContent).toBe(true)
  })
})
