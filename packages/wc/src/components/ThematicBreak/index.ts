import { html } from 'lit/static-html.js';
import { ThematicBreakNode } from 'stream-markdown-parser';
import style from '@/components/ThematicBreak/index.lit.css';
import NodeElement from '@/node/NodeElement';
import { customElement } from '@/node/customElement';

@customElement('thematic_break')
export default class extends NodeElement<ThematicBreakNode> {
  static styles = [style];

  render () {
    return html`
        <hr>`;
  }
}


