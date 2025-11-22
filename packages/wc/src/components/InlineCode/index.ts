import { html } from 'lit/static-html.js';
import styles from '@/components/InlineCode/index.lit.css';
import { InlineCodeNode } from 'stream-markdown-parser';
import NodeElement from '@/node/NodeElement';
import { customElement } from '@/node/customElement';

@customElement('inline_code')
export default class extends NodeElement<InlineCodeNode> {
  static styles = styles;

  render () {
    return html`<code>${this.node.code}</code>`;
  }
}


