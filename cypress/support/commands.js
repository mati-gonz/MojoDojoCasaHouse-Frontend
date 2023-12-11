// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/* eslint-disable */
Cypress.Commands.add('waitForGoogleMaps', () => {
  let mapWaitCount = 0
  const mapWaitMax = 7

  // const win = cy.state('window')
  // const document = win.document
  // const script = document.createElement('script')
  // script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCSpIgxEQ9ZdDskYTQq2UZJoG7thueHuJ0&libraries=places&callback=initMap"
  // script.async = true

  // document.head.appendChild(script)

  // cy.wait(2000)

  cyMapLoad()

  function cyMapLoad () {
    mapWaitCount++

    cy.window().then(win => {
      if (typeof win.google !== 'undefine') {
        console.log('Done')
        return true
      } else if (mapWaitCount <= mapWaitMax) {
        console.log('waiting')
        cy.wait(2000)
      } else if (mapWaitCount > mapWaitMax) {
        console.log('fail')
        return false
      }
    })
  }
})
