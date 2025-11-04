import { html } from 'lit/static-html.js';
import MarkdownNode, { customElement } from '@/customElement';
import styles from '@/components/DefinitionList/index.lit.css';
import { DefinitionListNode } from 'stream-markdown-parser';

@customElement('definition_list')
export default class extends MarkdownNode<DefinitionListNode> {
  static styles = styles;

  render () {
    return html`
      <dl>
        ${this.node.items.map(item => html`
          <dt>${this.renderComponents(item.term)}</dt>
          <dd>${this.renderComponents(item.definition)}</dd>
        `)}
      </dl>
    `;
  }
}


