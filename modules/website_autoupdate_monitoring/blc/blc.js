const {Builder, By} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../config");
const config_nitropack = require("../../nitropack/config");
const logger = require('../../../middleware/logger.js');
const server = require('../../../server.js');
const sheet = require('../../../middleware/gsheet.js');
const { drive } = require("googleapis/build/src/apis/drive");

const auth = config.auth;
const spreadsheetId = config.spreadsheetId;
let credentials = config.credentials;
let output = config_nitropack.output;
const module_name = "WEBSITE AUTOUPDATE MONITORING - BLC";


async function blc(timestamp) {
    const client = await auth.getClient();
    var googleSheets = google.sheets({ version: "v4", auth: client });
    var driver = await new Builder().forBrowser("chrome").build();

    // write date to sheet
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "BLC!A1:F1",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [
                [ 
                    output,
                    "WITH BLC PLUGIN? (Y/N)",
                    "BROKEN LINKS FOUND",
                    "IT",
                    "DEV",
                    "QA"
                ]
            ]
        }
    });
    
    for (let index = 0; index < credentials.length; index++) {
        const wp_dashboard = credentials[index][0] + "/wp-admin";

        // write site to sheets
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "BLC!A1",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [
                        credentials[index][0]
                    ]
                ]
            }
        });
        
        if (credentials[index][0] === "https://www.hospiceofyuma.com") {
            await driver.get(credentials[index][0] + "/hoylogin");
        } else if (credentials[index][0] === "https://www.phoenixritecare.org") {
            await driver.get(credentials[index][0] + "/wp-login.php");
        } else {
            await driver.get(wp_dashboard + "/plugins.php");
        }

        // wp login
        try {
            if (credentials[index][0] === "https://www.crexendo.com") {
                await driver.findElement(By.id("user_login")).sendKeys(credentials[index][1]);
                await driver.findElement(By.id("user_pass")).sendKeys(credentials[index][2]);
                await driver.executeScript("return document.getElementsByClassName('tml-button')[0].click()");
            } else if (credentials[index][0] === "https://www.phoenixritecare.org") {
                await driver.findElement(By.id("user_login")).sendKeys(credentials[index][1]);
                await driver.findElement(By.id("user_pass")).sendKeys(credentials[index][2]);
                await driver.executeScript("return document.getElementsByClassName('button button-primary button-large')[0].click()");
        
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
            } else {
                await driver.findElement(By.name("log")).sendKeys(credentials[index][1]);
                await driver.findElement(By.name("pwd")).sendKeys(credentials[index][2]);
                await driver.findElement(By.id("wp-submit")).click();
            }
    
            let login_error = await driver.executeScript("return document.getElementById('login_error')");
            if (login_error) {
                console.log("BLC - wordpress login failed.");
                value = [ "", "", "error", "wordpress login failed.", server.userId, timestamp, module_name, credentials[index][0], credentials[index][1] + "\n" + credentials[index][2], "", "", "", "", "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value);
            } else {
                var admin_email_verification = await driver.executeScript("return document.querySelector('form').classList.contains('admin-email-confirm-form')");  
                if (admin_email_verification === true) {
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
            }
    
        } catch (error) {
            console.log(error);
            value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, credentials[index][0], credentials[index][1] + "\n" + credentials[index][2], "", "", "", "", "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }

        // conditional statement for sites with issues - not redirecting to plugins page
        if ((credentials[index][0] === "https://www.keenindependent.com") || (credentials[index][0] === "https://www.amblaw.com") || 
        (credentials[index][0] === "https://www.trezpro.com") || (credentials[index][0] === "https://www.jelleyvision.com") || 
        (credentials[index][0] === "https://www.virtualassistantsoutsourcing.com") || (credentials[index][0] === "https://www.hospiceofyuma.com")) {
            await driver.executeScript("return document.getElementsByClassName('wp-menu-image dashicons-before dashicons-admin-plugins')[0].click()");
        } 

        // check for BLC plugin 
        try {            
            let plugin_list = await driver.executeScript("return document.getElementsByTagName('strong').length");
            for (let i = 0; i < plugin_list; i++) {
                let plugin = await driver.executeScript("return document.getElementsByTagName('strong')[" + i + "].innerText");
                if (plugin === "Broken Link Checker") {
                    console.log("With BLC Plugin.");

                    if (credentials[index][0] === "https://www.hospiceofyuma.com") {
                        await driver.get("https://hospiceofyuma.com/hoylogin/options-general.php?page=link-checker-settings");
                    } else {
                        await driver.get(wp_dashboard + "/options-general.php?page=link-checker-settings");
                    }

                    await driver.sleep(5000);

                    let broken_link_status = await driver.executeScript("return document.getElementById('wsblc_full_status').children[0].innerText");

                    console.log(broken_link_status);

                    if (!broken_link_status) {
                        console.log("NULL");
                        // write blc plugin status to sheets
                        try {
                            await googleSheets.spreadsheets.values.append({
                                auth,
                                spreadsheetId,
                                range: "BLC!B1:C1",
                                valueInputOption: "USER_ENTERED",
                                resource: {
                                    values: [
                                        ["Y", "No broken links found"]
                                    ]
                                }
                            });
                        } catch (error) {
                            console.log(error);
                        }     
                    } else {
                        // write blc plugin status to sheets
                        try {
                            await googleSheets.spreadsheets.values.append({
                                auth,
                                spreadsheetId,
                                range: "BLC!B1:C1",
                                valueInputOption: "USER_ENTERED",
                                resource: {
                                    values: [
                                        ["Y", broken_link_status]
                                    ]
                                }
                            });
                        } catch (error) {
                            console.log(error);
                        }      
                    }
                    break;
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
        
        await driver.switchTo().newWindow('tab');
        
    }
    // end test
    console.log("test ends.");
    value = [ "", "", "info", "test ends.", server.userId, timestamp, module_name, credentials[index][0], credentials[index][1] + "\n" + credentials[index][2], "", "", "", "", "", "", "" ];
    await sheet.addRow();
    await sheet.appendValues
    
}



module.exports = { blc };
