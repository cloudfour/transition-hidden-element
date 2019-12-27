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
2. Wait for all transitions to complete.
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
  transitionedChildren: [] // Optional — Defaults to an empty array
  elementTransitionsOut: true, // Optional — Defaults to true
});
```

### element `{HTMLElement}`

`element` should be the primary element we're showing and hiding. It will be the element that we'll be adding and removing classes and the `hidden` attribute from.

### visibleClass `{String}`

`visibleClass` is the class that will be added when showing our `element`. Adding the class should trigger a transition on our `element` or its child elements.

### transitionedChildren `{Array}`

If your `element` has child elements that should be transitioned out when hidden, you should pass them in as the `transitionedChildren` parameter. The utility will then wait for their transitions to complete before adding the `hidden` attribute to your `element`.

`transitionedChildren` defaults to an empty array.

### elementTransitionsOut `{Boolean}`

Your `element`  will almost always transition in and out, but there are a few scenarios where it does not. In that case you should set `elementTransitionsOut` to false.

For example, you may only be transitioning the children of your `element` and not the `element` itself (using `transitionedChildren`). Or your `element` may transition when shown, but not when hidden. In either of these cases you should set `elementTransitionsOut` to false.

`elementTransitionsOut` defaults to `true`.

## Object Methods

After initializing your `transitionHiddenElement` it will return an object with a few methods.

### show()

Shows your `element`. Removes `hidden`, triggers a document reflow, and applies your `visibleClass`.

### hide()

Hides your `element`. Removes your `visibleClass`, waits for transitions to complete, and adds `hidden`.

### toggle()

Toggles the visibility of your `element`. Shows it if it's hidden and hides it if it's visible.

### isVisible()

Returns the current visibility of your `element` (based on the presence of the `hidden` attribute.)

## Development

After cloning the repository run the following commands:

1. `npm i` — Install dependencies
2. `npm start` - Build and serve a demo server with hot reloading.
