import { transitionHiddenElement } from '../src/index';

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

document
  .querySelector('.js-toggle-simple-fade')
  .addEventListener('click', () => {
    simpleFader.toggle();
  });



const fadeIn = transitionHiddenElement({
  element: document.querySelector('.js-fade-in'),
  visibleClass: 'is-shown',
  waitMode: 'immediate'
});

document.querySelector('.js-show-fade-in').addEventListener('click', () => {
  fadeIn.show();
});

document.querySelector('.js-hide-fade-in').addEventListener('click', () => {
  fadeIn.hide();
});

document.querySelector('.js-toggle-fade-in').addEventListener('click', () => {
  fadeIn.toggle();
});



const fadeOutTimeout = transitionHiddenElement({
  element: document.querySelector('.js-fade-out-timeout'),
  visibleClass: 'is-shown',
  waitMode: 'timeout',
  timeoutDuration: 300
});

document
  .querySelector('.js-show-fade-out-timeout')
  .addEventListener('click', () => {
    fadeOutTimeout.show();
  });

document
  .querySelector('.js-hide-fade-out-timeout')
  .addEventListener('click', () => {
    fadeOutTimeout.hide();
  });

document
  .querySelector('.js-toggle-fade-out-timeout')
  .addEventListener('click', () => {
    fadeOutTimeout.toggle();
  });



const fadeInOutDisplay = transitionHiddenElement({
  element: document.querySelector('.js-fade-in-out-display'),
  visibleClass: 'is-shown',
  hideMode: 'display',
  displayValue: 'block'
});

document
  .querySelector('.js-show-fade-in-out-display')
  .addEventListener('click', () => {
    fadeInOutDisplay.show();
  });

document
  .querySelector('.js-hide-fade-in-out-display')
  .addEventListener('click', () => {
    fadeInOutDisplay.hide();
  });

document
  .querySelector('.js-toggle-fade-in-out-display')
  .addEventListener('click', () => {
    fadeInOutDisplay.toggle();
  });
