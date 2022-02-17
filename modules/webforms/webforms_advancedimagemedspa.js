const {Builder, By, Key, util} = require("selenium-webdriver");
const {google} = require("googleapis");

const wp_username = "pvadmin";
const wp_password = "kT*D3jzk%%ifOcY3N1lbB%sg";
const qa_email = "mbuendia@optimizex.com, qa@primeview.com";

const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
});

const spreadsheetId = "12kLaYAzd0qsJ0v3jDZElfuR1x8GHP56gWG-3zmCf_48";

let monthNames = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12];
let dateObj = new Date();
let month = monthNames[dateObj.getMonth()];
let day = String(dateObj.getDate()).padStart(2, '0');
let year = dateObj.getFullYear();
const date = month  + "/" + day  + '/' + year;

console.log(date);

// form1 - Contact Form ( Contact Us Page )
async function site2_form1(domain, checkbox) {
    const wp_site = domain + "wp-admin";
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })
    const form1_page = "contact/";

    let requests = [{
        insertRange: {
            range: {
                sheetId: 249332906,
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
        "Advance Image Med Spa!A2",
        "Advance Image Med Spa!B2",
        "Advance Image Med Spa!C2",
        "Advance Image Med Spa!C3",
        "Advance Image Med Spa!D2",
        "Advance Image Med Spa!E2",
        "Advance Image Med Spa!G2",
    ]

    let values = [
        "",
        date,
        wp_username,
        wp_password,
        domain + form1_page,
        "Contact Form ( Contact Us Page )",
        '[contact-form-7 id="40" title="Contact Form ( Contact Us Page )"]',
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

    await driver.findElement(By.name("log")).sendKeys(wp_username);
    await driver.findElement(By.name("pwd")).sendKeys(wp_password);
    await driver.findElement(By.id("wp-submit")).click();

    var admin_email_verification = await driver.executeScript("return document.querySelector('form').classList.contains('admin-email-confirm-form')");  
    if (admin_email_verification === true) {
        await driver.executeScript("return document.getElementsByTagName('a')[3].click()");
        console.log("with admin email verification.");
        console.log("admin_email_verification: " + admin_email_verification);
    }

    if (checkbox === "live") {
        await driver.executeScript("return document.getElementsByClassName('wp-menu-name')[9].click()");
    }
    else if (checkbox === "dev") {
        await driver.executeScript("return document.getElementsByClassName('wp-menu-name')[8].click()");
    }
    await driver.executeScript("return document.getElementsByClassName('row-title')[0].click()");

    if (checkbox === "dev") {
        await driver.findElement(By.id("ui-id-2")).click();
    }
    else if (checkbox === "live") {
        await driver.findElement(By.id("ui-id-3")).click();
    }
    
    let recipients_form1 = await driver.findElement(By.id("wpcf7-mail-recipient")).getAttribute('value');
    console.log("recipients_form1: " + recipients_form1);

    try {
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Advance Image Med Spa!H2",
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
    await driver.findElement(By.name("fname")).sendKeys("Primeview Test");
    await driver.findElement(By.name("phone")).sendKeys("4806480839");
    await driver.findElement(By.name("email")).sendKeys("qa@primeview.com");
    await driver.findElement(By.name("subject")).sendKeys("Lead Test Submission");
    await driver.findElement(By.name("services")).click();
    await driver.findElement(By.name("services")).sendKeys("botox");
    await driver.findElement(By.name("services")).sendKeys(Key.ENTER);
    await driver.findElement(By.name("message")).sendKeys("Please take note that this is a test submit form for Contact Form ( Contact Us Page ). Please disregard if received. Thank you.");
    await driver.executeScript("return document.getElementsByClassName('wpcf7-submit')[0].click()");
    await driver.sleep(3000);
    let ty_url = await driver.getCurrentUrl();
    console.log("Form1 thank you page: " + ty_url);

    try {
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Advance Image Med Spa!I2",
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

    if (checkbox === "live") {
        await driver.executeScript("return document.getElementsByClassName('wp-menu-name')[9].click()");
    }
    else if (checkbox === "dev") {
        await driver.executeScript("return document.getElementsByClassName('wp-menu-name')[8].click()");
    }

    await driver.executeScript("return document.getElementsByClassName('row-title')[0].click()");
    
    if (checkbox === "dev") {
        await driver.findElement(By.id("ui-id-2")).click();
    }
    else if (checkbox === "live") {
        await driver.findElement(By.id("ui-id-3")).click();
    }

    await driver.findElement(By.id("wpcf7-mail-recipient")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
    
    let orig_recipients_data = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Advance Image Med Spa!H2",
    });

    let orig_recipients = orig_recipients_data.data.values[0][0];

    console.log("orig_recipients: " + orig_recipients);
    
    await driver.findElement(By.id("wpcf7-mail-recipient")).sendKeys(orig_recipients);
    await driver.executeScript("return document.getElementsByName('wpcf7-save')[2].click()");
}


// form2 - Homepage Contact Us
async function site2_form2(domain, checkbox) {
    const wp_site = domain + "wp-admin";
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })

    let requests = [{
        insertRange: {
            range: {
                sheetId: 249332906,
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
        "Advance Image Med Spa!A2",
        "Advance Image Med Spa!B2",
        "Advance Image Med Spa!D2",
        "Advance Image Med Spa!E2",
        "Advance Image Med Spa!G2",
    ]

    let values = [
        "",
        date,
        domain,
        "Homepage Contact Us",
        '[contact-form-7 id="6960" title="Homepage Contact Us"]',
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
    await driver.findElement(By.name("log")).sendKeys(wp_username);
    await driver.findElement(By.name("pwd")).sendKeys(wp_password);
    await driver.findElement(By.id("wp-submit")).click();

    var admin_email_verification = await driver.executeScript("return document.querySelector('form').classList.contains('admin-email-confirm-form')");  
    if (admin_email_verification === true) {
        await driver.executeScript("return document.getElementsByTagName('a')[3].click()");
        console.log("with admin email verification.");
        console.log("admin_email_verification: " + admin_email_verification);
    }

    if (checkbox === "live") {
        await driver.executeScript("return document.getElementsByClassName('wp-menu-name')[9].click()");
    }
    else if (checkbox === "dev") {
        await driver.executeScript("return document.getElementsByClassName('wp-menu-name')[8].click()");
    }

    await driver.executeScript("return document.getElementsByClassName('row-title')[1].click()");

    if (checkbox === "dev") {
        await driver.findElement(By.id("ui-id-2")).click();
    }
    else if (checkbox === "live") {
        await driver.findElement(By.id("ui-id-3")).click();
    }

    let recipients_form2 = await driver.findElement(By.id("wpcf7-mail-recipient")).getAttribute('value');
    console.log("recipients_form2: " + recipients_form2);

    try {
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Advance Image Med Spa!H2",
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
    await driver.get(domain);
    await driver.findElement(By.name("hp-contact-name")).sendKeys("Primeview Test");
    await driver.findElement(By.name("hp-contact-number")).sendKeys("4806480839");
    await driver.findElement(By.name("hp-contact-subject")).sendKeys("Lead Test Submission");
    await driver.findElement(By.name("hp-contact-email")).sendKeys("qa@primeview.com");
    await driver.findElement(By.name("hp-contact-services")).click();
    await driver.findElement(By.name("hp-contact-services")).sendKeys("botox");
    await driver.findElement(By.name("hp-contact-services")).sendKeys(Key.ENTER);
    await driver.findElement(By.name("hp-contact-message")).sendKeys("Please take note that this is a test submit form for Homepage Contact Us. Please disregard if received. Thank you.");
    await driver.executeScript("return document.getElementsByClassName('wpcf7-submit')[0].click()");
    await driver.sleep(3000);
    let ty_url = await driver.getCurrentUrl();
    console.log("Form2 thank you page: " + ty_url);

    try {
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Advance Image Med Spa!I2",
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

    if (checkbox === "live") {
        await driver.executeScript("return document.getElementsByClassName('wp-menu-name')[9].click()");
    }
    else if (checkbox === "dev") {
        await driver.executeScript("return document.getElementsByClassName('wp-menu-name')[8].click()");
    }

    await driver.executeScript("return document.getElementsByClassName('row-title')[1].click()");
    
    if (checkbox === "dev") {
        await driver.findElement(By.id("ui-id-2")).click();
    }
    else if (checkbox === "live") {
        await driver.findElement(By.id("ui-id-3")).click();
    }

    await driver.findElement(By.id("wpcf7-mail-recipient")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
    
    let orig_recipients_data = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Advance Image Med Spa!H2",
    });

    let orig_recipients = orig_recipients_data.data.values[0][0];

    console.log("orig_recipients: " + orig_recipients);
    
    await driver.findElement(By.id("wpcf7-mail-recipient")).sendKeys(orig_recipients);
    await driver.executeScript("return document.getElementsByName('wpcf7-save')[2].click()");
}


// form3 - Request Form ( Sidebar ) - New Layout
async function site2_form3(domain, checkbox) {
    const wp_site = domain + "wp-admin";
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })
    const form3_page_dev = "boost-your-beauty-club/";
    const form3_page_live = "join-our-clubs/";

    let requests = [{
        insertRange: {
            range: {
                sheetId: 249332906,
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
        "Advance Image Med Spa!A2",
        "Advance Image Med Spa!B2",
        "Advance Image Med Spa!D2",
        "Advance Image Med Spa!E2",
        "Advance Image Med Spa!G2",
    ]

    let values_dev = [
        "",
        date,
        domain + form3_page_dev,
        "Request Form ( Sidebar ) - New Layout",
        '[contact-form-7 id="8775" title="Request Form ( Sidebar ) - New Layout"]',
    ]

    let values_live = [
        "",
        date,
        domain + form3_page_live,
        "Request Form ( Sidebar ) - New Layout",
        '[contact-form-7 id="8775" title="Request Form ( Sidebar ) - New Layout"]',
    ]

    if (checkbox === "dev") {
        for (let index = 0; index < ranges.length; index++) {
            try {
                await googleSheets.spreadsheets.values.append({
                    auth,
                    spreadsheetId,
                    range: ranges[index],
                    valueInputOption: "USER_ENTERED",
                    resource: {
                        values: [
                            [values_dev[index]]
                        ]
                    }
                });
                console.log("success.");
            } catch (error) {
                console.log(error);
            }
            
        }
    }
    else if (checkbox === "live") {
        for (let index = 0; index < ranges.length; index++) {
            try {
                await googleSheets.spreadsheets.values.append({
                    auth,
                    spreadsheetId,
                    range: ranges[index],
                    valueInputOption: "USER_ENTERED",
                    resource: {
                        values: [
                            [values_live[index]]
                        ]
                    }
                });
                console.log("success.");
            } catch (error) {
                console.log(error);
            }
            
        }
    }

    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get(wp_site);
    await driver.findElement(By.name("log")).sendKeys(wp_username);
    await driver.findElement(By.name("pwd")).sendKeys(wp_password);
    await driver.findElement(By.id("wp-submit")).click();

    var admin_email_verification = await driver.executeScript("return document.querySelector('form').classList.contains('admin-email-confirm-form')");  
    if (admin_email_verification === true) {
        await driver.executeScript("return document.getElementsByTagName('a')[3].click()");
        console.log("with admin email verification.");
        console.log("admin_email_verification: " + admin_email_verification);
    }

    if (checkbox === "live") {
        await driver.executeScript("return document.getElementsByClassName('wp-menu-name')[9].click()");
    }
    else if (checkbox === "dev") {
        await driver.executeScript("return document.getElementsByClassName('wp-menu-name')[8].click()");
    }

    await driver.executeScript("return document.getElementsByClassName('row-title')[3].click()");

    if (checkbox === "dev") {
        await driver.findElement(By.id("ui-id-2")).click();
    }
    else if (checkbox === "live") {
        await driver.findElement(By.id("ui-id-3")).click();
    }

    let recipients_form3 = await driver.findElement(By.id("wpcf7-mail-recipient")).getAttribute('value');
    console.log("recipients_form3: " + recipients_form3);

    try {
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Advance Image Med Spa!H2",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [recipients_form3]
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
    
    if (checkbox === "dev") {
        await driver.get(domain + form3_page_dev);
    }
    else if (checkbox === "live") {
        await driver.get(domain + form3_page_live);
    }
    await driver.findElement(By.name("nl-name")).sendKeys("Primeview Test");
    await driver.findElement(By.name("nl-email")).sendKeys("qa@primeview.com");
    await driver.findElement(By.name("nl-phone")).sendKeys("4806480839");
    await driver.findElement(By.name("nl-services")).click();
    await driver.findElement(By.name("nl-services")).sendKeys("botox");
    await driver.findElement(By.name("nl-services")).sendKeys(Key.ENTER);
    await driver.findElement(By.name("nl-message")).sendKeys("Please take note that this is a test submit form for Request Form ( Sidebar ) - New Layout. Please disregard if received. Thank you.");
    await driver.executeScript("return document.getElementsByClassName('wpcf7-submit')[0].click()");
    await driver.sleep(3000);
    let ty_url = await driver.getCurrentUrl();
    console.log("Form3 thank you page: " + ty_url);

    try {
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Advance Image Med Spa!I2",
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

    if (checkbox === "live") {
        await driver.executeScript("return document.getElementsByClassName('wp-menu-name')[9].click()");
    }
    else if (checkbox === "dev") {
        await driver.executeScript("return document.getElementsByClassName('wp-menu-name')[8].click()");
    }

    await driver.executeScript("return document.getElementsByClassName('row-title')[3].click()");

    if (checkbox === "dev") {
        await driver.findElement(By.id("ui-id-2")).click();
    }
    else if (checkbox === "live") {
        await driver.findElement(By.id("ui-id-3")).click();
    }

    await driver.findElement(By.id("wpcf7-mail-recipient")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
    
    let orig_recipients_data = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Advance Image Med Spa!H2",
    });

    let orig_recipients = orig_recipients_data.data.values[0][0];

    console.log("orig_recipients: " + orig_recipients);
    
    await driver.findElement(By.id("wpcf7-mail-recipient")).sendKeys(orig_recipients);
    await driver.executeScript("return document.getElementsByName('wpcf7-save')[2].click()");
}



module.exports = { site2_form1, site2_form2, site2_form3 };
