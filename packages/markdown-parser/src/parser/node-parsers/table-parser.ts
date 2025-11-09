import type {
  MarkdownToken,
  TableCellNode,
  TableNode,
  TableRowNode,
} from '../../types'
import { parseInlineTokens } from '../inline-parsers'

/**
 * 从 token 的 attrs 中提取文本对齐方式
 */
function extractTextAlign(token: MarkdownToken): 'left' | 'center' | 'right' {
  if (!token.attrs || token.attrs.length === 0) {
    return 'left'
  }

  // 查找 style 属性中的 text-align
  for (const [key, value] of token.attrs) {
    if (key === 'style' && value) {
      const match = value.match(/text-align\s*:\s*(\w+)/i)
      if (match) {
        const align = match[1].toLowerCase()
        if (align === 'left' || align === 'center' || align === 'right') {
          return align
        }
      }
    }
    // 也检查 align 属性
    if (key === 'align' && value) {
      const align = value.toLowerCase()
      if (align === 'left' || align === 'center' || align === 'right') {
        return align
      }
    }
  }

  return 'left'
}

export function parseTable(
  tokens: MarkdownToken[],
  index: number,
): [TableNode, number] {
  let j = index + 1
  let headerRow: TableRowNode | null = null
  const rows: TableRowNode[] = []
  let isHeader = false

  // 从 table token 的 meta 中获取列对齐信息（标准 markdown-it 表格插件的方式）
  const tableToken = tokens[index]
  const columnAlignments: ('left' | 'center' | 'right')[] = []
  if (tableToken.meta && typeof tableToken.meta === 'object' && 'align' in tableToken.meta) {
    const align = tableToken.meta.align
    if (Array.isArray(align)) {
      for (const a of align) {
        if (a === 'left' || a === 'center' || a === 'right') {
          columnAlignments.push(a)
        }
        else {
          columnAlignments.push('left') // 默认左对齐
        }
      }
    }
  }

  while (j < tokens.length && tokens[j].type !== 'table_close') {
    if (tokens[j].type === 'thead_open') {
      isHeader = true
      j++
    }
    else if (tokens[j].type === 'thead_close') {
      isHeader = false
      j++
    }
    else if (
      tokens[j].type === 'tbody_open'
      || tokens[j].type === 'tbody_close'
    ) {
      j++
    }
    else if (tokens[j].type === 'tr_open') {
      const cells: TableCellNode[] = []
      let k = j + 1

      while (k < tokens.length && tokens[k].type !== 'tr_close') {
        if (tokens[k].type === 'th_open' || tokens[k].type === 'td_open') {
          const isHeaderCell = tokens[k].type === 'th_open'
          const cellToken = tokens[k]
          const contentToken = tokens[k + 1]
          const content = String(contentToken.content ?? '')

          // 优先从单元格 token 的 attrs 中获取对齐信息
          let textAlign = extractTextAlign(cellToken)
          // 如果单元格没有对齐信息，从列对齐数组中获取（根据列索引）
          if (!textAlign && columnAlignments.length > 0) {
            const columnIndex = cells.length
            if (columnIndex < columnAlignments.length) {
              textAlign = columnAlignments[columnIndex]
            }
          }

          cells.push({
            type: 'table_cell',
            header: isHeaderCell || isHeader,
            children: parseInlineTokens(contentToken.children || [], content),
            raw: content,
            textAlign,
          })

          k += 3 // Skip th_open/td_open, inline, th_close/td_close
        }
        else {
          k++
        }
      }

      const rowNode: TableRowNode = {
        type: 'table_row',
        cells,
        raw: cells.map(cell => cell.raw).join('|'),
      }

      if (isHeader) {
        headerRow = rowNode
      }
      else {
        rows.push(rowNode)
      }

      j = k + 1 // Skip tr_close
    }
    else {
      j++
    }
  }

  if (!headerRow) {
    // Default empty header if none found
    headerRow = {
      type: 'table_row',
      cells: [],
      raw: '',
    }
  }

  const tableNode: TableNode = {
    type: 'table',
    header: headerRow,
    rows,
    loading: tokens[index].loading ?? false,
    raw: [headerRow, ...rows].map(row => row.raw).join('\n'),
  }

  return [tableNode, j + 1] // Skip table_close
}
