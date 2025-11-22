import { html } from 'lit/static-html.js';
import styles from '@/components/Superscript/index.lit.css';
import { SuperscriptNode } from 'stream-markdown-parser';
import NodeElement, { renderComponents } from '@/node/NodeElement';
import { customElement } from '@/node/customElement';

@customElement('superscript')
export default class extends NodeElement<SuperscriptNode> {
  static styles = styles;

  render () {
    return html`<sup>${renderComponents(this.node.children)}</sup>`;
  }
}


