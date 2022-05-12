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
        let fname = await driver.executeScript("return document.getElementsByName('your-name')[0]");
        fname.sendKeys("Primeview");
        await driver.sleep(1000);

        let mname = await driver.executeScript("return document.getElementsByName('text-middle')[0]");
        mname.sendKeys("T");
        await driver.sleep(1000);

        let lname = await driver.executeScript("return document.getElementsByName('your-last-name')[0]");
        lname.sendKeys("Test");
        await driver.sleep(1000);

        let email = await driver.executeScript("return document.getElementsByName('your-email')[0]");
        email.sendKeys("qa@primeview.com");
        await driver.sleep(1000);

        let tel = await driver.executeScript("return document.getElementsByName('tel-915')[0]");
        tel.sendKeys("4806480839");
        await driver.sleep(1000);

        let address = await driver.executeScript("return document.getElementsByName('text-799')[0]");
        address.sendKeys("7620 E McKellips Rd");
        await driver.sleep(1000);

        let city = await driver.executeScript("return document.getElementsByName('text-city')[0]");
        city.sendKeys("Scottsdale");
        await driver.sleep(1000);

        let state = await driver.executeScript("return document.getElementsByName('text-state')[0]");
        state.sendKeys("AZ");
        await driver.sleep(1000);

        let zip = await driver.executeScript("return document.getElementsByName('text-zipcode')[0]");
        zip.sendKeys("85257");
        await driver.sleep(1000);

        let ssn = await driver.executeScript("return document.getElementsByName('text-ss')[0]");
        ssn.sendKeys("555");
        await driver.sleep(1000);

        let date = await driver.executeScript("return document.getElementsByName('date-465')[0]");
        date.sendKeys("11/05/2022");
        await driver.sleep(1000);

        await driver.executeScript("return document.getElementsByName('checkbox-156[]')[0].click()");

        let income = await driver.executeScript("return document.getElementsByName('number-income')[0]");
        income.sendKeys("1600");
        await driver.sleep(1000);

        await driver.executeScript("return document.getElementsByClassName('wpcf7-submit')[0].click()");
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
