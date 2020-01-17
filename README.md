# Transition Hidden Element

A JavaScript utility to help you use CSS transitions when showing and hiding elements with the `hidden` attribute or `display: none;`.

## Demos

1. [An example](https://codepen.io/phebert/pen/yLybwWY) showing this library in action.
2. [A more complex example](https://codepen.io/phebert/pen/QWwONMy) showing using this library with staggered child transitions and toggling.

## Why was this created?

To [properly hide elements from all users including screen reader users](https://cloudfour.com/thinks/see-no-evil-hidden-content-and-accessibility/), elements should be hidden using the `hidden` attribute or `display: none;`. However, this prevents elements from being transitioned with CSS. If you'd like to use CSS transitions to show and hide these elements you'll need to use JavaScript to do so. This utility wraps that JavaScript into a small, easy-to-use module. 

I also [wrote a blog post](https://cloudfour.com/thinks/transitioning-hidden-elements/) going into more detail about why this was created and how it works.

## How it Works

### Showing Elements

To allow transitions when showing an element the utility performs a few steps:

1. Remove the `hidden` attribute (or `display: none;`).
2. Trigger a browser reflow.
3. Apply a class to trigger the transition(s).

### Hiding Elements

To allow transitions when hiding an element the utility performs a few steps:

1. Remove a class to trigger the transition(s). 
2. Wait for the transition to complete, or wait for a timeout to complete. (Depending on initialization settings.)
3. Add the `hidden` attribute (or `display: none;`).

### Animated Children

This library can be used to show or hide an element with transitioned children. For example, when opening a menu, each child link may animate in one-by-one in a staggered fashion. This utility includes API options to support this use case.

### Prefers Reduced Motion

Animation can cause health consequences for some users and they may [prefer reduced motion](https://developers.google.com/web/updates/2019/03/prefers-reduced-motion). If a user's OS settings signal they prefer reduced motion you should disable your CSS transitions:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
  }
}
```

## Getting Started

First, install the package from npm: 

```
npm i @cloudfour/transition-hidden-element --save
```

Then you can get started. Here's a simple example showing importing the module, initializing a menu, and then showing and hiding it based on user interaction:

```js
// Import our dependency
import { transitionHiddenElement } from '@cloudfour/transition-hidden-element';

// Initialize our menu
const menuTransitioner = transitionHiddenElement({
  element: document.querySelector('#menu'),
  visibleClass: 'is-open',
});

document.querySelector('#open-menu-button').addEventListener('click', () => {
  menuTransitioner.show();
});

document.querySelector('#close-menu-button').addEventListener('click', () => {
  menuTransitioner.close();
});
```

## Initialization Options

When initializing `transitionHiddenElement`, there are two required parameters and four optional parameters:

```js
const simpleFader = transitionHiddenElement({
  element: document.querySelector('.js-simple-fade'), // Required
  visibleClass: 'is-shown', // Required
  waitMode: 'transitionend', // Optional — defaults to `'transitionend'`
  timeoutDuration: null // Optional — defaults to `null`
  hideMode: 'hidden', // Optional — defaults to `'hidden'`
  displayValue: null // Optional — defaults to `'block'`
});
```

### element `{HTMLElement}`

`element` should be the primary element we're showing and hiding. It will be the element that we'll be adding and removing classes and the `hidden` attribute (or `display: none;`) from.

### visibleClass `{String}`

`visibleClass` is the class that will be added when showing our `element`. Adding the class should trigger a transition on our `element` or its child elements.

### waitMode `{String}`

`waitMode` determines when the utility should re-apply the `hidden` attribute (or `display: none;`) when hiding. It defaults to `transitionend` but has a few options:

1. `transitionend` — Wait for the `element`'s `transitionend` event to fire. This works if the element has a transition that will be triggered by removing the `visibleClass`.
2. `timeout` — Wait a certain number of milliseconds. This is useful when your `element` is not the only element transitioning. For example, if removing your `visibleClass` triggers transitions on child elements, then you should use this option. When using this option be sure to pass in a number for the `timeoutDuration` parameter.
3. `immediate` — Don't wait at all. 

Regardless of which setting you choose, it will be converted to `immediate` if a user's OS settings signal they prefer reduced motion. You should disable other transitions in your CSS for these users as mentioned above.

### timeoutDuration `{Number}`

When using the `timeout` option for `waitMode` you should be sure to pass in the length of the timeout in milliseconds.

### hideMode `{String}`

`hideMode` determines whether elements are hidden by applying the `hidden` attribute, or using CSS's `display: none;`. It has two options:

1. `hidden` — use the `hidden` attribute (this is the default)
1. `display` — use CSS's `display: none;`

### displayValue `{String}`

When using the `display` option for `hideMode`, this option determines what `display` should be set to when showing elements. e.g. `block`, `inline`, `inline-block`, etc.

## Object Methods

After initializing your `transitionHiddenElement` it will return an object with a few methods.

### show()

Shows your `element`. Removes `hidden`  (or `display: none;`), triggers a document reflow, and applies your `visibleClass`.

### hide()

Hides your `element`. Removes your `visibleClass` and adds `hidden` (or `display: none;`).

### toggle()

Toggles the visibility of your `element`. Shows it if it's hidden and hides it if it's visible.

### isHidden()

Returns the current hidden status of your `element`. It returns `true` if the element has the `hidden` attribute, is `display: none;` or is missing the `visibleClass`.

## Development

Feel free to fork the repo and submit a PR with any helpful additions or changes. After cloning the repository run the following commands:

1. `npm i` — Install dependencies
2. `npm start` - Build and serve a demo server with hot reloading.
3. View the demo server at `localhost:3000`

### Testing

Testing is done in the browser using Cypress, since [virtual DOM libraries like jsdom don't handle transitions well](https://github.com/jsdom/jsdom/issues/1781).

In order to run the tests do the following:

1. `npm start` — launch the server
2. `npm test` — launch Cypress

Tests will also automatically be run when pull requests are created.
