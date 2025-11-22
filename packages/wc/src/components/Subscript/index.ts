import { html } from 'lit/static-html.js';
import styles from '@/components/Subscript/index.lit.css';
import { SubscriptNode } from 'stream-markdown-parser';
import NodeElement, { renderComponents } from '@/node/NodeElement';
import { customElement } from '@/node/customElement';

@customElement('subscript')
export default class extends NodeElement<SubscriptNode> {
  static styles = styles;

  render () {
    return html`<sub>${renderComponents(this.node.children)}</sub>`;
  }
}


