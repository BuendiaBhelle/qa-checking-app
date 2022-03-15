const {Builder, By, Key} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../../../config");
const logger = require('../../../../../../middleware/logger.js');
const server = require('../../../../../../server.js');
const sheet = require('../../../../../../middleware/gsheet.js');
const configMain = require('../../../../../../config.js');

const wp_username = config.credentials.indinspect.username;
const wp_password = config.credentials.indinspect.password;


async function wordpressFinish(domain, checkbox, username, password) {
    const wp_site = domain + "wp-admin";

    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get(wp_site);
    
    // wp login
    try {
        if ((username) && (password)) {
            await driver.findElement(By.name("log")).sendKeys(username);
            await driver.findElement(By.name("pwd")).sendKeys(password);
            logger.logger.log({ level: 'info', message: 'WEBFORMS - edit credentials success.', tester: server.userId });
            console.log("WEBFORMS - edit credentials success.");
            value = [
                "",
                "info",
                "WEBFORMS - edit credentials success.",
                server.userId,
                configMain.dateString
            ]
            await sheet.addRow();
            await sheet.appendValues(value);
        } else {
            await driver.findElement(By.name("log")).sendKeys(wp_username);
            await driver.findElement(By.name("pwd")).sendKeys(wp_password);
            logger.logger.log({ level: 'info', message: 'WEBFORMS - same credentials.', tester: server.userId });
            console.log("WEBFORMS - same credentials.");
            value = [
                "",
                "info",
                "WEBFORMS - same credentials.",
                server.userId,
                configMain.dateString
            ]
            await sheet.addRow();
            await sheet.appendValues(value);
        }

        await driver.findElement(By.id("wp-submit")).click();

        let login_error = await driver.executeScript("return document.getElementById('login_error')");
        if (login_error) {
            logger.logger.log({ level: 'error', message: 'WEBFORMS - wordpress login failed.', tester: server.userId });
            console.log("WEBFORMS - wordpress login failed.");
            value = [
                "",
                "error",
                "WEBFORMS - wordpress login failed.",
                server.userId,
                configMain.dateString
            ]
            await sheet.addRow();
            await sheet.appendValues(value);
        } else {
            logger.logger.log({ level: 'info', message: 'WEBFORMS - wordpress login success.', tester: server.userId });
            console.log("WEBFORMS - wordpress login success.");
            value = [
                "",
                "info",
                "WEBFORMS - wordpress login success.",
                server.userId,
                configMain.dateString
            ]
            await sheet.addRow();
            await sheet.appendValues(value);
        }

        var admin_email_verification = await driver.executeScript("return document.querySelector('form').classList.contains('admin-email-confirm-form')");  
        if (admin_email_verification === true) {
            await driver.executeScript("return document.getElementsByTagName('a')[3].click()");
            logger.logger.log({ level: 'info', message: 'WEBFORMS - admin email verification.', tester: server.userId });
            console.log("WEBFORMS - admin email verification.");
            value = [
                "",
                "info",
                "WEBFORMS - admin email verification.",
                server.userId,
                configMain.dateString
            ]
            await sheet.addRow();
            await sheet.appendValues(value);
        } else {
            logger.logger.log({ level: 'info', message: 'WEBFORMS - no admin email verification.', tester: server.userId });
            console.log("WEBFORMS - no admin email verification.");
            value = [
                "",
                "info",
                "WEBFORMS - no admin email verification.",
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

    await driver.executeScript("return document.getElementsByClassName('wp-menu-name')[6].click()");
    await driver.executeScript("return document.getElementsByTagName('a')[210].click()");

    // set admin notif to active
    let admin_notif_status = await driver.executeScript("return document.getElementsByClassName('gform-status-indicator-status')[0].innerHTML");
    console.log("admin_notif_status: " + admin_notif_status);

    try {
        if (admin_notif_status === "Inactive") {
            await driver.executeScript("return document.getElementsByClassName('gform-status-indicator-status')[0].click()");
        }
        logger.logger.log({ level: 'info', message: 'WEBFORMS - set admin notif to active success.', tester: server.userId });
        console.log("WEBFORMS - set admin notif to active success.");
        value = [
            "",
            "info",
            "WEBFORMS - set admin notif to active success.",
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

    // set qa notif to inactive
    let qa_notif_status = await driver.executeScript("return document.getElementsByClassName('gform-status-indicator-status')[1].innerHTML");
    console.log("qa_notif_status: " + qa_notif_status);

    try {
        if (qa_notif_status === "Active") {
            await driver.executeScript("return document.getElementsByClassName('gform-status-indicator-status')[1].click()");
        }
        logger.logger.log({ level: 'info', message: 'WEBFORMS - set qa notif to inactive success.', tester: server.userId });
        console.log("WEBFORMS - set qa notif to inactive success.");
        value = [
            "",
            "info",
            "WEBFORMS - set qa notif to inactive success.",
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

    return true;

}



module.exports = { wordpressFinish };
