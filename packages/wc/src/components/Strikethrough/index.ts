import { html } from 'lit/static-html.js';
import styles from '@/components/Strikethrough/index.lit.css';
import { StrikethroughNode } from 'stream-markdown-parser';
import NodeElement, { renderComponents } from '@/node/NodeElement';
import { customElement } from '@/node/customElement';

@customElement('strikethrough')
export default class extends NodeElement<StrikethroughNode> {
  static styles = styles;

  render () {
    return html`<s>${renderComponents(this.node.children)}</s>`;
  }
}


