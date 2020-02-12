import SuiteInfo = jasmine.SuiteInfo;

const jasmineReporters = require("jasmine-reporters");
const SpecReporter = require("jasmine-spec-reporter").SpecReporter;

const junitReporter = new jasmineReporters.JUnitXmlReporter({
  consolidateAll: false,
  savePath: "junit",
  filePrefix: new Date().getTime().toString().concat("_")
});

const specReporter = new SpecReporter({
  spec: {
    displayStacktrace: true,
    displayDuration: true,
    displayFailuresSummary: true,
    displayFailuredSpec: true,
    displaySuiteNumber: true,
    displaySpecDuration: true,
    colors: {
      success: "green",
      failure: "red",
      pending: "yellow"
    }
  }
});

jasmine.getEnv().addReporter(junitReporter);
jasmine.getEnv().addReporter(specReporter);
