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
        let name = await driver.executeScript("return document.getElementsByName('auth-name')[0]");
        name.sendKeys("Primeview Test");
        await driver.sleep(1000);

        let date = await driver.executeScript("return document.getElementsByName('auth-date')[0]");
        date.sendKeys("05/10/2022");
        await driver.sleep(1000);

        let address = await driver.executeScript("return document.getElementsByName('auth-address')[0]");
        address.sendKeys("7620 E McKellips Rd");
        await driver.sleep(1000);

        let phone = await driver.executeScript("return document.getElementsByName('auth-phone')[0]");
        phone.sendKeys("4806480839");
        await driver.sleep(1000);

        let email = await driver.executeScript("return document.getElementsByName('auth-email')[0]");
        email.sendKeys("qa@primeview.com");
        await driver.sleep(1000);

        let insurance = await driver.executeScript("return document.getElementsByName('auth-insurance-company')[0]");
        insurance.sendKeys("Lead Test Submission");
        await driver.sleep(1000);

        let claim = await driver.executeScript("return document.getElementsByName('auth-claim-number')[0]");
        claim.sendKeys("555");
        await driver.sleep(1000);

        let year = await driver.executeScript("return document.getElementsByName('auth-year')[0]");
        year.sendKeys("2021");
        await driver.sleep(1000);

        let make = await driver.executeScript("return document.getElementsByName('auth-make')[0]");
        make.sendKeys("Lead Test Submission");
        await driver.sleep(1000);

        let model = await driver.executeScript("return document.getElementsByName('auth-model')[0]");
        model.sendKeys("Lead Test Submission");
        await driver.sleep(1000);

        let loo = await driver.executeScript("return document.getElementsByName('auth-lease-owned')[0]");
        loo.sendKeys("Lead Test Submission");
        await driver.sleep(1000);

        let plate = await driver.executeScript("return document.getElementsByName('auth-liscence-plate')[0]");
        plate.sendKeys("333");
        await driver.sleep(1000);

        let vin = await driver.executeScript("return document.getElementsByName('auth-vin')[0]");
        vin.sendKeys("Lead Test Submission");
        await driver.sleep(1000);

        let notes = await driver.executeScript("return document.getElementsByName('auth-notes')[0]");
        notes.sendKeys("Please take note that this is a test submit form for ACC Authorization Form. Please disregard if received. Thank you.");
        await driver.sleep(1000);

        let pd = await driver.executeScript("return document.getElementsByName('auth-prior-damage')[0]");
        pd.sendKeys("Lead Test Submission");
        await driver.sleep(1000);

        let cr = await driver.executeScript("return document.getElementsByName('auth-customer-request')[0]");
        cr.sendKeys("Lead Test Submission");
        await driver.sleep(1000);

        await driver.findElement(By.id("wpcf7_auth-vehicle-owner-signature_signature")).click();
        await driver.sleep(1000);

        let ad = await driver.executeScript("return document.getElementsByName('auth-assignment-date')[0]");
        ad.sendKeys("05/10/2022");
        await driver.sleep(1000);

        let disclaimer = await driver.executeScript("return document.getElementsByName('auth-disclaimer-initial')[0]");
        disclaimer.sendKeys("WL");
        await driver.sleep(1000);

        let disclaimer_yes = await driver.executeScript("return document.getElementsByName('auth-disclaimer-bottom-initial-yes')[0]");
        disclaimer_yes.sendKeys("WL");
        await driver.sleep(2000);

        await driver.findElement(By.id("wpcf7_auth-vehicle-owner-signature-bottom_signature")).click();
        await driver.sleep(1000);

        let cd = await driver.executeScript("return document.getElementsByName('auth-customer-date')[0]");
        cd.sendKeys("05/10/2022");
        await driver.sleep(1000);

        await driver.executeScript("return document.getElementsByClassName('wpcf7-submit')[0].click()");
        logger.logger.log({ level: 'info', message: 'WEBFORMS - form fill in success.', tester: server.userId });
        console.log("WEBFORMS - form fill in success.");
        value = [ "", "", "info", "form fill in success.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", forms + "\n" + webforms, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, "", forms + "\n" + webforms, "", "" ];
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
        value = [ "", "", "info", "track thank you page success.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", forms + "\n" + webforms, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, "", forms + "\n" + webforms, "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    return true;

}



module.exports = { webforms };
