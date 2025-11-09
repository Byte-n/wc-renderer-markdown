import katex from 'katex';
// @ts-ignore
import base from 'katex/dist/katex.min.css';
// @ts-ignore
import swap from 'katex/dist/katex-swap.min.css';

export const parseMathString2HTML = (string: string, displayMode: boolean) => {
  return katex.renderToString(string, {
    throwOnError: false,
    displayMode,
  });
};

export const mathStyles = [base, swap];
