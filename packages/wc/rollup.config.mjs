import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';
import litcss from 'rollup-plugin-lit-css';
import alias from '@rollup/plugin-alias';
import path from 'node:path';

const dir = import.meta.dirname;
/** @type {import('rollup').RollupOptions[]} */
const config = [
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/index.js',
            format: 'esm',
            sourcemap: true,
        },
        plugins: [
            alias({
                entries: [
                    { find: '@', replacement: path.resolve(dir, 'src') },
                ],
            }),
            litcss({ cssnano: true, include: ['**/katex.min.css', '**/katex-swap.min.css', '**/*.lit.css'] }),
            resolve({ browser: true, preferBuiltins: false }),
            commonjs(),
            typescript({ tsconfig: path.resolve(dir, 'tsconfig.json') }),
            terser(),
        ],
    },
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/index.d.ts',
            format: 'es',
        },
        plugins: [
            alias({
                entries: [
                    { find: '@', replacement: path.resolve(dir, 'src') },
                ],
            }),
            dts(),
            litcss({ cssnano: true }),
        ],
    },
];

export default config;


