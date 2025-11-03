export interface BaseNode {
  type: string
  raw: string
  loading?: boolean
  code?: string
  diff?: boolean
}

export interface TextNode extends BaseNode {
  type: 'text'
  content: string
  center?: boolean
}

export interface HeadingNode extends BaseNode {
  type: 'heading'
  level: number
  text: string
  children: ParsedNode[]
}

export interface ParagraphNode extends BaseNode {
  type: 'paragraph'
  children: ParsedNode[]
  maybeCheckbox?: boolean
}

export interface ListNode extends BaseNode {
  type: 'list'
  ordered: boolean
  // Optional start index for ordered lists (HTML <ol start="N">)
  start?: number
  items: ListItemNode[]
}

export interface ListItemNode extends BaseNode {
  type: 'list_item'
  children: ParsedNode[]
}

export interface CodeBlockNode extends BaseNode {
  type: 'code_block'
  language: string
  code: string
  // Optional: source line range [start, end) from markdown-it token.map
  startLine?: number
  endLine?: number
  // Whether this block is still incomplete (e.g., missing closing fence)
  loading?: boolean
  // Whether this code block represents a diff
  diff?: boolean
  // If diff is true, original and updated code versions
  originalCode?: string
  updatedCode?: string
  raw: string
}

export interface InlineCodeNode extends BaseNode {
  type: 'inline_code'
  code: string
}

export interface LinkNode extends BaseNode {
  type: 'link'
  href: string
  title: string | null
  text: string
  children: ParsedNode[]
}

export interface ImageNode extends BaseNode {
  type: 'image'
  src: string
  alt: string
  title: string | null
}

export interface ThematicBreakNode extends BaseNode {
  type: 'thematic_break'
}

export interface MermaidBlockNode {
  node: {
    type: 'code_block'
    language: string
    code: string
    loading?: boolean
  }
}

export type MarkdownRender
  = | {
    content: string
    nodes?: undefined
  }
  | {
    content?: undefined
    nodes: BaseNode[]
  }
export interface BlockquoteNode extends BaseNode {
  type: 'blockquote'
  children: ParsedNode[]
  raw: string
  cite?: string
}

export interface TableNode extends BaseNode {
  type: 'table'
  header: TableRowNode
  rows: TableRowNode[]
}

export interface TableRowNode extends BaseNode {
  type: 'table_row'
  cells: TableCellNode[]
}

export interface TableCellNode extends BaseNode {
  type: 'table_cell'
  header: boolean
  children: ParsedNode[]
}

export interface DefinitionListNode extends BaseNode {
  type: 'definition_list'
  items: DefinitionItemNode[]
}

export interface DefinitionItemNode extends BaseNode {
  type: 'definition_item'
  term: ParsedNode[]
  definition: ParsedNode[]
}

export interface FootnoteNode extends BaseNode {
  type: 'footnote'
  id: string
  children: ParsedNode[]
}

export interface FootnoteReferenceNode extends BaseNode {
  type: 'footnote_reference'
  id: string
}

export interface AdmonitionNode extends BaseNode {
  type: 'admonition'
  kind: string // 'note' | 'warning' | 'danger' | 'info' | 'tip' 等
  title: string
  children: ParsedNode[]
}

export interface StrongNode extends BaseNode {
  type: 'strong'
  children: ParsedNode[]
}

export interface EmphasisNode extends BaseNode {
  type: 'emphasis'
  children: ParsedNode[]
}

export interface StrikethroughNode extends BaseNode {
  type: 'strikethrough'
  children: ParsedNode[]
}

export interface HighlightNode extends BaseNode {
  type: 'highlight'
  children: ParsedNode[]
}

export interface InsertNode extends BaseNode {
  type: 'insert'
  children: ParsedNode[]
}

export interface SubscriptNode extends BaseNode {
  type: 'subscript'
  children: ParsedNode[]
}

export interface SuperscriptNode extends BaseNode {
  type: 'superscript'
  children: ParsedNode[]
}

export interface CheckboxNode extends BaseNode {
  type: 'checkbox'
  checked: boolean
}

export interface CheckboxInputNode extends BaseNode {
  type: 'checkbox_input'
  checked: boolean
}

export interface EmojiNode extends BaseNode {
  type: 'emoji'
  name: string
  markup: string
}

export interface HardBreakNode extends BaseNode {
  type: 'hardbreak'
}

export interface MathInlineNode extends BaseNode {
  type: 'math_inline'
  content: string
}

export interface MathBlockNode extends BaseNode {
  type: 'math_block'
  content: string
}

export interface ReferenceNode extends BaseNode {
  type: 'reference'
  id: string
}

// Define markdown-it token type
export interface MarkdownToken {
  type: string
  tag?: string
  content?: string
  info?: string
  loading?: boolean
  children?: MarkdownToken[]
  attrs?: [string, string][]
  markup?: string
  meta?: unknown
  map?: [number, number]
  raw?: string
}

export type ParsedNode
  = | TextNode
    | HeadingNode
    | ParagraphNode
    | ListNode
    | ListItemNode
    | CodeBlockNode
    | InlineCodeNode
    | LinkNode
    | ImageNode
    | ThematicBreakNode
    | BlockquoteNode
    | TableNode
    | TableRowNode
    | TableCellNode
    | StrongNode
    | EmphasisNode
    | StrikethroughNode
    | HighlightNode
    | InsertNode
    | SubscriptNode
    | SuperscriptNode
    | CheckboxNode
    | CheckboxInputNode
    | EmojiNode
    | DefinitionListNode
    | DefinitionItemNode
    | FootnoteNode
    | FootnoteReferenceNode
    | AdmonitionNode
    | HardBreakNode
    | MathInlineNode
    | MathBlockNode
    | ReferenceNode
    | Record<string, unknown>
export interface CustomComponents {
  text: unknown
  paragraph: unknown
  heading: unknown
  code_block: unknown
  list: unknown
  blockquote: unknown
  table: unknown
  definition_list: unknown
  footnote: unknown
  footnote_reference: unknown
  admonition: unknown
  hardbreak: unknown
  link: unknown
  image: unknown
  thematic_break: unknown
  math_inline: unknown
  math_block: unknown
  strong: unknown
  emphasis: unknown
  strikethrough: unknown
  highlight: unknown
  insert: unknown
  subscript: unknown
  superscript: unknown
  emoji: unknown
  checkbox: unknown
  inline_code: unknown
  reference: unknown
  mermaid: unknown
  [key: string]: unknown
}

// Function to parse markdown into a structured representation
export type TransformTokensHook = (tokens: MarkdownToken[]) => MarkdownToken[]

export interface ParseOptions {
  preTransformTokens?: TransformTokensHook
  postTransformTokens?: TransformTokensHook
}

export type PostTransformNodesHook = (nodes: ParsedNode[]) => ParsedNode[]
