import { html } from 'lit/static-html.js';
import { customElement } from '@/MarkdownNodeElement/customElement';
import styles from '@/components/DefinitionList/index.lit.css';
import { DefinitionListNode } from 'stream-markdown-parser';
import MarkdownNodeElement from 'src/MarkdownNodeElement';

@customElement('definition_list')
export default class extends MarkdownNodeElement<DefinitionListNode> {
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


