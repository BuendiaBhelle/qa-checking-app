const {Builder, By, Key} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../../config");

const auth = config.auth;
const spreadsheetId = config.spreadsheetId;
const form_page = config.forms.canyonfallshairextensioncompany.form1;


async function webforms(domain) {
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })

    let driver = await new Builder().forBrowser("chrome").build();

    // form fill in
    try {
        await driver.get(domain + form_page);
        await driver.findElement(By.name("your-first-name")).sendKeys("Primeview");
        await driver.findElement(By.name("your-last-name")).sendKeys("Test");
        await driver.findElement(By.name("your-email")).sendKeys("qa@primeview.com");
        await driver.findElement(By.name("your-phone")).sendKeys(Key.BACK_SPACE, Key.BACK_SPACE);
        await driver.findElement(By.name("your-phone")).sendKeys("4806480839");
        await driver.findElement(By.name("your-time")).click();
        await driver.findElement(By.name("your-time")).sendKeys("5");
        await driver.findElement(By.name("your-time")).sendKeys(Key.ENTER);
        await driver.findElement(By.name("your-message")).sendKeys("Please take note that this is a test submit form for Request an Appointment. Please disregard if received. Thank you.");
        await driver.executeScript("return document.getElementsByClassName('wpcf7-submit')[0].click()");
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
            range: "Canyon Falls Hair Extension Company!I2",
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
