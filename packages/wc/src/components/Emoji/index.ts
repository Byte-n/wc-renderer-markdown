import { html } from 'lit/static-html.js';
import styles from '@/components/Emoji/index.lit.css';
import { EmojiNode } from 'stream-markdown-parser';
import NodeElement from '@/node/NodeElement';
import { customElement } from '@/node/customElement';

@customElement('emoji')
export default class extends NodeElement<EmojiNode> {
  static styles = styles;

  render () {
    const label = this.node.markup || this.node.name || 'emoji';
    return html`<span role="img" aria-label="${label}">${this.node.name}</span>`;
  }
}


