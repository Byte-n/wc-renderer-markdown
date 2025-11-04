declare global {
  module '*.lit.css' {
    import type { CSSResult } from '@lit/reactive-element/css-tag.js';
    const css: CSSResult;
    export default css;
  }
}

export {};
