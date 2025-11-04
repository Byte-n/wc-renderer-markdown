import { html } from 'lit/static-html.js';
import MarkdownNode, { customElement } from '@/customElement';
import styles from '@/components/Subscript/index.lit.css';
import { SubscriptNode } from 'stream-markdown-parser';

@customElement('subscript')
export default class extends MarkdownNode<SubscriptNode> {
  static styles = styles;

  render () {
    return html`<sub>${this.renderComponents(this.node.children)}</sub>`;
  }
}


