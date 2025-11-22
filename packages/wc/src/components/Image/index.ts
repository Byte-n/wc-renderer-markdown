import { html } from 'lit/static-html.js';
import styles from '@/components/Image/index.lit.css';
import { ImageNode } from 'stream-markdown-parser';
import { property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import NodeElement from '@/node/NodeElement';
import { customElement } from '@/node/customElement';

@customElement('image')
export default class extends NodeElement<ImageNode> {
  static styles = styles;

  // 组件属性
  @property({ type: String, attribute: 'fallback-src' })
  fallbackSrc = '';

  @property({ type: Boolean, attribute: 'show-caption' })
  showCaption = false;

  @property({ type: Boolean, attribute: 'lazy' })
  lazy = true;

  @property({ type: String, attribute: 'svg-min-height' })
  svgMinHeight = '12rem';

  @property({ type: Boolean, attribute: 'use-placeholder' })
  usePlaceholder = true;

  // 内部状态
  @state()
  private imageLoaded = false;

  @state()
  private hasError = false;

  @state()
  private fallbackTried = false;

  // 计算当前用于渲染的 src
  get displaySrc (): string {
    return this.hasError && this.fallbackSrc ? this.fallbackSrc : this.node.src;
  }

  // 是否为 svg 文件
  get isSvg (): boolean {
    return /\.svg(?:\?|$)/i.test(this.displaySrc);
  }

  // 监听 displaySrc 变化，重置状态
  updated (changedProperties: Map<string, unknown>) {
    if (changedProperties.has('node')) {
      // 当 node 变化时，检查 src 是否改变
      const oldNode = changedProperties.get('node') as ImageNode | undefined;
      if (oldNode && oldNode.src !== this.node.src) {
        // src 变化时，重置加载状态
        this.imageLoaded = false;
        this.hasError = false;
        this.fallbackTried = false;
      }
    }
  }

  // 处理图片加载错误
  private handleImageError = () => {
    if (this.fallbackSrc && !this.fallbackTried) {
      this.fallbackTried = true;
      this.hasError = true;
      // 保持 imageLoaded 为 false，以便显示占位符
      // 触发更新以使用 fallback src
      this.requestUpdate();
    } else {
      this.hasError = true;
      // 可以在这里触发自定义事件
      this.dispatchEvent(new CustomEvent('error', { detail: { src: this.node.src } }));
      this.requestUpdate();
    }
  };

  // 处理图片加载完成
  private handleImageLoad = () => {
    this.imageLoaded = true;
    this.hasError = false;
    // 可以在这里触发自定义事件
    this.dispatchEvent(new CustomEvent('load', { detail: { src: this.displaySrc } }));
    this.requestUpdate();
  };

  render () {
    const loading = (this.node as any).loading || false;

    // 决定渲染哪个内容
    let content;
    if (!loading && !this.hasError) {
      content = this.renderImage();
    } else if (!this.hasError) {
      content = this.renderPlaceholder();
    } else if (!this.fallbackSrc) {
      content = this.renderError();
    } else {
      content = this.renderPlaceholder('正在加载备用图片...');
    }

    return html`
        <figure class="image-figure">
            <div class="image-wrapper">
                ${content}
            </div>
            ${this.renderCaption()}
        </figure>
    `;
  }

  // 渲染图片元素
  private renderImage () {
    const { alt, title } = this.node;
    const imgAlt = String(alt ?? title ?? '');
    const imgTitle = String(title ?? alt ?? '');

    const imgStyle = this.isSvg
      ? {
        minHeight: this.svgMinHeight,
        width: '100%',
        height: 'auto',
        objectFit: 'contain' as const,
      }
      : {};

    return html`
        <img
                src="${this.displaySrc}"
                alt="${imgAlt}"
                title="${imgTitle}"
                class="${classMap({
                    'image': true,
                    'image-loaded': this.imageLoaded,
                    'image-loading': !this.imageLoaded,
                })}"
                style="${styleMap(imgStyle)}"
                loading="${this.lazy ? 'lazy' : 'eager'}"
                decoding="async"
                @error="${this.handleImageError}"
                @load="${this.handleImageLoad}"
        />
    `;
  }

  // 渲染占位符
  private renderPlaceholder (text: string = '图片加载中...') {
    const placeholderStyle = this.isSvg
      ? {
        minHeight: this.svgMinHeight,
        width: '100%',
      }
      : {
        minHeight: '6rem',
      };

    return html`
        <div class="placeholder-layer" style="${styleMap(placeholderStyle)}">
            ${this.usePlaceholder
                    ? html`
                        <div class="spinner" aria-hidden="true"></div>
                        <span class="placeholder-text">${text}</span>
                    `
                    : html`<span class="placeholder-text">${this.node.raw || ''}</span>`}
        </div>
    `;
  }

  // 渲染错误状态
  private renderError () {
    return html`
        <div class="error-layer">
            <svg
                    class="error-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
            >
                <path
                        fill="currentColor"
                        d="M2 2h20v10h-2V4H4v9.586l5-5L14.414 14L13 15.414l-4-4l-5 5V20h8v2H2zm13.547 5a1 1 0 1 0 0 2a1 1 0 0 0 0-2m-3 1a3 3 0 1 1 6 0a3 3 0 0 1-6 0m3.625 6.757L19 17.586l2.828-2.829l1.415 1.415L20.414 19l2.829 2.828l-1.415 1.415L19 20.414l-2.828 2.829l-1.415-1.415L17.586 19l-2.829-2.828z"
                />
            </svg>
            <span class="error-text">图片加载失败</span>
        </div>
    `;
  }

  // 渲染图片说明
  private renderCaption () {
    const { alt } = this.node;
    if (!this.showCaption || !alt) {
      return null;
    }
    return html`
        <figcaption class="image-caption">${alt}</figcaption>`;
  }
}


