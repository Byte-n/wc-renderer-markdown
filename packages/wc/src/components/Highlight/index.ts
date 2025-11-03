import { html } from 'lit/static-html.js';
import MarkdownNode, { customElement } from '@/customElement';
import styles from './styles';
import { HighlightNode } from 'stream-markdown-parser';

@customElement('highlight')
export default class extends MarkdownNode<HighlightNode> {
  static styles = styles;
  render () {
    return html`<mark>${this.renderComponents(this.node.children)}</mark>`;
  }
}


