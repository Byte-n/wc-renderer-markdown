import { html } from 'lit/static-html.js';
import styles from '@/components/Emphasis/index.lit.css';
import { EmphasisNode } from 'stream-markdown-parser';
import NodeElement, { renderComponents } from '@/node/NodeElement';
import { customElement } from '@/node/customElement';

@customElement('emphasis')
export default class extends NodeElement<EmphasisNode> {
  static styles = styles;

  render () {
    return html`<em>${renderComponents(this.node.children)}</em>`;
  }
}


