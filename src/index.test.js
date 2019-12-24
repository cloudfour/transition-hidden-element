const transitionHiddenElement = require('.');

/**
 * We test the methods exposted by `transitionHiddenElement`
 *
 * Unfortunately we can't accurately test whether transitions are running
 * Jest relies on jsdom for dom manipulation, which does not support transitions
 * @see https://github.com/jsdom/jsdom/issues/1781
 */

test('Hidden attribute is removed when shown', () => {
  document.body.innerHTML = `<div class="js-test" hidden>Hidden text</div>`;

  const testElement = document.querySelector('.js-test');

  const transitioner = transitionHiddenElement({
    element: testElement,
    visibleClass: 'is-open'
  });

  transitioner.show();

  expect(testElement.getAttribute('hidden')).toBe(null);
});


test('Hidden attribute is added when hidden', () => {
  document.body.innerHTML = `<div class="js-test">Visible text</div>`;

  const testElement = document.querySelector('.js-test');

  const transitioner = transitionHiddenElement({
    element: testElement,
    visibleClass: 'is-open'
  });

  transitioner.hide();

  expect(testElement.getAttribute('hidden')).toBe('');
});
