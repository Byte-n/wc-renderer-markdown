import { html } from 'lit/static-html.js';
import MarkdownNode, { customElement } from '@/customElement';
import styles from '@/components/InlineCode/index.lit.css';
import { InlineCodeNode } from 'stream-markdown-parser';

@customElement('inline_code')
export default class extends MarkdownNode<InlineCodeNode> {
  static styles = styles;

  render () {
    return html`<code>${this.node.code}</code>`;
  }
}


