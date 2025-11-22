import React from 'react';
import ReactDOM from 'react-dom';
import MarkdownElement, { HtmlNodeElement, NodeElement, BaseNode, use as _use } from 'wc-renderer-markdown';

export interface NodeProps<Node extends BaseNode> {
  node: Node,
  markdownRoot: MarkdownElement
}


export type HtmlNodeProps = Record<string, string> & {
  markdownRoot: MarkdownElement
}

export interface ReactRenderer {
  render: (element: React.ReactElement) => void;
  unmount: () => void;
}

export default function use<
  Type extends 'node' | 'htmlNode',
  Node extends BaseNode = any
> (
  type: Type,
  nodeType: string,
  Component: React.ComponentType<
    Type extends 'node' ? NodeProps<Node> : HtmlNodeProps
  >,
  elementName?: string,
) {


  let Clazz: any;

  if (type === 'htmlNode') {
    class A extends HtmlNodeElement<any> {
      private root: any;

      connectedCallback () {
        super.connectedCallback();
        this.renderReactComponent();
      }

      updated (changedProperties: Map<string, any>) {
        super.updated(changedProperties);
        if (changedProperties.has('props') || changedProperties.has('markdownRoot')) {
          this.renderReactComponent();
        }
      }

      disconnectedCallback () {
        super.disconnectedCallback();
        if (this.root) {
          this.root.unmount();
        }
      }

      private async renderReactComponent () {
        if (!this.shadowRoot) return;

        if (!this.root) {
          this.root = createRoot(this.shadowRoot);
        }

        const props = {
          ...this.props,
          markdownRoot: this.markdownRoot,
        };

        this.root.render(React.createElement(Component, props));
      }
    }

    Clazz = A;
  } else {
    class A extends NodeElement<Node, any> {
      private root: any;

      connectedCallback () {
        super.connectedCallback();
        this.renderReactComponent();
      }

      updated (changedProperties: Map<string, any>) {
        super.updated(changedProperties);
        if (changedProperties.has('node') || changedProperties.has('markdownRoot')) {
          this.renderReactComponent();
        }
      }

      disconnectedCallback () {
        super.disconnectedCallback();
        if (this.root) {
          this.root.unmount();
        }
      }

      private async renderReactComponent () {
        if (!this.shadowRoot) return;


        if (!this.root) {
          this.root = createRoot(this.shadowRoot);
        }

        const props = {
          node: this.node,
          markdownRoot: this.markdownRoot,
        };

        this.root.render(React.createElement(Component, props as any));
      }
    }

    Clazz = A;
  }
  _use(nodeType, Clazz, elementName);
}

function createRoot (container: Container): ReactRenderer {
  if ('createRoot' in ReactDOM) {
    const root = (ReactDOM as any).createRoot(container) as Root;
    return {
      render: (element: React.ReactElement) => root.render(element),
      unmount: () => root.unmount(),
    };
  } else {
    return {
      render: (element: React.ReactElement) => {
        ReactDOM.render(element, container);
      },
      unmount: () => {
        ReactDOM.unmountComponentAtNode(container);
      },
    };
  }
}

interface Root {
  render (children: React.ReactNode): void;

  unmount (): void;
}

type Container =
  | Element
  | DocumentFragment
