describe('Login page', () => {
  before(() => {
    cy.visit('/login');
  });
  it('Should find a form', () => {
    cy.get('form');
  });
  context('User Login', () => {
    beforeEach(() => {
      cy.login('user');
    });
    it('Should be redirect home page after login', () => {
      cy.get('h1').should(
        'have.text',
        'Devenez volontaire et aidez les associations'
      );
    });
  });
  context('Association Login', () => {
    beforeEach(() => {
      cy.login('association');
    });
    it('Should be redirect home page after login', () => {
      cy.get('h1').should(
        'have.text',
        'Devenez volontaire et aidez les associations'
      );
      cy.contains('Create job');
    });
  });
});
