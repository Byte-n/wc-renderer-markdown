# 在Vue中使用  

## 安装

```sh
npm install wc-renderer-markdown wc-renderer-markdown-vue @lit/context^1.0.0 lit^3.1.4
```

## 使用提供的Vue组件
<preview path="@/Example.vue" language="vue"></preview>


## 当然也可以使用原生的Html

```html

<wc-markdown content=" **加粗文本** ==高亮文本== <thinkingvue>自定义组件 Vue</thinkingvue>" dark />
```
<playground-example-sample content=" **加粗文本** ==高亮文本== <thinkingvue>自定义组件 Vue </thinkingvue>"/>


## 自定义组件
* 注册组件
```ts
import { use } from 'wc-renderer-markdown-vue';
import Thinking from './Thinking.vue';
// 自定义html, htmlNode 指的是 html ，node 则是 markdown 节点。
use('htmlNode', 'thinkingvue', Thinking, 'thinkingvue');
```

* Thinking.vue
```tsx 
<script setup lang="ts">
  const slot = '<slot></slot>';
</script>

<template>
  <div>
    <div>
      <b>这是Vue的Thinking</b>
    </div>
    <!--使用之前 HTML 中注册的 thinking-->
    <wc-thinking v-html="slot"/>
    <!-- <slot></slot> 与vue 的slot 冲突，因此使用 v-html 指令 -->
  </div>
</template>
```
