const {Builder, By, Key} = require("selenium-webdriver");
const {google} = require("googleapis");
const config_webforms = require("../../../../config");
const logger = require('../../../../../../middleware/logger.js');
const server = require('../../../../../../server.js');
const sheet = require('../../../../../../middleware/gsheet.js');

const auth = config_webforms.auth;
const spreadsheetId = config_webforms.spreadsheetId;


async function webforms(domain, timestamp, forms, range_thankyou_page, module_name, launch, webforms) {
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })

    let driver = await new Builder().forBrowser("chrome").build();

    // form fill in
    try {
        await driver.get(domain + forms);
        await driver.sleep(7000);
        await driver.findElement(By.id("wpcf7_signature-1_signature")).click();

        let date = await driver.executeScript("return document.getElementsByName('date-1')[0]");
        date.sendKeys("29/06/2022");

        let rep_name = await driver.executeScript("return document.getElementsByName('rep-name')[0]");
        rep_name.sendKeys("Primeview Test");

        let relationship = await driver.executeScript("return document.getElementsByName('rep-relationship')[0]");
        relationship.sendKeys("Test");

        let rep_name_1 = await driver.executeScript("return document.getElementsByName('rep-name-1')[0]");
        rep_name_1.sendKeys("Primeview Test");

        let relationship_1 = await driver.executeScript("return document.getElementsByName('rep-relationship-1')[0]");
        relationship_1.sendKeys("Test");

        await driver.findElement(By.id("wpcf7_signature-2_signature")).click();

        let date2 = await driver.executeScript("return document.getElementsByName('date-2')[0]");
        date2.sendKeys("29/06/2022");
        
        let email = await driver.executeScript("return document.getElementsByName('pdf-copy-email')[0]");
        email.sendKeys("qa@primeview.com");

        await driver.executeScript("return document.getElementsByClassName('wpcf7-form-control has-spinner wpcf7-submit btn btn-primary')[0].click()");
        logger.logger.log({ level: 'info', message: 'WEBFORMS - form fill in success.', tester: server.userId });
        console.log("WEBFORMS - form fill in success.");
        value = [ "", "", "info", "form fill in success.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", webforms, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, "", webforms, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    await driver.sleep(5000);

    // track thank you page
    let ty_url = await driver.getCurrentUrl();
    console.log("Form1 thank you page: " + ty_url);

    try {
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: range_thankyou_page,
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [ty_url]
                ]
            }
        });
        logger.logger.log({ level: 'info', message: 'WEBFORMS - track thank you page success.', tester: server.userId });
        console.log("WEBFORMS - track thank you page success.");
        value = [ "", "", "info", "track thank you page success.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", webforms, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, "", webforms, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    return true;

}



module.exports = { webforms };
