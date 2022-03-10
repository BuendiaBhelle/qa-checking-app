const {Builder, By, Key} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../../../config");
const logger = require('../../../../../../middleware/logger.js');
const server = require('../../../../../../server.js');

const wp_username = config.credentials.americanleatherusa.username;
const wp_password = config.credentials.americanleatherusa.password;
const qa_email = config.qa_email;
const auth = config.auth;
const spreadsheetId = config.spreadsheetId;
const date = config.date;
const form_page = config.forms.americanleatherusa.form1;


async function wordpressStart(domain, username, password, email) {
    const wp_site = domain + "wp-admin";
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })

    let requests = [{
        insertRange: {
            range: {
                sheetId: 1193745199,
                startRowIndex: 1,
                endRowIndex: 4,
                startColumnIndex: 0,
            },
            shiftDimension: "ROWS"
        }
    }];   
    
    const batchUpdateRequest = {requests};
    
    // add columns
    await googleSheets.spreadsheets.batchUpdate({
        auth,
        spreadsheetId,
        resource: batchUpdateRequest,
        }, (err, response) => {
        if (err) {
            logger.logger.log({ level: 'error', message: err, tester: server.userId });
            console.log(err);
        } else {
            logger.logger.log({ level: 'info', message: 'WEBFORMS - add columns success.', tester: server.userId });
            console.log("WEBFORMS - add columns success.");
        }
    });

    let ranges = [
        "American Leather!A2",
        "American Leather!B2",
        "American Leather!C2",
        "American Leather!C3",
        "American Leather!D2",
        "American Leather!E2",
        "American Leather!G2",
    ]

    let values = [
        "",
        date,
        wp_username,
        wp_password,
        domain + form_page,
        "Contact form 1",
        '[contact-form-7 id="10" title="Contact form 1"]',
    ]

    // track form details
    for (let index = 0; index < ranges.length; index++) {
        try {
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
            logger.logger.log({ level: 'info', message: 'WEBFORMS - track details success.', tester: server.userId });
            console.log("WEBFORMS - track details success.");
        } catch (error) {
            logger.logger.log({ level: 'error', message: 'WEBFORMS - track details failed.', tester: server.userId });
            console.log("WEBFORMS - track details failed.");
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
        } else {
            await driver.findElement(By.name("log")).sendKeys(wp_username);
            await driver.findElement(By.name("pwd")).sendKeys(wp_password);
            logger.logger.log({ level: 'info', message: 'WEBFORMS - same credentials.', tester: server.userId });
            console.log("WEBFORMS - same credentials.");
        }

        await driver.findElement(By.id("wp-submit")).click();

        let login_error = await driver.executeScript("return document.getElementById('login_error')");
        if (login_error) {
            logger.logger.log({ level: 'error', message: 'WEBFORMS - wordpress login failed.', tester: server.userId });
            console.log("WEBFORMS - wordpress login failed.");
        } else {
            logger.logger.log({ level: 'info', message: 'WEBFORMS - wordpress login success.', tester: server.userId });
            console.log("WEBFORMS - wordpress login success.");
        }

        var admin_email_verification = await driver.executeScript("return document.querySelector('form').classList.contains('admin-email-confirm-form')");  
        if (admin_email_verification === true) {
            await driver.executeScript("return document.getElementsByTagName('a')[3].click()");
            logger.logger.log({ level: 'info', message: 'WEBFORMS - admin email verification.', tester: server.userId });
            console.log("WEBFORMS - admin email verification.");
        } else {
            logger.logger.log({ level: 'info', message: 'WEBFORMS - no admin email verification.', tester: server.userId });
            console.log("WEBFORMS - no admin email verification.");
        }
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
    }

    await driver.executeScript("return document.getElementsByClassName('wp-menu-name')[7].click()");

    await driver.executeScript("return document.getElementsByClassName('row-title')[0].click()");
    await driver.findElement(By.id("ui-id-2")).click();
    let recipients_form1 = await driver.findElement(By.id("wpcf7-mail-recipient")).getAttribute('value');
    console.log("recipients_form1: " + recipients_form1);

    // track form recipients
    try {
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "American Leather!H2",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [recipients_form1]
                ]
            }
        });
        logger.logger.log({ level: 'info', message: 'WEBFORMS - track form recipients success.', tester: server.userId });
        console.log("WEBFORMS - track form recipients success.");
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
    }

    // change form recipients
    try {
        await driver.findElement(By.id("wpcf7-mail-recipient")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
        if (email) {
            await driver.findElement(By.id("wpcf7-mail-recipient")).sendKeys(email);
        } else {
            await driver.findElement(By.id("wpcf7-mail-recipient")).sendKeys(qa_email);    
        }
        await driver.executeScript("return document.getElementsByName('wpcf7-save')[2].click()");
        logger.logger.log({ level: 'info', message: 'WEBFORMS - change form recipients success.', tester: server.userId });
        console.log("WEBFORMS - change form recipients success.");
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
    }

    return true;
    
}


module.exports = { wordpressStart };
