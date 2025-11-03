import { html } from 'lit/static-html.js';
import MarkdownNode, { customElement } from '@/customElement';
import styles from './styles';
import { ListNode } from 'stream-markdown-parser';

@customElement('list')
export default class extends MarkdownNode<ListNode> {
  static styles = styles;

  render () {
    const { ordered, start, items } = this.node;
    if (ordered) {
      const startAttr = start && start > 1 ? `start="${start}"` : '';
      return html`<ol ${startAttr as unknown as any}>${items.map(item => this.renderComponents([item]))}</ol>`;
    }
    return html`<ul>${items.map(item => this.renderComponents([item]))}</ul>`;
  }
}


