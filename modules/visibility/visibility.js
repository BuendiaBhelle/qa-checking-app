const {Builder, By, Key, Capabilities} = require("selenium-webdriver");
const microsoftedge = require("@microsoft/edge-selenium-tools");
const logger = require('../../middleware/logger.js');
const server = require('../../server.js');
const sheet = require('../../middleware/gsheet.js');

let search_engine = "https://www.google.com/";
let value;

//google chrome
async function chrome(site_name, timestamp) {
    let driver = await new Builder().forBrowser("chrome").build();
    try {
        await driver.get(search_engine);
        await driver.findElement(By.name("q")).sendKeys(site_name, Key.RETURN);
        logger.logger.log({ level: 'info', message: 'VISIBILITY - chrome success.', tester: server.userId });
        console.log("VISIBILITY - chrome success.");
        value = [
            "",
            "info",
            "VISIBILITY - chrome success.",
            server.userId,
            timestamp
        ]
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: 'VISIBILITY - chrome fail.', tester: server.userId });
        console.log("VISIBILITY - chrome fail.");
        value = [
            "",
            "error",
            "VISIBILITY - chrome failed.",
            server.userId,
            timestamp
        ]
        await sheet.addRow();
        await sheet.appendValues(value);
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
        value = [
            "",
            "info",
            "VISIBILITY - firefox success.",
            server.userId,
            timestamp
        ]
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: 'VISIBILITY - firefox fail.', tester: server.userId });
        console.log("VISIBILITY - firefox fail.");
        value = [
            "",
            "error",
            "VISIBILITY - firefox failed.",
            server.userId,
            timestamp
        ]
        await sheet.addRow();
        await sheet.appendValues(value);
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
        value = [
            "",
            "info",
            "VISIBILITY - edge success.",
            server.userId,
            timestamp
        ]
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: 'VISIBILITY - edge fail.', tester: server.userId });
        console.log("VISIBILITY - edge fail.");
        value = [
            "",
            "info",
            "VISIBILITY - edge failed.",
            server.userId,
            timestamp
        ]
        await sheet.addRow();
        await sheet.appendValues(value);
    }
}

module.exports = { chrome, firefox, edge };