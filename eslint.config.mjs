// @ts-check

import eslint from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: [
            '**/dist/**'
        ]
    },
    eslint.configs.recommended,
    tseslint.configs.recommended,
    prettierConfig,
    {
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                tsconfigRootDir: import.meta.dirname,
                ecmaVersion: 'latest',
            },
            sourceType: 'module',
        },
    }
);
