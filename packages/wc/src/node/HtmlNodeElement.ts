import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import MarkdownElement from '@/markdown';
import { consume } from '@lit/context';
import { markdownRootContext } from '@/markdown/markdownRootContext';
import { StaticValue } from 'lit/static-html.js';

export default class HtmlNodeElement<Props = any> extends LitElement {

  @property({ type: Object })
  public props: Props;

  @consume({ context: markdownRootContext })
  @property({ attribute: false })
  public markdownRoot: MarkdownElement;

  static components: Record<string, StaticValue> = {};
}
