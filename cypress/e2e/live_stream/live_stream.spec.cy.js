import LeftNav from "../../support/PageObjects/LeftNav"
import LiveStreamPage from "../../support/PageObjects/LiveStreamPage"
import LoginPage from "../../support/PageObjects/LoginPage"
import NavBar from "../../support/PageObjects/NavBar"


describe('Live Streams', () => {
  const username = 'eduard.volynets+8@fortegrp.com'
  const password = Cypress.env('QA_TEST_PASSWORD')
  const currentDate = new Date()
  const currentTime = addZeroToTime(currentDate.getHours()) + ':' + addZeroToTime(currentDate.getMinutes())
  const futureStartTime = addZeroToTime(currentDate.getHours() + 1) + ':' + addZeroToTime(currentDate.getMinutes())

  function addZeroToTime(time) {
    return (time < 10 ? '0' : '') + time
  }

  beforeEach(() => {
    cy.loginApi(username, password)
    cy.visit('/')
  })
  
  context('Perform Actions on a Live Stream', () => {
    it('Creates a new live stream', () => {
      LoginPage.clickLoginButton()
      LeftNav.viewLiveStreamPage()
      cy.get('h3').should('be.visible').and('contain', 'Scheduled Streams')
      LiveStreamPage.clickCreateNewStreamButton()
      LiveStreamPage.enterStreamDetails(currentTime, 'Test Stream', 'Test Home Team', 'Test Opponent')
      LiveStreamPage.selectStreamingDevice('Android')
      LiveStreamPage.submitCreateLivestreamForm()
      cy.get('[data-testid="stream-create-success-text"]').should('be.visible')
    })

    // it('Edits new live stream details', () => {
    //   LoginPage.clickLoginButton()
    //   LeftNav.viewLiveStreamPage()
    //   cy.get('h3').should('be.visible').and('contain', 'Scheduled Streams')
    //   LiveStreamPage.editLiveStream()
    //   LiveStreamPage.enterStreamDetails(futureStartTime, 'Edit', 'Edit')
    //   LiveStreamPage.saveStreamEdits()
    //   cy.get('[data-testid="stream-create-success-text"]').should('have.text', 'Your changes are saved')
    // })

    it('Deletes the live stream and logs out', () => {
      LoginPage.clickLoginButton()
      LeftNav.viewLiveStreamPage()
      LiveStreamPage.deleteLiveStream()
      NavBar.clickAvatarAndLogout()
    })
  })
})
