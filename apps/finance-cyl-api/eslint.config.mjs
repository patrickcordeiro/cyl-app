import parser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';

import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  {
    ignores: ['dist', 'node_modules', '**/out-tsc', 'eslint.config.mjs'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser,
    },
    plugins: {
      prettier,
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'no-debugger': 'error',
      eqeqeq: ['error', 'always'],
      curly: 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/triple-slash-reference': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      'prettier/prettier': 'error',
      'no-multiple-empty-lines': ['warn', { max: 1 }],
      'sort-imports': [
        'warn',
        {
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
        },
      ],
      'no-process-exit': 'error',
      'no-unsafe-finally': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-async-promise-executor': 'error',
      'no-return-await': 'error',
    },
  },
];
