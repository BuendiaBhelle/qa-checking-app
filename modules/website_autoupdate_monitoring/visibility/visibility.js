const {Builder, By, Capabilities} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../../config");
const server = require('../../../server.js');
const sheet = require('../../../middleware/gsheet.js');
const { drive } = require("googleapis/build/src/apis/drive");
require('chromedriver');

const auth = config.auth;
const spreadsheetId = config.spreadsheetId_waum;
let credentials = config.credentials_blc_backend;
let output = config.date;
const module_name = "WEBSITE AUTOUPDATE MONITORING - BLC";


async function visibility(timestamp) {
    const client = await auth.getClient();
    var googleSheets = google.sheets({ version: "v4", auth: client });
    var driver = await new Builder().forBrowser("chrome").build();
    // let driver = await new Builder().forBrowser('MicrosoftEdge').build();

    // let driver = await new Builder()
    // .withCapabilities(Capabilities.firefox())
    // .build();

    // write date to sheet
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "VISIBILITY!A1:B1",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [
                [ 
                    output,
                    "Discourage search engines from indexing this site? (Checked/Unchecked)"
                ]
            ]
        }
    });
    
    for (let index = 0; index < credentials.length; index++) {        
        if (credentials[index][0] === "https://www.hospiceofyuma.com") {
            await driver.get(credentials[index][0] + "/hoylogin");
        } else if (credentials[index][0] === "https://www.phoenixritecare.org") {
            await driver.get(credentials[index][0] + "/members-login/");
        } else {
            await driver.get(credentials[index][0] + "/pvlogin");
        }

        // wp login
        try {
            if (credentials[index][0] === "https://www.phoenixritecare.org") {
                await driver.findElement(By.id("user_login")).sendKeys(credentials[index][1]);
                await driver.findElement(By.id("user_pass")).sendKeys(credentials[index][2]);
                await driver.executeScript("return document.getElementsByClassName('tml-button')[0].click()");
        
                let button_length = await driver.executeScript("return document.getElementsByClassName('btn').length");
                for (let index = 0; index < button_length; index++) {
                    let button_innertext = await driver.executeScript("return document.getElementsByClassName('btn')[" + index + "].innerText");
                    if (button_innertext === "Website") {
                        await driver.executeScript("return document.getElementsByClassName('btn')[" + index + "].click()");
                        console.log("WEBSITE");
                        break;
                    }
                }
        
                await driver.executeScript("return document.getElementsByClassName('wp-menu-image dashicons-before dashicons-admin-plugins')[0].click()");
            } else if (credentials[index][0] === "https://www.maintenancebest.com") {
                await driver.findElement(By.id("1helauaoii80")).sendKeys(credentials[index][1]);
                await driver.findElement(By.id("6afbbvfn0560")).sendKeys(credentials[index][2]);
                await driver.executeScript("return document.getElementsByClassName('pp-submit-form ppform-submit-button')[0].click()");
            } else if ((credentials[index][0] === "https://www.inspirednetworks.com") || (credentials[index][0] === "https://www.canyonfalls.com")
            || (credentials[index][0] === "https://www.thehairextensioncompany.com")) {
                await driver.findElement(By.id("user_login")).sendKeys(credentials[index][1]);
                await driver.findElement(By.id("user_pass")).sendKeys(credentials[index][2]);
                await driver.executeScript("return document.getElementsByClassName('button button-primary button-large')[0].click()"); 
            } 
            else {
                await driver.findElement(By.name("log")).sendKeys(credentials[index][1]);
                await driver.findElement(By.name("pwd")).sendKeys(credentials[index][2]);
                await driver.findElement(By.id("wp-submit")).click();
            }
    
            let login_error = await driver.executeScript("return document.getElementById('login_error')");
            var admin_email_verification = await driver.executeScript("return document.querySelector('form').classList.contains('admin-email-confirm-form')");  
            if (login_error) {
                console.log("BLC - wordpress login failed.");
                value = [ "", "", "error", "wordpress login failed.", server.userId, timestamp, module_name, credentials[index][0], credentials[index][1] + "\n" + credentials[index][2], "", "", "", "", "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value);
            } else if (admin_email_verification === true) {
                    await driver.executeScript("return document.getElementsByTagName('a')[3].click()");
                    console.log("BLC - admin email verification.");
                    value = [ "", "", "info", "admin email verification.", server.userId, timestamp, module_name, credentials[index][0], credentials[index][1] + "\n" + credentials[index][2], "", "", "", "", "", "", "" ];
                    await sheet.addRow();
                    await sheet.appendValues(value);
                } else {
                    console.log("BLC - wordpress login success.");
                    value = [ "", "", "info", "wordpress login success.", server.userId, timestamp, module_name, credentials[index][0], credentials[index][1] + "\n" + credentials[index][2], "", "", "", "", "", "", "" ];
                    await sheet.addRow();
                    await sheet.appendValues(value);
                }    
        } catch (error) {
            console.log(error);
            value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, credentials[index][0], credentials[index][1] + "\n" + credentials[index][2], "", "", "", "", "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }

        // navigate to plugins page
        try {
            if (credentials[index][0] === "https://www.hospiceofyuma.com") {
                await driver.get(credentials[index][0] + "/hoylogin/plugins.php");
            } else {
                await driver.get(credentials[index][0] + "/wp-admin/options-reading.php");
            }
        } catch (error) {
            console.log(error);
        }

        // check for BLC plugin 
        try {            
            let sev_value = await driver.executeScript("return document.getElementById('blog_public').checked");
            console.log(sev_value);

            if (sev_value === true) {
                try {
                    await googleSheets.spreadsheets.values.append({
                        auth,
                        spreadsheetId,
                        range: "VISIBILITY!A2:B2",
                        valueInputOption: "USER_ENTERED",
                        resource: {
                            values: [
                                [credentials[index][0], "Checked"]
                            ]
                        }
                    });
                } catch (error) {
                    console.log(error);
                } 
            } 
            else if (sev_value === false) {
                try {
                    await googleSheets.spreadsheets.values.append({
                        auth,
                        spreadsheetId,
                        range: "VISIBILITY!A2:B2",
                        valueInputOption: "USER_ENTERED",
                        resource: {
                            values: [
                                [credentials[index][0], "Unchecked"]
                            ]
                        }
                    });
                } catch (error) {
                    console.log(error);
                } 
            }



            console.log("BLC - check for BLC plugin success.");
            value = [ "", "", "info", "check for BLC plugin success.", server.userId, timestamp, module_name, credentials[index][0], credentials[index][1] + "\n" + credentials[index][2], "", "", "", "", "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        } catch (error) {
            console.log(error);
            value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, credentials[index][0], credentials[index][1] + "\n" + credentials[index][2], "", "", "", "", "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }

        let current_page_url = await driver.getCurrentUrl();
        console.log(current_page_url);

        await driver.sleep(10000);
        await driver.switchTo().newWindow('tab');
        
    }


    // end test
    console.log("test ends.");
    value = [ "", "", "info", "test ends.", server.userId, timestamp, module_name, credentials[index][0], credentials[index][1] + "\n" + credentials[index][2], "", "", "", "", "", "", "" ];
    await sheet.addRow();
    await sheet.appendValues(value);
    
}



module.exports = { visibility };
