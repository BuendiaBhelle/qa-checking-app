const {Builder, By} = require("selenium-webdriver");
const logger = require('../../../middleware/logger.js');
const server = require('../../../server.js');
const sheet = require('../../../middleware/gsheet.js');


async function desktop(module_name, url, email, password, timestamp, lt_email, lt_password, lambdatest_site, devices, versions, device_desktop) {
    let driver = await new Builder().forBrowser("chrome").build();
    try {
        await driver.get(lambdatest_site);
        try {
            if ((email) && (password)) {
                await driver.findElement(By.id("email")).sendKeys(email);
                await driver.findElement(By.id("password")).sendKeys(password);
                logger.logger.log({ level: 'info', message: 'RESPONSIVENESS - edit credentials success.', tester: server.userId });
                console.log("RESPONSIVENESS - edit credentials success.");
                value = [ "", "", "info", "edit credentials success.", server.userId, timestamp, module_name, url, "", email + "\n" + password, "", "", "", "", devices, versions ];
                await sheet.addRow();
                await sheet.appendValues(value);
            } else {
                await driver.findElement(By.id("email")).sendKeys(lt_email);
                await driver.findElement(By.id("password")).sendKeys(lt_password);
            }
            await driver.findElement(By.id("login-button")).click();
            await driver.sleep(3000);
            let error_msg1 = await driver.executeScript("return document.getElementsByClassName('text-red-700')[0]");
            let error_msg2 = await driver.executeScript("return document.getElementsByClassName('error-mass')[0]");
            if (error_msg1 || error_msg2) {
                logger.logger.log({ level: 'error', message: 'RESPONSIVENESS - lambdatest login failed.', tester: server.userId });
                console.log("RESPONSIVENESS - lambdatest login failed.");
                value = [ "", "", "error", "lambdatest login failed.", server.userId, timestamp, module_name, url, "", "", "", "", "", "", devices, versions ];
                await sheet.addRow();
                await sheet.appendValues(value);
            } else {
                logger.logger.log({ level: 'info', message: 'RESPONSIVENESS - lambdatest login success.', tester: server.userId });
                console.log("RESPONSIVENESS - lambdatest login success.");
                value = [ "", "", "info", "lambdatest login success.", server.userId, timestamp, module_name, url, "", "", "", "", "", "", devices, versions ];
                await sheet.addRow();
                await sheet.appendValues(value);
            }
        } catch (error) {
            logger.logger.log({ level: 'error', message: error, tester: server.userId });
            console.log(error);
            value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, url, "", "", "", "", "", "", devices, versions ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }
        await driver.findElement(By.id("input-text")).sendKeys(url);
        await driver.sleep(1000);

        let os_length = await driver.executeScript("return document.getElementsByClassName('list-unstyled real-browser-test__list-os')[0].children.length");
        for (let index = 0; index < os_length; index++) {
            let os_innerhtml = await driver.executeScript("return document.getElementsByClassName('list-unstyled real-browser-test__list-os')[0].children[" + index + "].innerText");
            console.log(os_innerhtml);
            if (os_innerhtml === device_desktop) {
                console.log("os_innerhtml: " + os_innerhtml);
                console.log("device_desktop: " + device_desktop);
                await driver.executeScript("return document.getElementsByClassName('list-unstyled real-browser-test__list-os')[0].children[" + index + "].click()");
                await driver.findElement(By.className("btn-start")).click();
            }
        }
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, url, "", "", "", "", "", "", devices, versions ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }
    // end test
    logger.logger.log({ level: 'info', message: 'test ends.', tester: server.userId });
    console.log("test ends.");
    value = [ "", "", "info", "test ends.", server.userId, timestamp, module_name, url, "", "", "", "", "", "", devices, versions ];
    await sheet.addRow();
    await sheet.appendValues(value);
}


module.exports = { desktop };

    