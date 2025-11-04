import { html, LitElement } from 'lit';
import { html as staticHtml, unsafeStatic } from 'lit/static-html.js';
import { property } from 'lit/decorators.js';
import style from '@/markdown/index.lit.css';
import { getMarkdown, ParsedNode, parseMarkdownToStructure } from 'stream-markdown-parser';
import { nodeComponents } from '@/nodeComponents';
import { customElement } from '@/customElement';
import { config } from '@/config';

@customElement('markdown')
export default class Markdown extends LitElement {
  static styles = style;

  @property()
  content?: string = '';


  render () {
    const md = getMarkdown();
    let nodes = parseMarkdownToStructure(this.content, md);
    console.log('nodes:', nodes);
    return html`
        <div>
            ${renderComponents(nodes)}
        </div>
    `;
  }

  disconnectedCallback () {
    super.disconnectedCallback();
  }
}


function renderComponents (nodes: ParsedNode[]) {
  return html`${
    nodes.map(
      (node: ParsedNode) => {
        const tag = nodeComponents[node.type as string]
          || unsafeStatic(`${config.componentPrefix}-text`);

        // console.log('tag:', tag, node);
        return staticHtml`<${tag} .node="${node}" .renderComponents="${renderComponents}" />`;
      },
    )
  }`;
}

export type RenderComponents = typeof renderComponents;
