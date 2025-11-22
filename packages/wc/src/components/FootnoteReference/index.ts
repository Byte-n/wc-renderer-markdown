import { html } from 'lit/static-html.js';
import { FootnoteReferenceNode } from 'stream-markdown-parser';
import style from '@/components/FootnoteReference/index.lit.css';
import NodeElement from '@/node/NodeElement';
import { customElement } from '@/node/customElement';

@customElement('footnote_reference')
export default class extends NodeElement<FootnoteReferenceNode> {
  static styles = [style];

  get href () {
    return `[footnote="${this.node.id}"]`;
  }

  render () {
    const { id } = this.node;
    return html`<sup class="footnote-reference" @click="${this.handleScroll}">
        <span class="footnote-link">[${id}]</span>
    </sup>`;
  }

  handleScroll () {
    if (typeof document === 'undefined') {
      // SSR: nothing to do
      return;
    }
    const element = this.markdownRoot.renderRoot.querySelector(this.href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn(`Element with href: ${this.href} not found`);
    }
  }
}



