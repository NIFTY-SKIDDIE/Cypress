import '../support/commands';
import 'cypress-xpath';

// Import global credentials
const { email, password } = Cypress.env();

describe('Verify "Before & after" image creation flow ', () => {

    beforeEach(() => {
      cy.login(email, password); // Use global variables for credentials
      cy.selectProject();
    });
  
    it('Enables the "Create Before & After" button after selecting exactly two photos and validates new image creation', () => {
      // Check the first photo checkbox
      cy.selectPhotoByIndex(2);
  
      // Assert that the button is disabled
      cy.assertButtonDisabled('disabledButton');
  
      // Check the second photo checkbox to select two photos
      cy.selectPhotoByIndex(3);
  
      // Assert that the button is enabled
      cy.assertButtonEnabled('enabledButton');
  
      // Check the third photo checkbox to select three photos
      cy.selectPhotoByIndex(5);
  
      // Assert that the button is disabled again
      cy.assertButtonDisabled('disabledButton');
  
      // Uncheck the third photo to select exactly two photos
      cy.selectPhotoByIndex(5);
  
      // Assert that the button is enabled again
      cy.assertButtonEnabled('enabledButton');
  
      // Get the initial number of rows
      let initialRowCount;
      let initialLatestRowImageCount;
  
      cy.getInitialRowCount().then(count => {
        initialRowCount = count;
      });
  
      cy.getInitialLatestRowImageCount().then(imageCount => {
        initialLatestRowImageCount = imageCount;
      });
  
      // Click on the button to create "before and after"
      cy.createBeforeAndAfterImage();
  
      // Save the new image
      cy.saveImage();
  
      // Wait for the new image row to be added
      cy.waitForImageRowAdded();
  
      // Get the new number of rows
      cy.getNewRowCount().then(newRowCount => {
        // Get the new number of images in the latest row
        cy.getNewLatestRowImageCount().then(newLatestRowImageCount => {
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
