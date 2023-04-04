class LeftNav {
  viewLiveStreamPage () {
    cy.contains('a span', 'Livestream').click()
  }
}

export default new LeftNav()