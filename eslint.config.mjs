import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import airBnbBase from '@3cx/eslint-config-airbnb';

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
            'max-len': 'off',
            'no-console': 'off',
            indent: [
                'error',
                4,
            ],
        },
    },
];
