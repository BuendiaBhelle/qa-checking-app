const {Builder, By} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../../../config");
const logger = require('../../../../../../middleware/logger.js');
const server = require('../../../../../../server.js');

const auth = config.auth;
const spreadsheetId = config.spreadsheetId;
const form_page = config.forms.biltmoreloanandjewelry.form5;


async function webforms(domain) {
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })

    let driver = await new Builder().forBrowser("chrome").build();

    // form fill in
    try {
        await driver.get(domain + form_page);
        await driver.sleep(2000);
        await driver.findElement(By.name("amount")).sendKeys("1");
        await driver.findElement(By.name("firstName")).sendKeys("Primeview");
        await driver.findElement(By.name("lastName")).sendKeys("Test");
        await driver.findElement(By.name("contact")).sendKeys("4806480839");
        await driver.findElement(By.name("email")).sendKeys("qa@primeview.com");
        await driver.findElement(By.name("items")).sendKeys("Lead Test Submission");
        let description = await driver.executeScript("return document.getElementsByName('description')[1]");
        description.sendKeys("Please take note that this is a test submit form for Request an Appraisal | Landing Page 2019. Please disregard if received. Thank you.");
        await driver.executeScript("return document.getElementsByName('gdpr-consent[]')[0].click()");
        await driver.executeScript("return document.getElementsByClassName('submit-btn')[0].click()");
        logger.logger.log({ level: 'info', message: 'WEBFORMS - form fill in success.', tester: server.userId });
        console.log("WEBFORMS - form fill in success.");
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
    }

    await driver.sleep(5000);

    // track thank you page
    let ty_url = await driver.getCurrentUrl();
    console.log("Form1 thank you page: " + ty_url);

    try {
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Biltmore!I2",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [ty_url]
                ]
            }
        });
        logger.logger.log({ level: 'info', message: 'WEBFORMS - track thank you page success.', tester: server.userId });
        console.log("WEBFORMS - track thank you page success.");
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
    }

    return true;

}



module.exports = { webforms };
