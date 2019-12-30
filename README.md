# Transition Hidden Element

A JavaScript utility to help you use CSS transitions when showing and hiding elements with the `hidden` attribute.

## Why was this created?

To [properly hide elements from all users including screen reader users](https://cloudfour.com/thinks/see-no-evil-hidden-content-and-accessibility/), elements should be hidden using the `hidden` attribute. However, this prevent elements from being transitioned. If you'd like to transition these elements you'll need  to use JavaScript to do so. This utility wraps that JavaScript into a small, easy-to-use module. 

## How it Works

### Showing Elements

To allow transitions when showing an element the utility performs a few steps:

1. Remove the `hidden` attribute.
2. Trigger a browser reflow.
3. Apply a class to trigger the transition(s).

### Hiding Elements

To allow transitions when hiding an element the utility performs a few steps:

1. Remove a class to trigger the transition(s). 
2. Wait for the transition to complete, or wait for a timeout to complete. (Depending on initialization settings)
3. Add the `hidden` attribute.

### Animated Children

This library can be used to show or hide an element with transitioned children. For example, when opening a menu, each child link may animate in one-by-one in a staggered fashion. This utility includes API options to support this use case.

## Installation

TODO: Publish to npm and include installation and import steps

This utility exposes a factory function with a few configuration options. 

## Initialization Options

When initializing `transitionHiddenElement`, there are two required parameters and two optional parameters:

```js
const simpleFader = transitionHiddenElement({
  element: document.querySelector('.js-simple-fade'), // Required
  visibleClass: 'is-shown', // Required
  hideMode: // Optional — defaults to `'transitionend'`,
  timeoutDuration: // Optional — defaults to `null`,
});
```

### element `{HTMLElement}`

`element` should be the primary element we're showing and hiding. It will be the element that we'll be adding and removing classes and the `hidden` attribute from.

### visibleClass `{String}`

`visibleClass` is the class that will be added when showing our `element`. Adding the class should trigger a transition on our `element` or its child elements.

### hideMode `{String}`

`hideMode` determines when the utility should re-apply the `hidden` attribute. It defaults to `transitionend` but has a few options:

1. `transitionend` — Wait for the `element`'s `transitionend` event to fire. This o works if the element has a transition that will be triggered by removing the `visibleClass`.
2. `timeout` — Wait a certain number of milliseconds. This is useful when your `element` is not the only element transitioning. For example, if removing your `visibleClass` triggers transitions on child elements, then you should use this option. When using this option be sure to pass in a number for the `timeoutDuration` parameter.
3. `immediate` — Don't wait at all. 

### timeoutDuration `{Number}`

When using the `timeout` option for `hideMode` you should be sure to pass in the length of the timeout in milliseconds.

## Object Methods

After initializing your `transitionHiddenElement` it will return an object with a few methods.

### show()

Shows your `element`. Removes `hidden`, triggers a document reflow, and applies your `visibleClass`.

### hide()

Hides your `element`. Removes your `visibleClass` and adds `hidden`.

### toggle()

Toggles the visibility of your `element`. Shows it if it's hidden and hides it if it's visible.

### isVisible()

Returns the current visibility of your `element` (based on the presence of the `hidden` attribute.)

## Development

After cloning the repository run the following commands:

1. `npm i` — Install dependencies
2. `npm start` - Build and serve a demo server with hot reloading.
3. View the demo server at `localhost:3000`

### Testing

Testing is done in the browser using Cypress, since [virtual DOM libraries like jsdom don't handle transitions well](https://github.com/jsdom/jsdom/issues/1781).

In order to run the tests do the following:

1. `npm start` — launch the server
2. `npm test` — launch Cypress

Tests will also automatically be run when pull requests are created.
