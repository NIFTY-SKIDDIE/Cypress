import '../support/commands';
import 'cypress-xpath';

describe('Verify "Before & after" image creation flow', () => {
  beforeEach(() => {
    // Set up - Navigate to website and login
    cy.login();
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

    // Get the initial number of images
    let initialImageCount;

    cy.getInitialImageCount().then(count => {
      initialImageCount = count;
      cy.log(`Initial Image Count: ${initialImageCount}`);
    });

    // Click on the button to create a "before and after" image
    cy.createBeforeAndAfterImage();

    // Save the new image
    cy.saveImage();

    // Wait for the new image to load
    cy.log('Waiting for the new image to load...');
    cy.waitForNewImage();
    cy.log('New image loaded.');
    // cy.wait(3000); //replaced the static wait with an explicit wait method to wait for the GET request to return a 200

    // Get the new number of images after creating the image
    cy.getNewImageCount().then(newImageCount => {
      cy.log(`New Image Count: ${newImageCount}`);

      // Assert that the number of images has increased by 1
      expect(newImageCount).to.equal(initialImageCount + 1);
      cy.log('Total Image count increased by 1 as expected.');
    });
  });

  afterEach(() => {
    // Teardown step to delete the newly created image
    cy.deleteNewlyCreatedImage();
    cy.log("***Test passed***");
  });
});
