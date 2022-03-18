const app = require('express')();
const {Builder, By} = require("selenium-webdriver");
const config = require("../../config");
const logger = require('../../../../middleware/logger.js');
const server = require('../../../../server.js');
const sheet = require('../../../../middleware/gsheet.js');

const lambdatest_site = config.lambdatest_site;
const lt_email = config.creds_lambdatest.email;
const lt_password = config.creds_lambdatest.password;
const module_name = config.module_name;
const device = config.devices.mobile;
const version = config.versions.mobile.version3;


async function oneplus_9(url, email, password, timestamp) {
    let driver = await new Builder().forBrowser("chrome").build();
    try {
        await driver.get(lambdatest_site);
        try {
            if ((email) && (password)) {
                await driver.findElement(By.id("email")).sendKeys(email);
                await driver.findElement(By.id("password")).sendKeys(password);
                logger.logger.log({ level: 'info', message: 'RESPONSIVENESS - edit credentials success.', tester: server.userId });
                console.log("RESPONSIVENESS - edit credentials success.");
                value = [ "", "info", "edit credentials success.", server.userId, timestamp, module_name, url, "", email + "\n" + password, "", "", "", "", device, version ];
                await sheet.addRow();
                await sheet.appendValues(value);
            } else {
                await driver.findElement(By.id("email")).sendKeys(lt_email);
                await driver.findElement(By.id("password")).sendKeys(lt_password);
                logger.logger.log({ level: 'info', message: 'RESPONSIVENESS - same credentials.', tester: server.userId });
                console.log("RESPONSIVENESS - same credentials.");
                value = [ "", "info", "same credentials.", server.userId, timestamp, module_name, url, "", lt_email + "\n" + lt_password, "", "", "", "", device, version ];
                await sheet.addRow();
                await sheet.appendValues(value);
            }
            await driver.findElement(By.id("login-button")).click();
            await driver.sleep(3000);
            let error_msg1 = await driver.executeScript("return document.getElementsByClassName('text-red-700')[0]");
            let error_msg2 = await driver.executeScript("return document.getElementsByClassName('error-mass')[0]");
            if (error_msg1 || error_msg2) {
                logger.logger.log({ level: 'error', message: 'RESPONSIVENESS - lambdatest login failed.', tester: server.userId });
                console.log("RESPONSIVENESS - lambdatest login failed.");
                value = [ "", "error", "lambdatest login failed.", server.userId, timestamp, module_name, url, "", "", "", "", "", "", device, version ];
                await sheet.addRow();
                await sheet.appendValues(value);
            } else {
                logger.logger.log({ level: 'info', message: 'RESPONSIVENESS - lambdatest login success.', tester: server.userId });
                console.log("RESPONSIVENESS - lambdatest login success.");
                value = [ "", "info", "lambdatest login success.", server.userId, timestamp, module_name, url, "", "", "", "", "", "", device, version ];
                await sheet.addRow();
                await sheet.appendValues(value);
            }
        } catch (error) {
            logger.logger.log({ level: 'error', message: error, tester: server.userId });
            console.log(error);
            value = [ "", "error", JSON.stringify(error), server.userId, timestamp, module_name, url, "", "", "", "", "", "", device, version ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }
        await driver.findElement(By.id("input-text")).sendKeys(url);
        await driver.executeScript("return document.getElementsByClassName('img-responsive center-block')[1].click()");
        await driver.sleep(1000);
        await driver.executeScript("return document.getElementsByTagName('li')[201].click()");
        await driver.sleep(1000);
        await driver.findElement(By.className("btn-start")).click();
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "error", JSON.stringify(error), server.userId, timestamp, module_name, url, "", "", "", "", "", "", device, version ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }
}


module.exports = { oneplus_9 };

    