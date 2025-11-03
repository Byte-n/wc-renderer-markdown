import { html } from 'lit/static-html.js';
import MarkdownNode, { customElement } from '@/customElement';
import { ReferenceNode } from 'stream-markdown-parser';

@customElement('reference')
export default class extends MarkdownNode<ReferenceNode> {
  render () {
    return html`<span>[${this.node.id}]</span>`;
  }
}


