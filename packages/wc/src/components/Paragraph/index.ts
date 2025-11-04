import { html } from 'lit/static-html.js';
import MarkdownNode, { customElement } from '@/customElement';
import styles from '@/components/Paragraph/index.lit.css';
import { ParagraphNode } from 'stream-markdown-parser';

@customElement('paragraph')
export default class extends MarkdownNode<ParagraphNode> {
  static styles = styles;

  render () {
    return html`
        <p >
            ${this.renderComponents(this.node.children)}
        </p>
    `;
  }
}
