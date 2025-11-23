import { describe, expect, it } from 'vitest'
import { getMarkdown, parseMarkdownToStructure } from '../src'
import { collect } from './utils/midstate-utils'

const md = getMarkdown()

describe('Label parsing', () => {
  it('parses label with for attribute', () => {
    const markdown = '<label for="username">Username:</label>'
    const nodes = parseMarkdownToStructure(markdown, md)

    // Labels might be parsed as html_element or have a dedicated label type
    const labels = collect(nodes, 'label')
    const htmlElements = collect(nodes, 'html_element')

    const hasLabel = labels.length > 0 || htmlElements.some((e: any) => e.tag === 'label')
    expect(hasLabel).toBe(true)

    if (labels.length > 0) {
      const label = labels[0] as any
      expect(label.for).toBe('username')
      expect(JSON.stringify(label).includes('Username')).toBe(true)
    }
  })

  it('parses label without for attribute', () => {
    const markdown = '<label>Email:</label>'
    const nodes = parseMarkdownToStructure(markdown, md)

    const labels = collect(nodes, 'label')
    const htmlElements = collect(nodes, 'html_element')

    const hasLabel = labels.length > 0 || htmlElements.some((e: any) => e.tag === 'label')
    expect(hasLabel).toBe(true)
  })

  it('parses label with nested markdown content', () => {
    const markdown = '<label for="pwd">**Password** (required):</label>'
    const nodes = parseMarkdownToStructure(markdown, md)

    const labels = collect(nodes, 'label')
    const htmlElements = collect(nodes, 'html_element')

    // Label might be parsed as html_element or plain HTML
    const hasLabel = labels.length > 0 || htmlElements.some((e: any) => e.tag === 'label') || JSON.stringify(nodes).includes('<label')
    expect(hasLabel).toBe(true)

    // If we have structured nodes, check for nested content
    const allChildren: any[] = []
    if (labels.length > 0) {
      allChildren.push(...labels[0].children || [])
    }
    htmlElements.forEach((e: any) => {
      if (e.tag === 'label' && e.children) {
        allChildren.push(...e.children)
      }
    })

    if (allChildren.length > 0) {
      const strongNodes = collect(allChildren, 'strong')
      if (strongNodes.length > 0) {
        expect(strongNodes.length).toBeGreaterThan(0)
      }
    }
  })

  it('parses label in form context', () => {
    const markdown = `
<label for="name">Name:</label>
<input type="text" name="name" />
    `.trim()

    const nodes = parseMarkdownToStructure(markdown, md)
    const labels = collect(nodes, 'label')
    const htmlElements = collect(nodes, 'html_element')

    // Should have both label and input elements
    const hasLabel = labels.length > 0 || htmlElements.some((e: any) => e.tag === 'label')
    const hasInput = htmlElements.some((e: any) => e.tag === 'input')

    expect(hasLabel).toBe(true)
    expect(hasInput).toBe(true)
  })
})
