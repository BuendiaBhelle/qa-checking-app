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
        await driver.findElement(By.name("todays-date")).sendKeys("22/04/2022");
        await driver.findElement(By.name("Lname")).sendKeys("Test");
        await driver.findElement(By.name("Fname")).sendKeys("Primeview");
        await driver.findElement(By.name("Mname")).sendKeys("T");
        await driver.findElement(By.name("OCE")).sendKeys("Test");
        await driver.findElement(By.name("birth-date")).sendKeys("22/04/2022");
        await driver.findElement(By.name("age")).sendKeys("21");
        await driver.executeScript("return document.getElementsByName('sex')[1].click()");
        await driver.findElement(By.name("address")).sendKeys("7620 E McKellips Rd");
        await driver.findElement(By.name("email")).sendKeys("qa@primeview.com");
        await driver.findElement(By.name("Cnumber")).sendKeys("4806480839");
        await driver.findElement(By.name("Emergencyemail")).sendKeys("qa@primeview.com");
        await driver.findElement(By.name("EmergenyCnumber")).sendKeys("4806480839");
        await driver.executeScript("return document.getElementsByName('class-location')[0].click()");
        await driver.findElement(By.name("goals")).sendKeys("Test");
        await driver.findElement(By.name("educational-background")).sendKeys("Test");
        await driver.findElement(By.name("past-felonies")).sendKeys("Test");
        await driver.findElement(By.name("medical-records")).sendKeys("Test");
        await driver.findElement(By.name("medical-records-2")).sendKeys("Test");
        await driver.executeScript("return document.getElementsByName('previous-literacy-program')[1].click()");
        await driver.executeScript("return document.getElementsByName('safety-background-check')[1].click()");
        await driver.executeScript("return document.getElementsByName('obligation')[1].click()");
        await driver.executeScript("return document.getElementsByName('tsrh-literacy-program')[1].click()");
        await driver.findElement(By.id("wpcf7_signature_signature")).click();
        await driver.executeScript("return document.getElementsByName('gdpr-checkbox[]')[0].click()");
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
