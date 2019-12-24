const transitionHiddenElement = require('.');

test('Hidden attribute is removed when shown', () => {
  document.body.innerHTML = `
    <div class="test js-test" hidden>Hidden text</div>
  `;

  const testElement = document.querySelector('.js-test');

  const transitioner = transitionHiddenElement({
    element: testElement
  });

  transitioner.show();

  expect(testElement.getAttribute('hidden')).toBe(null);
});
