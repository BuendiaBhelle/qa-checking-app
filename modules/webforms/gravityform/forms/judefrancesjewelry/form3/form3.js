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
        await driver.sleep(1000);
        await driver.findElement(By.id("input_3_1_3")).sendKeys("Primeview");
        await driver.sleep(1000);
        await driver.findElement(By.id("input_3_1_6")).sendKeys("Test");
        await driver.sleep(1000);
        await driver.findElement(By.id("input_3_2")).sendKeys("qa@primeview.com");
        await driver.sleep(1000);
        await driver.findElement(By.id("input_3_4")).sendKeys("(480) 648-0839");
        await driver.sleep(1000);
        await driver.findElement(By.id("input_3_3_1")).sendKeys("7620 E McKellips Rd");
        await driver.sleep(1000);
        await driver.findElement(By.id("input_3_3_3")).sendKeys("Scottsdale");
        await driver.sleep(1000);
        await driver.findElement(By.id("input_3_3_4")).sendKeys("AZ");
        await driver.sleep(1000);
        await driver.findElement(By.id("input_3_3_5")).sendKeys("85257");
        await driver.sleep(1000);
        await driver.findElement(By.id("input_3_5")).sendKeys("333");
        await driver.sleep(1000);
        await driver.findElement(By.id("input_3_6")).sendKeys("444");
        // image attachment
        await driver.sleep(1000);
        await driver.findElement(By.id("input_3_8")).sendKeys("Lead Test Submission");
        await driver.executeScript("return document.getElementsByClassName('btn-gform')[0].click()");
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
