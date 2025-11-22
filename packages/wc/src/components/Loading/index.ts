import { html } from 'lit/static-html.js';
import styles from '@/components/Loading/index.lit.css';
import NodeElement from '@/node/NodeElement';
import { customElement } from '@/node/customElement';
import { BaseNode } from 'stream-markdown-parser';

@customElement('loading')
export default class extends NodeElement<BaseNode> {
  static styles = styles;

  private resizeObserver: ResizeObserver | null = null;

  firstUpdated () {
    const loading = this.renderRoot.querySelector('.loading') as HTMLDivElement;
    if (loading) {
      this.resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const width = entry.contentRect.width;
          const duration = Math.max(3, width / 200);
          loading.style.setProperty('--loading-duration', `${duration}s`);
        }
      });
      this.resizeObserver.observe(loading);
    }
  }

  disconnectedCallback () {
    super.disconnectedCallback();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  render () {
    return html`
        <div class="box">
            <div class="loading">
                <div class="loading-bar"></div>
            </div>
        </div>
    `;
  }
}
