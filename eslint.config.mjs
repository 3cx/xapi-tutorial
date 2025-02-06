import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import airBnbBase from './eslint-airbnb.config.js';

export default [
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        languageOptions: { globals: globals.browser },
    },
    {
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        ...airBnbBase,
    },
    {
        rules: {
            'no-console': 'off',
            indent: [
                'error',
                4,
            ],
        },
    },
];
