import { ParsedNode } from 'stream-markdown-parser';
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import MarkdownElement from '@/markdown';
import { consume } from '@lit/context';
import { markdownRootContext } from '@/markdown/markdownRootContext';
import { html as staticHtml, unsafeStatic } from 'lit/static-html.js';
import { nodeComponents } from '@/markdown/nodeComponents';
import { config } from '@/config';

export default class MarkdownNodeElement<T extends ParsedNode, Props = any> extends LitElement {
  @property({})
  protected node: T;

  @property({})
  protected renderComponents: RenderComponents;

  @property({})
  protected renderComponent: RenderComponent;

  @property({})
  protected props: Props;

  @consume({ context: markdownRootContext })
  @property({ attribute: false })
  protected markdownRoot?: MarkdownElement;

}

export function renderComponents (nodes: ParsedNode[]) {
  return html`${
    nodes.map(
      (node: ParsedNode) => {
        const tag = parserTag(node);
        return staticHtml`<${tag} .node="${node}" .renderComponents="${renderComponents}"/>`;
      },
    )
  }`;
}

export function renderComponent (node: ParsedNode, props: object) {
  const tag = parserTag(node);
  return staticHtml`<${tag} .node="${node}" .renderComponents="${renderComponents}" .renderComponent="${renderComponent}" .props="${props}"/>`;
}

const parserTag = (node: ParsedNode) => {
  if (nodeComponents[node.type as string]) {
    return nodeComponents[node.type as string];
  }
  console.warn('tag not register', node);
  return unsafeStatic(`${config.componentPrefix}-text`);
};

export type RenderComponents = typeof renderComponents;
export type RenderComponent = typeof renderComponent;
