import { html } from 'lit/static-html.js';
import { HardBreakNode } from 'stream-markdown-parser';
import style from '@/components/HardBreak/index.lit.css';
import NodeElement from '@/node/NodeElement';
import { customElement } from '@/node/customElement';

@customElement('hardbreak')
export default class extends NodeElement<HardBreakNode> {
  static styles = [style];

  render () {
    return html`<br class="hard-break">`;
  }
}


