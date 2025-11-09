import { html } from 'lit/static-html.js';
import { customElement } from '@/MarkdownNodeElement/customElement';
import style from '@/components/MathBlock/index.lit.css';
import { MathBlockNode } from 'stream-markdown-parser';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { mathStyles, parseMathString2HTML } from '@/utils/katex';
import MarkdownNodeElement from 'src/MarkdownNodeElement';

@customElement('math_block')
export default class extends MarkdownNodeElement<MathBlockNode> {
  static styles = [...mathStyles, style];
  htmlString: string;

  connectedCallback () {
    super.connectedCallback();
    this.htmlString = parseMathString2HTML(this.node.content, true);
  }


  render () {
    return html`
        <div class="math-block">
            ${unsafeHTML(this.htmlString)}
        </div>
    `;
  }
}


