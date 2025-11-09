import { html } from 'lit/static-html.js';
import { customElement } from '@/MarkdownNodeElement/customElement';
import styles from '@/components/Emphasis/index.lit.css';
import { EmphasisNode } from 'stream-markdown-parser';
import MarkdownNodeElement from 'src/MarkdownNodeElement';

@customElement('emphasis')
export default class extends MarkdownNodeElement<EmphasisNode> {
  static styles = styles;

  render () {
    return html`<em>${this.renderComponents(this.node.children)}</em>`;
  }
}


