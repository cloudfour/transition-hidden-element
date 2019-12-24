const transitionHiddenElement = ({element}) => {
  return {
    /**
     * Show the element
     */
    show() {
      element.removeAttribute('hidden');
    }
  };
}

module.exports = transitionHiddenElement;
