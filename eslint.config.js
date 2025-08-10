import eslintConfigPrettier from 'eslint-config-prettier'
import * as importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import pluginReact from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  {
    ignores: ['dist', '.eslintrc.cjs', 'vite.config.*', 'node_modules/**'],
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
    },
    plugins: {
      'react': pluginReact,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'prettier': prettierPlugin,
      'simple-import-sort': simpleImportSort,
      'import': importPlugin,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'quotes': ['error', 'single'],
      'simple-import-sort/exports': 'warn',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react$', '^react-dom$'], // React и ReactDOM
            ['^\\u0000'], // Импорты с побочными эффектами
            ['^@?\\w'], // Пакеты из node_modules
            ['^@/'], // Абсолютные импорты из src
            ['^\\./.(?!.*\\.css$)', '^\\./?$'], // Относительные импорты из текущей папки (кроме CSS)
            ['^\\.\\./.(?!.*\\.css$)', '^\\.\\./?$'], // Относительные импорты из родительской папки (кроме CSS)
            ['^(?!\\u0000).+\\.css$'], // CSS файлы
            ['^'], // Остальные импорты
          ],
        },
      ],
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/default': 'error',
      'import/namespace': 'error',
      'import/no-duplicates': 'error',
    },
    settings: {
      'react': {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['./tsconfig.backend.json'],
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
        },
      },
    },
  },
  // Включаем рекомендуемые конфиги typescript-eslint и eslint-plugin-import
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
]
