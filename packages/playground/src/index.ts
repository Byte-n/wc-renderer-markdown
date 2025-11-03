import 'wc';
import { streamContent } from './markdown';

// Playground 入口文件
console.log('Playground loaded!');

let htmlElement = document.createElement('wc-markdown');


document.body.appendChild(htmlElement);

// const go = () => {
//   htmlElement.content = `
// ${i++}
//
//
// >>>I'll create a simple Electron + Vue chat application demo. Here's the structure:
//
// [Star on GitHub](https://github.com/Simon-He95/vue-markdown-render)
//
// [【Author: Simon】](https://simonhe.me/)
// a
//
// ${i % 2=== 0 ? '<thinking>这是一段自定义解析处理的thinking组件</thinking>':''}
// `;
// };
// let i = 1;
// go();
// setInterval(go, 1000);

htmlElement.content = streamContent
