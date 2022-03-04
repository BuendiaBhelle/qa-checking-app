const {Builder, By, Key} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../../../config");

const wp_username = config.credentials.azdoordoctor.username;
const wp_password = config.credentials.azdoordoctor.password;
const qa_email = config.qa_email;
const auth = config.auth;
const spreadsheetId = config.spreadsheetId;
const date = config.date;
const form_page = config.forms.azdoordoctor.form1;


async function wordpressStart(domain, username, password, email) {
    const wp_site = domain + "wp-admin";
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })

    let requests = [{
        insertRange: {
            range: {
                sheetId: 1496243836,
                startRowIndex: 1,
                endRowIndex: 4,
                startColumnIndex: 0,
            },
            shiftDimension: "ROWS"
        }
    }];   
    
    const batchUpdateRequest = {requests};
    
    // add columns
    await googleSheets.spreadsheets.batchUpdate({
        auth,
        spreadsheetId,
        resource: batchUpdateRequest,
        }, (err, response) => {
        if (err) {
            console.log(err);
        } else {
           
            console.log("Success");
        }
    });

    let ranges = [
        "Azdoordoctor!A2",
        "Azdoordoctor!B2",
        "Azdoordoctor!C2",
        "Azdoordoctor!C3",
        "Azdoordoctor!D2",
        "Azdoordoctor!E2",
        "Azdoordoctor!G2",
    ]

    let values = [
        "",
        date,
        wp_username,
        wp_password,
        domain + form_page,
        "Contact Us",
        '[contact-form-7 id="1133" title="Contact Us"]',
    ]

    // track form details
    for (let index = 0; index < ranges.length; index++) {
        try {
            await googleSheets.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: ranges[index],
                valueInputOption: "USER_ENTERED",
                resource: {
                    values: [
                        [values[index]]
                    ]
                }
            });
            console.log("success.");
        } catch (error) {
            console.log(error);
        }
        
    }

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

    await driver.executeScript("return document.getElementsByClassName('wp-menu-name')[6].click()");

    await driver.executeScript("return document.getElementsByClassName('row-title')[1].click()");
    await driver.findElement(By.id("ui-id-2")).click();
    let recipients_form1 = await driver.findElement(By.id("wpcf7-mail-recipient")).getAttribute('value');
    console.log("recipients_form1: " + recipients_form1);

    // track form recipients
    try {
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Azdoordoctor!H2",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [recipients_form1]
                ]
            }
        });
        console.log("success.");
    } catch (error) {
        console.log(error);
    }

    // change form recipients
    try {
        await driver.findElement(By.id("wpcf7-mail-recipient")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
        if (email) {
            await driver.findElement(By.id("wpcf7-mail-recipient")).sendKeys(email);
        } else {
            await driver.findElement(By.id("wpcf7-mail-recipient")).sendKeys(qa_email);    }
        await driver.executeScript("return document.getElementsByName('wpcf7-save')[2].click()");
    } catch (error) {
        console.log(error);
    }

    return true;
    
}


module.exports = { wordpressStart };
