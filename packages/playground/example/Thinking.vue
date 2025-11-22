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
