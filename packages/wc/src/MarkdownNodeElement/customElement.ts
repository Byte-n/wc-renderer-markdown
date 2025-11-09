import { unsafeStatic } from 'lit/static-html.js';
import { customElement as _customElement } from 'lit/decorators.js';
import { nodeComponents } from '@/markdown/nodeComponents';
import { config } from '@/config';

export function customElement (name: string) {
  nodeComponents[name] = unsafeStatic(`${config.componentPrefix}-${name}`);
  return <T extends Omit<typeof HTMLElement, 'new'>> (target: T) => {
    return _customElement(`${config.componentPrefix}-${name}`)(target);
  };
}


