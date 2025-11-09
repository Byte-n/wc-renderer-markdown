import { html } from 'lit/static-html.js';
import { customElement } from '@/MarkdownNodeElement/customElement';
import styles from '@/components/Link/index.lit.css';
import { LinkNode } from 'stream-markdown-parser';
import MarkdownNodeElement from 'src/MarkdownNodeElement';

interface LinkNodeWithLoading extends LinkNode {
  loading?: boolean;
}

@customElement('link')
export default class extends MarkdownNodeElement<LinkNode> {
  static styles = styles;

  // 获取链接文本（用于 tooltip 和 aria-label）
  private get linkText (): string {
    return this.node?.href ?? this.node?.title ?? this.node?.text ?? '';
  }

  render () {
    const { href } = this.node;
    const loading = (this.node as LinkNodeWithLoading).loading || false;

    // 如果处于 loading 状态
    if (loading) {
      return html`
        <span 
          class="link-loading" 
          aria-hidden="false"
        >
          <span class="link-text">${this.node.text}</span>
        </span>
      `;
    }

    // 正常链接状态 - showTooltip 为 true 的逻辑（始终显示 tooltip）
    return html`
      <a
        class="link-node"
        href="${href}"
        title="${String(this.linkText)}"
        aria-label="Link: ${this.linkText}"
        target="_blank"
        rel="noopener noreferrer"
      >
        ${this.renderComponents(this.node.children)}
      </a>
    `;
  }
}


