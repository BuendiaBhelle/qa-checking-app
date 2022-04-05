const {Builder, By} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../../../config");
const logger = require('../../../../../../middleware/logger.js');
const server = require('../../../../../../server.js');
const sheet = require('../../../../../../middleware/gsheet.js');

const auth = config.auth;
const spreadsheetId = config.spreadsheetId;
const form_page = config.forms.judefrancesjewelry.form2;
const module_name = config.module_name;
const launch = config.launch.dev;
const form = config.webforms.judefrancesjewelry.dev.form2;


async function webforms(domain, timestamp) {
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })

    let driver = await new Builder().forBrowser("chrome").build();

    // form fill in
    try {
        await driver.get(domain + form_page);
        await driver.sleep(1000);
        await driver.findElement(By.id("input_2_2_3")).sendKeys("Primeview");
        await driver.sleep(1000);
        await driver.findElement(By.id("input_2_2_6")).sendKeys("Test");
        await driver.sleep(1000);
        await driver.findElement(By.id("input_2_1")).sendKeys("qa@primeview.com");
        await driver.sleep(1000);
        await driver.findElement(By.id("input_2_3_1")).sendKeys("7620 E McKellips Rd");
        await driver.sleep(1000);
        await driver.findElement(By.id("input_2_3_3")).sendKeys("Scottsdale");
        await driver.sleep(1000);
        await driver.findElement(By.id("input_2_3_4")).sendKeys("AZ");
        await driver.sleep(1000);
        await driver.findElement(By.id("input_2_3_5")).sendKeys("85257");
        await driver.sleep(1000);
        await driver.findElement(By.id("input_2_4")).sendKeys("(480) 648-0839");
        await driver.sleep(1000);
        await driver.findElement(By.id("input_2_5")).sendKeys("333");
        await driver.sleep(1000);
        await driver.findElement(By.id("input_2_6")).sendKeys("2");
        await driver.sleep(1000);
        await driver.findElement(By.id("input_2_7")).sendKeys("444");
        // image attachment
        await driver.sleep(1000);
        await driver.findElement(By.id("input_2_9")).sendKeys("Lead Test Submission");
        await driver.executeScript("return document.getElementsByClassName('btn-gform')[0].click()");
        logger.logger.log({ level: 'info', message: 'WEBFORMS - form fill in success.', tester: server.userId });
        console.log("WEBFORMS - form fill in success.");
        value = [ "", "info", "form fill in success.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", form_page + "\n" + form, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, "", form_page + "\n" + form, "", "" ];
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
            range: "Jude Frances Jewelry!I2",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [ty_url]
                ]
            }
        });
        logger.logger.log({ level: 'info', message: 'WEBFORMS - track thank you page success.', tester: server.userId });
        console.log("WEBFORMS - track thank you page success.");
        value = [ "", "info", "track thank you page success.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", form_page + "\n" + form, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, "", form_page + "\n" + form, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    return true;

}



module.exports = { webforms };
