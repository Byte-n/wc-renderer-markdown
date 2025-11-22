import { html, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import style from '@/markdown/index.lit.css';
import { getMarkdown, parseMarkdownToStructure } from 'stream-markdown-parser';
import cssvar from '@/markdown/var';
import { provide } from '@lit/context';
import { markdownRootContext } from '@/markdown/markdownRootContext';
import { renderComponents } from '@/node/NodeElement';
import { customElement } from '@/node/customElement';

// const hasScrollIntoViewIfNeeded = 'scrollIntoViewIfNeeded' in HTMLElement.prototype
//   && typeof HTMLElement.prototype.scrollIntoViewIfNeeded === 'function';

@customElement('markdown')
export default class MarkdownElement extends LitElement {
  static styles = [cssvar, style];
  @property({ attribute: 'content' })
  content?: string = '';

  @property({ attribute: 'dark', reflect: true, type: Boolean })
  dark = false;

  @property({ attribute: 'auto-scroll-2-end', reflect: true, type: Boolean })
  autoScroll2End = false;

  @provide({ context: markdownRootContext })
  protected markdownRootNode = this;

  protected updated (_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
    if (this.autoScroll2End) {
      this.scroll2End();
    }

  }

  scroll2End () {
    const length = this.shadowRoot.children.length;
    const last = this.shadowRoot.children[length - 1] as HTMLElement;
    if (!last) {
      return;
    }
    // if (hasScrollIntoViewIfNeeded) {
    //   // @ts-ignore 没 container 参数
    //   // last.scrollIntoViewIfNeeded({ behavior: 'smooth', block: 'center', inline: 'center' });
    //   // return;
    // }
    // @ts-ignore
    last.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center', container: 'nearest' });
  }

  render () {
    const md = getMarkdown();
    const nodes = parseMarkdownToStructure(this.content, md);
    return html`
      <div class="box">${renderComponents(nodes)}</div>
      ${this.autoScroll2End ? html`<span/>` : null}
    `;
  }
}

