import { describe, expect, it } from 'vitest'
import { getMarkdown, parseMarkdownToStructure } from '../../src'

const md = getMarkdown()

describe('image parser', () => {
  it('parses image with alt, src and title', () => {
    const markdown = '![Alt text](https://example.com/image.png "Image title")'
    const nodes = parseMarkdownToStructure(markdown, md)

    const images: any[] = []
    const walk = (n: any) => {
      if (!n)
        return
      if (n.type === 'image')
        images.push(n)
      if (Array.isArray(n.children))
        n.children.forEach(walk)
    }
    nodes.forEach(walk)

    expect(images.length).toBe(1)
    expect(images[0].alt).toBe('Alt text')
    expect(images[0].src).toBe('https://example.com/image.png')
    expect(images[0].title).toBe('Image title')
  })

  it('parses image without title', () => {
    const markdown = '![Alt text](https://example.com/image.png)'
    const nodes = parseMarkdownToStructure(markdown, md)

    const images: any[] = []
    const walk = (n: any) => {
      if (!n)
        return
      if (n.type === 'image')
        images.push(n)
      if (Array.isArray(n.children))
        n.children.forEach(walk)
    }
    nodes.forEach(walk)

    expect(images.length).toBe(1)
    expect(images[0].alt).toBe('Alt text')
    expect(images[0].src).toBe('https://example.com/image.png')
    expect(images[0].title === '' || images[0].title === null).toBe(true)
  })
})
