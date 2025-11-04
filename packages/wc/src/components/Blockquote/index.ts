import { html } from 'lit/static-html.js';
import MarkdownNode, { customElement } from '@/customElement';
import { BlockquoteNode } from 'stream-markdown-parser';
import styles from '@/components/Blockquote/index.lit.css';

@customElement('blockquote')
export default class extends MarkdownNode<BlockquoteNode> {
  static styles = [styles];

  render () {
    // @ts-ignore
    const cite = this.node.cite;
    return html`
        <blockquote class="blockquote" dir="auto" cite="${cite}">
            ${this.renderComponents(this.node.children)}
        </blockquote>
    `;
  }
}
