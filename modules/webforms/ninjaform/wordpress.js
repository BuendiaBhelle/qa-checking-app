const {Builder, By, Key} = require("selenium-webdriver");
const {google} = require("googleapis");
const config_webforms = require("../../../config");
const logger = require('../../../middleware/logger.js');
const server = require('../../../server.js');
const sheet = require('../../../middleware/gsheet.js');

const auth = config_webforms.auth;
const spreadsheetId = config_webforms.spreadsheetId_webforms;

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
                endRowIndex: 2,
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
        value = [ "", "", "info", "add columns success.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", webforms, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: 'WEBFORMS - add columns failed.', tester: server.userId });
        console.log("WEBFORMS - add columns failed.");
        value = [ "", "", "error", "add columns failed.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", webforms, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    
    let values = [
        "",
        launch,
        date,
        wp_creds_username + "\n" + wp_creds_password,
        domain + forms,
        contact_form_name,
        contact_form_shortcode
    ]

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
        value = [ "", "", "info", "track details success.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", webforms, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: 'WEBFORMS - track details failed.', tester: server.userId });
        console.log("WEBFORMS - track details failed.");
        value = [ "", "", "error", "track details failed.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", webforms, "", "" ];
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
            value = [ "", "", "info", "edit credentials success.", server.userId, timestamp, module_name, domain, username + "\n" + password, "", "", launch, "", webforms, "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        } else {
            await driver.findElement(By.name("log")).sendKeys(wp_creds_username);
            await driver.findElement(By.name("pwd")).sendKeys(wp_creds_password);
        }

        await driver.findElement(By.id("wp-submit")).click();

        let login_error = await driver.executeScript("return document.getElementById('login_error')");
        if (login_error) {
            logger.logger.log({ level: 'error', message: 'WEBFORMS - wordpress login failed.', tester: server.userId });
            console.log("WEBFORMS - wordpress login failed.");
            value = [ "", "", "error", "wordpress login failed.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", webforms, "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        } else {
            if ((username) && (password)) {
                logger.logger.log({ level: 'info', message: 'WEBFORMS - wordpress login success.', tester: server.userId });
                console.log("WEBFORMS - wordpress login success.");
                value = [ "", "", "info", "wordpress login success.", server.userId, timestamp, module_name, domain, username + "\n" + password, "", "", launch, "", webforms, "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value);
            } else {
                logger.logger.log({ level: 'info', message: 'WEBFORMS - wordpress login success.', tester: server.userId });
                console.log("WEBFORMS - wordpress login success.");
                value = [ "", "", "info", "wordpress login success.", server.userId, timestamp, module_name, domain, wp_creds_username + "\n" + wp_creds_password, "", "", launch, "", webforms, "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value);
            }
        }

        // await driver.sleep(1000);
        
        var admin_email_verification = await driver.executeScript("return document.querySelector('form').classList.contains('admin-email-confirm-form')");  
        if (admin_email_verification === true) {
            await driver.executeScript("return document.getElementsByTagName('a')[3].click()");
            logger.logger.log({ level: 'info', message: 'WEBFORMS - admin email verification.', tester: server.userId });
            console.log("WEBFORMS - admin email verification.");
            value = [ "", "", "info", "admin email verification.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", webforms, "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, "", webforms, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    // await driver.sleep(1000);

    // change form recipients
    try {
        await driver.get(wp_site + form_page);
        let app_menu_text_length = await driver.executeScript("return document.getElementsByClassName('app-menu-text').length");
        for (let i = 0; i < app_menu_text_length; i++) {
            let app_menu_text_innertext = await driver.executeScript("return document.getElementsByClassName('app-menu-text')[" + i + "].innerText");
            if (app_menu_text_innertext === "Emails & Actions") {
                await driver.executeScript("return document.getElementsByClassName('app-menu-text')[" + i + "].click()");
                let nf_actions_table_length = await driver.executeScript("return document.getElementsByClassName('nf-actions-table')[0].children[1].children.length");
                for (let j = 0; j < nf_actions_table_length; j++) {
                    let nf_actions_table_innertext = await driver.executeScript("return document.getElementsByClassName('nf-actions-table')[0].children[1].children[1].children[" + j + "].innerText");
                    if (nf_actions_table_innertext === "Admin Email") {
                        console.log("Admin Email");
                        await driver.executeScript("return document.getElementsByClassName('nf-edit-settings fa fa-cog')[" + j + "].click()");
                        let recipients = await driver.findElement(By.id("to")).getAttribute('value');
                        console.log("recipients: " + recipients);
                        console.log(range_recipient);
                        console.log(recipients);
                    
                        // track form recipients
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
                            value = [ "", "", "info", "track form recipients success.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", webforms, "", "" ];
                            await sheet.addRow();
                            await sheet.appendValues(value);
                        } catch (error) {
                            logger.logger.log({ level: 'error', message: error, tester: server.userId });
                            console.log(error);
                            value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, "", webforms, "", "" ];
                            await sheet.addRow();
                            await sheet.appendValues(value);
                        }
                        
                        await driver.sleep(1000);

                        // change form recipients
                        try {
                            if (email) {
                                await driver.findElement(By.id("to")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
                                await driver.sleep(1000);
                                await driver.findElement(By.id("to")).sendKeys(email);
                                await driver.sleep(1000);
                                await driver.findElement(By.className("nf-button primary nf-close-drawer ")).click();
                                await driver.sleep(1000);
                                await driver.findElement(By.className("nf-button primary  publish")).click();
                                logger.logger.log({ level: 'info', message: 'CHECKOUT - change form recipients success.', tester: server.userId });
                                console.log("CHECKOUT - change form recipients success.");
                                value = [ "", "", "info", "change form recipients success.", server.userId, timestamp, module_name, domain, "", "", email, launch, "", webforms, "", "" ];
                                await sheet.addRow();
                                await sheet.appendValues(value);   
                            } else {
                                await driver.findElement(By.id("to")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
                                await driver.sleep(1000);
                                await driver.findElement(By.id("to")).sendKeys(qa_email);
                                await driver.sleep(1000);
                                await driver.findElement(By.className("nf-button primary nf-close-drawer ")).click();
                                await driver.sleep(1000);
                                await driver.findElement(By.className("nf-button primary  publish")).click();
                                logger.logger.log({ level: 'info', message: 'CHECKOUT - change form recipients success.', tester: server.userId });
                                console.log("CHECKOUT - change form recipients success.");
                                value = [ "", "", "info", "change form recipients success.", server.userId, timestamp, module_name, domain, "", "", qa_email, launch, "", webforms, "", "" ];
                                await sheet.addRow();
                                await sheet.appendValues(value);  
                            }
                        } catch (error) {
                            logger.logger.log({ level: 'error', message: error, tester: server.userId });
                            console.log(error);
                            value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, "", webforms, "", "" ];
                            await sheet.addRow();
                            await sheet.appendValues(value);
                        }
                    }
                }
            }
        }
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, "", webforms, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    current_page_url = await driver.getCurrentUrl();
    await driver.sleep(1000);    
    
    return true;
    
}



async function wordpressEnd(domain, timestamp, forms, range_recipient, module_name, launch, webforms) {
    console.log("current_page_url: " + current_page_url);
    await driver.switchTo().newWindow('tab');
    await driver.get(current_page_url);

    await driver.sleep(1000);
    
    // change form recipients
    try {
        let app_menu_text_length = await driver.executeScript("return document.getElementsByClassName('app-menu-text').length");
        for (let i = 0; i < app_menu_text_length; i++) {
            let app_menu_text_innertext = await driver.executeScript("return document.getElementsByClassName('app-menu-text')[" + i + "].innerText");
            if (app_menu_text_innertext === "Emails & Actions") {
                await driver.executeScript("return document.getElementsByClassName('app-menu-text')[" + i + "].click()");
                let nf_actions_table_length = await driver.executeScript("return document.getElementsByClassName('nf-actions-table')[0].children[1].children.length");
                for (let j = 0; j < nf_actions_table_length; j++) {
                    let nf_actions_table_innertext = await driver.executeScript("return document.getElementsByClassName('nf-actions-table')[0].children[1].children[1].children[" + j + "].innerText");
                    if (nf_actions_table_innertext === "Admin Email") {
                        console.log("Admin Email");
                        await driver.executeScript("return document.getElementsByClassName('nf-edit-settings fa fa-cog')[" + j + "].click()");
                        
                        await driver.sleep(1000);

                        // put back original form recipients
                        try {
                            await driver.findElement(By.id("to")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
                            
                            let orig_recipients_data = await googleSheets.spreadsheets.values.get({
                                auth,
                                spreadsheetId,
                                range: range_recipient,
                            });
                        
                            let orig_recipients = orig_recipients_data.data.values[0][0];
                        
                            console.log("orig_recipients: " + orig_recipients);
                            
                            await driver.findElement(By.id("to")).sendKeys(orig_recipients);
                            await driver.sleep(1000);
                            await driver.findElement(By.className("nf-button primary nf-close-drawer ")).click();
                            await driver.sleep(1000);
                            await driver.findElement(By.className("nf-button primary  publish")).click();
                            // await driver.executeScript("return document.getElementsByName('wpcf7-save')[2].click()");
                            logger.logger.log({ level: 'info', message: 'WEBFORMS - put original form recipients success.', tester: server.userId });
                            console.log("WEBFORMS - put original form recipients success.");
                            value = [ "", "", "info", "put original form recipients success", server.userId, timestamp, module_name, domain, "", "", "", launch, "", webforms, "", "" ];
                            await sheet.addRow();
                            await sheet.appendValues(value);
                        } catch (error) {
                            logger.logger.log({ level: 'error', message: error, tester: server.userId });
                            console.log(error);
                            value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, "", webforms, "", "" ];
                            await sheet.addRow();
                            await sheet.appendValues(value);
                        }
                    }
                }
            }
        }
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, "", webforms, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }
    // end test
    logger.logger.log({ level: 'info', message: 'test ends.', tester: server.userId });
    console.log("test ends.");
    value = [ "", "", "info", "test ends.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", webforms, "", "" ];
    await sheet.addRow();
    await sheet.appendValues(value);

    return true;

}


module.exports = { wordpressStart, wordpressEnd };
