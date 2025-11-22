import { html } from 'lit/static-html.js';
import { InsertNode } from 'stream-markdown-parser';
import style from '@/components/Insert/index.lit.css';
import NodeElement, { renderComponents } from '@/node/NodeElement';
import { customElement } from '@/node/customElement';

@customElement('insert')
export default class extends NodeElement<InsertNode> {
  static styles = [style];

  render () {
    return html`
        <ins>${renderComponents(this.node.children)}</ins>`;
  }
}


