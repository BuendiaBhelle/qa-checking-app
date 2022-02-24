const {Builder, By, Key} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../../../config");

const wp_username = config.credentials.indinspect.username;
const wp_password = config.credentials.indinspect.password;
const qa_email = config.qa_email;
const auth = config.auth;
const spreadsheetId = config.spreadsheetId;
const date = config.date;
const form_page = config.forms.indinspect.form2;


async function wordpressStart(domain, checkbox, username, password, email) {
    const wp_site = domain + "wp-admin";
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })   

    let requests = [{
        insertRange: {
            range: {
                sheetId: 1563257098,
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
        "Industrial Inspection & Consulting!A2",
        "Industrial Inspection & Consulting!B2",
        "Industrial Inspection & Consulting!C2",
        "Industrial Inspection & Consulting!C3",
        "Industrial Inspection & Consulting!D2",
        "Industrial Inspection & Consulting!E2",
        "Industrial Inspection & Consulting!G2",
    ]

    let values = [
        "Pre-launch",
        date,
        wp_username,
        wp_password,
        domain + form_page,
        "Request Information",
        'gform_2',
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
    await driver.executeScript("return document.getElementsByTagName('a')[223].click()");

    // get admin notif recipient
    await driver.executeScript("return document.getElementsByTagName('a')[210].click()");

    let recipients = await driver.executeScript("return document.getElementById('toEmail').value");
    console.log("recipients: " + recipients);

    // track form recipients
    try {
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Industrial Inspection & Consulting!H2",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [recipients]
                ]
            }
        });
        console.log("success.");
    } catch (error) {
        console.log(error);
    }
    
    await driver.executeScript("return document.getElementsByClassName('label')[2].click()");

    // change form recipients
    try {
        await driver.executeScript("return document.getElementsByTagName('a')[214].click()");
        await driver.findElement(By.id("toEmail")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
        if (email) {
            await driver.findElement(By.id("toEmail")).sendKeys(email);
        } else {
            await driver.findElement(By.id("toEmail")).sendKeys(qa_email);
        }
        await driver.executeScript("return document.getElementsByClassName('primary button large')[0].click()");
        await driver.executeScript("return document.getElementsByClassName('label')[2].click()");
    } catch (error) {
        console.log(error);
    }

    // set form email recipients to qa's
    let admin_notif_status = await driver.executeScript("return document.getElementsByClassName('gform-status-indicator-status')[0].innerHTML");
    console.log("admin_notif_status: " + admin_notif_status);

    // set admin notif to inactive
    try {
        if (admin_notif_status === "Active") {
            await driver.executeScript("return document.getElementsByClassName('gform-status-indicator-status')[0].click()");
        }
    } catch (error) {
        console.log(error);
    }

    let qa_notif_status = await driver.executeScript("return document.getElementsByClassName('gform-status-indicator-status')[1].innerHTML");
    console.log("qa_notif_status: " + qa_notif_status);

    // set qa notif to active
    try {
        if (qa_notif_status === "Inactive") {
            await driver.executeScript("return document.getElementsByClassName('gform-status-indicator-status')[1].click()");
        }
    } catch (error) {
        console.log(error);
    }

    return true;
    
}


module.exports = { wordpressStart };
