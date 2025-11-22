import { html } from 'lit/static-html.js';
import styles from '@/components/ListItem/index.lit.css';
import { ListItemNode } from 'stream-markdown-parser';
import { classMap } from 'lit/directives/class-map.js';
import NodeElement, { renderComponents } from '@/node/NodeElement';
import { customElement } from '@/node/customElement';

@customElement('list_item')
export default class extends NodeElement<ListItemNode, { ordered: boolean, index: number }> {
  static styles = styles;

  render() {
    const {ordered} = this.props
    return html`
      <li class="${classMap({ ordered })}" dir="auto">
        ${renderComponents(this.node.children)}
      </li>
    `;
  }
}


