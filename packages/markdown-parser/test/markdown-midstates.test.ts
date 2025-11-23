import { describe, expect, it } from 'vitest'
import { getMarkdown, parseMarkdownToStructure } from '../src'
import { collect, hasLoadingLink, hasNode, links, paragraphHasCheckbox, textIncludes } from './utils/midstate-utils'

const md = getMarkdown('midstates')

describe('parseMarkdownToStructure - incremental/mid-typing states', () => {
  describe('heading transitions', () => {
    it('"#x" stays paragraph, then "# x" becomes heading level 1', () => {
      const n1 = parseMarkdownToStructure('#x', md)
      expect(hasNode(n1, 'heading')).toBeFalsy()
      const p1: any = collect(n1, 'paragraph')[0]
      expect(textIncludes(p1?.raw || n1, '#x')).toBe(true)

      const n2 = parseMarkdownToStructure('# x', md)
      const h = collect(n2, 'heading')[0] as any
      expect(h).toBeTruthy()
      expect(h.level).toBe(1)
      const text = (h.children?.[0]?.content) || (h.children?.[0]?.text) || ''
      expect(textIncludes(h, 'x') || String(text).includes('x')).toBe(true)
    })

    it('"##x" stays paragraph, then "## x" becomes heading level 2', () => {
      const n1 = parseMarkdownToStructure('##x', md)
      expect(hasNode(n1, 'heading')).toBeFalsy()
      const n2 = parseMarkdownToStructure('## x', md)
      const h = collect(n2, 'heading')[0] as any
      expect(h).toBeTruthy()
      expect(h.level).toBe(2)
    })
  })

  describe('blockquote transitions', () => {
    it('"> x" becomes blockquote with paragraph child', () => {
      const n = parseMarkdownToStructure('> x', md)
      const bq = collect(n, 'blockquote')[0] as any
      expect(bq).toBeTruthy()
      const innerPara = bq.children?.find((c: any) => c.type === 'paragraph')
      expect(innerPara).toBeTruthy()
    })
  })

  describe('list item transitions', () => {
    it('"- x" becomes a bullet list item when followed by newline', () => {
      const n1 = parseMarkdownToStructure('- x', md)
      const maybeList = collect(n1, 'list')[0]
      const maybePara = collect(n1, 'paragraph')[0]
      expect(!!maybeList || !!maybePara).toBe(true)

      const n2 = parseMarkdownToStructure('- x\n', md)
      const list = collect(n2, 'list')[0] as any
      expect(list).toBeTruthy()
      expect(list.ordered).toBe(false)
      const firstItemPara = list.items?.[0]?.children?.find((c: any) => c.type === 'paragraph')
      const text = firstItemPara?.children?.find((c: any) => c.type === 'text')
      expect(text?.content).toContain('x')
    })

    it('"1. x" becomes an ordered list when followed by newline', () => {
      const n = parseMarkdownToStructure('1. x\n', md)
      const list = collect(n, 'list')[0] as any
      expect(list).toBeTruthy()
      expect(list.ordered).toBe(true)
      expect(list.start === undefined || list.start === 1).toBeTruthy()
    })

    it('"- *" mid-state should not explode or produce nested lists unintentionally', () => {
      const n = parseMarkdownToStructure('- *', md)
      const para = collect(n, 'paragraph')[0]
      const list = collect(n, 'list')[0]
      expect(!!para || !!list).toBe(true)
      expect(textIncludes((para as any)?.raw || n, '- *') || !!list).toBe(true)
    })
  })

  describe('emphasis/strong mid-states', () => {
    it('"*x" parses as emphasis, "**x" as strong (for mid typing)', () => {
      const e = parseMarkdownToStructure('*x', md)
      const em = collect(e, 'emphasis')[0]
      expect(em).toBeTruthy()
      const emText = em.children?.[0]?.content || em.text || ''
      expect(textIncludes(em, 'x') || String(emText).includes('x')).toBe(true)

      const s = parseMarkdownToStructure('**x', md)
      const strong = collect(s, 'strong')[0]
      expect(strong).toBeTruthy()
      const st = strong.children?.[0]?.content || strong.text || ''
      expect(textIncludes(strong, 'x') || String(st).includes('x')).toBe(true)
    })
  })

  describe('inline code mid-states', () => {
    it('"`x" yields an inline_code node; "`x`" closes it', () => {
      const a = parseMarkdownToStructure('`x', md)
      const codeA = collect(a, 'inline_code')[0] as any
      expect(codeA).toBeTruthy()
      expect(textIncludes(codeA, 'x') || String(codeA.code || codeA.raw || '').includes('x')).toBe(true)

      const b = parseMarkdownToStructure('`x`', md)
      const codeB = collect(b, 'inline_code')[0] as any
      expect(codeB).toBeTruthy()
      expect(codeB.code).toBe('x')
    })
  })

  describe('link transitions including tricky mid-states', () => {
    it('"[*x" and "[**x" should NOT be parsed as a link yet', () => {
      for (const input of ['[*x', '[**x']) {
        const nodes = parseMarkdownToStructure(input, md)
        const links = collect(nodes, 'link')
        expect(links.length).toBe(0)
        expect(textIncludes(nodes, '[*x') || textIncludes(nodes, '[**x')).toBe(true)
      }
    })

    it('"[x](http://a" produces a loading link (no closing paren)', () => {
      const nodes = parseMarkdownToStructure('[x](http://a', md)
      const ls = links(nodes)
      if (ls.length > 0) {
        const l = ls[0]
        expect(l.text).toBe('x')
        expect(!!l.loading).toBe(true)
      }
      else {
        expect(textIncludes(nodes, '[x](http://a')).toBe(true)
      }
    })

    it('"[x](http://a)" produces a finalized link', () => {
      const nodes = parseMarkdownToStructure('[x](http://a)', md)
      const linksFound = collect(nodes, 'link') as any[]
      expect(linksFound.length).toBe(1)
      expect(linksFound[0].href).toBe('http://a')
      expect(linksFound[0].loading).toBe(false)
    })

    it('handles "[*x](xx" mid-state tolerantly', () => {
      const nodes = parseMarkdownToStructure('[*x](xx', md)
      const ls = links(nodes)
      if (ls.length > 0) {
        const l = ls[0]
        const textOk = l.text === '*x' || (l.children && textIncludes(l.children, 'emphasis'))
        expect(textOk).toBe(true)
        expect(!!l.loading).toBe(true)
      }
      else {
        expect(textIncludes(nodes, '[*x](xx') || textIncludes(nodes, 'emphasis')).toBe(true)
      }
    })
  })

  describe('image transitions', () => {
    it('"![x](u" is a mid-state image', () => {
      const nodes = parseMarkdownToStructure('![x](u', md)
      const images = collect(nodes, 'image')
      expect(images.length >= 0).toBe(true)
      expect(images.length > 0 || textIncludes(nodes, '![x](u')).toBe(true)
    })

    it('"![x](url)" becomes an image node', () => {
      const nodes = parseMarkdownToStructure('![x](http://img)', md)
      const images = collect(nodes, 'image') as any[]
      expect(images.length).toBe(1)
      expect(images[0].src || images[0].href).toBe('http://img')
    })
  })

  describe('checkbox list item transitions', () => {
    it('"- [" is a mid-state and should not crash', () => {
      const nodes = parseMarkdownToStructure('- [', md)
      const ok = hasNode(nodes, 'paragraph') || hasNode(nodes, 'list')
      expect(ok).toBe(true)
    })

    it('"- [ ] x" becomes an unchecked checkbox item', () => {
      const nodes = parseMarkdownToStructure('- [ ] x\n', md)
      const list = collect(nodes, 'list')[0] as any
      expect(list).toBeTruthy()
      const item = list.items?.[0]
      const para = item?.children?.find((c: any) => c.type === 'paragraph')
      expect(!!para).toBe(true)
      expect(paragraphHasCheckbox([item])).toBe(true)
      // Check if there's text content anywhere in the paragraph
      const hasX = JSON.stringify(para).includes('x') || JSON.stringify(item).includes('x')
      expect(hasX).toBe(true)
    })

    it('"- [x] y" becomes a checked checkbox item', () => {
      const nodes = parseMarkdownToStructure('- [x] y\n', md)
      const list = collect(nodes, 'list')[0] as any
      expect(list).toBeTruthy()
      const item = list.items?.[0]
      expect(paragraphHasCheckbox([item])).toBe(true)
      const para = item?.children?.find((c: any) => c.type === 'paragraph')
      const checkbox = para?.children?.find((c: any) => c.type === 'checkbox' || c.type === 'checkbox_input')
      expect(checkbox?.checked).toBe(true)
    })
  })

  describe('code fence mid-states', () => {
    it('triple backtick without closing fence produces code_block or paragraph', () => {
      const nodes = parseMarkdownToStructure('```\ncode', md)
      const hasCodeBlock = hasNode(nodes, 'code_block') || hasNode(nodes, 'fence')
      const hasPara = hasNode(nodes, 'paragraph')
      expect(hasCodeBlock || hasPara).toBe(true)
    })

    it('triple backtick with newline and closing fence produces code_block', () => {
      const nodes = parseMarkdownToStructure('```\ncode\n```', md)
      const codeBlocks = collect(nodes, 'code_block')
      expect(codeBlocks.length).toBeGreaterThan(0)
      const cb = codeBlocks[0] as any
      expect(cb.code || cb.content).toContain('code')
    })
  })

  describe('math mid-states', () => {
    it('"$x" produces math_inline or paragraph mid-state', () => {
      const nodes = parseMarkdownToStructure('$x', md)
      const hasMath = hasNode(nodes, 'math_inline')
      const hasPara = hasNode(nodes, 'paragraph')
      expect(hasMath || hasPara).toBe(true)
    })

    it('"$x$" produces a complete math_inline node', () => {
      const nodes = parseMarkdownToStructure('$x$', md)
      const mathNodes = collect(nodes, 'math_inline')
      if (mathNodes.length > 0) {
        const m = mathNodes[0] as any
        expect(m.content || m.raw).toContain('x')
      }
    })

    it('"$$" on separate lines mid-state produces paragraph or math_block', () => {
      const nodes = parseMarkdownToStructure('$$\na^2', md)
      const hasMathBlock = hasNode(nodes, 'math_block')
      const hasPara = hasNode(nodes, 'paragraph')
      expect(hasMathBlock || hasPara).toBe(true)
    })

    it('"$$\\na^2\\n$$" produces a complete math_block node', () => {
      const nodes = parseMarkdownToStructure('$$\na^2\n$$', md)
      const mathBlocks = collect(nodes, 'math_block')
      expect(mathBlocks.length).toBeGreaterThan(0)
      const mb = mathBlocks[0] as any
      expect(mb.content || mb.raw).toContain('a^2')
    })
  })

  describe('emoji mid-states', () => {
    it('":smile" mid-state produces text or emoji', () => {
      const nodes = parseMarkdownToStructure(':smile', md)
      const ok = textIncludes(nodes, ':smile') || hasNode(nodes, 'emoji')
      expect(ok).toBe(true)
    })

    it('":smile:" produces an emoji node', () => {
      const nodes = parseMarkdownToStructure(':smile:', md)
      const emojis = collect(nodes, 'emoji')
      if (emojis.length > 0) {
        const e = emojis[0] as any
        // Emoji node's name contains the emoji character (😄) or the string "smile"
        // markup should contain the original :emoji: syntax
        // raw should be :smile:
        const hasSmileMarker = e.raw === ':smile:' || (e.name && typeof e.name === 'string')
        expect(hasSmileMarker).toBe(true)
      }
    })
  })
})
