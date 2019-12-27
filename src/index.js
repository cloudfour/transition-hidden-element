/**
 * A utility to wrap elements that need to be shown and hidden.
 * Enables transitions on elements with the `hidden` attribute
 * by removing the attribute and then forcing a reflow.
 *
 * @param {Object} opts - Our options element, destructed into its properties
 * @param {HTMLElement} opts.element - The element to transition
 * @param {String} opts.visibleClass - The class to add when showing the element
 */
export function transitionHiddenElement({
  element, visibleClass, animatedChildren = []
}) {
  /**
   * An event listener to add `hidden` after our animation completes.
   * This listener will remove itself after completing.
   */
  const listener = e => {
    // Confirm transitionend was called on this element, not one of its children
    if(e.target === element) {
      element.setAttribute('hidden', true);

      element.removeEventListener('transitionend', listener);
    }
  };

  return {
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
     * Hide the element
     */
    hide() {
      // Add the event listener we defined above to trigger after our transition
      element.addEventListener('transitionend', listener);

      // Add this class to trigger our animation
      element.classList.remove(visibleClass);
    },
    /**
     * Show the element
     */
    show() {
      element.removeAttribute('hidden');

      /**
       * This listener shouldn't be here but if someone spams the toggle
       * over and over really fast it can incorrectly stick around.
       * We remove it just to be safe.
       */
      element.removeEventListener('transitionend', listener);

      /**
       * Force a browser re-paint so the browser will realize the
       * element is no longer `hidden` and allow transitions.
       */
      /* eslint-disable-next-line no-unused-vars */
      const reflow = element.offsetHeight;

      element.classList.add(visibleClass);
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
  };
}
