class NavBar {
  clickAvatarAndLogout () {
    cy.get('img[alt="avatar"]').click()
    cy.contains('div > span', 'Logout').click()
    cy.contains('button[type="button"]', 'Logout').click()
    cy.get('.MuiTypography-h2').should('have.text', 'Welcome')
  }
}

export default new NavBar()