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



const staggeredFader = transitionHiddenElement({
  element: document.querySelector('.js-staggered-fade-wrapper'),
  visibleClass: 'is-shown',
  transitionedChildren: [...document.querySelectorAll('.js-staggered-fade-child')]
});

document.querySelector('.js-show-staggered-fade').addEventListener('click', () => {
  staggeredFader.show();
});

document.querySelector('.js-hide-staggered-fade').addEventListener('click', () => {
  staggeredFader.hide();
});

document.querySelector('.js-toggle-staggered-fade').addEventListener('click', () => {
  staggeredFader.toggle();
});

document.querySelector('.js-check-staggered-fade').addEventListener('click', () => {
  alert(`isVisible() = ${staggeredFader.isVisible()}`);
});
