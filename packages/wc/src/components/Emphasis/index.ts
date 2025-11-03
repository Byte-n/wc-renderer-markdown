import { html } from 'lit/static-html.js';
import MarkdownNode, { customElement } from '@/customElement';
import styles from './styles';
import { EmphasisNode } from 'stream-markdown-parser';

@customElement('emphasis')
export default class extends MarkdownNode<EmphasisNode> {
  static styles = styles;

  render () {
    return html`<em>${this.renderComponents(this.node.children)}</em>`;
  }
}


