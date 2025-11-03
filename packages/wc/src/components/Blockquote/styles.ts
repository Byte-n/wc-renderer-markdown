import { css } from 'lit';

export default css`
  .blockquote {
    font-weight: 500;
    font-style: italic;
    border-left: 0.25rem solid var(--blockquote-border-color, #e2e8f0);
    quotes: "\\201C" "\\201D" "\\2018" "\\2019";
    margin-top: 1.6em;
    margin-bottom: 1.6em;
    padding-left: 1em;
  }

  /* 防止内部 NodeRenderer 使用 content-visibility: auto 时在大文档滚动中出现“高但空白”的占位 */

  .blockquote :deep(.markdown-renderer) {
    content-visibility: visible;
    contain-intrinsic-size: auto;
  }
`;

