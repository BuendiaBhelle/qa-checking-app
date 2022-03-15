const {Builder, By, Key} = require("selenium-webdriver");
const config = require("../image_optimization/config");
const logger = require('../../middleware/logger.js');
const server = require('../../server.js');
const sheet = require('../../middleware/gsheet.js');
const configMain = require('../../config.js');

const webpagetest_url = config.webpagetest_url;
const optimization_tab = config.optimization_tab;


async function imageOptimization(url) {
    let driver_web = await new Builder().forBrowser("chrome").build();
    // webpage test
    try {
        await driver_web.get(webpagetest_url);
        await driver_web.findElement(By.name("url")).sendKeys(url, Key.RETURN);
    
        await driver_web.sleep(40000);

        // let waiting = await driver_web.executeScript("return document.getElementsByClassName('is-active')[0].innerHTML");
        // if (waiting === "Waiting...") {
        //     console.log("Waiting...");
        //     await driver_web.sleep(10000);
        // }
        logger.logger.log({ level: 'info', message: 'IMAGE_OPTIMIZATION - webpagetest url success.', tester: server.userId });
        console.log("IMAGE_OPTIMIZATION - webpagetest url success.");
        value = [
            "",
            "info",
            "IMAGE_OPTIMIZATION - webpagetest url success.",
            server.userId,
            configMain.dateString
        ]
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [
            "",
            "error",
            JSON.stringify(error),
            server.userId,
            configMain.dateString
        ]
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    let performance_summary = await driver_web.executeScript("return document.getElementsByTagName('h2')[0].innerHTML");
    const current_url = await driver_web.getCurrentUrl();
    console.log("Current URL: " + current_url);
    const webpagetest_result_url = current_url + optimization_tab;

    // image optimization
    try {
        if (performance_summary === "Performance Summary") {
            await driver_web.switchTo().newWindow('tab');
            await driver_web.get(webpagetest_result_url);
        
            console.log("Webpagetest Result URL: " + webpagetest_result_url);
            logger.logger.log({ level: 'info', message: 'IMAGE_OPTIMIZATION - image optimization page success.', tester: server.userId });
            console.log("IMAGE_OPTIMIZATION - image optimization page success.");
            value = [
                "",
                "info",
                "IMAGE_OPTIMIZATION - image optimization page success.",
                server.userId,
                configMain.dateString
            ]
            await sheet.addRow();
            await sheet.appendValues(value);
        }
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [
            "",
            "error",
            JSON.stringify(error),
            server.userId,
            configMain.dateString
        ]
        await sheet.addRow();
        await sheet.appendValues(value);
    }
}


module.exports = { imageOptimization };