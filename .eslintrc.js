module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint/eslint-plugin',
    ],
    extends: [
        '@umijs/lint/dist/config/eslint',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: { 'linebreak-style': 'off' },
    overrides: [{
        files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
        rules: {
            'newline-per-chained-call': ['error', { ignoreChainWithDepth: 3 }],
            'operator-linebreak': 0,
            '@typescript-eslint/ban-ts-comment': 1,
            'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
            'react/no-unused-state': 'error',
            'react/require-render-return': 'error',
            'react/jsx-no-duplicate-props': 'error',
            'no-cond-assign': 'error',
            'eol-last': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    varsIgnorePattern: '^_',
                    argsIgnorePattern: '^_',
                },
            ],
            'prefer-destructuring': ['error', {
                object: true,
                array: false,
            }],
            '@typescript-eslint/no-empty-interface': 'error',
            '@typescript-eslint/camelcase': 'off',
            // 禁止在定义对象时将对象的key用引号包起来
            'quote-props': ['error', 'as-needed', { numbers: true }],
            // 禁止{some:some}
            'object-shorthand': ['error'],
            // 禁止new Object()
            'no-new-object': ['error'],
            // 禁止用var
            'no-var': ['error'],
            // 禁止用 new Array()
            'no-array-constructor': ['error'],
            // 推荐用单引号
            quotes: [1, 'single'],
            // 尽量使用模板字符串
            'prefer-template': [1],
            // 模板字符串空格
            'template-curly-spacing': [1],
            // 字符串内禁止出现非法转义字符
            'no-useless-escape': ['error'],
            // 推荐使用function foo(){} 不推荐使用const foo=function(){}
            'func-style': [1, 'declaration', { allowArrowFunctions: true }],
            // 立即执行表达式必须用圆括号包裹
            'wrap-iife': ['error'],
            // 禁止使用new Function
            'no-new-func': ['error'],
            // 禁止有多个相同module的import
            'no-duplicate-imports': ['error'],
            // 禁止从一个module中导入多次
            'import/no-mutable-exports': [1],
            // 在回调函数中使用箭头函数
            'prefer-arrow-callback': ['error'],
            // 箭头函数没有括号的情况下禁止出现>= 和<=
            'no-confusing-arrow': ['error'],
            // 禁止在同一个对象中出现相同的key
            'no-dupe-class-members': ['error'],
            // 禁止不必要的三目表达式 如a?true:false
            'no-unneeded-ternary': [1],
            // 在一行中写复杂表达式时要用括号包起来表名执行顺序
            // 在一行中写复杂表达式时要用括号包起来表名执行顺序
            'no-mixed-operators': ['error'],
            // 禁止if在不写大括号时换行写内容
            'nonblock-statement-body-position': ['error'],
            // 在if中return后不要写else
            'no-else-return': ['error'],
            // 链式调用每行一个
            'id-length': ['error',
                { exceptions: ['x', 'y', 'i', 'j', 'e', 'p', 'n', 'v', '_', 'a', 'b', 'r', 'k', 'g', 'N', 'w', 'h'] }],
            'function-paren-newline': 'off',
            // 在块作用域内上下禁止留空行
            'no-multiple-empty-lines': [1],
            // 禁止直接修改state
            'react/no-direct-mutation-state': ['error'],
            // 写列表必须要写key
            'react/jsx-key': ['error'],
            'react/jsx-max-props-per-line': [
                'error', {
                    maximum: 9,
                    when: 'always',
                },
            ],
            'arrow-spacing': ['error', {
                before: true,
                after: true,
            }],
            indent: ['error', 2, {
                SwitchCase: 1,
                ignoredNodes: ['JSXAttribute'],
            }],
            '@netsells/require-jsdoc-except/require-jsdoc': [
                'error', {
                    require: {
                        FunctionDeclaration: true,
                        MethodDefinition: true,
                        ClassDeclaration: true,
                        ArrowFunctionExpression: true,
                        FunctionExpression: true,
                    },
                    ignore: [
                        'clone',
                        'toString',
                        'componentDidUpdate',
                        'constructor',
                        'componentWillMount',
                        'componentDidMount',
                        'componentWillReceiveProps',
                        'shouldComponentUpdate',
                        'componentWillUpdate',
                        'componentWillUnmount',
                        'componentDidUpdate',
                        'componentWillPreload',
                        'componentDidShow',
                        'componentDidHide',
                        'componentDidCatchError',
                        'componentDidNotFound',
                        'onPullDownRefresh',
                        'onReachBottom',
                        'onPageScroll',
                        'onShareAppMessage',
                        'onTabItemTap',
                        'onResize',
                        '/.+Reducer/',
                        '/render.*/',
                        '/^_.*/',
                        'injected',
                        'UNSAFE_componentWillReceiveProps',
                    ],
                },
            ],
            'max-statements': ['error', 100],
            semi: [2, 'always'],
            // 强制在块之前使用一致的空格
            'space-before-blocks': [2, 'always'],
            // 强制在 function的左括号之前使用一致的空格
            'space-before-function-paren': [2, 'always'],
            // 强制在圆括号内使用一致的空格
            'space-in-parens': [2, 'never'],
            // 要求操作符周围有空格
            'space-infix-ops': 2,
            // 要求逗号后面必须加上空格
            'comma-spacing': [2, {
                before: false,
                after: true,
            }],
            // 要求使用3个等于号
            eqeqeq: 1,
            'object-curly-spacing': ['error', 'always'],
            // 要求多行数组/对象最后一个元素后面需要加上逗号 防止在下次修改添加元素时污染上一行的git log
            'comma-dangle': [
                'error', {
                    arrays: 'always-multiline',
                    objects: 'always-multiline',
                    imports: 'ignore',
                    exports: 'ignore',
                    functions: 'ignore',
                },
            ],
            // 禁止object对象出现换行，或者换行后仅允许一行存在
            'object-curly-newline': [
                'error', {
                    ObjectExpression: { multiline: true },
                    ObjectPattern: { multiline: true },
                    ExportDeclaration: {
                        multiline: true,
                        minProperties: 10,
                    },
                },
            ],
        },
        globals: {},
    }],
    settings: { react: { version: '18.2.' } },
};
