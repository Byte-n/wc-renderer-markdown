import { html } from 'lit/static-html.js';
import styles from '@/components/DefinitionList/index.lit.css';
import { DefinitionListNode } from 'stream-markdown-parser';
import NodeElement, { renderComponents } from '@/node/NodeElement';
import { customElement } from '@/node/customElement';

@customElement('definition_list')
export default class extends NodeElement<DefinitionListNode> {
  static styles = styles;

  render () {
    return html`
        <dl>
            ${this.node.items.map(item => html`
                <dt>${renderComponents(item.term)}</dt>
                <dd>${renderComponents(item.definition)}</dd>
            `)}
        </dl>
    `;
  }
}


