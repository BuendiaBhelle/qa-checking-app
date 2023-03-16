const {Builder, By} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../../config");
const server = require('../../../server.js');
const sheet = require('../../../middleware/gsheet.js');

const auth = config.auth;
const spreadsheetId = config.spreadsheetId_waum;
let frontend_sites = config.frontend_sites;
let output = config.date;
const module_name = "WEBSITE AUTOUPDATE MONITORING - FRONTEND";


async function frontend(timestamp) {
    const client = await auth.getClient();
    var googleSheets = google.sheets({ version: "v4", auth: client });
    var driver = await new Builder().forBrowser("chrome").build();

    // write date to sheet
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "FRONTEND!A1",
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
            range: "FRONTEND!A1",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [ frontend_sites[index] ]
                ]
            }
        });
        
        await driver.get(frontend_sites[index]);

        await driver.sleep(20000);
        
        await driver.switchTo().newWindow('tab');
        
    }
    // end test
    console.log("test ends.");
    value = [ "", "", "info", "test ends.", server.userId, timestamp, module_name, frontend_sites[index], "", "", "", "", "", "", "", "" ];
    await sheet.addRow();
    await sheet.appendValues
    
}



module.exports = { frontend };
