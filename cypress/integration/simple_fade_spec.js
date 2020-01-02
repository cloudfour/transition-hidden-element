const opacityIsTransitioning = element => {
  const opacity = window.getComputedStyle(element).getPropertyValue('opacity');
  return opacity > 0 && opacity < 1;
};

describe('Simple Fade', function() {
  it('Showing', function() {
    cy.visit('/').then(function(contextWindow) {
      cy.log('Check initial state');
      cy.get('.js-simple-fade').should('have.attr', 'hidden', 'hidden');

      cy.log('Trigger `show()`');
      cy.get('.js-show-simple-fade').click();

      cy.log('Check that hidden has been toggled');
      cy.get('.js-simple-fade').should('not.have.attr', 'hidden');

      cy.log('Wait for transition to begin');
      cy.wait(100);

      cy.log('Confirm element is transitioning');
      cy.wrap({ transitioning: opacityIsTransitioning })
        .invoke(
          'transitioning',
          contextWindow.document.querySelector('.js-simple-fade')
        )
        .should('be', true);
    });
  });

  it('Hiding', function() {
    cy.visit('/').then(function(contextWindow) {
      cy.log('Override initial state');
      cy.get('.js-simple-fade').then(fader => {
        fader[0].removeAttribute('hidden');
        fader[0].classList.add('is-shown');
      });

      cy.log('Confirm state override was successful');
      cy.get('.js-simple-fade').should('not.have.attr', 'hidden');

      cy.log('Trigger `hide()`');
      cy.get('.js-hide-simple-fade').click();

      cy.log('Wait for transition to begin');
      cy.wait(100);

      cy.log('Confirm element is transitioning');
      cy.wrap({ transitioning: opacityIsTransitioning })
        .invoke(
          'transitioning',
          contextWindow.document.querySelector('.js-simple-fade')
        )
        .should('be', true);

      cy.log('Confirm `hidden` is not added during the transition');
      cy.get('.js-simple-fade').should('not.have.attr', 'hidden');

      cy.log('Wait for transition to end');
      cy.wait(300);

      cy.log('Confirm `hidden` is added when the transition ends');
      cy.get('.js-simple-fade').should('have.attr', 'hidden');
    });
  });

  it('Toggling', function() {
    cy.visit('/').then(function(contextWindow) {
      cy.log('Check initial state');
      cy.get('.js-simple-fade').should('have.attr', 'hidden');

      cy.log('Trigger `toggle()` (show)');
      cy.get('.js-toggle-simple-fade').click();

      cy.log('Confirm the hidden attribute has been removed');
      cy.get('.js-simple-fade').should('not.have.attr', 'hidden');

      cy.log('Wait for transition to begin');
      cy.wait(100);

      cy.log('Confirm element is transitioning');
      cy.wrap({ transitioning: opacityIsTransitioning })
        .invoke(
          'transitioning',
          contextWindow.document.querySelector('.js-simple-fade')
        )
        .should('be', true);

      cy.log('Wait for transition to end');
      cy.wait(300);

      cy.log('Trigger another `toggle()` (hide)');
      cy.get('.js-toggle-simple-fade').click();

      cy.log('Wait for transition to begin');
      cy.wait(100);

      cy.log('Confirm element is transitioning');
      cy.wrap({ transitioning: opacityIsTransitioning })
        .invoke(
          'transitioning',
          contextWindow.document.querySelector('.js-simple-fade')
        )
        .should('be', true);

      cy.log('Confirm `hidden` is not added during the transition');
      cy.get('.js-simple-fade').should('not.have.attr', 'hidden');

      cy.log('Wait for transition to end');
      cy.wait(300);

      cy.log('Confirm `hidden` is added when the transition ends');
      cy.get('.js-simple-fade').should('have.attr', 'hidden');
    });
  });
});
