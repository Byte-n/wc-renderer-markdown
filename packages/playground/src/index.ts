import 'wc';
import { streamContent } from './markdown';

// Playground 入口文件
console.log('Playground loaded!');

let htmlElement = document.createElement('wc-markdown');

document.querySelector('.card-content').appendChild(htmlElement);

// 主题切换功能
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeText = document.getElementById('themeText');

// 从 localStorage 读取主题偏好
const savedTheme = localStorage.getItem('theme') || 'dark';
const isDark = savedTheme === 'dark';

// 更新按钮状态
function updateThemeButton(isDarkMode: boolean) {
  if (themeIcon) {
    themeIcon.textContent = isDarkMode ? '☀️' : '🌙';
  }
  if (themeText) {
    themeText.textContent = isDarkMode ? '亮色' : '暗色';
  }
}

// 应用主题
function applyTheme(isDarkMode: boolean) {
  if (isDarkMode) {
    document.body.classList.add('dark');
    htmlElement.setAttribute('dark', '');
  } else {
    document.body.classList.remove('dark');
    htmlElement.removeAttribute('dark');
  }
  updateThemeButton(isDarkMode);
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// 初始化主题
function initTheme() {
  applyTheme(isDark);
}

// 切换主题
function toggleTheme() {
  const isCurrentlyDark = document.body.classList.contains('dark');
  applyTheme(!isCurrentlyDark);
}

// 初始化主题
initTheme();

// 绑定点击事件
if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

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

// @ts-ignore
htmlElement.content = streamContent
