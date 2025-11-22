import { config } from '@/config';
import { unsafeStatic } from 'lit/static-html.js';
import NodeElement from '@/node/NodeElement';
import HtmlNodeElement from '@/node/HtmlNodeElement';

export function use (
  nodeType: string,
  component: CustomElementConstructor,
  elementName?: string,
) {
  elementName = elementName ?? nodeType.replace(/_/g, '-');

  if (!/^[a-z-]+$/.test(elementName)) {
    throw new Error(`elementName must only contain lowercase letters and hyphens, got: ${elementName}`);
  }

  const realName = `${config.componentPrefix}-${elementName}`;

  customElements.define(realName, component);

  if (component.prototype instanceof HtmlNodeElement) {
    HtmlNodeElement.components[nodeType] = unsafeStatic(realName);
  } else {
    NodeElement.components[nodeType] = unsafeStatic(realName);
  }
}
