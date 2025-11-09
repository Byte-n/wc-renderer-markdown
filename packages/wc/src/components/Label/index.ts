import { html } from 'lit/static-html.js';
import { customElement } from '@/MarkdownNodeElement/customElement';
import styles from '@/components/Paragraph/index.lit.css';
import { LabelNode } from 'stream-markdown-parser';
import MarkdownNodeElement from 'src/MarkdownNodeElement';

@customElement('label')
export default class extends MarkdownNodeElement<LabelNode> {
  static styles = styles;

  render () {
    const { for: forAttr, children } = this.node;
    return html`
        <label for="${forAttr || undefined}">
            ${this.renderComponents(children)}
        </label>
    `;
  }
}
