import { html, literal } from 'lit/static-html.js';
import MarkdownNode, { customElement } from '@/customElement';
import styles from './styles';
import { HeadingNode } from 'stream-markdown-parser';

@customElement('heading')
export default class extends MarkdownNode<HeadingNode> {
  static styles = styles;
  private defaultTag = literal`h6`;
  private tags = [
    literal`h1`,
    literal`h2`,
    literal`h3`,
    literal`h4`,
    literal`h5`,
    this.defaultTag
  ]

  render () {
    const level = Math.min(6, Math.max(1, this.node.level || 1));
    const Tag = this.tags[level-1] || this.defaultTag;
    return html`
      <${Tag}>
        ${this.renderComponents(this.node.children)}
      </${Tag}>
    `;
  }
}


