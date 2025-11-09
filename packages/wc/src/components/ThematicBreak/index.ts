import { html } from 'lit/static-html.js';
import { customElement } from '@/MarkdownNodeElement/customElement';
import { ThematicBreakNode } from 'stream-markdown-parser';
import style from '@/components/ThematicBreak/index.lit.css';
import MarkdownNodeElement from 'src/MarkdownNodeElement';

@customElement('thematic_break')
export default class extends MarkdownNodeElement<ThematicBreakNode> {
  static styles = [style];

  render () {
    console.log('thematic_break', this.node);
    return html`
        <hr>`;
  }
}


