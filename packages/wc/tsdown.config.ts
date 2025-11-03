import { defineConfig } from 'tsdown'

export default defineConfig({
  clean: false,
  entry: ['src/**/*.ts'],
  format: ['esm'],
  dts: true,
})
