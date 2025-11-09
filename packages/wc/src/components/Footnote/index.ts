import { html } from 'lit/static-html.js';
import { customElement } from '@/MarkdownNodeElement/customElement';
import styles from '@/components/Footnote/index.lit.css';
import { FootnoteNode } from 'stream-markdown-parser';
import { property } from 'lit/decorators.js';
import MarkdownNodeElement from 'src/MarkdownNodeElement';

@customElement('footnote')
export default class extends MarkdownNodeElement<FootnoteNode> {
  static styles = styles;

  // 内部计算的 fullName，同时反射到 HTML 属性上
  @property({ reflect: true })
  footnote = '';

  // 监听基础属性变化，更新 fullName
  updated (changedProperties: Map<string, unknown>) {
    // 当 firstName 或 lastName 变化时，重新计算 fullName
    if (changedProperties.has('node')) {
      this.footnote = this.node.id;
    }
  }


  render () {
    const { id } = this.node;
    return html`
        <div class="footnote" id="footnote-${id}">
            <span class="id">[${id}]</span>
            <div class="ch">
                ${this.renderComponents(this.node.children)}
            </div>
        </div>
    `;
  }
}


