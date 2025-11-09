import { html } from 'lit/static-html.js';
import { customElement } from '@/MarkdownNodeElement/customElement';
import styles from '@/components/List/index.lit.css';
import { ListNode } from 'stream-markdown-parser';
import { renderComponent } from '@/markdown';
import MarkdownNodeElement from 'src/MarkdownNodeElement';

@customElement('list')
export default class extends MarkdownNodeElement<ListNode> {
  static styles = styles;

  render () {
    const { ordered, start, items } = this.node;
    if (ordered) {
      return html`
          <ol start="${start && start > 1 ? start : undefined}">
              ${items.map((v, index) => renderComponent(v, { ordered: true, index }))}
          </ol>
      `;
    }

    return html`
        <ul>
            ${items.map((v, index) => renderComponent(v, { ordered: true, index }))}
        </ul>
    `;
  }
}
