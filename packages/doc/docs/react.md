# 在React中使用

## 安装

```sh
npm install wc-renderer-markdown wc-renderer-markdown-react @lit/context^1.0.0 lit^3.1.4
```

## 使用提供的Vue组件

```tsx
import 'wc-renderer-markdown';
import Markdown, { use } from 'wc-renderer-markdown-react';
import ReactDom from 'react-dom';
import React, { useEffect, useState } from 'react';

ReactDom.render(
  <Markdown content=' **加粗文本** ==高亮文本== <thinkingreact>自定义组件 Vue</thinkingreact>'/>,
  document.querySelector('#app'),
);

// 自定义html, htmlNode 指的是 html ，node 则是 markdown 节点。
use(
  'htmlNode',
  'thinkingreact',
  function (props) {
    console.log('props:', props);
    return <div>
      {/*使用html中注册的thinking*/}
      <wc-thinking>
        {/*web component插槽*/}
        <slot></slot>
      </wc-thinking>
    </div>;
  },
  'thinkingreact',
);

// 也可以使用装饰器
@customElement('htmlNode', 'thinkingreact2')
function TR2 (props) {
  return <div>
    {/*使用html中注册的thinking*/}
    <wc-thinking>
      {/*web component插槽*/}
      <slot></slot>
    </wc-thinking>
  </div>;
}
```

## 当然也可以使用原生的Html

```html

<wc-markdown content=" **加粗文本** ==高亮文本== <thinkingvue>自定义组件 React</thinkingvue>" dark/>
```

<playground-example-sample content=" **加粗文本** ==高亮文本== <thinking>自定义组件 React </thinking>"/>
