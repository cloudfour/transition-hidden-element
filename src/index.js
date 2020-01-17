/**
 * Transition Hidden Element
 *
 * A utility to wrap elements that need to be shown and hidden with transitions.
 *
 * Enables transitions on elements with the `hidden` attribute
 * by removing the attribute and then forcing a reflow. It also has options to
 * wait for exit animations before re-applying `hidden`.
 *
 * @param {Object} opts - Our options element, destructed into its properties
 * @param {HTMLElement} opts.element - The element we're showing and hiding
 * @param {String} opts.visibleClass - The class to add when showing the element
 * @param {String} opts.waitMode - Determine how the library should check that
 *  hiding transitions are complete. The options are `'transitionEnd'`,
 *  `'timeout'`, and `'immediate'` (to hide immediately)
 * @param  {Number} opts.timeoutDuration — If `waitMode` is set to `'timeout'`,
 *  then this determines the length of the timeout.
 * @param {String} opts.hideMode - Determine how the library should hide
 *  elements. The options are `hidden` (use the `hidden` attribute), and
 *  `display` (use the CSS `display` property). Defaults to `hidden`
 * @param {String} opts.displayValue - When using the `display` `hideMode`, this
 *  parameter determines what the CSS `display` property should be set to when
 *  the element is shown. e.g. `block`, `inline`, `inline-block`. Defaults to
 *  `block`.
 */
export function transitionHiddenElement({
  element,
  visibleClass,
  waitMode = 'transitionend',
  timeoutDuration,
  hideMode = 'hidden',
  displayValue = 'block'
}) {
  if (waitMode === 'timeout' && typeof timeoutDuration !== 'number') {
    console.error(`
      When calling transitionHiddenElement with waitMode set to timeout,
      you must pass in a number for timeoutDuration.
    `);

    return;
  }

  // Don't wait for exit transitions if a user prefers reduced motion.
  // Ideally transitions will be disabled in CSS, which means we should not wait
  // before adding `hidden`.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    waitMode = 'immediate';
  }

  /**
   * An event listener to add `hidden` after our animations complete.
   * This listener will remove itself after completing.
   */
  const listener = e => {
    // Confirm `transitionend` was called on  our `element` and didn't bubble
    // up from a child element.
    if (e.target === element) {
      applyHiddenAttributes();

      element.removeEventListener('transitionend', listener);
    }
  };

  const applyHiddenAttributes = () => {
    if(hideMode === 'display') {
      element.style.display = 'none';
    } else {
      element.setAttribute('hidden', true);
    }
  }

  const removeHiddenAttributes = () => {
    if(hideMode === 'display') {
      element.style.display = displayValue;
    } else {
      element.removeAttribute('hidden');
    }
  }

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
      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      removeHiddenAttributes();

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
      if (waitMode === 'transitionend') {
        element.addEventListener('transitionend', listener);
      } else if (waitMode === 'timeout') {
        this.timeout = setTimeout(() => {
          applyHiddenAttributes();
        }, timeoutDuration);
      } else {
        applyHiddenAttributes();
      }

      // Add this class to trigger our animation
      element.classList.remove(visibleClass);
    },

    /**
     * Toggle the element's visibility
     */
    toggle() {
      if (this.isHidden()) {
        this.show();
      } else {
        this.hide();
      }
    },

    /**
     * Tell whether the element is hidden or not.
     */
    isHidden() {
      /**
       * The hidden attribute does not require a value. Since an empty string is
       * falsy, but shows the presence of an attribute we compare to `null`
       */
      const hasHiddenAttribute = element.getAttribute('hidden') !== null;

      const isDisplayNone = element.style.display === 'none';

      const hasVisibleClass = [...element.classList].includes(visibleClass);

      return hasHiddenAttribute || isDisplayNone || !hasVisibleClass;
    },

    // A placeholder for our `timeout`
    timeout: null
  };
}
