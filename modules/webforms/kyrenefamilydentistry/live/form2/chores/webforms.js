const {Builder, By} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../../../config");
const logger = require('../../../../../../middleware/logger.js');
const server = require('../../../../../../server.js');
const sheet = require('../../../../../../middleware/gsheet.js');

const auth = config.auth;
const spreadsheetId = config.spreadsheetId;
const form_page = config.forms.kyrenefamilydentistry.form2;


async function webforms(domain, timestamp) {
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })

    let driver = await new Builder().forBrowser("chrome").build();

    // form fill in
    try {
        await driver.get(domain + form_page);
        await driver.findElement(By.name("date")).sendKeys("03/17/2022");
        await driver.findElement(By.name("time")).sendKeys("10:00am");
        await driver.findElement(By.name("first-name")).sendKeys("Primeview");
        await driver.findElement(By.name("last-name")).sendKeys("Test");
        await driver.findElement(By.name("phone")).sendKeys("4806480839");
        await driver.findElement(By.name("email")).sendKeys("qa@primeview.com"); 
        await driver.findElement(By.name("address")).sendKeys("7620 E McKellips Rd"); 
        await driver.findElement(By.name("city")).sendKeys("Scottsdale"); 
        await driver.findElement(By.name("state")).sendKeys("AZ"); 
        await driver.findElement(By.name("zip")).sendKeys("85257");
        await driver.executeScript("return document.getElementsByName('acceptance')[0].click()");        
        await driver.executeScript("return document.getElementsByClassName('btn-primary')[0].click()");
        logger.logger.log({ level: 'info', message: 'WEBFORMS - form fill in success.', tester: server.userId });
        console.log("WEBFORMS - form fill in success.");
        value = [
            "",
            "info",
            "WEBFORMS - form fill in success.",
            server.userId,
            timestamp
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
            timestamp
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
            range: "Kyrene Family Dentistry!I2",
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
            timestamp
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
            timestamp
        ]
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    return true;

}



module.exports = { webforms };
