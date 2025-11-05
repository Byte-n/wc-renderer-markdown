import { html } from 'lit/static-html.js';
import MarkdownNode, { customElement } from '@/customElement';
import styles from '@/components/Checkbox/index.lit.css';
import { CheckboxNode } from 'stream-markdown-parser';

@customElement('checkbox')
export default class extends MarkdownNode<CheckboxNode> {
  static styles = styles;

  render () {
    return html`
        <span class="checkbox-node">
          <input .checked=${this.node.checked} disabled type="checkbox" class="checkbox-input">
        </span>
    `;
  }
}


