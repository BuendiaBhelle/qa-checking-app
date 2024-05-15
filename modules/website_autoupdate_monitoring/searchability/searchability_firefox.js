const {Builder, By, Key, Capabilities} = require("selenium-webdriver");
const microsoftedge = require("@microsoft/edge-selenium-tools");
const logger = require('../../middleware/logger.js');
const server = require('../../server.js');
const sheet = require('../../middleware/gsheet.js');

let search_engine = "https://www.google.com/";
let value;
const module_name = "VISIBILITY";


//firefox
async function searchability_firefox(site_name, timestamp) {
    let driver = await new Builder()
    .withCapabilities(Capabilities.firefox())
    .build();

    try {
        await driver.get(search_engine);
        await driver.findElement(By.name("q")).sendKeys(site_name, Key.RETURN);
        logger.logger.log({ level: 'info', message: 'VISIBILITY - firefox success.', tester: server.userId });
        console.log("VISIBILITY - firefox success.");
        value = [ "", "", "info", "firefox success.", server.userId, timestamp, module_name, site_name, "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: 'VISIBILITY - firefox fail.', tester: server.userId });
        console.log("VISIBILITY - firefox fail.");
        value = [ "", "", "error", "firefox failed.", server.userId, timestamp, module_name, site_name, "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }
}


module.exports = { searchability_firefox };