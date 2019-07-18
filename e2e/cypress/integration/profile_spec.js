describe('Job operations CRUD by association', () => {
  beforeEach(() => {
    cy.fixture('association.json').as('association');
  });
  context('Account Users', () => {
    beforeEach(() => {
      cy.login('user');
    });
    it('Should dropdown button account', () => {
      cy.contains('Account').click();
      cy.contains('Logout');
      cy.contains('Settings');
      cy.contains('Profil');
    });
    it('Should logout user', () => {
      cy.contains('Account').click();
      cy.contains('Logout').click();
      cy.contains('Signup');
    });
    it('Should click and being directed profile page', () => {
      cy.contains('Account').click();
      cy.contains('Profile').click();
      cy.url().should('contain', '/users/profile');
    });
  });
  context('Account Association', () => {
    beforeEach(() => {
      cy.login('association');
    });
    it('Should have and click on My Job', () => {
      cy.contains('Account').click();
      cy.contains('My job').click();
      cy.url().should('contain', '/users/job/list');
    });
    it('Should delete account', () => {
      cy.contains('Account').click();
      cy.contains('Settings').click();
      cy.get('.btn_delete').click();
      cy.get('input[name=password]').type('thesummerisComing?');
      cy.contains('Confirm').click();
      cy.contains('Signup');
    });
    it('Should have an error message if wrong password', () => {
      cy.contains('Account').click();
      cy.contains('Settings').click();
      cy.get('.btn_delete').click();
      cy.get('input[name=password]').type('garbage');
      cy.contains('Confirm').click();
      cy.get('.alert');
    });
  });
});
