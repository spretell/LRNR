describe('LRNR homepage tests', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('loads the homepage', () => {
    cy.get('body').should('exist')
  })

  it('shows the navigation bar', () => {
    cy.get('nav').should('exist')
  })

  it('has links on the page', () => {
    cy.get('a').should('have.length.at.least', 1)
  })

  it('shows the footer', () => {
    cy.get('footer').should('exist')
  })

})