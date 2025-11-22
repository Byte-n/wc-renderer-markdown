import { html } from 'lit/static-html.js';
import styles from '@/components/List/index.lit.css';
import { ListNode } from 'stream-markdown-parser';
import NodeElement, { renderComponent } from '@/node/NodeElement';
import { customElement } from '@/node/customElement';

@customElement('list')
export default class extends NodeElement<ListNode> {
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
