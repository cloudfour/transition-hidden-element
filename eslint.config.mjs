import cloudFourConfig from '@cloudfour/eslint-config';
import pluginCypress from 'eslint-plugin-cypress';
import pluginJest from 'eslint-plugin-jest';

const config = [
  {
    ignores: ['dist/**/*'],
  },
  ...cloudFourConfig,
  pluginCypress.configs.recommended,
  {
    rules: {
      'unicorn/expiring-todo-comments': 'off',
    },
  },
  {
    files: ['package.json'],
    rules: {
      // Switching to `exports` or `"type": "module"` would change what this
      // package exposes to existing consumers, so both belong in a deliberate
      // major release rather than in lint cleanup.
      'package-json/prefer-exports': 'off',
      'package-json/prefer-type-module': 'off',
      // This is a browser library. It never runs in Node, so there is no
      // meaningful Node version to declare.
      'package-json/require-engines': 'off',
    },
  },
  {
    files: ['demo/**/*.html'],
    rules: {
      // The demo page is served locally by `npm start` and is never linked to
      // from anywhere, so there is nothing for Open Graph tags to describe.
      '@html-eslint/require-open-graph-protocol': 'off',
    },
  },
  {
    files: ['**/*.cy.js'],
    ...pluginJest.configs['flat/recommended'],
    rules: {
      ...pluginJest.configs['flat/recommended'].rules,
      'jest/expect-expect': 'off', // This doesn't apply to Cypress tests.
      // This rule is probably a good idea, but I don't want to refactor right now.
      'cypress/no-unnecessary-waiting': 'off',
    },
    settings: {
      jest: {
        version: 27,
      },
    },
  },
];

export default config;
