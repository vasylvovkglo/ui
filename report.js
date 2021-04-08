var reporter = require('cucumber-html-reporter');
var os = require('os');
const { browser, report } = require('./config')
const fs = require('fs');

var options = {
    theme: 'bootstrap',
    jsonFile: report + '.json',
    output: report + '.html',
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    metadata: {
        'node': process.versions.node,
        'Platform': os.platform(),
        'kernel': os.release(),
        'arch': os.arch(),
        'browser': browser,
        'report generated': new Date().toISOString()
    }
};

reporter.generate(options);