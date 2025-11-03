import { html } from 'lit/static-html.js';
import MarkdownNode, { customElement } from '@/customElement';
import { HardBreakNode } from 'stream-markdown-parser';

@customElement('hardbreak')
export default class extends MarkdownNode<HardBreakNode> {
  render () {
    return html`<br>`;
  }
}


