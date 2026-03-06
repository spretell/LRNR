// cypress e2e tests

// group of tests related to homepage
describe("Homepage", () => {
  // test that the homepage loads correctly
  it("loads the homepage successfully", () => {
    // visit root url of app
    cy.visit("/");
    // verify hero test appears on page
    cy.contains(/your personalized quiz journey starts here/i).should("exist");
  });

  // test that the main call-to-action button is visible on the homepage
  it("shows the main call-to-action button", () => {
    // open homepage
    cy.visit("/");
    // check that 'get started' button is visible on page
    cy.contains("button", /get started/i).should("be.visible");
  });

  // test nav when the user clicks the get started button
  it("clicking Get Started goes to /auth", () => {
    // open homepage
    cy.visit("/");
    // simulate a user clicking the 'get started' button
    cy.contains("button", /get started/i).click();
    // confirm url changed to auth page
    cy.url().should("include", "/auth");
  });

  // test nav when the user clicks login in the navbar
  it("clicking Login in the navbar goes to /auth", () => {
    // open homepage
    cy.visit("/");
    // simulate a user clicking the 'login' button in the navbar
    cy.contains("button", /login/i).click();
    // verify the user is redirected to auth page
    cy.url().should("include", "/auth");
  });
});
