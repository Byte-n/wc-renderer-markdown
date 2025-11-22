import { html } from 'lit/static-html.js';
import styles from '@/components/Checkbox/index.lit.css';
import { CheckboxNode } from 'stream-markdown-parser';
import NodeElement from '@/node/NodeElement';
import { customElement } from '@/node/customElement';

@customElement('checkbox_input')
export default class extends NodeElement<CheckboxNode> {
  static styles = styles;

  render () {
    return html`<input .checked=${this.node.checked} disabled type="checkbox" class="checkbox-input">`;
  }
}


