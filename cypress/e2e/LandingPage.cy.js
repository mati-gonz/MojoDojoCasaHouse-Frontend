import './../support/commands'

/* eslint-disable */
describe('Landing Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')

    // Add google maps api to the head
    const win = cy.state('window')
    const document = win.document
    const script = document.createElement('script')
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCSpIgxEQ9ZdDskYTQq2UZJoG7thueHuJ0&libraries=places&callback=initMap'
    script.async = true

    document.head.appendChild(script)
    cy.intercept({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/mapsjs/gen_204?csp_test=true'}).as('googleMaps')
    cy.wait('@googleMaps', {timeout: 100000}).its('response.statusCode').should('equal', 200)  
  })

  it('the h1 contains the correct text', () => {
    cy.waitForGoogleMaps().then(() => {
      cy.get('h1').contains('PelisCerca')
    })
  })

  it('show and close the help menu', () => {
    cy.waitForGoogleMaps().then(() => {
      cy.get('[class=boton-ayuda]').click()

      cy.get('h2').contains('¡Bienvenido al menú de ayuda!')

      cy.get('[class=closeButton]').click()
      cy.get('h2').should('not.be.visible')
    })
  })

  it('complete the form', () => {
    cy.waitForGoogleMaps().then(() => {
      // Add movie title
      cy.get("[placeholder='Buscar película']").type('wonka')
      cy.get('#react-autowhatever-1', { timeout: 10000 }).should('be.visible')
      cy.get("[placeholder='Buscar película']").type('{downarrow}').wait(1000).type('{enter}')
      cy.get("[placeholder='Buscar película']").should('have.value', 'WONKA')

      // Add date of interest
      cy.get('[id=date]').type('11/12/2023').type('{enter}')

      // Add origin address
      cy.get('[name=location]').type('Av. Pdte. Kennedy 9531, vitacura, Las Condes, Chile', { delay: 100 })
      cy.get('.pac-item', { timeout: 10000 }).should('be.visible')
      cy.get('[name=location]').type('{downarrow}')//.wait(1000).type('{enter}')
      
      // Click submit button
      cy.get('[class=submitButton]').should('not.be.disabled').click()

      cy.wait(4000)
      // If all is correct should charge the next view
      cy.url().should('include', '/nearbyCinema')
    })
  })
})
