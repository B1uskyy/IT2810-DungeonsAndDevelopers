describe(
  'Logs in, searches for a monster and adds black dragon to dungeon,' +
    ' filters on undead and adds Whight to dungeon. Now with AccesibilityMode on',
  () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('Logs in and performs user story for adding and removing monsters from dungeon', () => {
      cy.visit('http://localhost:5173/');

      cy.get('img[alt="accessability icon"]').should('exist');
      cy.get('label').should('exist');

      cy.get('input[type="checkbox"]').should('not.be.checked');

      cy.get('label').click();

      cy.get('input#log-in-input').type('Cypress test user');
      cy.get('button').first().should('exist').should('have.text', 'Log in').click();

      cy.get('img[alt="accessability icon"]').should('exist');
      cy.get('label').should('exist');

      cy.get('a').contains('Monsters').click();

      cy.get('input[type="text"]').should('exist');

      cy.get('input[type="text"]').clear().type('adult black dragon');

      cy.get('ul').should('exist');
      cy.get('input[type="text"]').should('have.value', 'adult black dragon');

      cy.wait(1000);
      cy.get('button').contains('Add to dungeon').click();

      cy.wait(1000);

      cy.get('input[type="text"]').clear();

      cy.get('button').contains('Filter Monsters').click({ force: true });

      cy.wait(1000);

      cy.contains('label', 'undead').find('input[type="checkbox"]').check({ force: true });

      cy.get('[aria-label="close"]').click();

      cy.wait(1000);

      cy.get('button').contains('Add to dungeon').click();

      cy.wait(1000);

      cy.get('a').contains('Dungeon').click();

      cy.wait(3000);
      cy.get('button').contains('Remove from dungeon').click();
      cy.wait(3000);
      cy.get('button').contains('Remove from dungeon').click();
    });
  }
);
