const {Builder, By, Key, Capabilities} = require("selenium-webdriver");
const microsoftedge = require("@microsoft/edge-selenium-tools");
const logger = require('../../middleware/logger.js');
const server = require('../../server.js');
const sheet = require('../../middleware/gsheet.js');

let search_engine = "https://www.google.com/";
let value;
const module_name = "VISIBILITY";

//google chrome
async function searchability_chrome(site_name, timestamp) {
    let driver = await new Builder().forBrowser("chrome").build();
    try {
        await driver.get(search_engine);
        await driver.findElement(By.name("q")).sendKeys(site_name, Key.RETURN);
        logger.logger.log({ level: 'info', message: 'VISIBILITY - chrome success.', tester: server.userId });
        console.log("VISIBILITY - chrome success.");
        value = [ "", "", "info", "chrome success.", server.userId, timestamp, module_name, site_name, "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: 'VISIBILITY - chrome fail.', tester: server.userId });
        console.log("VISIBILITY - chrome fail.");
        value = [ "", "", "error", "chrome failed.", server.userId, timestamp, module_name, site_name, "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }
}


module.exports = { searchability_chrome };