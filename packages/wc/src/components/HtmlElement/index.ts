import { html as staticHtml } from 'lit/static-html.js';
import NodeElement, { renderComponents } from '@/node/NodeElement';
import type { HtmlElementNode, TextNode } from 'stream-markdown-parser';

import HtmlNodeElement from '@/node/HtmlNodeElement';
import { customElement } from '@/node/customElement';

@customElement('html_element')
export default class HtmlElement extends NodeElement<HtmlElementNode> {
  render () {
    const { tag, attrs, children, raw, openTag, closeTag } = this.node;

    const customComponent = HtmlNodeElement.components[tag];

    if (customComponent) {
      const list = children ? renderComponents(children) : '';
      return staticHtml`<${customComponent} .props="${attrs || {}}">${list}</${customComponent}>`;
    }

    if (!children) {
      return null;
    }
    const newChildren = [openTag, ...children];
    if (closeTag) {
      newChildren.push(closeTag);
    }
    return renderComponents(newChildren);
  }
}

