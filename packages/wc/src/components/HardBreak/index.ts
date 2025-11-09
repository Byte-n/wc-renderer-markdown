import { html } from 'lit/static-html.js';
import { customElement } from '@/MarkdownNodeElement/customElement';
import { HardBreakNode } from 'stream-markdown-parser';
import style from '@/components/HardBreak/index.lit.css';
import MarkdownNodeElement from 'src/MarkdownNodeElement';

@customElement('hardbreak')
export default class extends MarkdownNodeElement<HardBreakNode> {
  static styles = [style];

  render () {
    return html`<br class="hard-break">`;
  }
}


