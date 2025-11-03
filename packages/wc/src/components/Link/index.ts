import { html } from 'lit/static-html.js';
import MarkdownNode, { customElement } from '@/customElement';
import styles from './styles';
import { LinkNode } from 'stream-markdown-parser';

@customElement('link')
export default class extends MarkdownNode<LinkNode> {
  static styles = styles;

  render () {
    const { href, title } = this.node;
    return html`
      <a href="${href}" title="${title ?? ''}" target="_blank" rel="noopener noreferrer">
        ${this.renderComponents(this.node.children)}
      </a>
    `;
  }
}


