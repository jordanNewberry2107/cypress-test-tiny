const { defineConfig } = require("cypress")
const fs = require('fs-extra')
const path = require('path')

function getConfigurationByFile (file, options = {}) {
  const pathToConfigFile = path.resolve(
    '..',
    'rr-web-tests/cypress/configFiles',
   `${file}.json`
  )
  const config = fs.readJson(pathToConfigFile)
  return Object.assign(config, options)

}

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  experimentalModifyObstructiveThirdPartyCode: true,
  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,
  modifyObstructiveCode: true,
  retries: {
    runMode: 1,
    openMode: 0
  },
  projectId: "5k3zed",
  e2e: {
    experimentalSessionAndOrigin: true,
    setupNodeEvents(on, config) {
      const file = config.env.fileConfig || 'staging'
      return getConfigurationByFile(file, config.env)
    },
  },
});

