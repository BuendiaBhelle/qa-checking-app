const app = require('express')();
const {Builder, By} = require("selenium-webdriver");
const config = require("../../config");
const logger = require('../../../../middleware/logger.js');
const server = require('../../../../server.js');

const lambdatest_site = config.lambdatest_site;
const lt_email = config.creds_lambdatest.email;
const lt_password = config.creds_lambdatest.password;


async function iphone_12_pro_max(url, email, password) {
    let driver = await new Builder().forBrowser("chrome").build();
    try {
        await driver.get(lambdatest_site);
        try {
            if ((email) && (password)) {
                await driver.findElement(By.id("email")).sendKeys(email);
                await driver.findElement(By.id("password")).sendKeys(password);
                logger.logger.log({ level: 'info', message: 'RESPONSIVENESS - edit credentials success.', tester: server.userId });
                console.log("RESPONSIVENESS - edit credentials success.");
            } else {
                await driver.findElement(By.id("email")).sendKeys(lt_email);
                await driver.findElement(By.id("password")).sendKeys(lt_password);
                logger.logger.log({ level: 'info', message: 'RESPONSIVENESS - same credentials.', tester: server.userId });
                console.log("RESPONSIVENESS - same credentials.");
            }
            await driver.findElement(By.id("login-button")).click();
            await driver.sleep(3000);
            let error_msg = await driver.executeScript("return document.getElementsByClassName('text-red-700')[0]");
            if (error_msg) {
                logger.logger.log({ level: 'error', message: 'RESPONSIVENESS - lambdatest login failed.', tester: server.userId });
                console.log("RESPONSIVENESS - lambdatest login failed.");
            } else {
                logger.logger.log({ level: 'info', message: 'RESPONSIVENESS - lambdatest login success.', tester: server.userId });
                console.log("RESPONSIVENESS - lambdatest login success.");
            }
        } catch (error) {
            logger.logger.log({ level: 'error', message: error, tester: server.userId });
            console.log(error);
        }
        await driver.findElement(By.id("input-text")).sendKeys(url);
        await driver.executeScript("return document.getElementsByClassName('img-responsive center-block')[1].click()");
        await driver.sleep(1000);
        await driver.executeScript("return document.getElementsByClassName('fa fa-apple')[7].click()");
        await driver.sleep(1000);
        await driver.executeScript("return document.getElementsByTagName('li')[144].click()");
        await driver.sleep(1000);
        await driver.findElement(By.className("btn-start")).click();
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
    }
}


module.exports = { iphone_12_pro_max };

    