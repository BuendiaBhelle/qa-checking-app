const {Builder, By} = require("selenium-webdriver");
const logger = require('../../../middleware/logger.js');
const server = require('../../../server.js');
const sheet = require('../../../middleware/gsheet.js');
const config = require("../../../config.js");

var devices = config.devices.desktop;


async function manual(url, resolution, module_name, timestamp) {
    try {
        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get(url);  
        var index = resolution.indexOf("x");
        var height = resolution.length;
        var width = parseInt(resolution.substring(0, index));
        var height = parseInt(resolution.substring(index+1, height));
        console.log(width);
        console.log(height);
    
        await driver.manage().window().setRect({x: 0, y: 0, width: width, height: height});
        logger.logger.log({ level: 'info', message: 'open google chrome success.', tester: server.userId });
        console.log("open google chrome success.");
        value = [ "", "info", "open google chrome success.", server.userId, timestamp, module_name, url, "", "", "", "", "", "", devices + " - " + resolution, "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "error", JSON.stringify(error), server.userId, timestamp, module_name, url, "", "", "", "", "", "", devices + " - " + resolution, "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }
    // end test
    logger.logger.log({ level: 'info', message: 'test ends.', tester: server.userId });
    console.log("test ends.");
    value = [ "", "info", "test ends.", server.userId, timestamp, module_name, url, "", "", "", "", "", "", devices + " - " + resolution, "" ];
    await sheet.addRow();
    await sheet.appendValues(value);
}


module.exports = { manual };
