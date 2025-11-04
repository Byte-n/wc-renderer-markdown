import { html } from 'lit/static-html.js';
import MarkdownNode, { customElement } from '@/customElement';
import styles from '@/components/TextNode/index.lit.css';
import { TextNode } from 'stream-markdown-parser';
import { property } from 'lit/decorators.js';
import { PropertyValues } from 'lit';

@customElement('text')
export default class extends MarkdownNode<TextNode> {
  static styles = styles;

  @property({ type: Boolean, reflect: true, attribute: 'center' })
  center: boolean = false;

  render () {
    return html`
      <span>${this.node.content || this.node.raw}</span>
    `;
  }

  protected willUpdate (changedProperties: PropertyValues) {
    super.willUpdate(changedProperties);
    if (changedProperties.has('node')) {
      const nextCenter = !!this.node?.center;
      if (this.center !== nextCenter) this.center = nextCenter;
    }
  }
}

