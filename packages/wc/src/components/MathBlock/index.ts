import { html } from 'lit/static-html.js';
import MarkdownNode, { customElement } from '@/customElement';
import styles from './styles';
import { MathBlockNode } from 'stream-markdown-parser';

@customElement('math_block')
export default class extends MarkdownNode<MathBlockNode> {
  static styles = styles;
  render () {
    return html`<div class="math-block">${this.node.content}</div>`;
  }
}


