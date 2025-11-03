import { html } from 'lit/static-html.js';
import MarkdownNode, { customElement } from '@/customElement';
import styles from './styles';
import { CodeBlockNode } from 'stream-markdown-parser';

@customElement('code_block')
export default class extends MarkdownNode<CodeBlockNode> {
  static styles = styles;

  render () {
    const lang = this.node.language ? `language-${this.node.language}` : '';
    return html`
      <pre><code class="${lang}">${this.node.code}</code></pre>
    `;
  }
}


