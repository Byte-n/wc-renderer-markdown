import { html } from 'lit/static-html.js';
import { customElement } from '@/MarkdownNodeElement/customElement';
import styles from '@/components/Subscript/index.lit.css';
import { SubscriptNode } from 'stream-markdown-parser';
import MarkdownNodeElement from 'src/MarkdownNodeElement';

@customElement('subscript')
export default class extends MarkdownNodeElement<SubscriptNode> {
  static styles = styles;

  render () {
    return html`<sub>${this.renderComponents(this.node.children)}</sub>`;
  }
}


