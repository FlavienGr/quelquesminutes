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
Cypress.Commands.add('createJob', () => {
  cy.visit('/job/create');
  cy.fixture('job.json').then((job) => {
    cy.get('input[name=title]').type(job.title);
    cy.get('textarea[name=description]').type(job.description);
    cy.get('input[name=street]').type(job.street);
    cy.get('input[name=city]').type(job.city);
    cy.get('input[name=zip]').type(job.zip);
    cy.get('input[name=datepickerStart]').type(job.start);
    cy.get('input[name=datepickerEnd]').type(job.end);
    cy.contains('Save').click();
  });
});
