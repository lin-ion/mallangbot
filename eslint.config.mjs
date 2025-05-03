// @ts-check

import eslint from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config(eslint.configs.recommended, tseslint.configs.recommended, {
    plugins: { prettier },
    rules: {
        'prettier/prettier': 'error',
    },
});
