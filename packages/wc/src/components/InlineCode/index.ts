import { html } from 'lit/static-html.js';
import { customElement } from '@/MarkdownNodeElement/customElement';
import styles from '@/components/InlineCode/index.lit.css';
import { InlineCodeNode } from 'stream-markdown-parser';
import MarkdownNodeElement from 'src/MarkdownNodeElement';

@customElement('inline_code')
export default class extends MarkdownNodeElement<InlineCodeNode> {
  static styles = styles;

  render () {
    return html`<code>${this.node.code}</code>`;
  }
}


