import { html } from 'lit/static-html.js';
import MarkdownNode, { customElement } from '@/customElement';
import styles from '@/components/Strong/index.lit.css';
import { StrongNode } from 'stream-markdown-parser';

@customElement('strong')
export default class extends MarkdownNode<StrongNode> {
  static styles = styles;

  render () {
    return html`<strong>${this.renderComponents(this.node.children)}</strong>`;
  }
}


