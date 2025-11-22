import { html } from 'lit/static-html.js';
import { ReferenceNode } from 'stream-markdown-parser';
import styles from '@/components/Reference/index.lit.css';
import NodeElement from '@/node/NodeElement';
import { customElement } from '@/node/customElement';

@customElement('reference')
export default class extends NodeElement<ReferenceNode> {
  static styles = styles;

  render () {
    return html`
      <span class="reference-node">
        ${this.node.id}
      </span>
    `;
  }
}


