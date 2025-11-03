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

  protected updated (_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
    this.center = this.node.center;
  }

  render() {
    return html`
      <span>${this.node.content || this.node.raw}</span>
    `;
  }
}

