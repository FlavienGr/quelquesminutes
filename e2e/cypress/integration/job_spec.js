describe('Job operations CRUD by association', () => {
  beforeEach(() => {
    cy.login('association');
    cy.fixture('job.json').as('job');
  });
  context('Verification page create job', () => {
    it('Should have a button Create Job if assoc is connected', () => {
      cy.contains('Create job').click();
    });
    it('Should visit create job page and find a form', () => {
      cy.contains('Create job').click();
      cy.get('form');
    });
  });
  context('Create job and see job details', () => {
    it('Should have a button Create Job if assoc is connected', () => {
      cy.visit('/job/create');
      cy.get('@job').then((job) => {
        cy.get('input[name=title]').type(job.title);
        cy.get('textarea[name=description]').type(job.description);
        cy.get('input[name=street]').type(job.street);
        cy.get('input[name=city]').type(job.city);
        cy.get('input[name=zip]').type(job.zip);
        cy.get('input[name=datepickerStart]').type(job.start);
        cy.get('input[name=datepickerEnd]').type(job.end);
        cy.contains('Save').click();
        cy.url().should('include', '/users/job/list');
      });
    });
    it('Should see the job detail after clicking see button', () => {
      cy.createJob();
      cy.contains('Voir').click();
      cy.get('@job').then((job) => {
        cy.contains(`${job.title}`);
      });
      cy.contains('Update');
      cy.contains('Delete');
    });
  });
  context('Update and delete job', () => {
    it('Should see the form to update job and click to cancel', () => {
      cy.createJob();
      cy.contains('Voir').click();
      cy.contains('Update').click();
      cy.get('form');
      cy.contains('Cancel').click();
      cy.get('h1').should(
        'have.text',
        'Devenez volontaire et aidez les associations'
      );
    });
    it('Should update the job', () => {
      cy.createJob();
      cy.contains('Voir').click();
      cy.contains('Update').click();
      cy.get('@job').then((job) => {
        cy.get('input[name=title]')
          .clear()
          .type(`${job.title} + UPDATED`);
      });
      cy.contains('Save').click();
      cy.url().should('contain', '/users/job/list');
      cy.contains('A night after a storm + UPDATED');
    });
  });
});
