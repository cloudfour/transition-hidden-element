/**
 * Transition Hidden Element
 *
 * A utility to wrap elements that need to be shown and hidden with transitions.
 *
 * Enables transitions on elements with the `hidden` attribute
 * by removing the attribute and then forcing a reflow.
 *
 * @param {Object} opts - Our options element, destructed into its properties
 * @param {HTMLElement} opts.element - The element we're showing and hiding
 * @param {String} opts.visibleClass - The class to add when showing the element
 * @param {Array} opts.transitionedChildren - if showing/hiding the element
 *  triggers animations on child elements, they should be passed in as an array.
 *  (Not a NodeList)
 * @param {Boolean} opts.elementHasTransition - Whether our primary element has
 *  a transition. Defaults to `true`. Set to `false` if it doesn't transition.
 *  This should only be done when `transitionedChildren` is populated, or when
 *  the primary element transitions in but not out.
 */
export function transitionHiddenElement({
  element,
  elementHasTransition = true,
  visibleClass,
  transitionedChildren = []
}) {
  return {
    /**
     * Show the element
     */
    show() {
      /**
       * This listener shouldn't be here but if someone spams the toggle
       * over and over really fast it can incorrectly stick around.
       * We remove it just to be safe.
       */
      element.removeEventListener('transitionend', this.currentListener);

      element.removeAttribute('hidden');

      /**
       * Force a browser re-paint so the browser will realize the
       * element is no longer `hidden` and allow transitions.
       */
      const reflow = element.offsetHeight;

      element.classList.add(visibleClass);
    },

    /**
     * Hide the element
     */
    hide() {
      // Depending on the settings passed in, one or more elements are
      // transitioning. We want to wait for all of them to transition, so we'll
      // store them in an array to track them.
      this.transitioningElements = [...transitionedChildren];

      if(elementHasTransition) {
        this.transitioningElements.push(element);
      }

      // Create a copy off our listener so we can remove it later
      this.currentListener = this.listener.bind(this);

      element.addEventListener('transitionend', this.currentListener);

      // Add this class to trigger our animation
      element.classList.remove(visibleClass);
    },

    /**
     * Toggle the element's visibility
     */
    toggle() {
      if (this.isVisible()) {
        this.hide();
      } else {
        this.show();
      }
    },

    /**
     * Tell whether the element is visible or not.
     */
    isVisible() {
      /**
       * The hidden attribute does not require a value. Since an empty string is
       * falsy, but shows the presence of an attribute we compare to `null`
       */
      return element.getAttribute('hidden') === null;
    },

    /**
     * An event listener to add `hidden` after our animations complete.
     * This listener will remove itself after completing.
     */
    listener(e) {
      // Confirm transitionend was called on one of our transitioning elements,
      // and didn't bubble up from a different element
      if(this.transitioningElements.includes(e.target)) {
        this.transitioningElements =
          this.transitioningElements.filter(item => item != e.target);

        console.log(this.transitioningElements)

        if(this.transitioningElements.length === 0) {
          element.setAttribute('hidden', true);
          // TODO: Is this being removed correctly?
          element.removeEventListener('transitionend', this.currentListener);
        }
      }
    },

    // An array to store the transitioning elements we need to track
    transitioningElements: [],

    // A placeholder for our transitionend listeners
    currentListener: null,
  };
}
