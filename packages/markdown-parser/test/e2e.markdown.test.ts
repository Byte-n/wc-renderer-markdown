import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { getMarkdown, parseMarkdownToStructure } from '../src'

const md = getMarkdown('e2e-test')

function readFixture(name: string): string {
  const fixturePath = join(__dirname, 'fixtures', name)
  return readFileSync(fixturePath, 'utf-8')
}

describe('E2E Markdown parsing from fixtures', () => {
  it('parses headings fixture', () => {
    const content = readFixture('headings.md')
    const nodes = parseMarkdownToStructure(content, md)
    const headings = nodes.filter((n: any) => n.type === 'heading')
    expect(headings.length).toBeGreaterThan(0)
  })

  it('parses math fixture', () => {
    const content = readFixture('math.md')
    const nodes = parseMarkdownToStructure(content, md)
    // Should parse without errors
    expect(nodes.length).toBeGreaterThan(0)
  })

  it('parses checkbox fixture', () => {
    const content = readFixture('checkbox.md')
    const nodes = parseMarkdownToStructure(content, md)
    expect(nodes.length).toBeGreaterThan(0)
  })

  it('parses table fixture', () => {
    const content = readFixture('table.md')
    const nodes = parseMarkdownToStructure(content, md)
    const tables = nodes.filter((n: any) => n.type === 'table')
    expect(tables.length).toBeGreaterThan(0)
  })

  it('parses admonition fixture', () => {
    const content = readFixture('admonition.md')
    const nodes = parseMarkdownToStructure(content, md)
    expect(nodes.length).toBeGreaterThan(0)
  })

  it('parses footnotes fixture', () => {
    const content = readFixture('footnotes.md')
    const nodes = parseMarkdownToStructure(content, md)
    expect(nodes.length).toBeGreaterThan(0)
  })

  it('parses image-link fixture', () => {
    const content = readFixture('image-link.md')
    const nodes = parseMarkdownToStructure(content, md)
    expect(nodes.length).toBeGreaterThan(0)
  })

  it('parses nested-lists-edge fixture', () => {
    const content = readFixture('nested-lists-edge.md')
    const nodes = parseMarkdownToStructure(content, md)
    expect(nodes.length).toBeGreaterThan(0)
  })

  it('parses trailing-backticks fixture', () => {
    const content = readFixture('trailing-backticks.md')
    const nodes = parseMarkdownToStructure(content, md)
    expect(nodes.length).toBeGreaterThan(0)
  })

  it('parses unclosed-fence fixture', () => {
    const content = readFixture('unclosed-fence.md')
    const nodes = parseMarkdownToStructure(content, md)
    expect(nodes.length).toBeGreaterThan(0)
  })

  it('parses escaped-brackets fixture', () => {
    const content = readFixture('escaped-brackets.md')
    const nodes = parseMarkdownToStructure(content, md)
    expect(nodes.length).toBeGreaterThan(0)
  })

  it('parses fence-with-meta fixture', () => {
    const content = readFixture('fence-with-meta.md')
    const nodes = parseMarkdownToStructure(content, md)
    expect(nodes.length).toBeGreaterThan(0)
  })
})
