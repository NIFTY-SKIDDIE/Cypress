
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
      // Add more buttons as needed
    };
    return buttonSelectors[buttonName];
  }
  
  Cypress.Commands.add('getInitialRowCount', () => {
    return cy.xpath("(//div[@class='sc-LzMkU kRyFGe'])").its('length');
  });
  
  Cypress.Commands.add('getInitialLatestRowImageCount', () => {
    return cy.get('.sc-LzMkU.kRyFGe').last().find('.sc-LzMDr.gNjBec').its('length');
  });
  
  Cypress.Commands.add('createBeforeAndAfterImage', () => {
    return cy.xpath("//div[@class='sc-LzMBB guKaWq']/button[1]").first().click();
  });
  
  Cypress.Commands.add('saveImage', () => {
    return cy.xpath("//a[normalize-space()='Save']").first().click();
  });
  
  Cypress.Commands.add('waitForImageRowAdded', () => {
    return cy.wait(3000); // Adjust the wait time as needed
  });
  
  Cypress.Commands.add('getNewRowCount', () => {
    return cy.xpath("(//div[@class='sc-LzMkU kRyFGe'])").its('length');
  });
  
  Cypress.Commands.add('getNewLatestRowImageCount', () => {
    return cy.get('.sc-LzMkU.kRyFGe').last().find('.sc-LzMDr.gNjBec').its('length');
  });