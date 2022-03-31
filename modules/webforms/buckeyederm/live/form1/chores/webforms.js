const {Builder, By} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../../../config");
const logger = require('../../../../../../middleware/logger.js');
const server = require('../../../../../../server.js');
const sheet = require('../../../../../../middleware/gsheet.js');

const auth = config.auth;
const spreadsheetId = config.spreadsheetId;
const form_page = config.forms.buckeyederm.form1;
const module_name = config.module_name;
const launch = config.launch.live;
const form = config.webforms.buckeyederm.live.form1;


async function webforms(domain, timestamp) {
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })

    let driver = await new Builder().forBrowser("chrome").build();

    // form fill in
    try {
        await driver.get(domain + form_page);
        await driver.findElement(By.name("your-name")).sendKeys("Primeview Test");
        await driver.findElement(By.name("your-email")).sendKeys("qa@primeview.com"); 
        await driver.findElement(By.name("your-subject")).sendKeys("Lead Test Submission");
        await driver.findElement(By.name("your-message")).sendKeys("Please take note that this is a test submit form for Schedule an Appointment. Please disregard if received. Thank you.");
        await driver.executeScript("return document.getElementsByClassName('btn-primary')[0].click()");
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
            range: "Buckeye Derm!I2",
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
