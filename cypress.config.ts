const { defineConfig } = require("cypress");
import { configureAllureAdapterPlugins } from '@mmisty/cypress-allure-adapter/plugins';
const fs = require('fs-extra');

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/*.feature",
    baseUrl: "https://opensource-demo.orangehrmlive.com",
    async setupNodeEvents(on:any, config:any) {
      configureAllureAdapterPlugins(on, config);
      require('@cypress/grep/src/plugin')(config);

      // Create Task Reports directory before each run
      return require("./cypress/plugins")(on, config);
    },
    env: {
      allure: true,
      allureResultsPath: "allure-results",
      download_dir: './cypress/downloads',
      // allureReuseAfterSpec: true
    },
    reporter: 'mochawesome',
    reporterOptions: {
      mochaFile: 'cypress-results/cypress-report.xml',
      reportDir: 'cypress/results/mochawesome',
      overWrite: false,
      html: false,
      json: true,
      toConsole: true
    },
    videosFolder: 'allure-results/',
    screenshotOnRunFailure: true,  
    allureAttachRequests:true,
  },
});