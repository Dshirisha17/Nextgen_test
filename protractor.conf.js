const path = require('path');
const JasmineReporters = require('jasmine-reporters');
const HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub', // Address of the Selenium server
  specs: ['./dist/out-tsc/e2e-spec.js'],
  baseUrl: 'http://10.10.1.135:400/home', // URL of your application
  capabilities: {
    browserName: 'chrome'
  },
  onPrepare() {
    // Register ts-node to transpile TypeScript files
    require('ts-node').register({
      project: path.join(__dirname, './tsconfig.json')
    });

    // Add JUnit XML Reporter to generate XML reports
    jasmine.getEnv().addReporter(new JasmineReporters.JUnitXmlReporter({
      savePath: 'test-results/xml-report',
      consolidateAll: false
    }));

    // Add Beautiful Reporter to generate HTML reports
    jasmine.getEnv().addReporter(new HtmlReporter({
      baseDirectory: 'test-results/html-report',
      screenshotsSubfolder: 'images',
      jsonsSubfolder: 'jsons',
      docName: 'report.html',
      preserveDirectory: false,
      takeScreenShotsOnlyForFailedSpecs: true,
      
    }).getJasmine2Reporter());
  }
};
