import { html } from 'lit/static-html.js';
import { BlockquoteNode } from 'stream-markdown-parser';
import styles from '@/components/Blockquote/index.lit.css';
import NodeElement, { renderComponents } from '@/node/NodeElement';
import { customElement } from '@/node/customElement';

@customElement('blockquote')
export default class extends NodeElement<BlockquoteNode> {
  static styles = [styles];

  render () {
    const cite = this.node.cite;
    return html`
        <blockquote class="blockquote" dir="auto" cite="${cite}">
            ${renderComponents(this.node.children)}
        </blockquote>
    `;
  }
}
