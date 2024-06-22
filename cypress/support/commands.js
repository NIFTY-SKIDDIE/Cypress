// Credentials defined globally
const credentials = {
  email: 'contact+test@samshapira.com',
  password: '100321AbCd$'
};

Cypress.Commands.add('login', () => {
  cy.visit('https://app.companycam.com/users/sign_in');
  cy.get('#user_email_address').type(credentials.email);
  cy.get('#user_password').type(credentials.password);
  cy.get('input[value="Sign In"]').click();
});

Cypress.Commands.add('selectProject', () => {
  cy.get('.projects-list__project').first().click();
  cy.url().should('include', '/projects/65853341/photos');
});

Cypress.Commands.add('selectPhotoByIndex', (index) => {
  return cy.xpath(`(//button[@color="var(--cc_color_brand_primary)"])[${index}]`).click();
});

Cypress.Commands.add('assertButtonDisabled', (buttonName) => {
  const buttonSelector = getButtonSelector(buttonName);
  return cy.get(buttonSelector).should('have.attr', 'disabled');
});

Cypress.Commands.add('assertButtonEnabled', (buttonName) => {
  const buttonSelector = getButtonSelector(buttonName);
  return cy.get(buttonSelector).should('not.have.attr', 'disabled');
});

// Helper function to map button names to selectors
function getButtonSelector(buttonName) {
  const buttonSelectors = {
    'disabledButton': 'button.sc-eAKtBH.flnERo',
    'enabledButton': 'button.sc-eAKtBH.eizVws'
  };
  return buttonSelectors[buttonName];
}

Cypress.Commands.add('getInitialImageCount', () => {
  return cy.xpath(`//div[@data-testid='assetfeed__asset-thumbnail']`).its('length');
});

Cypress.Commands.add('getNewImageCount', () => {
  return cy.xpath(`//div[@data-testid='assetfeed__asset-thumbnail']`).its('length');
});

Cypress.Commands.add('createBeforeAndAfterImage', () => {
  return cy.xpath("(//button[@type='button'])[15]").first().click();
});

Cypress.Commands.add('saveImage', () => {
  return cy.xpath("//a[normalize-space()='Save']").first().click();
});

Cypress.Commands.add('waitForNewImage', () => {
  // Intercept the GET request for the image URL
  cy.intercept('GET', 'https://img.companycam.com/**').as('waitForImageLoad');

  // Wait for the intercepted request to complete
  cy.wait('@waitForImageLoad', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
});


Cypress.Commands.add('deleteNewlyCreatedImage', () => {
  cy.xpath('(//button[@type="button"])[10]').click();
  cy.xpath('//a[@data-testid="projects__actions__delete-photo-link"]').click({ force: true });
  cy.xpath('//button[@color="destroy"]').click({ force: true });
});