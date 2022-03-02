const {Builder, By, Key, Capabilities} = require("selenium-webdriver");
const microsoftedge = require("@microsoft/edge-selenium-tools");
const logger = require('../../middleware/logger.js');
const sheet = require('../../middleware/gsheet.js');
const server = require('../../server.js');

let search_engine = "https://www.google.com/";

//google chrome
async function chrome(site_name) {
    let driver = await new Builder().forBrowser("chrome").build();
    try {
        let value;
        await driver.get(search_engine);
        await driver.findElement(By.name("q")).sendKeys(site_name, Key.RETURN);
        logger.logger.log({ level: 'info', message: 'VISIBILITY - chrome success.', tester: server.userId });
        console.log("VISIBILITY - chrome success.");
        // value = "log1";
        // sheet.gsheet(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: 'VISIBILITY - chrome fail.', tester: server.userId });
        console.log("VISIBILITY - chrome fail.");
    }
}

//firefox
async function firefox(site_name) {
    let driver = await new Builder().forBrowser("firefox").build();
    try {
        await driver.get(search_engine);
        await driver.findElement(By.name("q")).sendKeys(site_name, Key.RETURN);
        logger.logger.log({ level: 'info', message: 'VISIBILITY - firefox success.', tester: server.userId });
        console.log("VISIBILITY - firefox success.");
    } catch (error) {
        logger.logger.log({ level: 'error', message: 'VISIBILITY - firefox fail.', tester: server.userId });
        console.log("VISIBILITY - firefox fail.");
    }
}

//microsoft edge
async function edge(site_name) {
    let options = new microsoftedge.Options().setEdgeChromium(true);
    let driver = microsoftedge.Driver.createSession(options);
    try {
        await driver.get(search_engine);
        await driver.findElement(By.name("q")).sendKeys(site_name, Key.RETURN);
        logger.logger.log({ level: 'info', message: 'VISIBILITY - edge success.', tester: server.userId });
        console.log("VISIBILITY - edge success.");
    } catch (error) {
        logger.logger.log({ level: 'error', message: 'VISIBILITY - edge fail.', tester: server.userId });
        console.log("VISIBILITY - edge fail.");
    }
}

module.exports = { chrome, firefox, edge };