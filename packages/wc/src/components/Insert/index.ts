import { html } from 'lit/static-html.js';
import { customElement } from '@/MarkdownNodeElement/customElement';
import { InsertNode } from 'stream-markdown-parser';
import style from '@/components/Insert/index.lit.css';
import MarkdownNodeElement from 'src/MarkdownNodeElement';

@customElement('insert')
export default class extends MarkdownNodeElement<InsertNode> {
  static styles = [style];

  render () {
    return html`
        <ins>${this.renderComponents(this.node.children)}</ins>`;
  }
}


