import { defineComponent, h, isVue3, Vue, Vue2 } from 'vue-demi';
import MarkdownElement, { BaseNode, HtmlNodeElement, NodeElement, use as _use } from 'wc-renderer-markdown';

export interface NodeProps<Node extends BaseNode> {
  node: Node;
  markdownRoot: MarkdownElement;
}

export type HtmlNodeProps = Record<string, string> & {
  markdownRoot: MarkdownElement;
};

export interface VueRenderer {
  app: any;
  mount: (container: Element | ShadowRoot) => void;
  unmount: () => void;
}

export default function use<
  Type extends 'node' | 'htmlNode',
  Node extends BaseNode = any
> (
  type: Type,
  nodeType: string,
  Component: any,
  elementName?: string,
  styles?: typeof HtmlNodeElement.styles,
) {
  let Clazz: CustomElementConstructor;

  if (type === 'htmlNode') {
    class A extends HtmlNodeElement<any> {
      private vueApp: VueRenderer | null = null;
      static styles = styles ?? [];

      connectedCallback () {
        super.connectedCallback();
        this.renderVueComponent();
      }

      updated (changedProperties: Map<string, any>) {
        super.updated(changedProperties);
        if (changedProperties.has('props') || changedProperties.has('markdownRoot')) {
          this.renderVueComponent();
        }
      }

      disconnectedCallback () {
        super.disconnectedCallback();
        if (this.vueApp) {
          this.vueApp.unmount();
          this.vueApp = null;
        }
      }

      private async renderVueComponent () {
        if (!this.shadowRoot) return;

        const props = {
          ...this.props,
          markdownRoot: this.markdownRoot,
        };

        if (!this.vueApp) {
          this.vueApp = createVueApp(Component, props);
          this.vueApp.mount(this.shadowRoot);
        } else {
          this.vueApp.unmount();
          this.vueApp = createVueApp(Component, props);
          this.vueApp.mount(this.shadowRoot);
        }
      }
    }

    Clazz = A;
  } else {
    class A extends NodeElement<Node, any> {
      private vueApp: VueRenderer | null = null;

      connectedCallback () {
        super.connectedCallback();
        this.renderVueComponent();
      }

      updated (changedProperties: Map<string, any>) {
        super.updated(changedProperties);
        if (changedProperties.has('node') || changedProperties.has('markdownRoot')) {
          this.renderVueComponent();
        }
      }

      disconnectedCallback () {
        super.disconnectedCallback();
        if (this.vueApp) {
          this.vueApp.unmount();
          this.vueApp = null;
        }
      }

      private async renderVueComponent () {
        if (!this.shadowRoot) return;

        const props = {
          node: this.node,
          markdownRoot: this.markdownRoot,
        };

        if (!this.vueApp) {
          this.vueApp = createVueApp(Component, props);
          this.vueApp.mount(this.shadowRoot);
        } else {
          this.vueApp.unmount();
          this.vueApp = createVueApp(Component, props);
          this.vueApp.mount(this.shadowRoot);
        }
      }
    }

    Clazz = A;
  }
  _use(nodeType, Clazz, elementName);
}


function createVueApp (Component: any, props: any): VueRenderer {
  let app: any;

  if (isVue3) {
    const WrapperComponent = defineComponent({
      setup () {
        return () => h(Component, props);
      },
    });

    app = Vue.createApp(WrapperComponent);

    return {
      app,
      mount: (container: Element | ShadowRoot) => {
        const mountPoint = document.createElement('div');
        (container as any).appendChild(mountPoint);
        app.mount(mountPoint);
      },
      unmount: () => {
        app.unmount();
      },
    };
  } else if (Vue2) {
    let vm: any;
    return {
      app: null,
      mount: (container: Element | ShadowRoot) => {
        const mountPoint = document.createElement('div');
        (container as any).appendChild(mountPoint);

        vm = new Vue2({
          render: (h: any) => h(Component, { props }),
        });
        vm.$mount(mountPoint);
      },
      unmount: () => {
        if (vm) {
          vm.$destroy();
        }
      },
    };
  } else {
    throw new Error('Vue is not found. Please install Vue 2 or Vue 3.');
  }
}
