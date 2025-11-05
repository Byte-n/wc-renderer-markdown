import { html } from 'lit/static-html.js';
import MarkdownNode, { customElement } from '@/customElement';
import styles from '@/components/Admonition/index.lit.css';
import { AdmonitionKind, AdmonitionNode } from 'stream-markdown-parser';
import { state } from 'lit/decorators.js';


// 不同类型的警告块图标（显式类型以便编辑器提示）
const iconMap: Record<AdmonitionKind, string> = {
  note: 'ℹ️',
  info: 'ℹ️',
  tip: '💡',
  warning: '⚠️',
  danger: '❗',
  // 'error' is a common alias for 'danger' in some markdown flavors
  error: '⛔',
  caution: '⚠️',
};

@customElement('admonition')
export default class extends MarkdownNode<AdmonitionNode> {
  static styles = styles;

  @state()
  public collapsed = false;
  private headerId = `admonition-${Math.random().toString(36).slice(2, 9)}`;

  public get icon () {
    return iconMap[this.node.kind];
  }

  public get displayTitle () {
    if (this.node.title && this.node.title.trim().length) {
      return this.node.title;
    }
    const k = this.node.kind || 'note';
    return k.charAt(0).toUpperCase() + k.slice(1);
  }

  render () {
    const { kind, title } = this.node;
    return html`
        <div class="admonition admonition-${kind}">
            <div id="headerId" class="admonition-header">
                ${this.renderIcon()}
                <span class="admonition-title">${this.displayTitle}</span>

                <!-- 可选的折叠控制（放在 header 末端） -->
                ${this.renderButton()}
            </div>

            ${this.renderContent()}
        </div>
    `;
  }

  renderContent () {
    if (this.collapsed) {
      return null;
    }
    return html`
        <div
                id="${this.headerId}-content"
                class="admonition-content"
                aria-labelledby="${this.headerId}"
        >
            ${this.renderComponents(this.node.children)}
        </div>
    `;
  }

  renderIcon () {
    if (!this.icon) {
      return null;
    }
    return html`<span class="admonition-icon">${this.icon}</span>`;
  }

  renderButton () {
    if (!this.node.collapsible) {
      return;
    }
    return html`
        <button
                class="admonition-toggle"
                aria-expanded="${this.collapsed}"
                aria-controls="${this.headerId}-content"
                title="${this.collapsed ? 'Expand' : 'Collapse'}"
                @click="toggleCollapse"
        >
            <span>${this.collapsed ? '▶' : '▼'}</span>
        </button>
    `;
  }
}


