import { unsafeStatic } from 'lit/static-html.js';
import { customElement as _customElement, property } from 'lit/decorators.js';
import { nodeComponents } from './nodeComponents';
import { config } from '@/config';
import { LitElement } from 'lit';
import { ParsedNode } from 'stream-markdown-parser';
import { RenderComponents } from '@/markdown';

export function customElement (name: string) {
  nodeComponents[name] = unsafeStatic(`${config.componentPrefix}-${name}`);
  return <T extends Omit<typeof HTMLElement, 'new'>> (target: T) => {
    return _customElement(`${config.componentPrefix}-${name}`)(target);
  };
}

export default class MarkdownNode<T extends ParsedNode> extends LitElement {
  @property({})
  node: T;
  @property({})
  renderComponents: RenderComponents;
}
