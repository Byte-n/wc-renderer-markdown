import { html } from 'lit/static-html.js';
import { customElement } from '@/MarkdownNodeElement/customElement';
import styles from '@/components/Highlight/index.lit.css';
import { HighlightNode } from 'stream-markdown-parser';
import MarkdownNodeElement from 'src/MarkdownNodeElement';

@customElement('highlight')
export default class extends MarkdownNodeElement<HighlightNode> {
  static styles = styles;

  render () {
    return html`<mark>${this.renderComponents(this.node.children)}</mark>`;
  }
}


