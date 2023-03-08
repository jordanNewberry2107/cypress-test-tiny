class LiveStreamPage {
  clickCreateNewStreamButton () {
    cy.get('div').contains('a', 'Create new stream').click({force: true})
  }

  clickNextButton () {
    cy.get('button[type="button"] > span').should('contain', 'Create Livestream').click({force: true})
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


  enterStreamDetails (time, eventName, opponent) {
    cy.get('[data-cy="stream-form-start"] > div > div > div > input').click()
    cy.get('div.react-datepicker-time__input > .react-datepicker-time__input').click().type(time)
    cy.get('[data-cy="stream-form-title"] label > div > input').click({force: true}).type(eventName)
    cy.get('[data-cy="stream-form-opponent"] label > div > input').click().type(opponent)
  }

  saveStreamEdits () {
    cy.contains('button[type="button"]', 'Save').click()
  }

  selectIOSStreamingDevice () {
    cy.get('[data-cy="stream-form-streaming-type"] > div > div > div').click({force: true}).type('{downArrow}{enter}')
  }

  selectAndroidStreamingDevice () {
    cy.get('[data-cy="stream-form-streaming-type"] > div > div > div').click({force: true}).type('{downArrow}{downArrow}{enter}')
  }
}

export default new LiveStreamPage()