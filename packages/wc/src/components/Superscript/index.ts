import { html } from 'lit/static-html.js';
import MarkdownNode, { customElement } from '@/customElement';
import styles from '@/components/Superscript/index.lit.css';
import { SuperscriptNode } from 'stream-markdown-parser';

@customElement('superscript')
export default class extends MarkdownNode<SuperscriptNode> {
  static styles = styles;

  render () {
    return html`<sup>${this.renderComponents(this.node.children)}</sup>`;
  }
}


