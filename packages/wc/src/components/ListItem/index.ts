import { html } from 'lit/static-html.js';
import MarkdownNode, { customElement } from '@/customElement';
import { ListItemNode } from 'stream-markdown-parser';

@customElement('list_item')
export default class extends MarkdownNode<ListItemNode> {
  render () {
    return html`<li>${this.renderComponents(this.node.children)}</li>`;
  }
}


