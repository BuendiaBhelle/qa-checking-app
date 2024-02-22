const {Builder, By, Capabilities} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../../config");
const server = require('../../../server.js');
const sheet = require('../../../middleware/gsheet.js');
require('chromedriver');

const auth = config.auth;
const spreadsheetId = config.spreadsheetId_waum;
let frontend_sites = config.frontend_sites;
let output = config.date;
const module_name = "WEBSITE AUTOUPDATE MONITORING - FRONTEND";

var driver;
async function frontend(browser) {
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
        range: "FrontEnd Daily Monitoring!A1",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [
                [ output ]
            ]
        }
    });

    for (let index = 0; index < frontend_sites.length; index++) {
        // write site to sheets
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "FrontEnd Daily Monitoring!A1",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [ frontend_sites[index] ]
                ]
            }
        });
        
        await driver.get(frontend_sites[index]);

        await driver.sleep(70000);
        
        await driver.switchTo().newWindow('tab');
        
    }
    // end test
    console.log("test ends.");
    value = [ "", "", "info", "test ends.", server.userId, timestamp, module_name, frontend_sites[index], "", "", "", "", "", "", "", "" ];
    await sheet.addRow();
    await sheet.appendValues
    
}



module.exports = { frontend };
