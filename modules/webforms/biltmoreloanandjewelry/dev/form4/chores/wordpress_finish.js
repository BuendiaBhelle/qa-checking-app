const {Builder, By, Key} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../../../config");

const wp_username = config.credentials.biltmoreloanandjewelry.username;
const wp_password = config.credentials.biltmoreloanandjewelry.password;
const auth = config.auth;
const spreadsheetId = config.spreadsheetId;


async function wordpressFinish(domain, username, password) {
    const wp_site = domain + "wp-admin";
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })

    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get(wp_site);
    
    // wp login
    try {
        if ((username) && (password)) {
            console.log("creds was edited.");
            await driver.findElement(By.name("log")).sendKeys(username);
            await driver.findElement(By.name("pwd")).sendKeys(password);
        } else {
            console.log("creds was not edited.");
            await driver.findElement(By.name("log")).sendKeys(wp_username);
            await driver.findElement(By.name("pwd")).sendKeys(wp_password);
        }
        await driver.findElement(By.id("wp-submit")).click();
        var admin_email_verification = await driver.executeScript("return document.querySelector('form').classList.contains('admin-email-confirm-form')");  
        if (admin_email_verification === true) {
            await driver.executeScript("return document.getElementsByTagName('a')[3].click()");
            console.log("with admin email verification.");
            console.log("admin_email_verification: " + admin_email_verification);
        }
    } catch (error) {
        console.log(error);
    }

    await driver.sleep(3000);
    await driver.executeScript("return document.getElementsByClassName('wp-menu-name')[14].click()");
    
    // put back original form recipients
    try {
        await driver.executeScript("return document.getElementsByClassName('row-title')[5].click()");
        await driver.sleep(3000);
        await driver.findElement(By.id("ui-id-2")).click();
        
        await driver.findElement(By.id("wpcf7-mail-recipient")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
        
        let orig_recipients_data = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "Biltmore!H2",
        });
    
        let orig_recipients = orig_recipients_data.data.values[0][0];
    
        console.log("orig_recipients: " + orig_recipients);
        
        await driver.findElement(By.id("wpcf7-mail-recipient")).sendKeys(orig_recipients);
        await driver.executeScript("return document.getElementsByName('wpcf7-save')[2].click()");
    } catch (error) {
        console.log(error);
    }

    return true;

}



module.exports = { wordpressFinish };
