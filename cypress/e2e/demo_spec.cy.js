import 'cypress-xpath';

describe('Verify "Before & after" image creation flow', () => {

  beforeEach(() => {
    // Visit the login page and login
    cy.visit('https://app.companycam.com/users/sign_in');
    cy.xpath('//*[@id="user_email_address"]').type('contact+test@samshapira.com');
    cy.xpath('//*[@id="user_password"]').type('100321AbCd$');
    cy.get('input[value="Sign In"]').click();

    // Click on the project
    cy.get('.projects-list__project').first().click();

    // Wait for the redirect to the project page with photos
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

    // Get the initial number of rows
    let initialRowCount;
    let initialLatestRowImageCount;

    cy.xpath("(//div[@class='sc-LzMkU kRyFGe'])").then($rows => {
      initialRowCount = $rows.length;

      // Get the initial number of images in the latest row
      cy.get('.sc-LzMkU.kRyFGe').last().then($lastRow => {
        initialLatestRowImageCount = $lastRow.find('.sc-LzMDr.gNjBec').length;
      });
    });

    // Click on the button to create a "before and after" image
    cy.xpath("//div[@class='sc-LzMBB guKaWq']/button[1]").first().click();

    // Save the new image
    cy.xpath("//a[normalize-space()='Save']").first().click();

    // Wait for the new image row/image to be added
    cy.wait(3000); 

    // Get the new number of rows
    cy.xpath("(//div[@class='sc-LzMkU kRyFGe'])").then($rows => {
      const newRowCount = $rows.length;

      // Get the new number of images in the latest row
      cy.get('.sc-LzMkU.kRyFGe').last().then($lastRow => {
        const newLatestRowImageCount = $lastRow.find('.sc-LzMDr.gNjBec').length;

        // Assert that the number of rows has increased by 1 or the number of images in the latest row has increased by 1
        if (newRowCount > initialRowCount) {
          expect(newRowCount).to.equal(initialRowCount + 1);
        } else {
          expect(newLatestRowImageCount).to.equal(initialLatestRowImageCount + 1);
        }
      });
    });
  });
});
