import { html } from 'lit/static-html.js';
import styles from '@/components/Paragraph/index.lit.css';
import { ParagraphNode } from 'stream-markdown-parser';
import NodeElement, { renderComponents } from '@/node/NodeElement';
import { customElement } from '@/node/customElement';

@customElement('paragraph')
export default class extends NodeElement<ParagraphNode> {
  static styles = styles;

  render () {
    return html`
        <p >
            ${renderComponents(this.node.children)}
        </p>
    `;
  }
}
