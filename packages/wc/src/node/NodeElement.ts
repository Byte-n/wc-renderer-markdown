import { BaseNode, ParsedNode } from 'stream-markdown-parser';
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import MarkdownElement from '@/markdown';
import { consume } from '@lit/context';
import { markdownRootContext } from '@/markdown/markdownRootContext';
import { html as staticHtml, StaticValue, unsafeStatic } from 'lit/static-html.js';
import { config } from '@/config';

export default class NodeElement<T extends BaseNode, Props = any> extends LitElement {
  @property({})
  public node: T;

  @property({})
  public props: Props;

  @consume({ context: markdownRootContext })
  @property({ attribute: false })
  public markdownRoot: MarkdownElement;

  static components: Record<string, StaticValue> = {};
}

export function renderComponents (nodes: ParsedNode[]) {
  return html`${
    nodes.map((node: ParsedNode) => renderComponent(node, {}))
  }`;
}

export function renderComponent (node: ParsedNode, props: object) {
  const tag = computeTag(node);
  if (node.loading) {
    const loadingTag = unsafeStatic(`${config.componentPrefix}-loading`);
    return staticHtml`<${loadingTag}/>`;
  }
  return staticHtml`<${tag} .node="${node}" .renderComponents="${renderComponents}" .renderComponent="${renderComponent}" .props="${props}"/>`;
}

export type RenderComponents = typeof renderComponents;

export type RenderComponent = typeof renderComponent;

function computeTag (node: ParsedNode) {
  if (NodeElement.components[node.type as string]) {
    return NodeElement.components[node.type as string];
  }
  console.warn('tag not register', node);
  return unsafeStatic(`${config.componentPrefix}-text`);
}

