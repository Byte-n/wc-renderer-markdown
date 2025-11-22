import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';
import litcss from 'rollup-plugin-lit-css';
import alias from '@rollup/plugin-alias';
import path from 'node:path';

// 新增/确保存在
import postcss from 'postcss';
import postcssNesting from 'postcss-nesting';
// import { createFilter } from '@rollup/pluginutils';

const processor = postcss(postcssNesting());
const dir = import.meta.dirname;

// 自定义插件：将除 KaTeX 与 *.lit.css 之外的 CSS 置空
// function emptyOtherCss () {
//     const filter = createFilter(
//         ['**/*.css'],
//         ['**/katex.min.css', '**/katex-swap.min.css', '**/*.lit.css'],
//     );
//     return {
//         name: 'empty-non-lit-katex-css',
//         enforce: 'pre',
//         transform (code, id) {
//             if (!filter(id)) return null;
//             return { code: '', map: { mappings: '' } };
//         },
//     };
// }

/** @type {import('rollup').RollupOptions[]} */
const config = [
    {
        input: 'src/index.ts',
        output: {
            dir: 'dist',
            format: 'esm',
            sourcemap: true,
        },
        external: [/^lit[/\w]*/],
        plugins: [
            alias({
                entries: [{ find: '@', replacement: path.resolve(dir, 'src') }],
            }),
            // emptyOtherCss(),
            litcss({
                cssnano: true,
                include: ['**/katex.min.css', '**/katex-swap.min.css', '**/*.lit.css'],
                transform: (css, { filePath }) =>
                    processor.process(css, { from: filePath }).css,
            }),
            resolve({ browser: true, preferBuiltins: false }),
            commonjs(),
            typescript({ tsconfig: path.resolve(dir, 'tsconfig.json') }),
            terser(),
        ],
    },
    {
        input: 'src/index.ts',
        output: { file: 'dist/index.d.ts', format: 'es' },
        plugins: [
            alias({
                entries: [{ find: '@', replacement: path.resolve(dir, 'src') }],
            }),
            dts(),
            litcss({ cssnano: true }),
        ],
    },
];

export default config;
