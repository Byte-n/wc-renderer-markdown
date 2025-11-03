import { html } from 'lit/static-html.js';
import MarkdownNode, { customElement } from '@/customElement';
import styles from './styles';
import { StrikethroughNode } from 'stream-markdown-parser';

@customElement('strikethrough')
export default class extends MarkdownNode<StrikethroughNode> {
  static styles = styles;

  render () {
    return html`<s>${this.renderComponents(this.node.children)}</s>`;
  }
}


