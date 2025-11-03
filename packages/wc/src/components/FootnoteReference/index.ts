import { html } from 'lit/static-html.js';
import MarkdownNode, { customElement } from '@/customElement';
import { FootnoteReferenceNode } from 'stream-markdown-parser';

@customElement('footnote_reference')
export default class extends MarkdownNode<FootnoteReferenceNode> {
  render () {
    const { id } = this.node;
    return html`<sup><a href="#fn-${id}">[${id}]</a></sup>`;
  }
}


