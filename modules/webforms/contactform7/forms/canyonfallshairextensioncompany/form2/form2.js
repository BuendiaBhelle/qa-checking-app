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
        await driver.findElement(By.name("order-date")).sendKeys("21012021");
        await driver.findElement(By.name("order-number")).sendKeys("123");
        await driver.findElement(By.name("your-name")).sendKeys("Primeview");
        await driver.findElement(By.name("your-email")).sendKeys("qa@primeview.com");
        await driver.findElement(By.name("your-phone")).sendKeys(Key.BACK_SPACE, Key.BACK_SPACE);
        await driver.findElement(By.name("your-phone")).sendKeys("4806480839");
        await driver.findElement(By.name("your-street")).sendKeys("7620 E McKellips Rd");
        await driver.findElement(By.name("your-country")).click();
        await driver.findElement(By.name("your-country")).sendKeys("uuuuu");
        await driver.findElement(By.name("your-country")).sendKeys(Key.ENTER);
        await driver.sleep(2000);
        await driver.findElement(By.name("your-state")).click();
        await driver.findElement(By.name("your-state")).sendKeys("ari");
        await driver.findElement(By.name("your-state")).sendKeys(Key.ENTER);
        await driver.sleep(2000);
        await driver.findElement(By.name("your-city")).click();
        await driver.findElement(By.name("your-city")).sendKeys("sco");
        await driver.findElement(By.name("your-city")).sendKeys(Key.ENTER);
        await driver.findElement(By.name("your-postal-code")).sendKeys("85257");
        await driver.findElement(By.name("your-explanation")).sendKeys("Please take note that this is a test submit form for Return Request Form. Please disregard if received. Thank you.");
        await driver.findElement(By.name("your-acceptance")).click();
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
