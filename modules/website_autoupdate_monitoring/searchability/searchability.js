const {Builder, By, Key, Capabilities} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../../config");
const server = require('../../../server.js');
const sheet = require('../../../middleware/gsheet.js');
require('chromedriver');

const auth = config.auth;
const spreadsheetId = config.spreadsheetId_waum;
let search_key = config.search_key;
let output = config.date;
const module_name = "WEBSITE AUTOUPDATE MONITORING - FRONTEND";
let search_engine = "https://www.google.com/";

var driver;
async function searchability(browser) {
    const client = await auth.getClient();
    var googleSheets = google.sheets({ version: "v4", auth: client });

    console.log(browser);

    if (browser === "chrome") {
        driver = await new Builder().forBrowser("chrome").build();
    } else if (browser === "firefox") {
        driver = await new Builder().withCapabilities(Capabilities.firefox()).build();
    } else if (browser === "edge") {
        driver = await new Builder().forBrowser('MicrosoftEdge').build();
    }

    // write date to sheet
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "SEARCHABILITY!A1:F1",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [
                [ output, "Visible? (Y/N)", "Chrome", "Firefox", "Edge", "Safari" ]
            ]
        }
    });

    for (let index = 0; index < search_key.length; index++) {
        await driver.get(search_engine);
        await driver.findElement(By.name("q")).sendKeys(search_key[index][1], Key.RETURN);

        try {
            // write site to sheets
            await googleSheets.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: "SEARCHABILITY!A1",
                valueInputOption: "USER_ENTERED",
                resource: {
                    values: [
                        [ search_key[index][0] ]
                    ]
                }
            });
        } catch (error) {
            console.log(error);
        }

        // let search_results_count = await driver.executeScript("return document.getElementsByClassName('yuRUbf').length");
        // for (let index = 0; index < search_results_count; index++) {
        //     let search_results = JSON.stringify(await driver.executeScript("return document.getElementsByClassName('yuRUbf')[" + index + "].childNodes[0].childNodes[0].childNodes[0].href"));
        //     console.log(search_results);

        //     if (search_results.includes(search_key[index][0])) {
        //         console.log("Searchable");
        //     }
            
        // }

        await driver.sleep(10000);
        
        await driver.switchTo().newWindow('tab');
        
    }
    // end test
    console.log("test ends.");
    
}

 

module.exports = { searchability };
