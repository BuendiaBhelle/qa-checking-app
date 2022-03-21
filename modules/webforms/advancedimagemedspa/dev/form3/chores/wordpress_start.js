const {Builder, By, Key} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../../../config");
const logger = require('../../../../../../middleware/logger.js');
const server = require('../../../../../../server.js');
const sheet = require('../../../../../../middleware/gsheet.js');

const wp_username = config.credentials.advancedimagemedspa.username;
const wp_password = config.credentials.advancedimagemedspa.password;
const qa_email = config.qa_email;
const auth = config.auth;
const spreadsheetId = config.spreadsheetId;
const date = config.date;
const form_page_dev = config.forms.advancedimagemedspa.form3_dev;
const form_page_live = config.forms.advancedimagemedspa.form3_live;
const module_name = config.module_name;
const launch = config.launch.dev;
const form = config.webforms.advancedimagemedspa.dev.form3;


async function wordpressStart(domain, checkbox, username, password, email, timestamp) {
    const wp_site = domain + "wp-admin";
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })

    let requests = [{
        insertRange: {
            range: {
                sheetId: 249332906,
                startRowIndex: 1,
                endRowIndex: 4,
                startColumnIndex: 0,
            },
            shiftDimension: "ROWS"
        }
    }];   
    
    const batchUpdateRequest = {requests};
    
    // add columns
    try {
        await googleSheets.spreadsheets.batchUpdate({
            auth,
            spreadsheetId,
            resource: batchUpdateRequest
        });
        logger.logger.log({ level: 'info', message: 'WEBFORMS - add columns success.', tester: server.userId });
        console.log("WEBFORMS - add columns success.");
        value = [ "", "info", "add columns success.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", form_page_dev + "\n" + form, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: 'WEBFORMS - add columns failed.', tester: server.userId });
        console.log("WEBFORMS - add columns failed.");
        value = [ "", "error", "add columns failed.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", form_page_dev + "\n" + form, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    let ranges = [
        "Advance Image Med Spa!A2",
        "Advance Image Med Spa!B2",
        "Advance Image Med Spa!D2",
        "Advance Image Med Spa!E2",
        "Advance Image Med Spa!G2",
    ]

    let values_dev = [
        "",
        date,
        domain + form_page_dev,
        "Request Form ( Sidebar ) - New Layout",
        '[contact-form-7 id="8775" title="Request Form ( Sidebar ) - New Layout"]',
    ]

    let values_live = [
        "",
        date,
        domain + form_page_live,
        "Request Form ( Sidebar ) - New Layout",
        '[contact-form-7 id="8775" title="Request Form ( Sidebar ) - New Layout"]',
    ]

    // track form details
    if (checkbox === "dev") {
        try {
            for (let index = 0; index < ranges.length; index++) {
                await googleSheets.spreadsheets.values.append({
                    auth,
                    spreadsheetId,
                    range: ranges[index],
                    valueInputOption: "USER_ENTERED",
                    resource: {
                        values: [
                            [values_dev[index]]
                        ]
                    }
                });
            }
            logger.logger.log({ level: 'info', message: 'WEBFORMS - track details success.', tester: server.userId });
            console.log("WEBFORMS - track details success.");
            value = [ "", "info", "track details success.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", form_page_dev + "\n" + form, "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        } catch (error) {
            logger.logger.log({ level: 'error', message: 'WEBFORMS - track details failed.', tester: server.userId });
            console.log("WEBFORMS - track details failed.");
            value = [ "", "error", "track details failed.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", form_page_dev + "\n" + form, "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }
    } else if (checkbox === "live") {
        try {
            for (let index = 0; index < ranges.length; index++) {
                await googleSheets.spreadsheets.values.append({
                    auth,
                    spreadsheetId,
                    range: ranges[index],
                    valueInputOption: "USER_ENTERED",
                    resource: {
                        values: [
                            [values_live[index]]
                        ]
                    }
                });
            }
            logger.logger.log({ level: 'info', message: 'WEBFORMS - track details success.', tester: server.userId });
            console.log("WEBFORMS - track details success.");
            value = [ "", "info", "track details success.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", form_page_dev + "\n" + form, "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        } catch (error) {
            logger.logger.log({ level: 'error', message: 'WEBFORMS - track details failed.', tester: server.userId });
            console.log("WEBFORMS - track details failed.");
            value = [ "", "error", "track details failed.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", form_page_dev + "\n" + form, "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }
    }

    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get(wp_site);

    // wp login
    try {
        if ((username) && (password)) {
            await driver.findElement(By.name("log")).sendKeys(username);
            await driver.findElement(By.name("pwd")).sendKeys(password);
            logger.logger.log({ level: 'info', message: 'WEBFORMS - edit credentials success.', tester: server.userId });
            console.log("WEBFORMS - edit credentials success.");
            value = [ "", "info", "edit credentials success.", server.userId, timestamp, module_name, domain, username + "\n" + password, "", "", launch, "", form_page_dev + "\n" + form, "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        } else {
            await driver.findElement(By.name("log")).sendKeys(wp_username);
            await driver.findElement(By.name("pwd")).sendKeys(wp_password);
            logger.logger.log({ level: 'info', message: 'WEBFORMS - same credentials.', tester: server.userId });
            console.log("WEBFORMS - same credentials.");
            value = [ "", "info", "same credentials.", server.userId, timestamp, module_name, domain, wp_username + "\n" + wp_password, "", "", launch, "", form_page_dev + "\n" + form, "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }

        await driver.findElement(By.id("wp-submit")).click();

        let login_error = await driver.executeScript("return document.getElementById('login_error')");
        if (login_error) {
            logger.logger.log({ level: 'error', message: 'WEBFORMS - wordpress login failed.', tester: server.userId });
            console.log("WEBFORMS - wordpress login failed.");
            value = [ "", "error", "wordpress login failed.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", form_page_dev + "\n" + form, "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        } else {
            logger.logger.log({ level: 'info', message: 'WEBFORMS - wordpress login success.', tester: server.userId });
            console.log("WEBFORMS - wordpress login success.");
            value = [ "", "info", "wordpress login success.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", form_page_dev + "\n" + form, "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }

        var admin_email_verification = await driver.executeScript("return document.querySelector('form').classList.contains('admin-email-confirm-form')");  
        if (admin_email_verification === true) {
            await driver.executeScript("return document.getElementsByTagName('a')[3].click()");
            logger.logger.log({ level: 'info', message: 'WEBFORMS - admin email verification.', tester: server.userId });
            console.log("WEBFORMS - admin email verification.");
            value = [ "", "info", "admin email verification.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", form_page_dev + "\n" + form, "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        } else {
            logger.logger.log({ level: 'info', message: 'WEBFORMS - no admin email verification.', tester: server.userId });
            console.log("WEBFORMS - no admin email verification.");
            value = [ "", "info", "no admin email verification.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", form_page_dev + "\n" + form, "", "" ];
            await sheet.addRow();form_page_dev
            await sheet.appendValues(value);
        }
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, "", form_page_dev + "\n" + form, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    await driver.executeScript("return document.getElementsByClassName('wp-menu-name')[8].click()");
    await driver.executeScript("return document.getElementsByClassName('row-title')[3].click()");

    await driver.findElement(By.id("ui-id-2")).click();
    
    let recipients_form1 = await driver.findElement(By.id("wpcf7-mail-recipient")).getAttribute('value');
    console.log("recipients_form1: " + recipients_form1);

    // track form recipients
    try {
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Advance Image Med Spa!H2",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [recipients_form1]
                ]
            }
        });
        logger.logger.log({ level: 'info', message: 'WEBFORMS - track form recipients success.', tester: server.userId });
        console.log("WEBFORMS - track form recipients success.");
        value = [ "", "info", "track form recipients success.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", form_page_dev + "\n" + form, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, "", form_page_dev + "\n" + form, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    // change form recipients
    try {
        await driver.findElement(By.id("wpcf7-mail-recipient")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
        if (email) {
            await driver.findElement(By.id("wpcf7-mail-recipient")).sendKeys(email);
            logger.logger.log({ level: 'info', message: 'CHECKOUT - change qa email success.', tester: server.userId });
            console.log("CHECKOUT - change qa email success.");
            value = [ "", "info", "change qa email success.", server.userId, timestamp, module_name, domain, "", "", email, launch, "", form_page_dev + "\n" + form, "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);   
        } else {
            await driver.findElement(By.id("wpcf7-mail-recipient")).sendKeys(qa_email);
            logger.logger.log({ level: 'info', message: 'CHECKOUT - change qa email success.', tester: server.userId });
            console.log("CHECKOUT - same qa email.");
            value = [ "", "info", "same qa email.", server.userId, timestamp, module_name, domain, "", "", qa_email, launch, "", form_page_dev + "\n" + form, "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);  
        }
        await driver.executeScript("return document.getElementsByName('wpcf7-save')[2].click()");
        logger.logger.log({ level: 'info', message: 'WEBFORMS - change form recipients success.', tester: server.userId });
        console.log("WEBFORMS - change form recipients success.");
        value = [ "", "info", "change form recipients success.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", form_page_dev + "\n" + form, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, "", form_page_dev + "\n" + form, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    return true;
    
}


module.exports = { wordpressStart };
