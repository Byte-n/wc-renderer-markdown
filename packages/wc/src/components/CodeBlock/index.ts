import { html } from 'lit/static-html.js';
import { customElement } from '@/MarkdownNodeElement/customElement';
import styles from '@/components/CodeBlock/index.lit.css';
import { CodeBlockNode } from 'stream-markdown-parser';
import { state } from 'lit/decorators.js';
import {
  BundledLanguage, BundledTheme, bundledThemes, bundledThemesInfo, getSingletonHighlighter, HighlighterGeneric,
} from 'shiki';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { styleMap } from 'lit/directives/style-map.js';
import MarkdownNodeElement from 'src/MarkdownNodeElement';

@customElement('code_block')
export default class extends MarkdownNodeElement<CodeBlockNode> {
  static styles = styles;

  @state()
  curTheme: string = 'dracula-soft';
  singleton: HighlighterGeneric<BundledLanguage, BundledTheme>;

  get language () {
    const [language] = this.node.language.split(':');
    return language;
  }

  get fileName () {
    const [, fileName] = this.node.language.split(':');
    return fileName;
  }

  get codeHTML () {
    if (!this.singleton || !this.node) {
      return null;
    }
    return this.singleton.codeToHtml(
      this.node.code, { lang: this.language, theme: this.curTheme },
    );
  }

  get sty () {
    if (!this.singleton || !this.node) {
      return { boxStyle: {}, headerStyle: {}, selectStyle: {}, optionStyle: {} };
    }
    const theme = this.singleton.getTheme(this.curTheme);
    const boxStyle = {
      background: theme.bg,
      borderColor: theme.fg,
      color: theme.fg,
    };
    const headerStyle = { borderColor: theme['input.border'] };
    const selectStyle = {
      background: theme.bg,
      color: theme.fg,
      borderColor: theme['input.border'],
    };
    const optionStyle = {
      background: theme.bg,
      color: theme.fg,
    };
    return {
      boxStyle, headerStyle, selectStyle, optionStyle,
    };
  }

  async connectedCallback () {
    super.connectedCallback();
    const [language] = this.node.language.split(':');
    // this.codeHTML = await (codeToHtml(this.node.code, {
    //   lang: language,
    //   theme: 'min-light',
    //   transformers: [
    //     // {
    //     //   line (node, lineNumber) {
    //     //     node.children = [
    //     //       {
    //     //         type: 'element',
    //     //         tagName: 'span',
    //     //         properties: { className: ['line-number'] },
    //     //         children: [{ type: 'text', value: String(lineNumber) }],
    //     //       },
    //     //       ...(node.children || []),
    //     //     ];
    //     //   },
    //     //   pre (preNode) {
    //     //     preNode.properties = preNode.properties || {};
    //     //     const cls = preNode.properties.class || preNode.properties.className || [];
    //     //     preNode.properties.class = [...cls, 'has-line-numbers'];
    //     //   },
    //     // },
    //   ],
    // }) as Promise<string>);
    this.singleton = await getSingletonHighlighter({
      themes: Object.keys(bundledThemes),
      langs: [language],
    });
    this.requestUpdate();
  }

  render () {
    const { boxStyle, headerStyle } = this.sty;
    return html`
        <div class="box" style="${styleMap(boxStyle)}">
            <div class="header" style="${styleMap(headerStyle)}">
                <span>${this.language}</span>
                ${
      !this.fileName ? null
        : html`
                                    <span>:</span>
                                    <span>${this.fileName}</span>
                                `
    }
                ${this.renderThemeOptions()}
            </div>
            ${unsafeHTML(this.codeHTML)}
        </div>
    `;
  }

  renderThemeOptions () {
    const themes = Object.keys(bundledThemes);
    const { selectStyle, optionStyle } = this.sty;
    return html`
        <div class="theme">
            <select class="theme-select" style="${styleMap(selectStyle)}" @change=${this.onSelectThemeOption}>
                ${
      themes.map((value, idx) =>
        html`
                                    <option
                                            style="${styleMap(optionStyle)}" value="${value}"
                                            ?selected=${this.curTheme === value}
                                    >
                                        ${bundledThemesInfo[idx].displayName} 
                                    </option>
                                `,
      )
    }
            </select>
        </div>
    `;
  }

  onSelectThemeOption = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    this.curTheme = target.value;
  };
}


