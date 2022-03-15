const {Builder, By, Key} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../../../config");
const logger = require('../../../../../../middleware/logger.js');
const server = require('../../../../../../server.js');
const sheet = require('../../../../../../middleware/gsheet.js');
const configMain = require('../../../../../../config.js');

const auth = config.auth;
const spreadsheetId = config.spreadsheetId;
const form_page_dev = config.forms.advancedimagemedspa.form3_dev;
const form_page_live = config.forms.advancedimagemedspa.form3_live;


async function webforms(domain, checkbox) {
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })

    let driver = await new Builder().forBrowser("chrome").build();

    // form fill in
    try {
        if (checkbox === "dev") {
            await driver.get(domain + form_page_dev);
        } else if (checkbox === "live") {
            await driver.get(domain + form_page_live);
        }
        await driver.findElement(By.name("nl-name")).sendKeys("Primeview Test");
        await driver.findElement(By.name("nl-email")).sendKeys("qa@primeview.com");
        await driver.findElement(By.name("nl-phone")).sendKeys("4806480839");
        await driver.findElement(By.name("nl-services")).click();
        await driver.findElement(By.name("nl-services")).sendKeys("botox");
        await driver.findElement(By.name("nl-services")).sendKeys(Key.ENTER);
        await driver.findElement(By.name("nl-message")).sendKeys("Please take note that this is a test submit form for Request Form ( Sidebar ) - New Layout. Please disregard if received. Thank you.");
        await driver.executeScript("return document.getElementsByClassName('wpcf7-submit')[0].click()");
        logger.logger.log({ level: 'info', message: 'WEBFORMS - form fill in success.', tester: server.userId });
        console.log("WEBFORMS - form fill in success.");
        value = [
            "",
            "info",
            "WEBFORMS - form fill in success.",
            server.userId,
            configMain.dateString
        ]
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [
            "",
            "error",
            JSON.stringify(error),
            server.userId,
            configMain.dateString
        ]
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
            range: "Advance Image Med Spa!I2",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [ty_url]
                ]
            }
        });
        logger.logger.log({ level: 'info', message: 'WEBFORMS - track thank you page success.', tester: server.userId });
        console.log("WEBFORMS - track thank you page success.");
        value = [
            "",
            "info",
            "WEBFORMS - track thank you page success.",
            server.userId,
            configMain.dateString
        ]
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [
            "",
            "error",
            JSON.stringify(error),
            server.userId,
            configMain.dateString
        ]
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    return true;

}



module.exports = { webforms };
