import { html } from 'lit/static-html.js';
import MarkdownNode, { customElement } from '@/customElement';
import styles from '@/components/Admonition/index.lit.css';
import { AdmonitionNode } from 'stream-markdown-parser';

@customElement('admonition')
export default class extends MarkdownNode<AdmonitionNode> {
  static styles = styles;

  render () {
    const { kind, title } = this.node;
    return html`
        <div class="admonition ${kind}">
            <div class="admonition-title">${title}</div>
            <div class="admonition-content">${this.renderComponents(this.node.children)}</div>
        </div>
    `;
  }
}


