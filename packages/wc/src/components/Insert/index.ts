import { html } from 'lit/static-html.js';
import MarkdownNode, { customElement } from '@/customElement';
import styles from './styles';
import { InsertNode } from 'stream-markdown-parser';

@customElement('insert')
export default class extends MarkdownNode<InsertNode> {
  static styles = styles;
  render () {
    return html`<ins>${this.renderComponents(this.node.children)}</ins>`;
  }
}


