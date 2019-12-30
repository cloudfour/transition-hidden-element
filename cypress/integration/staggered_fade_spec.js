const opacityIsTransitioning = element => {
  const opacity = window.getComputedStyle(element).getPropertyValue('opacity');
  return opacity > 0 && opacity < 1;
}

describe('Staggered Fade', function() {
  it('Showing', function() {
    cy.visit('/').then(function(contextWindow){
      cy.log('Check initial state of wrapper');
      cy.get('.js-staggered-fade-wrapper').should('have.attr', 'hidden', 'hidden');

      cy.log('Trigger `show()`');
      cy.get('.js-show-staggered-fade').click();

      cy.log('Check that hidden has been toggled on the wrapper');
      cy.get('.js-staggered-fade-wrapper').should('not.have.attr', 'hidden');

      cy.log('Wait for transitions to begin');
      cy.wait(100);

      cy.log('Confirm child element is transitioning');
      cy.wrap({transitioning: opacityIsTransitioning})
        .invoke('transitioning', contextWindow.document.querySelector('.js-staggered-fade-child'))
        .should('be', true);
    });
  });

  it('Hiding', function() {
    cy.visit('/').then(function(contextWindow){
      cy.log('Override initial state of wrapper');
      cy.get('.js-staggered-fade-wrapper').then(fader => {
        fader[0].removeAttribute('hidden');
        fader[0].classList.add('is-shown');
      });

      cy.log('Confirm state override was successful');
      cy.get('.js-staggered-fade-wrapper').should('not.have.attr', 'hidden');

      cy.log('Trigger `hide()`');
      cy.get('.js-hide-staggered-fade').click();

      cy.log('Wait for transitions to begin');
      cy.wait(100);

      cy.log('Confirm child element is transitioning');
      cy.wrap({transitioning: opacityIsTransitioning})
        .invoke('transitioning', contextWindow.document.querySelector('.js-staggered-fade-child'))
        .should('be', true);

      cy.log('Confirm `hidden` is not removed during the transition');
      cy.get('.js-staggered-fade-wrapper').should('not.have.attr', 'hidden');

      cy.log('Wait for transition to end');
      cy.wait(1300);

      cy.log('Confirm `hidden` is removed from the wrapper when the transition ends');
      cy.get('.js-staggered-fade-wrapper').should('have.attr', 'hidden');
    });
  });

  it('Toggling', function() {
    cy.visit('/').then(function(contextWindow){
      cy.log('Check initial state of the wrapper');
      cy.get('.js-staggered-fade-wrapper').should('have.attr', 'hidden');

      cy.log('Trigger `toggle()`');
      cy.get('.js-toggle-staggered-fade').click();

      cy.log('Confirm the hidden attribute has been removed from wrapper');
      cy.get('.js-staggered-fade-wrapper').should('not.have.attr', 'hidden');

      cy.log('Wait for transitions to begin');
      cy.wait(100);

      cy.log('Confirm child element is transitioning');
      cy.wrap({transitioning: opacityIsTransitioning})
        .invoke('transitioning', contextWindow.document.querySelector('.js-staggered-fade-child'))
        .should('be', true);

      cy.log('Wait for transitions to end');
      cy.wait(1300);

      cy.log('Trigger another `toggle()`');
      cy.get('.js-toggle-staggered-fade').click();

      cy.log('Wait for transitions to begin');
      cy.wait(100);

      cy.log('Confirm child element is transitioning');
      cy.wrap({transitioning: opacityIsTransitioning})
        .invoke('transitioning', contextWindow.document.querySelector('.js-staggered-fade-child'))
        .should('be', true);

      cy.log('Confirm `hidden` is not removed from wrapper during the transition');
      cy.get('.js-staggered-fade-wrapper').should('not.have.attr', 'hidden');

      cy.log('Wait for transitions to end');
      cy.wait(1300);

      cy.log('Confirm `hidden` is removed when the transitions end');
      cy.get('.js-staggered-fade-wrapper').should('have.attr', 'hidden');
    });
  });
});

