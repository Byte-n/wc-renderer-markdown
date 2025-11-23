<script setup lang="ts">
import { onMounted, onUnmounted, ref, defineAsyncComponent } from 'vue';
import { steamMarkdownContent } from './markdown';

const Markdown = defineAsyncComponent(() => import('wc-renderer-markdown-vue').then(m => m.default));

const content = ref('');

// 模拟从服务的下载
steamMarkdownContent(v => content.value = v);

const isDark = ref(false);

onMounted(() => {
  if (typeof document !== 'undefined') {
    isDark.value = document.documentElement.classList.contains('dark');
    const observer = new MutationObserver(() => {
      isDark.value = document.documentElement.classList.contains('dark');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    onUnmounted(() => observer.disconnect());
  }
});

</script>

<template>
  <div style='max-height: 500px; overflow-y: auto;'>
    <Markdown :dark="isDark" :content="content" :autoScroll2End="true"/>
  </div>
</template>

<style scoped>

</style>
