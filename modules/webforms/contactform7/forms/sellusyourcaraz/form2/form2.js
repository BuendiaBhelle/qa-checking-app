const {Builder, By, Key} = require("selenium-webdriver");
const {google} = require("googleapis");
const config_webforms = require("../../../../config");
const logger = require('../../../../../../middleware/logger.js');
const server = require('../../../../../../server.js');
const sheet = require('../../../../../../middleware/gsheet.js');

const auth = config_webforms.auth;
const spreadsheetId = config_webforms.spreadsheetId;


async function webforms(domain, checkbox, timestamp, forms, range_thankyou_page, module_name, launch, webforms) {
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })

    let driver = await new Builder().forBrowser("chrome").build();

    // form fill in
    try {
        // await driver.get(domain + forms);
        await driver.get(domain);
        await driver.sleep(5000);
        await driver.executeScript("return document.getElementsByClassName('quotebtn')[0].click()");
        // await driver.sleep(1000);
        // if (checkbox === "dev") {
        //     let phone_no = await driver.executeScript("return document.getElementsByName('customer-mobile')[1]");
        //     phone_no.sendKeys("4806480839");
        // } else if (checkbox === "live"){
        //     let phone_no = await driver.executeScript("return document.getElementsByName('phone_no')[1]");
        //     phone_no.sendKeys("4806480839");
        // }
        await driver.sleep(1000);
        let fullname = await driver.executeScript("return document.getElementsByName('fullname')[1]");
        fullname.sendKeys("Primeview Test");
        await driver.sleep(1000);
        let email_id = await driver.executeScript("return document.getElementsByName('email_id')[1]");
        email_id.sendKeys("qa@primeview.com");
        await driver.sleep(1000);
        let phone_no = await driver.executeScript("return document.getElementsByName('phone_no')[1]");
        phone_no.sendKeys("4806480839");
        await driver.sleep(1000);
        let product_year = await driver.executeScript("return document.getElementsByName('product_year')[1]");
        product_year.sendKeys("2015");
        await driver.sleep(1000);
        let product_make = await driver.executeScript("return document.getElementsByName('product_make')[1]");
        product_make.sendKeys("Lead Test Submission");
        await driver.sleep(1000);
        let product_model = await driver.executeScript("return document.getElementsByName('product_model')[1]");
        product_model.sendKeys("Lead Test Submission");
        await driver.sleep(1000);
        let crossroads = await driver.executeScript("return document.getElementsByName('crossroads')[1]");
        crossroads.sendKeys("7620 E McKellips Rd");
        await driver.executeScript("return document.getElementsByClassName('banner_leftbtn')[1].click()");
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
