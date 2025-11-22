<script setup lang="ts">
import { onMounted, onUnmounted, ref, defineAsyncComponent } from 'vue';

const Markdown = defineAsyncComponent(() => import('wc-renderer-markdown-vue').then(m => m.default));

const content = ref('<thinking>Vue也想一想</thinking>');

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
  <div>
    <Markdown :dark="isDark" :content="content"/>
  </div>
</template>

<style scoped>

</style>
