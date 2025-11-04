import { html } from 'lit/static-html.js';
import MarkdownNode, { customElement } from '@/customElement';
import styles from '@/components/Footnote/index.lit.css';
import { FootnoteNode } from 'stream-markdown-parser';

@customElement('footnote')
export default class extends MarkdownNode<FootnoteNode> {
  static styles = styles;

  render () {
    const { id } = this.node;
    return html`
      <div class="footnote" id="fn-${id}">
        ${this.renderComponents(this.node.children)}
      </div>
    `;
  }
}


