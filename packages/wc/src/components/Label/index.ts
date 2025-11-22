import { html } from 'lit/static-html.js';
import styles from '@/components/Paragraph/index.lit.css';
import { LabelNode } from 'stream-markdown-parser';
import NodeElement, { renderComponents } from '@/node/NodeElement';
import { customElement } from '@/node/customElement';

@customElement('label')
export default class extends NodeElement<LabelNode> {
  static styles = styles;

  render () {
    const { for: forAttr, children } = this.node;
    return html`
        <label for="${forAttr || undefined}">
            ${renderComponents(children)}
        </label>
    `;
  }
}
