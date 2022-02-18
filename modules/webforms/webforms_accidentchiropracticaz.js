const {Builder, By, Key, util} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../../qa-checking-app/modules/webforms/config");

const wp_username = config.creds_accidentchiropracticaz.username;
const wp_password = config.creds_accidentchiropracticaz.password;
const qa_email = config.qa_email;
const auth = config.auth;
const spreadsheetId = config.spreadsheetId;
const date = config.date;


// form1 - Schedule an Appointment - Home
async function site1_form1(domain, username, password) {
    const wp_site = domain + "wp-admin";
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })
    const form1_page = "about-us/";

    let requests = [{
        insertRange: {
            range: {
                sheetId: 1564137953,
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
        "Accident Chiropractic!A2",
        "Accident Chiropractic!B2",
        "Accident Chiropractic!C2",
        "Accident Chiropractic!C3",
        "Accident Chiropractic!D2",
        "Accident Chiropractic!E2",
        "Accident Chiropractic!G2",
    ]

    let values = [
        "",
        date,
        wp_username,
        wp_password,
        domain + form1_page,
        "Schedule an Appointment - Home",
        '[contact-form-7 id="46" title="Schedule an Appointment - Home"]',
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

    await driver.executeScript("return document.getElementsByClassName('wp-menu-name')[8].click()");
    await driver.executeScript("return document.getElementsByClassName('row-title')[0].click()");
    await driver.findElement(By.id("ui-id-2")).click();
    let recipients_form1 = await driver.findElement(By.id("wpcf7-mail-recipient")).getAttribute('value');
    console.log("recipients_form1: " + recipients_form1);

    try {
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Accident Chiropractic!H2",
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
    await driver.findElement(By.name("first_name")).sendKeys("Primeview");
    await driver.findElement(By.name("last_name")).sendKeys("Test");
    await driver.findElement(By.name("email")).sendKeys("qa@primeview.com");
    await driver.findElement(By.name("contact_number")).sendKeys("4806480839");
    await driver.executeScript("return document.getElementsByClassName('wpcf7-submit')[0].click()");
    await driver.sleep(5000);
    let ty_url = await driver.getCurrentUrl();
    console.log("Form1 thank you page: " + ty_url);

    try {
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Accident Chiropractic!I2",
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

    await driver.executeScript("return document.getElementsByClassName('wp-menu-name')[8].click()");
    await driver.executeScript("return document.getElementsByClassName('row-title')[0].click()");
    await driver.findElement(By.id("ui-id-2")).click();

    await driver.findElement(By.id("wpcf7-mail-recipient")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
    
    let orig_recipients_data = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Accident Chiropractic!H2",
    });

    let orig_recipients = orig_recipients_data.data.values[0][0];

    console.log("orig_recipients: " + orig_recipients);
    
    await driver.findElement(By.id("wpcf7-mail-recipient")).sendKeys(orig_recipients);
    await driver.executeScript("return document.getElementsByName('wpcf7-save')[2].click()");
}


// form2 - Schedule an Appointment - Sidebar
async function site1_form2(domain, username, password) {
    const wp_site = domain + "wp-admin";
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })
    const form2_page = "contact/";

    let requests = [{
        insertRange: {
            range: {
                sheetId: 1564137953,
                startRowIndex: 1,
                endRowIndex: 2,
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
        "Accident Chiropractic!A2",
        "Accident Chiropractic!B2",
        "Accident Chiropractic!D2",
        "Accident Chiropractic!E2",
        "Accident Chiropractic!G2",
    ]

    let values = [
        "",
        date,
        domain + form2_page,
        "Schedule an Appointment - Sidebar",
        '[contact-form-7 id="1032" title="Schedule an Appointment - Sidebar"]',
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

    await driver.executeScript("return document.getElementsByClassName('wp-menu-name')[8].click()");

    await driver.executeScript("return document.getElementsByClassName('row-title')[1].click()");
    await driver.findElement(By.id("ui-id-2")).click();
    let recipients_form2 = await driver.findElement(By.id("wpcf7-mail-recipient")).getAttribute('value');
    console.log("recipients_form2: " + recipients_form2);

    try {
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Accident Chiropractic!H2",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [recipients_form2]
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
    await driver.get(domain + form2_page);
    await driver.findElement(By.name("first_name")).sendKeys("Primeview");
    await driver.findElement(By.name("last_name")).sendKeys("Test");
    await driver.findElement(By.name("email")).sendKeys("qa@primeview.com");
    await driver.findElement(By.name("contact_number")).sendKeys("4806480839");
    await driver.executeScript("return document.getElementsByClassName('wpcf7-submit')[0].click()");
    await driver.sleep(5000);
    let ty_url = await driver.getCurrentUrl();
    console.log("Form1 thank you page: " + ty_url);

    try {
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Accident Chiropractic!I2",
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

    await driver.executeScript("return document.getElementsByClassName('wp-menu-name')[8].click()");
    await driver.executeScript("return document.getElementsByClassName('row-title')[1].click()");
    await driver.findElement(By.id("ui-id-2")).click();

    await driver.findElement(By.id("wpcf7-mail-recipient")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
    
    let orig_recipients_data = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Accident Chiropractic!H2",
    });

    let orig_recipients = orig_recipients_data.data.values[0][0];

    console.log("orig_recipients: " + orig_recipients);
    
    await driver.findElement(By.id("wpcf7-mail-recipient")).sendKeys(orig_recipients);
    await driver.executeScript("return document.getElementsByName('wpcf7-save')[2].click()");
}


module.exports = { site1_form1, site1_form2 };
