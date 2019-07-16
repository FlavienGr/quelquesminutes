describe('Home page => logout', () => {
  it('Should successfully loads', () => {
    cy.visit('/');
  });
  it('Sould have a navbar with home, association, signup', () => {
    cy.visit('/');
    cy.contains('Home');
    cy.contains('Association');
    cy.contains('Signup');
  });
  it('should have a H1', () => {
    cy.visit('/');
    cy.get('h1').should(
      'have.text',
      'Devenez volontaire et aidez les associations'
    );
  });
});
