import { createContext } from '@lit/context';
import MarkdownElement from '@/markdown/index';

export const markdownRootContext = createContext<MarkdownElement>('markdownRootNodeContext');
