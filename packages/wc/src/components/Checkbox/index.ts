import { html } from 'lit/static-html.js';
import MarkdownNode, { customElement } from '@/customElement';
import styles from './styles';
import { CheckboxNode } from 'stream-markdown-parser';

@customElement('checkbox')
export default class extends MarkdownNode<CheckboxNode> {
  static styles = styles;
  render () {
    return html`<input type="checkbox" .checked=${this.node.checked} disabled>`;
  }
}


