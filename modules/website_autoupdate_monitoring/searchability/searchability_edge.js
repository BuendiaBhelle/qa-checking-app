const {Builder, By, Key, Capabilities} = require("selenium-webdriver");
const microsoftedge = require("@microsoft/edge-selenium-tools");
const logger = require('../../middleware/logger.js');
const server = require('../../server.js');
const sheet = require('../../middleware/gsheet.js');

let search_engine = "https://www.google.com/";
let value;
const module_name = "VISIBILITY";


//microsoft edge
async function searchability_edge(site_name, timestamp) {
    let driver = await new Builder().forBrowser('MicrosoftEdge').build();

    try {
        await driver.get(search_engine);
        await driver.findElement(By.name("q")).sendKeys(site_name, Key.RETURN);
        logger.logger.log({ level: 'info', message: 'VISIBILITY - edge success.', tester: server.userId });
        console.log("VISIBILITY - edge success.");
        value = [ "", "", "info", "edge success.", server.userId, timestamp, module_name, site_name, "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: 'VISIBILITY - edge fail.', tester: server.userId });
        console.log("VISIBILITY - edge fail.");
        value = [ "", "", "error", "edge failed.", server.userId, timestamp, module_name, site_name, "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }
    // end test
    logger.logger.log({ level: 'info', message: 'test ends.', tester: server.userId });
    console.log("test ends.");
    value = [ "", "", "info", "test ends.", server.userId, timestamp, module_name, site_name, "", "", "", "", "", "", "", "" ];
    await sheet.addRow();
    await sheet.appendValues(value);
}

module.exports = { searchability_edge };