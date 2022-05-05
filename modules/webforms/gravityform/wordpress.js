const {Builder, By, Key} = require("selenium-webdriver");
const {google} = require("googleapis");
const config_webforms = require("../config");
const logger = require('../../../middleware/logger.js');
const server = require('../../../server.js');
const sheet = require('../../../middleware/gsheet.js');

const auth = config_webforms.auth;
const spreadsheetId = config_webforms.spreadsheetId;

var googleSheets;
var driver;
var current_page_url;
async function wordpressStart(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, range_recipient, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page) {
    const wp_site = domain + "wp-admin";
    const client = await auth.getClient();
    googleSheets = google.sheets({ version: "v4", auth: client });

    let requests = [{
        insertRange: {
            range: {
                sheetId: sheetId,
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
        value = [ "", "", "info", "add columns success.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", forms + "\n" + webforms, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: 'WEBFORMS - add columns failed.', tester: server.userId });
        console.log("WEBFORMS - add columns failed.");
        value = [ "", "", "error", "add columns failed.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", forms + "\n" + webforms, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    
    let values = [
        "",
        launch,
        date,
        wp_creds_username,
        wp_creds_password,
        domain + forms,
        contact_form_name,
        contact_form_shortcode
    ]

    // values.splice(6, 0, contact_form_name)
    // values.splice(7, 0, contact_form_shortcode);
    // values.join()
    console.log(values);

    // track form details
    try {
        for (let index = 0; index < ranges.length; index++) {
            await googleSheets.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: ranges[index],
                valueInputOption: "USER_ENTERED",
                resource: {
                    values: [
                        [values[index]]
                    ]
                }
            });
        }
        logger.logger.log({ level: 'info', message: 'WEBFORMS - track details success.', tester: server.userId });
        console.log("WEBFORMS - track details success.");
        value = [ "", "", "info", "track details success.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", forms + "\n" + webforms, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: 'WEBFORMS - track details failed.', tester: server.userId });
        console.log("WEBFORMS - track details failed.");
        value = [ "", "", "error", "track details failed.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", forms + "\n" + webforms, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    driver = await new Builder().forBrowser("chrome").build();

    await driver.get(wp_site);

    // wp login
    try {
        if ((username) && (password)) {
            await driver.findElement(By.name("log")).sendKeys(username);
            await driver.findElement(By.name("pwd")).sendKeys(password);
            logger.logger.log({ level: 'info', message: 'WEBFORMS - edit credentials success.', tester: server.userId });
            console.log("WEBFORMS - edit credentials success.");
            value = [ "", "", "info", "edit credentials success.", server.userId, timestamp, module_name, domain, username + "\n" + password, "", "", launch, "", forms + "\n" + webforms, "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        } else {
            await driver.findElement(By.name("log")).sendKeys(wp_creds_username);
            await driver.findElement(By.name("pwd")).sendKeys(wp_creds_password);
            logger.logger.log({ level: 'info', message: 'WEBFORMS - same credentials.', tester: server.userId });
            console.log("WEBFORMS - same credentials.");
            value = [ "", "", "info", "same credentials.", server.userId, timestamp, module_name, domain, wp_creds_username + "\n" + wp_creds_password, "", "", launch, "", forms + "\n" + webforms, "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }

        await driver.findElement(By.id("wp-submit")).click();

        let login_error = await driver.executeScript("return document.getElementById('login_error')");
        if (login_error) {
            logger.logger.log({ level: 'error', message: 'WEBFORMS - wordpress login failed.', tester: server.userId });
            console.log("WEBFORMS - wordpress login failed.");
            value = [ "", "", "error", "wordpress login failed.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", forms + "\n" + webforms, "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        } else {
            logger.logger.log({ level: 'info', message: 'WEBFORMS - wordpress login success.', tester: server.userId });
            console.log("WEBFORMS - wordpress login success.");
            value = [ "", "", "info", "wordpress login success.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", forms + "\n" + webforms, "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }

        var admin_email_verification = await driver.executeScript("return document.querySelector('form').classList.contains('admin-email-confirm-form')");  
        if (admin_email_verification === true) {
            await driver.executeScript("return document.getElementsByTagName('a')[3].click()");
            logger.logger.log({ level: 'info', message: 'WEBFORMS - admin email verification.', tester: server.userId });
            console.log("WEBFORMS - admin email verification.");
            value = [ "", "", "info", "admin email verification.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", forms + "\n" + webforms, "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        } else {
            logger.logger.log({ level: 'info', message: 'WEBFORMS - no admin email verification.', tester: server.userId });
            console.log("WEBFORMS - no admin email verification.");
            value = [ "", "", "info", "no admin email verification.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", forms + "\n" + webforms, "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, "", forms + "\n" + webforms, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    // navigate to forms page
    await driver.get(wp_site + form_page);
    await driver.sleep(1000);
    let strong_tag_length = await driver.executeScript("return document.getElementsByTagName('strong').length");
    var recipients;

    for (let index = 0; index < strong_tag_length; index++) {
        let notifications_innerhtml = await driver.executeScript("return document.getElementsByTagName('strong')[" + index + "].innerHTML");
        if (notifications_innerhtml === "Admin Notification") {
            console.log(notifications_innerhtml);
            await driver.executeScript("return document.getElementsByTagName('strong')[" + index + "].click()");
            recipients = await driver.executeScript("return document.getElementById('toEmail').value");
            console.log("recipients: " + recipients);
            await trackFormRecipients();
        }
        await notifBar();
        if (notifications_innerhtml === "QA Notification") {
            console.log(notifications_innerhtml);
            await driver.executeScript("return document.getElementsByTagName('strong')[" + index + "].click()");
            await changeFormRecipients();
            await setAdminOff();
            await setQAOn();
            current_page_url = await driver.getCurrentUrl();
            console.log(current_page_url);
        }
    }


    // navigate to notifications bar
    async function notifBar() {
        let span_label_length = await driver.executeScript("return document.getElementsByClassName('label').length");
        for (let index = 0; index < span_label_length; index++) {
            let notif_bar_innerhtml = await driver.executeScript("return document.getElementsByClassName('label')[" + index + "].innerText");
            if (notif_bar_innerhtml === "Notifications") {
                console.log(notif_bar_innerhtml);
                await driver.executeScript("return document.getElementsByClassName('label')[" + index + "].click()");
            }
        }
    }
    
    // track form recipients
    async function trackFormRecipients() {
        console.log(range_recipient);
        try {
            await googleSheets.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: range_recipient,
                valueInputOption: "USER_ENTERED",
                resource: {
                    values: [
                        [recipients]
                    ]
                }
            });
            logger.logger.log({ level: 'info', message: 'WEBFORMS - track form recipients success.', tester: server.userId });
            console.log("WEBFORMS - track form recipients success.");
            value = [ "", "", "info", "track form recipients success.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", forms + "\n" + webforms, "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        } catch (error) {
            logger.logger.log({ level: 'error', message: error, tester: server.userId });
            console.log(error);
            value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, "", forms + "\n" + webforms, "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }
    }

    // change form recipients
    async function changeFormRecipients() {
        try {
            await driver.findElement(By.id("toEmail")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
            if (email) {
                await driver.findElement(By.id("toEmail")).sendKeys(email);
                logger.logger.log({ level: 'info', message: 'CHECKOUT - change qa email success.', tester: server.userId });
                console.log("CHECKOUT - change qa email success.");
                value = [ "", "", "info", "change qa email success.", server.userId, timestamp, module_name, domain, "", "", email, launch, "", forms + "\n" + webforms, "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value);   
            } else {
                await driver.findElement(By.id("toEmail")).sendKeys(qa_email);
                logger.logger.log({ level: 'info', message: 'CHECKOUT - change qa email success.', tester: server.userId });
                console.log("CHECKOUT - same qa email.");
                value = [ "", "", "info", "same qa email.", server.userId, timestamp, module_name, domain, "", "", qa_email, launch, "", forms + "\n" + webforms, "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value);  
            }
            await driver.executeScript("return document.getElementsByClassName('primary button large')[0].click()");
            await notifBar();
            logger.logger.log({ level: 'info', message: 'WEBFORMS - change form recipients success.', tester: server.userId });
            console.log("WEBFORMS - change form recipients success.");
            value = [ "", "", "info", "change form recipients success.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", forms + "\n" + webforms, "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        } catch (error) {
            logger.logger.log({ level: 'error', message: error, tester: server.userId });
            console.log(error);
            value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, "", forms + "\n" + webforms, "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }
    }

    // set form email recipients to qa's
    async function setAdminOff() {
        let admin_notif_status = await driver.executeScript("return document.getElementsByClassName('gform-status-indicator-status')[0].innerHTML");
        console.log("admin_notif_status: " + admin_notif_status);
    
        // set admin notif to inactive
        try {
            if (admin_notif_status === "Active") {
                await driver.executeScript("return document.getElementsByClassName('gform-status-indicator-status')[0].click()");
            }
            logger.logger.log({ level: 'info', message: 'WEBFORMS - set admin notif to inactive success.', tester: server.userId });
            console.log("WEBFORMS - set admin notif to inactive success.");
            value = [ "", "", "info", "set admin notif to inactive success.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", forms + "\n" + webforms, "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        } catch (error) {
            logger.logger.log({ level: 'error', message: error, tester: server.userId });
            console.log(error);
            value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, "", forms + "\n" + webforms, "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }
    }

    async function setQAOn() {
        let qa_notif_status = await driver.executeScript("return document.getElementsByClassName('gform-status-indicator-status')[1].innerHTML");
        console.log("qa_notif_status: " + qa_notif_status);
    
        // set qa notif to active
        try {
            if (qa_notif_status === "Inactive") {
                await driver.executeScript("return document.getElementsByClassName('gform-status-indicator-status')[1].click()");
            }
            logger.logger.log({ level: 'info', message: 'WEBFORMS - set qa notif to active success.', tester: server.userId });
            console.log("WEBFORMS - set qa notif to active success.");
            value = [ "", "", "info", "set qa notif to active success.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", forms + "\n" + webforms, "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        } catch (error) {
            logger.logger.log({ level: 'error', message: error, tester: server.userId });
            console.log(error);
            value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, "", forms + "\n" + webforms, "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }
    }

    return true;
    
}



async function wordpressEnd(domain, timestamp, forms, module_name, launch, webforms) {
    console.log("current_page_url: " + current_page_url);
    await driver.switchTo().newWindow('tab');
    await driver.get(current_page_url);

    // set admin notif to active
    let admin_notif_status = await driver.executeScript("return document.getElementsByClassName('gform-status-indicator-status')[0].innerHTML");
    console.log("admin_notif_status: " + admin_notif_status);

    try {
        if (admin_notif_status === "Inactive") {
            await driver.executeScript("return document.getElementsByClassName('gform-status-indicator-status')[0].click()");
        }
        logger.logger.log({ level: 'info', message: 'WEBFORMS - set admin notif to active success.', tester: server.userId });
        console.log("WEBFORMS - set admin notif to active success.");
        value = [ "", "", "info", "set admin notif to active success", server.userId, timestamp, module_name, domain, "", "", "", launch, "", forms + "\n" + webforms, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, "", forms + "\n" + webforms, "", "" ];
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
        value = [ "", "", "info", "set qa notif to inactive success", server.userId, timestamp, module_name, domain, "", "", "", launch, "", forms + "\n" + webforms, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
        await driver.sleep(1000);  
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, "", forms + "\n" + webforms, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
        await driver.sleep(1000);
    }
    // end test 
    logger.logger.log({ level: 'info', message: 'test ends.', tester: server.userId });
    console.log("test ends.");
    value = [ "", "", "info", "test ends.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", forms + "\n" + webforms, "", "" ];
    await sheet.addRow();
    await sheet.appendValues(value);

    return true;
}
module.exports = { wordpressStart, wordpressEnd };
