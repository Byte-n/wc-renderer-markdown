import { html } from 'lit/static-html.js';
import MarkdownNode, { customElement } from '@/customElement';
import styles from './styles';
import { TableNode } from 'stream-markdown-parser';

@customElement('table')
export default class extends MarkdownNode<TableNode> {
  static styles = styles;

  render () {
    const header = this.node.header;
    const rows = this.node.rows || [];
    return html`
      <table>
        <thead>
          <tr>
            ${header.cells.map(cell => html`<th>${this.renderComponents(cell.children)}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${rows.map(row => html`<tr>
            ${row.cells.map(cell => cell.header
              ? html`<th>${this.renderComponents(cell.children)}</th>`
              : html`<td>${this.renderComponents(cell.children)}</td>`)}
          </tr>`)}
        </tbody>
      </table>
    `;
  }
}


