import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { steamMarkdownContent } from './markdown';

if (typeof window !== 'undefined') {
  import('wc-renderer-markdown');
  import('./ThinkingComponent');
}

@customElement('playground-home-example')
class HomeExample extends LitElement {

  static styles = css`
    .body {
      margin-top: 60px;
    }

    #app {
      max-width: 1200px;
      margin: 0 auto;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      padding: 0;
      box-sizing: border-box;
      overflow: hidden;
      transition: background 0.3s ease, box-shadow 0.3s ease;
    }

    .body.dark #app {
      background: #1f2937;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
    }

    .card-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #ffffff;
      padding: 24px 40px;
      font-size: 24px;
      font-weight: 600;
      letter-spacing: 0.5px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .card-content {
      transition: background 0.3s ease;
      max-height: 700px;
      overflow: auto;
    }
  `;

  @state()
  content: string = '';

  @state()
  isDark: boolean = false;

  private observer?: MutationObserver;

  connectedCallback () {
    super.connectedCallback();
    steamMarkdownContent(v => this.content = v);

    // 初始化 dark 状态
    this.isDark = document.documentElement.classList.contains('dark');

    // 监听 html 元素的 class 变化
    this.observer = new MutationObserver(() => {
      this.isDark = document.documentElement.classList.contains('dark');
    });

    this.observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  disconnectedCallback () {
    super.disconnectedCallback();
    this.observer?.disconnect();
  }

  protected render () {
    return html`
      <div class="body">
        <div id="app">
          <div class="card-header">
            <span>wc-renderer-markdown</span>
          </div>
          <div class="card-content">
            <wc-markdown ?dark="${this.isDark}" .content="${this.content}" auto-scroll-2-end/>
          </div>
        </div>
      </div>
    `;
  }
}


@customElement('playground-example-sample')
class ExampleSample extends LitElement {
  @property()
  content: string

  @state()
  isDark: boolean = false;

  private observer?: MutationObserver;

  connectedCallback () {
    super.connectedCallback();
    // 初始化 dark 状态
    this.isDark = document.documentElement.classList.contains('dark');

    // 监听 html 元素的 class 变化
    this.observer = new MutationObserver(() => {
      this.isDark = document.documentElement.classList.contains('dark');
    });

    this.observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  disconnectedCallback () {
    super.disconnectedCallback();
    this.observer?.disconnect();
  }

  protected render () {
    console.log(`this.content:`, this.content);
    const text = this.content.split('\n').join('\n')
    console.log(`text:`, text);
    return html`
      <wc-markdown ?dark="${this.isDark}" .content="${text}"/>`;
  }
}
