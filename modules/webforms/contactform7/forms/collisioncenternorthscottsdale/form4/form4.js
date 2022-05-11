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
        await driver.sleep(5000);
        let name = await driver.executeScript("return document.getElementsByName('your-name')[0]");
        name.sendKeys("Primeview Test");
        await driver.sleep(1000);

        let hphone = await driver.executeScript("return document.getElementsByName('your-hphone')[0]");
        hphone.sendKeys("4806480839");
        await driver.sleep(1000);

        let street = await driver.executeScript("return document.getElementsByName('street')[0]");
        street.sendKeys("7620 E McKellips Rd");
        await driver.sleep(1000);

        let state = await driver.executeScript("return document.getElementsByName('state')[0]");
        state.sendKeys("AZ");
        await driver.sleep(1000);

        let year = await driver.executeScript("return document.getElementsByName('yearofvehicle')[0]");
        year.sendKeys("2019");
        await driver.sleep(1000);

        let make = await driver.executeScript("return document.getElementsByName('makerofvehicle')[0]");
        make.sendKeys("Lead Test Submission");
        await driver.sleep(1000);

        let email = await driver.executeScript("return document.getElementsByName('your-email')[0]");
        email.sendKeys("qa@primeview.com");
        await driver.sleep(1000);

        let cphone = await driver.executeScript("return document.getElementsByName('your-cphone')[0]");
        cphone.sendKeys("4806480839");
        await driver.sleep(1000);

        let city = await driver.executeScript("return document.getElementsByName('city')[0]");
        city.sendKeys("Scottsdale");
        await driver.sleep(1000);

        let zip = await driver.executeScript("return document.getElementsByName('zip')[0]");
        zip.sendKeys("85257");
        await driver.sleep(1000);

        let model = await driver.executeScript("return document.getElementsByName('modelofvehicle')[0]");
        model.sendKeys("Lead Test Submission");
        await driver.sleep(1000);

        let vin = await driver.executeScript("return document.getElementsByName('vinnum')[0]");
        vin.sendKeys("Lead Test Submission");
        await driver.sleep(1000);

        let message = await driver.executeScript("return document.getElementsByName('your-message')[0]");
        message.sendKeys("Please take note that this is a test submit form for Body Shop Repair Estimate (Landing Page). Please disregard if received. Thank you.");
        await driver.sleep(1000);

        await driver.executeScript("return document.getElementsByClassName('gdpr-consent')[0].click()");
        await driver.executeScript("return document.getElementsByClassName('btn-primary')[5].click()");
        logger.logger.log({ level: 'info', message: 'WEBFORMS - form fill in success.', tester: server.userId });
        console.log("WEBFORMS - form fill in success.");
        value = [ "", "", "info", "form fill in success.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", forms + "\n" + webforms, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, "", forms + "\n" + webforms, "", "" ];
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
        value = [ "", "", "info", "track thank you page success.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", forms + "\n" + webforms, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, "", forms + "\n" + webforms, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    return true;

}



module.exports = { webforms };