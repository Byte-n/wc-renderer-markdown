import { html } from 'lit/static-html.js';
import { customElement } from '@/MarkdownNodeElement/customElement';
import { ReferenceNode } from 'stream-markdown-parser';
import styles from '@/components/Reference/index.lit.css';
import MarkdownNodeElement from 'src/MarkdownNodeElement';

@customElement('reference')
export default class extends MarkdownNodeElement<ReferenceNode> {
  static styles = styles;

  render () {
    return html`
      <span class="reference-node">
        ${this.node.id}
      </span>
    `;
  }
}


