import { html, literal } from 'lit/static-html.js';
import styles from '@/components/Heading/index.lit.css';
import { HeadingNode } from 'stream-markdown-parser';
import NodeElement, { renderComponents } from '@/node/NodeElement';
import { customElement } from '@/node/customElement';

@customElement('heading')
export default class extends NodeElement<HeadingNode> {
  static styles = styles;
  private defaultTag = literal`h6`;
  private tags = [
    literal`h1`,
    literal`h2`,
    literal`h3`,
    literal`h4`,
    literal`h5`,
    this.defaultTag,
  ];

  render () {
    const level = Math.min(6, Math.max(1, this.node.level || 1));
    const Tag = this.tags[level - 1] || this.defaultTag;

    return html`
      <${Tag} class="heading-node">
        ${this.node.children.length ? renderComponents(this.node.children) : this.node.text}
      </${Tag}>
    `;
  }
}


