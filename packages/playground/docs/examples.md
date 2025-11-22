# 在HTML中使用

## 安装

```sh
npm install wc-renderer-markdown @lit/context^1.0.0 lit^3.1.4
```

## 入口导入

```ts
import 'wc-renderer-markdown';
```

## HTML中使用：

```html

<wc-markdown content=" **加粗文本** ==高亮文本== <thinking>自定义组件Html</thinking>" dark />
```
<playground-example-sample content=" **加粗文本** ==高亮文本== <thinking>自定义组件Html</thinking>">
</playground-example-sample>

## 或者在js中创建

```ts
import { MarkdownElement } from 'wc-renderer-markdown';

const markdownNode = document.createElement('wc-markdown') as MarkdownElement;
markdownNode.content = " **加粗文本** ==高亮文本== <thinking>自定义组件Html</thinking>";
markdownNode.drak = true;
document.body.appendChild(markdownNode)
``` 


## 自定义HTML组件部分：

```ts
import { customElement, HtmlNodeElement } from 'wc-renderer-markdown';
import { css, html } from 'lit';

// 继承自 ThinkingComponent  则是 html，继承自 NodeElement 则是 markdown 节点
@customElement('thinking')
export class ThinkingComponent extends HtmlNodeElement {
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
```
