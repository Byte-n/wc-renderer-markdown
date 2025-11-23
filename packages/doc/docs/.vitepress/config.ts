import { defineConfig } from 'vitepress';
import { componentPreview, containerPreview } from '@vitepress-demo-preview/plugin';
import path from 'node:path';
// https://vitepress.dev/reference/site-config

const alias = {
  '@': path.resolve(__dirname, '../../example'),
};

export default defineConfig({
  title: 'wc-renderer-markdown',
  description: '基于 Web Components 的现代化 Markdown 渲染器',
  base: process.env.NODE_ENV === 'production' ? '/wc-renderer-markdown/' : '/',
  mpa: false,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/examples' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Html', link: '/examples.md' },
          { text: 'Vue', link: '/vue.md' },
          { text: 'React', link: '/react.md' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Byte-n/wc-renderer-markdown' },
    ],
  },
  vite: {
    resolve: {
      alias,
    },
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: tag => tag.includes('wc-'),
      },
    },
  },
  markdown: {
    config (md) {
      // md.use(containerPreview);
      // md.use(componentPreview);
      md.use(componentPreview, { alias });
      md.use(containerPreview, { alias });
      // md.use(containerPreview, { clientOnly: true });
      // md.use(componentPreview, { clientOnly: true });
    },
  },
});
