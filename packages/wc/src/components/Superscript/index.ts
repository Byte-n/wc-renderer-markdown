import { html } from 'lit/static-html.js';
import { customElement } from '@/MarkdownNodeElement/customElement';
import styles from '@/components/Superscript/index.lit.css';
import { SuperscriptNode } from 'stream-markdown-parser';
import MarkdownNodeElement from 'src/MarkdownNodeElement';

@customElement('superscript')
export default class extends MarkdownNodeElement<SuperscriptNode> {
  static styles = styles;

  render () {
    return html`<sup>${this.renderComponents(this.node.children)}</sup>`;
  }
}


