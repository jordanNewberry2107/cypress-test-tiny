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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('loginApi', (username, password) => {
  cy.session([username, password], () => {
    cy.request({
      method: 'POST',
      url: Cypress.config('userServiceUrl') + '/oauth/token',
      body: {
        client_id: Cypress.env('LOGIN_CLIENT_ID'),
        client_secret: Cypress.env('LOGIN_CLIENT_SECRET'),
        grant_type: 'password',
        username,
        password,
        redirect_uri: Cypress.config('statNginUrl')
      }
    }).then((response) => {
      const bearerToken = response.body.access_token
      expect(response.status).to.eq(200)
      cy.request({
        url: Cypress.config('userServiceUrl') + '/users/create',
        headers: { Authorization: 'Bearer ' + bearerToken }
      })
    })
  })
})   