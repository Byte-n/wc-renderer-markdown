import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import style from '@/markdown/index.lit.css';
import { getMarkdown, parseMarkdownToStructure } from 'stream-markdown-parser';
import { customElement } from '@/MarkdownNodeElement/customElement';
import cssvar from '@/markdown/var';
import { provide } from '@lit/context';
import { markdownRootContext } from '@/markdown/markdownRootContext';
import { renderComponents } from '@/MarkdownNodeElement';

@customElement('markdown')
export default class MarkdownElement extends LitElement {
  static styles = [cssvar, style];
  @property()
  content?: string = '';
  @property({ attribute: 'dark', reflect: true, type: Boolean })
  dark = true;

  @provide({ context: markdownRootContext })
  private markdownRootNode = this;

  render () {
    const md = getMarkdown();
    let nodes = parseMarkdownToStructure(this.content, md);
    return html`
        <div>${renderComponents(nodes)}</div>
    `;
  }
}

