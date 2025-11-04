import { html } from 'lit/static-html.js';
import MarkdownNode, { customElement } from '@/customElement';
import styles from '@/components/Emoji/index.lit.css';
import { EmojiNode } from 'stream-markdown-parser';

@customElement('emoji')
export default class extends MarkdownNode<EmojiNode> {
  static styles = styles;

  render () {
    const label = this.node.markup || this.node.name || 'emoji';
    return html`<span role="img" aria-label="${label}">${this.node.name}</span>`;
  }
}


