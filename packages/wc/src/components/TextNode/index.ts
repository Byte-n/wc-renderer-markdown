import { html } from 'lit/static-html.js';
import MarkdownNode, { customElement } from '@/customElement';
import styles from './styles';
import { TextNode } from 'stream-markdown-parser';
import { property } from 'lit/decorators.js';
import { PropertyValues } from 'lit';

@customElement('text')
export default class extends MarkdownNode<TextNode> {
  static styles = styles;

  @property({ type: Boolean, reflect: true, attribute: 'center' })
  center: boolean = false;

  protected willUpdate (changedProperties: PropertyValues) {
    super.willUpdate(changedProperties);
    if (changedProperties.has('node')) {
      const nextCenter = !!this.node?.center;
      if (this.center !== nextCenter) this.center = nextCenter;
    }
  }

  render() {
    return html`
      <span>${this.node.content || this.node.raw}</span>
    `;
  }
}

