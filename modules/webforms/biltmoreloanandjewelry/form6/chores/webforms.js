const {Builder, By} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../../config");

const auth = config.auth;
const spreadsheetId = config.spreadsheetId;
const form_page = config.forms.biltmoreloanandjewelry.form6;


async function webforms(domain) {
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })

    let driver = await new Builder().forBrowser("chrome").build();

    // form fill in
    try {
        await driver.get(domain + form_page);
        await driver.sleep(3000);
        await driver.findElement(By.name("first-name")).sendKeys("Primeview");
        await driver.findElement(By.name("last-name")).sendKeys("Test");
        await driver.findElement(By.name("email")).sendKeys("qa@primeview.com");
        await driver.findElement(By.name("pnumber")).sendKeys("4806480839");
        let location = await driver.executeScript("return document.getElementsByName('plocation')[0]");
        location.click();
        let description = await driver.executeScript("return document.getElementsByName('message')[0]");
        description.sendKeys("Please take note that this is a test submit form for Book an Appointment (SB). Please disregard if received. Thank you.");
        await driver.executeScript("return document.getElementsByName('gdpr-consent[]')[0].click()");
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
