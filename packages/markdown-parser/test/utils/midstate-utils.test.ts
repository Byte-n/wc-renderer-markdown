import { describe, expect, it } from 'vitest'
import { collect, hasLoadingLink, hasNode, links, paragraphHasCheckbox, textIncludes } from './midstate-utils'

describe('midstate-utils', () => {
  describe('collect', () => {
    it('finds nested nodes of a given type', () => {
      const nodes = [
        { type: 'paragraph', children: [{ type: 'text', content: 'a' }] },
        { type: 'list', items: [{ type: 'list_item', children: [{ type: 'paragraph', children: [] }] }] },
      ]
      const paras = collect(nodes as any, 'paragraph')
      expect(paras.length).toBeGreaterThanOrEqual(1)
    })

    it('returns empty array when no nodes match', () => {
      const nodes = [{ type: 'text', content: 'hello' }]
      const result = collect(nodes as any, 'heading')
      expect(result).toEqual([])
    })

    it('traverses deeply nested structures', () => {
      const nodes = [
        {
          type: 'blockquote',
          children: [
            { type: 'paragraph', children: [{ type: 'strong', children: [{ type: 'text', content: 'bold' }] }] },
          ],
        },
      ]
      const strong = collect(nodes as any, 'strong')
      expect(strong.length).toBe(1)
    })
  })

  describe('hasNode', () => {
    it('returns true when node type exists', () => {
      const nodes = [{ type: 'heading', level: 1 }, { type: 'paragraph' }]
      expect(hasNode(nodes as any, 'heading')).toBe(true)
    })

    it('returns false when node type does not exist', () => {
      const nodes = [{ type: 'paragraph' }]
      expect(hasNode(nodes as any, 'table')).toBe(false)
    })
  })

  describe('textIncludes', () => {
    it('finds text in nested structure', () => {
      const node = {
        type: 'paragraph',
        children: [{ type: 'text', content: 'hello world' }],
      }
      expect(textIncludes(node as any, 'world')).toBe(true)
    })

    it('returns false when text not found', () => {
      const node = { type: 'text', content: 'hello' }
      expect(textIncludes(node as any, 'goodbye')).toBe(false)
    })

    it('searches in raw field', () => {
      const node = { type: 'paragraph', raw: 'test content' }
      expect(textIncludes(node as any, 'content')).toBe(true)
    })
  })

  describe('links', () => {
    it('finds link nodes', () => {
      const nodes = [
        { type: 'paragraph', children: [{ type: 'link', href: 'http://example.com', text: 'Example' }] },
      ]
      const linkNodes = links(nodes as any)
      expect(linkNodes.length).toBe(1)
      expect(linkNodes[0].href).toBe('http://example.com')
    })

    it('returns empty array when no links', () => {
      const nodes = [{ type: 'text', content: 'no links here' }]
      expect(links(nodes as any)).toEqual([])
    })
  })

  describe('hasLoadingLink', () => {
    it('detects loading link', () => {
      const nodes = [{ type: 'link', loading: true, href: 'incomplete' }]
      expect(hasLoadingLink(nodes as any)).toBe(true)
    })

    it('returns false when no loading links', () => {
      const nodes = [{ type: 'link', loading: false, href: 'http://complete.com' }]
      expect(hasLoadingLink(nodes as any)).toBe(false)
    })
  })

  describe('paragraphHasCheckbox', () => {
    it('detects checkbox in list items', () => {
      const items = [
        {
          type: 'list_item',
          children: [{ type: 'paragraph', children: [{ type: 'checkbox', checked: true }] }],
        },
      ]
      expect(paragraphHasCheckbox(items as any)).toBe(true)
    })

    it('returns false when no checkbox', () => {
      const items = [
        { type: 'list_item', children: [{ type: 'paragraph', children: [{ type: 'text', content: 'text' }] }] },
      ]
      expect(paragraphHasCheckbox(items as any)).toBe(false)
    })
  })
})
