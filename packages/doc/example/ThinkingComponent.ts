import { css, html } from 'lit';

let customElement: any;
let HtmlNodeElement: any;
let use: any;
let Thinking: any;

if (typeof window !== 'undefined') {
  Promise.all([
    import('wc-renderer-markdown').then(m => {
      customElement = m.customElement;
      HtmlNodeElement = m.HtmlNodeElement;
    }),
    import('wc-renderer-markdown-vue').then(m => {
      use = m.use;
    }),
    import('./Thinking.vue').then(m => {
      Thinking = m.default;
    }),
  ]).then(() => {
    if (customElement && HtmlNodeElement) {
      defineThinkingComponent();
    }
  });
}

function defineThinkingComponent() {
  @customElement('thinking')
  class ThinkingComponent extends HtmlNodeElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      margin: 16px 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 8px;
      color: white;
      font-style: italic;
    }

    .thinking-header {
      font-weight: bold;
      margin-bottom: 8px;
      font-size: 14px;
      opacity: 0.9;
    }

    .thinking-content {
      font-size: 16px;
      line-height: 1.6;
    }
  `;

  render () {
    return html`
      <div class="thinking-header">💭 AI Thinking...</div>
      <div class="thinking-content">
        <slot></slot>
      </div>
    `;
  }
  }

  if (use && Thinking) {
    use('htmlNode', 'thinkingvue', Thinking, 'thinkingvue');
  }
}
