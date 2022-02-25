const {Builder, By} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../../config");

const auth = config.auth;
const spreadsheetId = config.spreadsheetId;
const form_page = config.forms.biltmoreloanandjewelry.form4;


async function webforms(domain) {
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })

    let driver = await new Builder().forBrowser("chrome").build();

    // form fill in
    try {
        await driver.get(domain + form_page);
        await driver.findElement(By.name("your-fname")).sendKeys("Primeview");
        await driver.findElement(By.name("your-lname")).sendKeys("Test");
        await driver.findElement(By.name("your-email")).sendKeys("qa@primeview.com");
        await driver.findElement(By.name("your-phone")).sendKeys("4806480839");
        await driver.findElement(By.name("your-subject")).sendKeys("Lead Test Submission");
        await driver.findElement(By.name("your-message")).sendKeys("Please take note that this is a test submit form for Contact form 1. Please disregard if received. Thank you.");
        await driver.executeScript("return document.getElementsByName('gdpr-consent[]')[0].click()");
        await driver.executeScript("return document.getElementsByClassName('submit-btn')[0].click()");
    } catch (error) {
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
        console.log("success.");
    } catch (error) {
        console.log(error);
    }

    return true;

}



module.exports = { webforms };
