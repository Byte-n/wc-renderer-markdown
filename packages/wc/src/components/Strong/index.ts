import { html } from 'lit/static-html.js';
import { customElement } from '@/MarkdownNodeElement/customElement';
import styles from '@/components/Strong/index.lit.css';
import { StrongNode } from 'stream-markdown-parser';
import MarkdownNodeElement from 'src/MarkdownNodeElement';

@customElement('strong')
export default class extends MarkdownNodeElement<StrongNode> {
  static styles = styles;

  render () {
    return html`<strong>${this.renderComponents(this.node.children)}</strong>`;
  }
}


