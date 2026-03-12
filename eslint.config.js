import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default [
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      // Базовые правила JS
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

      'no-undef': 'off',

      'no-console': 'error',
  
      // Отключаем проверку используемых, но не объявленных переменных
      'no-unused-vars': 'off',
  
      // Если ругается на хуки
      'react-hooks/rules-of-hooks': 'off',
      'react-hooks/exhaustive-deps': 'off',
  
      // Если ругается на пропсы
      'react/prop-types': 'off',
  
      // Если ругается на missing in props validation
      'react/no-unescaped-entities': 'off',

      // ТВОИ НУЖНЫЕ ПРАВИЛА (именно они будут ругаться на JSON-стиль)
      quotes: ['error', 'single', { avoidEscape: true }], // одинарные кавычки
      'quote-props': ['error', 'as-needed'], // ключи объектов без кавычек
      'comma-dangle': ['error', 'never'], // никаких висячих запятых
      semi: ['error', 'always'], // точки с запятой обязательны
      indent: ['error', 2], // отступы 2 пробела
      'jsx-quotes': ['error', 'prefer-double'], // в JSX двойные кавычки

      // Стандартные отключения
      'react/jsx-no-target-blank': 'warn',
      'react-hooks/set-state-in-effect': 'off',
      'react/display-name': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ]
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
];