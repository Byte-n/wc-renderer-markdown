import { html } from 'lit/static-html.js';
import MarkdownNode, { customElement } from '@/customElement';
import style from '@/components/MathInline/index.lit.css';
import { MathInlineNode } from 'stream-markdown-parser';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { mathStyles, parseMathString2HTML } from '@/katex';

@customElement('math_inline')
export default class extends MarkdownNode<MathInlineNode> {
  static styles = [...mathStyles, style];

  htmlString: string;

  connectedCallback () {
    super.connectedCallback();
    this.htmlString = parseMathString2HTML(this.node.content, false);
  }

  render () {
    return html`
        <span class="math-inline">
            ${unsafeHTML(this.htmlString)}
        </span>
    `;
  }
}


