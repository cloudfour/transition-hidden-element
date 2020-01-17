const opacityIsTransitioning = element => {
  const opacity = window.getComputedStyle(element).getPropertyValue('opacity');
  return opacity > 0 && opacity < 1;
};

describe('Fade In and Out using Display', function() {
  it('Showing', function() {
    cy.visit('/').then(function(contextWindow) {
      cy.log('Check initial state');
      cy.get('.js-fade-in-out-display').should('have.css', 'display').and('eq', 'none');

      cy.log('Trigger `show()`');
      cy.get('.js-show-fade-in-out-display').click();

      cy.log('Check that display has been toggled');
      cy.get('.js-fade-in-out-display').should('have.css', 'display').and('eq', 'block');

      cy.log('Wait for transition to begin');
      cy.wait(100);

      cy.log('Confirm element is transitioning');
      cy.wrap({ transitioning: opacityIsTransitioning })
        .invoke(
          'transitioning',
          contextWindow.document.querySelector('.js-fade-in-out-display')
        )
        .should('be', true);
    });
  });

  it('Hiding', function() {
    cy.visit('/').then(function(contextWindow) {
      cy.log('Override initial state');
      cy.get('.js-fade-in-out-display').then(fader => {
        fader[0].style.display = 'block';
        fader[0].classList.add('is-shown');
      });

      cy.log('Confirm state override was successful');
      cy.get('.js-fade-in-out-display').should('have.css', 'display').and('eq', 'block');

      cy.log('Trigger `hide()`');
      cy.get('.js-hide-fade-in-out-display').click();

      cy.log('Wait for transition to begin');
      cy.wait(100);

      cy.log('Confirm element is transitioning');
      cy.wrap({ transitioning: opacityIsTransitioning })
        .invoke(
          'transitioning',
          contextWindow.document.querySelector('.js-fade-in-out-display')
        )
        .should('be', true);

      cy.log('Confirm `display` is not toggled during the transition');
      cy.get('.js-fade-in-out-display').should('have.css', 'display').and('eq', 'block');

      cy.log('Wait for transition to end');
      cy.wait(300);

      cy.log('Confirm `display` is toggled when the transition ends');
      cy.get('.js-fade-in-out-display').should('have.css', 'display').and('eq', 'none');
    });
  });

  it('Toggling', function() {
    cy.visit('/').then(function(contextWindow) {
      cy.log('Check initial state');
      cy.get('.js-fade-in-out-display').should('have.css', 'display').and('eq', 'none');

      cy.log('Trigger `toggle()` (show)');
      cy.get('.js-toggle-fade-in-out-display').click();

      cy.log('Confirm display has been toggled');
      cy.get('.js-fade-in-out-display').should('have.css', 'display').and('eq', 'block');

      cy.log('Wait for transition to begin');
      cy.wait(100);

      cy.log('Confirm element is transitioning');
      cy.wrap({ transitioning: opacityIsTransitioning })
        .invoke(
          'transitioning',
          contextWindow.document.querySelector('.js-fade-in-out-display')
        )
        .should('be', true);

      cy.log('Wait for transition to end');
      cy.wait(300);

      cy.log('Trigger another `toggle()` (hide)');
      cy.get('.js-toggle-fade-in-out-display').click();

      cy.log('Wait for transition to begin');
      cy.wait(100);

      cy.log('Confirm element is transitioning');
      cy.wrap({ transitioning: opacityIsTransitioning })
        .invoke(
          'transitioning',
          contextWindow.document.querySelector('.js-fade-in-out-display')
        )
        .should('be', true);

      cy.log('Confirm display is not toggled during the transition');
      cy.get('.js-fade-in-out-display').should('have.css', 'display').and('eq', 'block');

      cy.log('Wait for transition to end');
      cy.wait(300);

      cy.log('Confirm display is toggled when the transition ends');
      cy.get('.js-fade-in-out-display').should('have.css', 'display').and('eq', 'none');
    });
  });
});
