const {Builder, By, Key} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../../../config");
const logger = require('../../../../../../middleware/logger.js');
const server = require('../../../../../../server.js');
const sheet = require('../../../../../../middleware/gsheet.js');

const wp_username = config.credentials.accidentchiropracticaz.username;
const wp_password = config.credentials.accidentchiropracticaz.password;
const auth = config.auth;
const spreadsheetId = config.spreadsheetId;
const form_page = config.forms.accidentchiropracticaz.form2;
const module_name = config.module_name;
const launch = config.launch.dev;
const form = config.webforms.accidentchiropracticaz.dev.form2;


async function wordpressFinish(domain, username, password, timestamp) {
    const wp_site = domain + "wp-admin";
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })

    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get(wp_site);
    
    // wp login
    try {
        if ((username) && (password)) {
            await driver.findElement(By.name("log")).sendKeys(username);
            await driver.findElement(By.name("pwd")).sendKeys(password);
            logger.logger.log({ level: 'info', message: 'WEBFORMS - edit credentials success.', tester: server.userId });
            console.log("WEBFORMS - edit credentials success.");
            value = [ "", "info", "edit credentials success.", server.userId, timestamp, module_name, domain, username + "\n" + password, "", "", launch, "", form_page + "\n" + form, "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        } else {
            await driver.findElement(By.name("log")).sendKeys(wp_username);
            await driver.findElement(By.name("pwd")).sendKeys(wp_password);
            logger.logger.log({ level: 'info', message: 'WEBFORMS - same credentials.', tester: server.userId });
            console.log("WEBFORMS - same credentials.");
            value = [ "", "info", "same credentials.", server.userId, timestamp, module_name, domain, wp_username + "\n" + wp_password, "", "", launch, "", form_page + "\n" + form, "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }

        await driver.findElement(By.id("wp-submit")).click();

        let login_error = await driver.executeScript("return document.getElementById('login_error')");
        if (login_error) {
            logger.logger.log({ level: 'error', message: 'WEBFORMS - wordpress login failed.', tester: server.userId });
            console.log("WEBFORMS - wordpress login failed.");
            value = [ "", "error", "wordpress login failed.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", form_page + "\n" + form, "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        } else {
            logger.logger.log({ level: 'info', message: 'WEBFORMS - wordpress login success.', tester: server.userId });
            console.log("WEBFORMS - wordpress login success.");
            value = [ "", "info", "wordpress login success.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", form_page + "\n" + form, "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }

        var admin_email_verification = await driver.executeScript("return document.querySelector('form').classList.contains('admin-email-confirm-form')");  
        if (admin_email_verification === true) {
            await driver.executeScript("return document.getElementsByTagName('a')[3].click()");
            logger.logger.log({ level: 'info', message: 'WEBFORMS - admin email verification.', tester: server.userId });
            console.log("WEBFORMS - admin email verification.");
            value = [ "", "info", "admin email verification.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", form_page + "\n" + form, "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        } else {
            logger.logger.log({ level: 'info', message: 'WEBFORMS - no admin email verification.', tester: server.userId });
            console.log("WEBFORMS - no admin email verification.");
            value = [ "", "info", "no admin email verification", server.userId, timestamp, module_name, domain, "", "", "", launch, "", form_page + "\n" + form, "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, "", form_page + "\n" + form, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    await driver.executeScript("return document.getElementsByClassName('wp-menu-name')[8].click()");
    
    // put back original form recipients
    try {
        await driver.executeScript("return document.getElementsByClassName('row-title')[1].click()");
        await driver.findElement(By.id("ui-id-2")).click();

        await driver.findElement(By.id("wpcf7-mail-recipient")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
        
        let orig_recipients_data = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "Accident Chiropractic!H2",
        });
    
        let orig_recipients = orig_recipients_data.data.values[0][0];
    
        console.log("orig_recipients: " + orig_recipients);
        
        await driver.findElement(By.id("wpcf7-mail-recipient")).sendKeys(orig_recipients);
        await driver.executeScript("return document.getElementsByName('wpcf7-save')[2].click()");
        logger.logger.log({ level: 'info', message: 'WEBFORMS - put original form recipients success.', tester: server.userId });
        console.log("WEBFORMS - put original form recipients success.");
        value = [ "", "info", "put original form recipients success", server.userId, timestamp, module_name, domain, "", "", "", launch, "", form_page + "\n" + form, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, "", form_page + "\n" + form, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }
    // end test
    logger.logger.log({ level: 'info', message: 'test ends.', tester: server.userId });
    console.log("test ends.");
    value = [ "", "info", "test ends.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", form_page + "\n" + form, "", "" ];
    await sheet.addRow();
    await sheet.appendValues(value);

    return true;

}



module.exports = { wordpressFinish };
