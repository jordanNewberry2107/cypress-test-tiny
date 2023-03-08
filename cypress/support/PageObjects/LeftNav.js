class LeftNav {
  viewLiveStreamPage () {
    cy.get('a').contains('span', 'Live Stream').click()
  }
}

export default new LeftNav()