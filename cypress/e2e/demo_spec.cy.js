// demo_spec.cy.js

import 'cypress-xpath';

describe('Verify "Before & after" image creation flow', () => {
  beforeEach(() => {
    cy.visit('https://app.companycam.com/users/sign_in');
    cy.xpath('//*[@id="user_email_address"]').type('contact+test@samshapira.com');
    cy.xpath('//*[@id="user_password"]').type('100321AbCd$');
    cy.get('input[value="Sign In"]').click();
    
    //Navigate to the project page with photos
    cy.get('.projects-list__project').first().click();
    cy.url().should('include', '/projects/65853341/photos');
  });

  it('Enables the "Create Before & After" button after selecting exactly two photos and validates new image creation', () => {
    // Check the first photo checkbox
    cy.xpath('(//button[@color="var(--cc_color_brand_primary)"])[2]').click();

    // Assert that the button is disabled
    cy.get('button.sc-eAKtBH.flnERo').should('have.attr', 'disabled');

    // Check the second photo checkbox to select two photos
    cy.xpath('(//button[@color="var(--cc_color_brand_primary)"])[3]').click();

    // Assert that the button is enabled
    cy.get('button.sc-eAKtBH.eizVws').should('not.have.attr', 'disabled');

    // Check the third photo checkbox to select three photos
    cy.xpath('(//button[@color="var(--cc_color_brand_primary)"])[5]').click();

    // Assert that the button is disabled again
    cy.get('button.sc-eAKtBH.flnERo').should('have.attr', 'disabled');

    // Uncheck the third photo to select exactly two photos
    cy.xpath('(//button[@color="var(--cc_color_brand_primary)"])[5]').click();

    // Assert that the button is enabled again
    cy.get('button.sc-eAKtBH.eizVws').should('not.have.attr', 'disabled');

    // Get the initial number of images
    let initialImageCount;

    cy.xpath(`//div[@data-testid='assetfeed__asset-thumbnail']`).then($images => {
      initialImageCount = $images.length;
      cy.log(`Initial Image Count: ${initialImageCount}`);
    });

    // Click on the button to create a "before and after" image
    cy.xpath("(//button[@type='button'])[15]").first().click();

    // Save the new image
    cy.xpath("//a[normalize-space()='Save']").first().click();

    // Wait for the new image to be added
    cy.wait(3000); 

    // Get the new number of images after creating the image
    cy.xpath(`//div[@data-testid='assetfeed__asset-thumbnail']`).then($images => {
      const newImageCount = $images.length;
      cy.log(`New Image Count: ${newImageCount}`);

      // Assert that the number of images has increased by 1
      expect(newImageCount).to.equal(initialImageCount + 1);
      cy.log('Image count increased by 1 as expected.');
    });
  });
});

afterEach(() => {
  // Teardown step to delete the newly created image
  cy.xpath('(//button[@type="button"])[10]').click();
  cy.xpath('//a[@data-testid="projects__actions__delete-photo-link"]').click({ force: true });
  cy.xpath('//button[@color="destroy"]').click({ force: true });
});
