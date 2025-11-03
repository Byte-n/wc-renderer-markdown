import { html } from 'lit/static-html.js';
import MarkdownNode, { customElement } from '@/customElement';
import styles from './styles';
import { ImageNode } from 'stream-markdown-parser';

@customElement('image')
export default class extends MarkdownNode<ImageNode> {
  static styles = styles;
  render () {
    const { src, alt, title } = this.node;
    return html`<img src="${src}" alt="${alt}" title="${title ?? ''}">`;
  }
}


