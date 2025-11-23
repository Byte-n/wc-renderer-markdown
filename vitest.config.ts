import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    // 多项目支持 - 使用 projects 字段
    projects: [
      {
        test: {
          name: 'markdown-parser',
          root: './packages/markdown-parser',
          environment: 'node',
          include: ['test/**/*.test.ts'],
          coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: ['**/node_modules/**', '**/dist/**', '**/test/**'],
          },
        },
      },
      // 可以在这里添加其他需要测试的项目
      // {
      //   test: {
      //     name: 'wc',
      //     root: './packages/wc',
      //     environment: 'jsdom', // 如果需要测试 Web Components
      //     include: ['test/**/*.test.ts'],
      //   },
      // },
    ],
  },
})
