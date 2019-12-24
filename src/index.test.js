const transitionHiddenElement = require('.');

test('validates our testing setup', () => {
  expect(transitionHiddenElement()).toBe('test value');
});
