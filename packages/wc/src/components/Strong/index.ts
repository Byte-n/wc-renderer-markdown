import { html } from 'lit/static-html.js';
import styles from '@/components/Strong/index.lit.css';
import { StrongNode } from 'stream-markdown-parser';
import NodeElement, { renderComponents } from '@/node/NodeElement';
import { customElement } from '@/node/customElement';

@customElement('strong')
export default class extends NodeElement<StrongNode> {
  static styles = styles;

  render () {
    return html`<strong>${renderComponents(this.node.children)}</strong>`;
  }
}


