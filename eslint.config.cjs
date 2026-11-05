const nextCoreWebVitals = require('eslint-config-next/core-web-vitals')
const nextTypeScript = require('eslint-config-next/typescript')
const prettier = require('eslint-config-prettier')
const jsxA11yStrictRules = require('eslint-plugin-jsx-a11y').configs.strict
  .rules
const reactHooksPlugin = nextCoreWebVitals[0].plugins['react-hooks']
const reactHooksRules = Object.fromEntries(
  Object.keys(reactHooksPlugin.rules).map((rule) => [
    `react-hooks/${rule}`,
    ['rules-of-hooks', 'exhaustive-deps'].includes(rule) ? 'error' : 'off',
  ])
)

module.exports = [
  {
    ignores: [
      'node_modules/**',
      'cypress/**/*',
      '**/*.cjs',
      'eslint.config.cjs',
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    files: ['**/*.{js,jsx,mjs,ts,tsx,mts,cts}'],
    rules: jsxA11yStrictRules,
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
  {
    files: ['**/*.{js,jsx,mjs,ts,tsx,mts,cts}'],
    languageOptions: {
      globals: {
        React: 'readonly',
        NodeJS: 'readonly',
        JSX: 'readonly',
        jest: 'readonly',
      },
    },
    rules: {
      'react/no-unescaped-entities': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-undef': 'warn',
      'no-redeclare': 'warn',
      '@typescript-eslint/no-require-imports': 'off',
      'react/prop-types': 'off',
      'react/jsx-no-undef': 'warn',
      'react/display-name': 'warn',
      'jsx-a11y/label-has-associated-control': 'warn',
      'react/jsx-no-target-blank': 'warn',
      'no-unreachable': 'warn',
      'react-hooks/exhaustive-deps': 'error',
      ...reactHooksRules,
      'no-irregular-whitespace': 'off',
    },
  },
  prettier,
]
