Cypress.Commands.add('login', (userType) => {
  const types = {
    association: {
      username: 'Rain Fall',
      email: 'shitweather@fake.io',
      password: 'thesummerisComing?'
    },
    user: {
      username: 'Thomas Edison',
      email: 'edison@fake.io',
      password: 'ibecamepresident'
    }
  };

  // grab the user
  const user = types[userType];
  cy.exec('npm run db:delete && npm run db:seed');
  cy.visit('/login');
  cy.get('input[name=email]').type(user.email);
  cy.get('input[name=password]').type(`${user.password}{enter}`);
});
