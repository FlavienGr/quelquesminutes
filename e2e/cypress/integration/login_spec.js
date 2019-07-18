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
  context('Error Login', () => {
    it('Should be redirect home page after login', () => {
      cy.get('input[name=email]').type('garbage@fake.fr');
      cy.get('input[name=password]').type('sevenle');
      cy.get('.button_signup_page').click();
      cy.get('.alert');
    });
  });
});
