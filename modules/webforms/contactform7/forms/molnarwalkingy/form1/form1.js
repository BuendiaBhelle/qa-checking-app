const {Builder, By, Key} = require("selenium-webdriver");
const {google} = require("googleapis");
const config_webforms = require("../../../../../../config");
const logger = require('../../../../../../middleware/logger.js');
const server = require('../../../../../../server.js');
const sheet = require('../../../../../../middleware/gsheet.js');

const auth = config_webforms.auth;
const spreadsheetId = config_webforms.spreadsheetId_webforms;


async function webforms(domain, timestamp, forms, range_thankyou_page, module_name, launch, webforms) {
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })

    let driver = await new Builder().forBrowser("chrome").build();

    // form fill in
    try {
        await driver.get(domain + forms);
        await driver.sleep(3000);
        await driver.executeScript("return document.getElementsByClassName('elementor-button-text')[4].click()");
        await driver.sleep(3000);
        let name = await driver.executeScript("return document.getElementsByName('your-name')[1]");
        name.sendKeys("Primeview Test");
        let phone_number = await driver.executeScript("return document.getElementsByName('your-phone')[1]");
        phone_number.sendKeys("4806480839");
        let email = await driver.executeScript("return document.getElementsByName('your-email')[1]");
        email.sendKeys("qa@primeview.com");
        let services = await driver.executeScript("return document.getElementsByName('your-services')[1]");
        services.sendKeys("Guided Hunting - Dove Hunt");
        let date = await driver.executeScript("return document.getElementsByName('your-date')[1]");
        date.sendKeys("08/02/2023");
        let time = await driver.executeScript("return document.getElementsByName('your-time')[1]");
        time.sendKeys("10:00AM");
        let message = await driver.executeScript("return document.getElementsByName('your-message')[1]");
        message.sendKeys("This is a test. Please ignore.");
        await driver.executeScript("return document.getElementsByClassName('wpcf7-form-control has-spinner wpcf7-submit')[1].click()");
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
