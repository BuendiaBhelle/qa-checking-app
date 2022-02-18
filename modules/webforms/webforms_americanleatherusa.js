const {Builder, By, Key, util} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../../qa-checking-app/modules/webforms/config");

const wp_username = config.creds_americanleatherusa.username;
const wp_password = config.creds_americanleatherusa.password;
const qa_email = config.qa_email;
const auth = config.auth;
const spreadsheetId = config.spreadsheetId;
const date = config.date;


// form1 - Contact form 1
async function site4_form1(domain, checkbox, username, password) {
    const wp_site = domain + "wp-admin";
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })
    const form1_page = "contact-us/";

    let requests = [{
        insertRange: {
            range: {
                sheetId: 1193745199,
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
        "American Leather!A2",
        "American Leather!B2",
        "American Leather!C2",
        "American Leather!C3",
        "American Leather!D2",
        "American Leather!E2",
        "American Leather!G2",
    ]

    let values = [
        "",
        date,
        wp_username,
        wp_password,
        domain + form1_page,
        "Contact form 1",
        '[contact-form-7 id="10" title="Contact form 1"]',
    ]

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

    if ((username) && (password)) {
        console.log("creds was edited.");
        await driver.findElement(By.name("log")).sendKeys(username);
        await driver.findElement(By.name("pwd")).sendKeys(password);
        await driver.findElement(By.id("wp-submit")).click();
    } else {
        console.log("creds was not edited.");
        await driver.findElement(By.name("log")).sendKeys(wp_username);
        await driver.findElement(By.name("pwd")).sendKeys(wp_password);
        await driver.findElement(By.id("wp-submit")).click();
    }


    var admin_email_verification = await driver.executeScript("return document.querySelector('form').classList.contains('admin-email-confirm-form')");  
    if (admin_email_verification === true) {
        await driver.executeScript("return document.getElementsByTagName('a')[3].click()");
        console.log("with admin email verification.");
        console.log("admin_email_verification: " + admin_email_verification);
    }

    if (checkbox === "dev") {
        await driver.executeScript("return document.getElementsByClassName('wp-menu-name')[7].click()");
    }
    else if (checkbox === "live") {
        await driver.executeScript("return document.getElementsByClassName('wp-menu-name')[8].click()");
    }

    await driver.executeScript("return document.getElementsByClassName('row-title')[0].click()");
    await driver.findElement(By.id("ui-id-2")).click();
    let recipients_form1 = await driver.findElement(By.id("wpcf7-mail-recipient")).getAttribute('value');
    console.log("recipients_form1: " + recipients_form1);

    try {
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "American Leather!H2",
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

    await driver.findElement(By.id("wpcf7-mail-recipient")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
    await driver.findElement(By.id("wpcf7-mail-recipient")).sendKeys(qa_email);
    await driver.executeScript("return document.getElementsByName('wpcf7-save')[2].click()");

    await driver.switchTo().newWindow('tab');
    await driver.get(domain + form1_page);
    await driver.findElement(By.name("your-name")).sendKeys("Primeview Test");
    await driver.findElement(By.name("your-email")).sendKeys("qa@primeview.com"); 
    await driver.findElement(By.name("your-subject")).sendKeys("Test Lead Submission");
    await driver.findElement(By.name("your-message")).sendKeys("Please take note that this is a test submit form for Contact form 1. Please disregard if received. Thank you.");
    await driver.executeScript("return document.getElementsByClassName('wpcf7-submit')[0].click()");
    await driver.sleep(5000);
    let ty_url = await driver.getCurrentUrl();
    console.log("Form1 thank you page: " + ty_url);

    try {
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "American Leather!I2",
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

    await driver.switchTo().newWindow('tab');
    await driver.get(wp_site);

    if (checkbox === "dev") {
        await driver.executeScript("return document.getElementsByClassName('wp-menu-name')[7].click()");
    }
    else if (checkbox === "live") {
        await driver.executeScript("return document.getElementsByClassName('wp-menu-name')[8].click()");
    }
    
    await driver.executeScript("return document.getElementsByClassName('row-title')[0].click()");
    await driver.findElement(By.id("ui-id-2")).click();

    await driver.findElement(By.id("wpcf7-mail-recipient")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
    
    let orig_recipients_data = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "American Leather!H2",
    });

    let orig_recipients = orig_recipients_data.data.values[0][0];

    console.log("orig_recipients: " + orig_recipients);
    
    await driver.findElement(By.id("wpcf7-mail-recipient")).sendKeys(orig_recipients);
    await driver.executeScript("return document.getElementsByName('wpcf7-save')[2].click()");
}



module.exports = { site4_form1 };
