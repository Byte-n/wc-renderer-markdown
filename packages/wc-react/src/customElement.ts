import { BaseNode, HtmlNodeElement } from 'wc-renderer-markdown';
import React from 'react';
import use, { HtmlNodeProps, NodeProps } from '@/use';


export default function customElement<
  Type extends 'node' | 'htmlNode',
  Node extends BaseNode = any
> (
  type: Type,
  nodeType: string,
  elementName?: string,
  styles?: typeof HtmlNodeElement.styles
) {
  return <
    T extends React.ComponentType<
      Type extends 'node' ? NodeProps<Node> : HtmlNodeProps
    >
  > (target: T) => {
    use(type, nodeType, target, elementName, styles);
  };
}
