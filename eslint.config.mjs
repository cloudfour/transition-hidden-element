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
