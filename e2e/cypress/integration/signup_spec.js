describe('Signup page => elements and signup', () => {
  beforeEach(() => {
    cy.exec('npm run db:delete');
    cy.visit('/signup');
  });
  it('Should contains a form', () => {
    cy.get('form');
  });
  context('User registration => ', () => {
    it('Fill out form, send data and find account link', () => {
      cy.fixture('user.json').then((user) => {
        cy.get('input[name=username]').type(user.username);
        cy.get('input[name=email]').type(user.email);
        cy.get('input[name=password]').type(user.password);
        cy.get('.button_signup_page').click();
        cy.contains('Account');
      });
    });
  });
  context('Association registration => ', () => {
    it('Fill out form, send data and find account link', () => {
      cy.fixture('association.json').then((association) => {
        cy.get('[type="checkbox"]').check();
        cy.get('input[name=username]').type(association.username);
        cy.get('input[name=email]').type(association.email);
        cy.get('input[name=password]').type(association.password);
        cy.get('.button_signup_page').click();
        cy.contains('Account');
        cy.contains('Create job');
      });
    });
  });
});
