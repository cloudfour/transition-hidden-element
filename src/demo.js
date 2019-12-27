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
  transitionedChildren: [...document.querySelectorAll('.js-staggered-fade-child')],
  elementHasTransition: false
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




const comboTransitioner = transitionHiddenElement({
  element: document.querySelector('.js-combo-wrapper'),
  visibleClass: 'is-shown',
  transitionedChildren: [...document.querySelectorAll('.js-combo-child')],
  elementHasTransition: true
});

document.querySelector('.js-show-combo').addEventListener('click', () => {
  comboTransitioner.show();
});

document.querySelector('.js-hide-combo').addEventListener('click', () => {
  comboTransitioner.hide();
});

document.querySelector('.js-toggle-combo').addEventListener('click', () => {
  comboTransitioner.toggle();
});

document.querySelector('.js-check-combo').addEventListener('click', () => {
  alert(`isVisible() = ${comboTransitioner.isVisible()}`);
});
