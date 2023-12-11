/* eslint-disable */
describe('NearbyCinemas Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
  
      // Add google maps api to the head
      const win = cy.state('window')
      const document = win.document
      const script = document.createElement('script')
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCSpIgxEQ9ZdDskYTQq2UZJoG7thueHuJ0&libraries=places&callback=initMap'
      script.async = true
  
      document.head.appendChild(script)
      cy.wait(10000)
      cy.log(win.google)
      cy.waitForGoogleMaps()
    })
  
    it('the h2 contains the correct text when there is not functions', () => {
      cy.waitForGoogleMaps().then(() => {
        cy.get("[placeholder='Buscar película']").type('wonka')
        cy.get('#react-autowhatever-1', { timeout: 10000 }).should('be.visible')
        cy.get("[placeholder='Buscar película']").type('{downarrow}').wait(1000).type('{enter}')
        cy.get("[placeholder='Buscar película']").should('have.value', 'WONKA')
  
        // Add date of interest
        cy.get('[id=date]').type('17/12/2023').type('{enter}')
  
        // Add origin address
        cy.get('[name=location]').type('Av. Pdte. Kennedy 9531, vitacura, Las Condes, Chile', { delay: 100 })
        cy.get('.pac-item', { timeout: 10000 }).should('be.visible')
        cy.get('[name=location]').type('{downarrow}')//.wait(1000).type('{enter}')
        
        // Click submit button
        cy.get('[class=submitButton]').should('not.be.disabled').click()
  
        cy.wait(4000)
        // If all is correct should charge the next view
        cy.url().should('include', '/nearbyCinema')

        cy.wait(4000)

        cy.get('h2').contains('Ups! No se encontraron funciones para esta fecha')
      })
    })

    // it.only('the h3 contains the correct text when there at least a function', () => {
    //     cy.waitForGoogleMaps().then(() => {
    //       cy.get("[placeholder='Buscar película']").type('wonka')
    //       cy.get('#react-autowhatever-1', { timeout: 10000 }).should('be.visible')
    //       cy.get("[placeholder='Buscar película']").type('{downarrow}').wait(1000).type('{enter}')
    //       cy.get("[placeholder='Buscar película']").should('have.value', 'WONKA')
    
    //       // Add date of interest
    //       cy.get('[id=date]').type('12/12/2023').type('{enter}')
    
    //       // Add origin address
    //       cy.get('[name=location]').type('Av. Pdte. Kennedy 9531, vitacura, Las Condes, Chile', { delay: 100 })
    //       cy.get('.pac-item', { timeout: 10000 }).should('be.visible')
    //       cy.get('[name=location]').type('{downarrow}')//.wait(1000).type('{enter}')
          
    //       // Click submit button
    //       cy.get('[class=submitButton]').should('not.be.disabled').click()
    
    //       cy.wait(4000)
    //       // If all is correct should charge the next view
    //       cy.url().should('include', '/nearbyCinema')
  
    //       cy.wait(4000)
  
    //       cy.get('h3').contains('Cines Disponibles para ver: WONKA')
    //     })
    //   })
  })
  