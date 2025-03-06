import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  js.configs.recommended,
  ...compat.config({
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
    ],
  }),
  {
    ignores: ['dist/**', 'build/**'],
  },
  {
    // Configurar las extensiones aquí
    files: ['**/*.{ts,tsx,js,jsx}'],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      'no-console': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/no-namespace': 'off',
      'max-warnings': 0 // Añadido para reemplazar el flag --max-warnings
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },
  {
    files: ['ecosystem.config.js'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },
  {
    files: ['cypress/**/*.ts'],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/no-namespace': 'off'
    }
  },
  {
    files: ['src/server/**/*.{ts,tsx,js,jsx}'],
    rules: {
      'no-console': 'off', // Permitir console.log en archivos del servidor
    },
  },
  {
    files: ['cypress/**/*.ts', 'cypress.config.ts'],
    rules: {
      'no-console': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/no-namespace': 'off'
    }
  },
  {
    files: ['src/components/Hero.tsx'],
    rules: {
      'react-hooks/exhaustive-deps': ['warn', {
        additionalHooks: '(useEffect|useCallback|useMemo)',
      }],
    },
  },
  {
    files: ['src/setupTests.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['src/utils/logger.ts'],
    rules: {
      'no-console': 'off'
    }
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': ['warn', {
        ignoreRestArgs: true
      }]
    }
  }
];
