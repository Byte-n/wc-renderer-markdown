import { html } from 'lit/static-html.js';
import { customElement } from '@/MarkdownNodeElement/customElement';
import styles from '@/components/Strikethrough/index.lit.css';
import { StrikethroughNode } from 'stream-markdown-parser';
import MarkdownNodeElement from 'src/MarkdownNodeElement';

@customElement('strikethrough')
export default class extends MarkdownNodeElement<StrikethroughNode> {
  static styles = styles;

  render () {
    return html`<s>${this.renderComponents(this.node.children)}</s>`;
  }
}


