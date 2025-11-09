import { html } from 'lit/static-html.js';
import { customElement } from '@/MarkdownNodeElement/customElement';
import styles from '@/components/Paragraph/index.lit.css';
import { ParagraphNode } from 'stream-markdown-parser';
import MarkdownNodeElement from 'src/MarkdownNodeElement';

@customElement('paragraph')
export default class extends MarkdownNodeElement<ParagraphNode> {
  static styles = styles;

  render () {
    return html`
        <p >
            ${this.renderComponents(this.node.children)}
        </p>
    `;
  }
}
