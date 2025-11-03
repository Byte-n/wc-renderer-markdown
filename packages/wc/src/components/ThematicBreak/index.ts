import { html } from 'lit/static-html.js';
import MarkdownNode, { customElement } from '@/customElement';
import { ThematicBreakNode } from 'stream-markdown-parser';

@customElement('thematic_break')
export default class extends MarkdownNode<ThematicBreakNode> {
  render () {
    return html`<hr>`;
  }
}


