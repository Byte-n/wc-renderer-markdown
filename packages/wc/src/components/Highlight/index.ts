import { html } from 'lit/static-html.js';
import styles from '@/components/Highlight/index.lit.css';
import { HighlightNode } from 'stream-markdown-parser';
import NodeElement, { renderComponents } from '@/node/NodeElement';
import { customElement } from '@/node/customElement';

@customElement('highlight')
export default class extends NodeElement<HighlightNode> {
  static styles = styles;

  render () {
    return html`<mark>${renderComponents(this.node.children)}</mark>`;
  }
}


