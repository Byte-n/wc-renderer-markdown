import { unsafeStatic } from 'lit/static-html.js';
import { config } from '@/config';
import { customElement as _customElement } from 'lit/decorators.js';
import NodeElement from '@/node/NodeElement';
import HtmlNodeElement from '@/node/HtmlNodeElement';


export function customElement (name: string, elementName?: string) {
  elementName = elementName ?? name.replace(/_/g, '-');
  if (!/^[a-z-]+$/.test(elementName)) {
    throw new Error(`elementName must only contain lowercase letters and hyphens, got: ${elementName}`);
  }

  const realName = `${config.componentPrefix}-${elementName}`;
  return <T extends CustomElementConstructor> (target: T) => {
    if (target.prototype instanceof HtmlNodeElement) {
      HtmlNodeElement.components[name] = unsafeStatic(realName);
    } else {
      NodeElement.components[name] = unsafeStatic(realName);
    }
    return _customElement(realName)(target);
  };
}
