import { html } from 'lit/static-html.js';
import MarkdownNode, { customElement } from '@/customElement';
import { BlockquoteNode } from 'stream-markdown-parser';

@customElement('blockquote')
export default class extends MarkdownNode<BlockquoteNode> {
  render () {
    return html`
        <blockquote class="blockquote" dir="auto" cite="${this.node.cite}">
            ${this.renderComponents(this.node.children)}
        </blockquote>
    `;
  }
}
