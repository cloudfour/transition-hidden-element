// TODO: Prefers Reduced Motion Stuff

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
 * @param {String} opts.hideMode - Determine how the library should check that
 *  hiding transitions are complete. The options are `'transitionEnd'`,
 *  `'timeout'`, and `'immediate'` (to hide immediately)
 * @param  {Number} opts.timeoutDuration — If `hideMode` is set to `'timeout'`,
 *  then this determines the length of the timeout.
 */
export function transitionHiddenElement({
  element,
  visibleClass,
  hideMode = 'transitionend',
  timeoutDuration,
}) {
  if(hideMode === 'timeout' && typeof timeoutDuration !== 'number') {
    console.error(`
      When calling transitionHiddenElement with hideMode set to timeout,
      you must pass in a number for timeoutDuration.
    `);

    return;
  }

  /**
   * An event listener to add `hidden` after our animations complete.
   * This listener will remove itself after completing.
   */
  const listener = e => {
    // Confirm `transitionend` was called on  our `element` and didn't bubble
    // up from a child element.
    if(e.target === element) {
      element.setAttribute('hidden', true);
      // TODO: Is this being removed correctly?
      element.removeEventListener('transitionend', listener);
    }
  };

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
      element.removeEventListener('transitionend', listener);

      /**
       * Similarly, we'll clear the timeout in case it's still hanging around.
       */
      if(this.timeout) { clearTimeout(this.timeout); }

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
      if (hideMode === 'transitionend') {
        element.addEventListener('transitionend', listener);
      } else if (hideMode === 'timeout') {
        this.timeout = setTimeout(() => {
          element.setAttribute('hidden', true);
        }, timeoutDuration);
      } else {
        element.setAttribute('hidden', true);
      }

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

       // TODO: Should this check visibleClass instead?
      return element.getAttribute('hidden') === null;
    },

    // A placeholder for our `timeout`
    timeout: null,
  };
}
