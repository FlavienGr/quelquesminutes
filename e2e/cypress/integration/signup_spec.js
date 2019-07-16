describe('Signup page => elements and signup', () => {
  beforeEach(() => {
    cy.exec('npm run db:delete');
    cy.visit('/signup');
  });
  it('Should contains a form', () => {
    cy.get('form');
  });
  it('should register an user', () => {
    cy.fixture('user.json').then((user) => {
      cy.get('input[name=username]').type(user.username);
      cy.get('input[name=email]').type(user.email);
      cy.get('input[name=password]').type(user.password);
      cy.get('.button_signup_page').click();
      cy.contains('Account');
    });
  });
});
