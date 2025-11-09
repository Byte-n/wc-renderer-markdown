import { html } from 'lit/static-html.js';
import { customElement } from '@/MarkdownNodeElement/customElement';
import styles from '@/components/Checkbox/index.lit.css';
import { CheckboxNode } from 'stream-markdown-parser';
import MarkdownNodeElement from 'src/MarkdownNodeElement';

@customElement('checkbox_input')
export default class extends MarkdownNodeElement<CheckboxNode> {
  static styles = styles;

  render () {
    return html`<input .checked=${this.node.checked} disabled type="checkbox" class="checkbox-input">`;
  }
}


