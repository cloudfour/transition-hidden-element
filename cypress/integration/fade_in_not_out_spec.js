const opacityIsTransitioning = element => {
  const opacity = window.getComputedStyle(element).getPropertyValue('opacity');
  return opacity > 0 && opacity < 1;
};

describe('Fade In But Not Out', function() {
  it('Showing', function() {
    cy.visit('/').then(function(contextWindow) {
      cy.log('Check initial state');
      cy.get('.js-fade-in').should('have.attr', 'hidden', 'hidden');

      cy.log('Trigger `show()`');
      cy.get('.js-show-fade-in').click();

      cy.log('Check that hidden has been toggled');
      cy.get('.js-fade-in').should('not.have.attr', 'hidden');

      cy.log('Wait for transition to begin');
      cy.wait(100);

      cy.log('Confirm element is transitioning');
      cy.wrap({ transitioning: opacityIsTransitioning })
        .invoke(
          'transitioning',
          contextWindow.document.querySelector('.js-fade-in')
        )
        .should('be', true);
    });
  });

  it('Hiding', function() {
    cy.visit('/').then(function(contextWindow) {
      cy.log('Override initial state');
      cy.get('.js-fade-in').then(fader => {
        fader[0].removeAttribute('hidden');
        fader[0].classList.add('is-shown');
      });

      cy.log('Confirm state override was successful');
      cy.get('.js-fade-in').should('not.have.attr', 'hidden');

      cy.log('Trigger `hide()`');
      cy.get('.js-hide-fade-in').click();

      cy.log('Confirm `hidden` is removed immediately');
      cy.get('.js-fade-in').should('have.attr', 'hidden');

      cy.log('Wait for when transition would normally be in progress');
      cy.wait(100);

      cy.log('Confirm element is not transitioning');
      cy.wrap({ transitioning: opacityIsTransitioning })
        .invoke(
          'transitioning',
          contextWindow.document.querySelector('.js-fade-in')
        )
        .should('be', false);
    });
  });

  it('Toggling', function() {
    cy.visit('/').then(function(contextWindow) {
      cy.log('Check initial state');
      cy.get('.js-fade-in').should('have.attr', 'hidden');

      cy.log('Trigger `toggle()` (show)');
      cy.get('.js-toggle-fade-in').click();

      cy.log('Confirm the hidden attribute has been removed');
      cy.get('.js-fade-in').should('not.have.attr', 'hidden');

      cy.log('Wait for transition to begin');
      cy.wait(100);

      cy.log('Confirm element is transitioning');
      cy.wrap({ transitioning: opacityIsTransitioning })
        .invoke(
          'transitioning',
          contextWindow.document.querySelector('.js-fade-in')
        )
        .should('be', true);

      cy.log('Trigger another `toggle()` (hide)');
      cy.get('.js-toggle-fade-in').click();

      cy.log('Confirm `hidden` is added immediately');
      cy.get('.js-fade-in').should('have.attr', 'hidden');

      cy.log('Wait for when transition would normally be in progress');
      cy.wait(100);

      cy.log('Confirm element is not transitioning');
      cy.wrap({ transitioning: opacityIsTransitioning })
        .invoke(
          'transitioning',
          contextWindow.document.querySelector('.js-fade-in')
        )
        .should('be', false);
    });
  });
});
