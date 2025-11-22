import { html } from 'lit/static-html.js';
import styles from '@/components/Table/index.lit.css';
import { TableNode, TableRowNode, TableCellNode } from 'stream-markdown-parser';
import NodeElement, { renderComponents } from '@/node/NodeElement';
import { customElement } from '@/node/customElement';

@customElement('table')
export default class extends NodeElement<TableNode> {
  static styles = styles;

  /**
   * 计算列宽，平均分配
   */
  private getColWidths (): string[] {
    const colCount = this.node?.header?.cells?.length ?? 0;
    if (colCount === 0) return ['100%'];

    const n = colCount || 1;
    const base = Math.floor(100 / n);
    // 为了保证总和为100%，最后一个列占剩余的百分比
    return Array.from({ length: n }).map((_, i) =>
      i === n - 1 ? `${100 - base * (n - 1)}%` : `${base}%`,
    );
  }

  /**
   * 渲染列组
   */
  private renderColgroup () {
    const widths = this.getColWidths();
    return html`
      <colgroup>
        ${widths.map((width, i) => html`<col style="width: ${width}"></col>`)}
      </colgroup>
    `;
  }

  /**
   * 渲染表头单元格
   */
  private renderHeaderCell (cell: TableCellNode, index: number) {
    const textAlign = cell.textAlign || 'left';
    return html`
      <th dir="auto" class="table-header-cell" style="text-align: ${textAlign}">
        ${renderComponents(cell.children)}
      </th>
    `;
  }

  /**
   * 渲染表头
   */
  private renderHeader () {
    const header = this.node.header;
    if (!header || !header.cells) return html``;

    return html`
      <thead class="table-thead">
        <tr class="table-header-row">
          ${header.cells.map((cell, index) => this.renderHeaderCell(cell, index))}
        </tr>
      </thead>
    `;
  }

  /**
   * 渲染表格单元格
   */
  private renderTableCell (cell: TableCellNode, rowIndex: number, cellIndex: number) {
    const textAlign = cell.textAlign || 'left';
    return html`
      <td dir="auto" class="table-cell" style="text-align: ${textAlign}">
        ${renderComponents(cell.children)}
      </td>
    `;
  }

  /**
   * 渲染表格行
   */
  private renderTableRow (row: TableRowNode, rowIndex: number, totalRows: number) {
    return html`
      <tr class="table-row">
        ${row.cells.map((cell, cellIndex) => 
          this.renderTableCell(cell, rowIndex, cellIndex)
        )}
      </tr>
    `;
  }

  /**
   * 渲染表体
   */
  private renderBody () {
    const rows = this.node.rows || [];
    if (rows.length === 0) return html``;

    return html`
      <tbody class="table-tbody">
        ${rows.map((row, rowIndex) => this.renderTableRow(row, rowIndex, rows.length))}
      </tbody>
    `;
  }

  render () {
    return html`
      <div class="table-wrapper">
        <table class="table-node">
          ${this.renderColgroup()}
          ${this.renderHeader()}
          ${this.renderBody()}
        </table>
      </div>
    `;
  }
}


