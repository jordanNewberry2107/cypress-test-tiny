class LiveStreamPage {
  clickCreateNewStreamButton () {
    cy.get('div').contains('a', 'Create new stream').click({force: true})
  }

  submitCreateLivestreamForm () {
    cy.contains('button > span', 'Create Livestream').click({force: true})
  }

  deleteLiveStream () {
    cy.get('img[alt="Stream thumbnail"]').first().click()
    cy.contains('button', 'Delete Stream').click()
  }

  editLiveStream () {
    cy.get('img[alt="Stream thumbnail"]').first().click()
    cy.contains('a', 'Edit Details').click()
  }

  enterStream () {
    cy.wait(15000)
    cy.wait('@graphQlData').its('response.statusCode').should('equal', 200)
    cy.get('._thumbnail_3vase_30').click()
    cy.get('._dropdown_3vase_128 > :nth-child(2)').click()
    cy.wait(15000)
    cy.visit('https://dev.rapidreplay.co/live-stream/63ebaf00ee95622efcd15050?site=true')
    cy.wait('@graphQlData').its('response.statusCode').should('equal', 200)

    console.log(Cypress.session.getCurrentSessionData)
  }


  enterStreamDetails (time, eventName, homeTeam, opponent) {
    cy.wait(1000)
    cy.get('[data-cy="stream-form-start"] > div div > div > input').click({force: true}).then(() => {
      cy.get('input.react-datepicker-time__input').type(time, {force: true})
      // cy.get('div.react-datepicker__day[aria-selected="true"]').click({force: true})
    })
    cy.get('#page-container').click({force: true})
    cy.get('[data-cy="stream-form-title"] label > div > input').type(eventName)
    cy.get('[data-cy="tournament-home-team"] label div > input').type(homeTeam)
    cy.get('[data-cy="tournament-away-team"] label div > input').type(opponent)
  }

  saveStreamEdits () {
    cy.contains('button[type="button"]', 'Save').click()
  }

  selectStreamingDevice (deviceName) {
    cy.get('[data-cy="stream-form-streaming-type"] > div > div > div').click({force: true}).type(`${deviceName}{enter}`)
  }
}

export default new LiveStreamPage()