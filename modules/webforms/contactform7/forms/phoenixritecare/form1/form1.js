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
        await driver.sleep(3000);
        let fname = await driver.executeScript("return document.getElementsByName('Fname')[0]");
        fname.sendKeys("Primeview");
        let lname = await driver.executeScript("return document.getElementsByName('Lname')[0]");
        lname.sendKeys("Test");
        let email = await driver.executeScript("return document.getElementsByName('email')[0]");
        email.sendKeys("qa@primeview.com");
        let phone = await driver.executeScript("return document.getElementsByName('Cnumber')[0]");
        phone.sendKeys("4806480839");
        let address = await driver.executeScript("return document.getElementsByName('Saddress')[0]");
        address.sendKeys("7620 E McKellips Rd");
        let city = await driver.executeScript("return document.getElementsByName('City')[0]");
        city.sendKeys("Scottsdale");
        let state = await driver.executeScript("return document.getElementsByName('State')[0]");
        state.sendKeys("AZ");
        let zip = await driver.executeScript("return document.getElementsByName('ZipCode')[0]");
        zip.sendKeys("85257");
        let message = await driver.executeScript("return document.getElementsByName('AdditionalInformation')[0]");
        message.sendKeys("Please take note that this is a test submit form for Arizona Scholarship - Form. Please disregard if received. Thank you.");
        await driver.executeScript("return document.getElementsByName('gdpr-checkbox[]')[0].click()");
        await driver.executeScript("return document.getElementsByClassName('wpcf7-submit')[0].click()");
        logger.logger.log({ level: 'info', message: 'WEBFORMS - form fill in success.', tester: server.userId });
        console.log("WEBFORMS - form fill in success.");
        value = [ "", "info", "form fill in success.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", forms + "\n" + webforms, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, "", forms + "\n" + webforms, "", "" ];
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
        value = [ "", "info", "track thank you page success.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", forms + "\n" + webforms, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, "", forms + "\n" + webforms, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    return true;

}



module.exports = { webforms };
