class LoginPage {
  clickLoginButton () {
    cy.get('.MuiButtonBase-root').click()
  }
}

export default new LoginPage()