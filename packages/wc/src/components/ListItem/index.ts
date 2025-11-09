import { html } from 'lit/static-html.js';
import { customElement } from '@/MarkdownNodeElement/customElement';
import styles from '@/components/ListItem/index.lit.css';
import { ListItemNode } from 'stream-markdown-parser';
import { classMap } from 'lit/directives/class-map.js';
import MarkdownNodeElement from 'src/MarkdownNodeElement';

@customElement('list_item')
export default class extends MarkdownNodeElement<ListItemNode, { ordered: boolean, index: number }> {
  static styles = styles;

  render() {
    const {ordered} = this.props
    return html`
      <li class="${classMap({ ordered })}" dir="auto">
        ${this.renderComponents(this.node.children)}
      </li>
    `;
  }
}


