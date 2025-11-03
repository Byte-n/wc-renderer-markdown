import { html } from 'lit/static-html.js';
import MarkdownNode, { customElement } from '@/customElement';
import styles from './styles';
import { MathInlineNode } from 'stream-markdown-parser';

@customElement('math_inline')
export default class extends MarkdownNode<MathInlineNode> {
  static styles = styles;
  render () {
    return html`<span class="math-inline">${this.node.content}</span>`;
  }
}


