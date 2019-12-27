import { transitionHiddenElement } from '.';

const simpleFader = transitionHiddenElement({
  element: document.querySelector('.js-simple-fade'),
  visibleClass: 'is-shown'
});

document.querySelector('.js-show-simple-fade').addEventListener('click', () => {
  simpleFader.show();
});

document.querySelector('.js-hide-simple-fade').addEventListener('click', () => {
  simpleFader.hide();
});

document.querySelector('.js-toggle-simple-fade').addEventListener('click', () => {
  simpleFader.toggle();
});

document.querySelector('.js-check-simple-fade').addEventListener('click', () => {
  alert(`isVisible() = ${simpleFader.isVisible()}`);
});
