const opacityIsTransitioning = element => {
  const opacity = window.getComputedStyle(element).getPropertyValue('opacity');
  return opacity > 0 && opacity < 1;
}

describe('Simple Fade', function() {
  it('Showing', function() {
    cy.visit('/').then(function(contextWindow){
      // Check initial state
      cy.get('.js-simple-fade').should('have.attr', 'hidden', 'hidden');

      // Trigger `show()`
      cy.get('.js-show-simple-fade').click();

      // Check that hidden has been toggled
      cy.get('.js-simple-fade').should('not.have.attr', 'hidden');

      // Wait for transition to begin
      cy.wait(100);

      // Confirm element is transitioning
      cy.wrap({transitioning: opacityIsTransitioning})
        .invoke('transitioning', contextWindow.document.querySelector('.js-simple-fade'))
        .should('be', true);
    });
  });

  it('Hiding', function() {
    cy.visit('/').then(function(contextWindow){
      // Override initial state
      cy.get('.js-simple-fade').then(fader => {
        fader[0].removeAttribute('hidden');
        fader[0].classList.add('is-shown');
      });

      // Confirm state override was successful
      cy.get('.js-simple-fade').should('not.have.attr', 'hidden');

      // Trigger `hide()`
      cy.get('.js-hide-simple-fade').click();

      // Wait for transition to begin
      cy.wait(100);

      // Confirm element is transitioning
      cy.wrap({transitioning: opacityIsTransitioning})
        .invoke('transitioning', contextWindow.document.querySelector('.js-simple-fade'))
        .should('be', true);

      // Confirm `hidden` isn't removed during the transition
      cy.get('.js-simple-fade').should('not.have.attr', 'hidden');

      // Wait for transition to end
      cy.wait(300);

      // Confirm `hidden` is removed when the transition ends
      cy.get('.js-simple-fade').should('have.attr', 'hidden');
    });
  });

  it('Toggling', function() {
    cy.visit('/').then(function(contextWindow){
      // Check initial state
      cy.get('.js-simple-fade').should('have.attr', 'hidden');

      // Trigger `toggle()`
      cy.get('.js-toggle-simple-fade').click();

      // Confirm the hidden attribute has been removed
      cy.get('.js-simple-fade').should('not.have.attr', 'hidden');

      // Wait for transition to begin
      cy.wait(100);

      // Confirm element is transitioning
      cy.wrap({transitioning: opacityIsTransitioning})
        .invoke('transitioning', contextWindow.document.querySelector('.js-simple-fade'))
        .should('be', true);

      // Wait for transition to end
      cy.wait(300);

      // Trigger another `toggle()`
      cy.get('.js-toggle-simple-fade').click();

      // Wait for transition to begin
      cy.wait(100);

      // Confirm element is transitioning
      cy.wrap({transitioning: opacityIsTransitioning})
        .invoke('transitioning', contextWindow.document.querySelector('.js-simple-fade'))
        .should('be', true);

      // Confirm `hidden` isn't removed during the transition
      cy.get('.js-simple-fade').should('not.have.attr', 'hidden');

      // Wait for transition to end
      cy.wait(300);

      // Confirm `hidden` is removed when the transition ends
      cy.get('.js-simple-fade').should('have.attr', 'hidden');
    });
  });
});

