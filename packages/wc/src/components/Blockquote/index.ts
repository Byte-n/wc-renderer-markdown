import { html } from 'lit/static-html.js';
import { customElement } from '@/MarkdownNodeElement/customElement';
import { BlockquoteNode } from 'stream-markdown-parser';
import styles from '@/components/Blockquote/index.lit.css';
import MarkdownNodeElement from 'src/MarkdownNodeElement';

@customElement('blockquote')
export default class extends MarkdownNodeElement<BlockquoteNode> {
  static styles = [styles];

  render () {
    const cite = this.node.cite;
    return html`
        <blockquote class="blockquote" dir="auto" cite="${cite}">
            ${this.renderComponents(this.node.children)}
        </blockquote>
    `;
  }
}
