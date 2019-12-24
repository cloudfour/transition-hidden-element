const transitionHiddenElement = ({element}) => {
  return {
    /**
     * Show the element
     */
    show() {
      element.removeAttribute('hidden');
    },

    hide() {
      element.setAttribute('hidden', '');
    }
  };
}

module.exports = transitionHiddenElement;
