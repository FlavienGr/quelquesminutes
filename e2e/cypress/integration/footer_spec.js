describe('Footer page =>', () => {
  it('Sould have a footer with home, association and signup links', () => {
    cy.visit('/');
    cy.get('footer');
    cy.contains('Home');
    cy.contains('Association');
    cy.contains('Signup');
  });
});
