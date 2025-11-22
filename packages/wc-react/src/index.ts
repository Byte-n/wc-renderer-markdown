import React from 'react';
import { createComponent } from '@lit/react';
import MarkdownElement, { config } from 'wc-renderer-markdown';

const Markdown = createComponent<MarkdownElement>({
  tagName: `${config.componentPrefix}-markdown`,
  elementClass: MarkdownElement,
  react: React,
  displayName: 'Markdown',
});
export { default as use } from './use';
export default Markdown;
