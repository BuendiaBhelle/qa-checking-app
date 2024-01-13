const {Builder, By} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../config");
const { log } = require("winston");

const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
});

const spreadsheetId = config.spreadsheetId_dev_checklist;



async function copyright(timestamp, link) {
    const client = await auth.getClient();
    var googleSheets = google.sheets({ version: "v4", auth: client });
    var driver = await new Builder().forBrowser("chrome").build();

    await driver.get(link);

    let p_count = await driver.executeScript("return document.getElementsByTagName('p').length");

    for (let index = 0; index < p_count; index++) {
        // let line1 = await driver.executeScript("return document.getElementsByTagName('p')[" + index + "].innerText");
        let copyright = await driver.executeScript("return document.getElementsByTagName('p')[" + index + "].innerText");

        if ((copyright.length !=0) && (copyright.includes("All Rights Reserved"))) {
            // var index2 = index+1;
            // let line2 = await driver.executeScript("return document.getElementsByTagName('p')[" + index2 + "].innerText");
            // var copyright = line1 + "\n" + line2;
            console.log(copyright);
            try {
                // write date to sheet
                await googleSheets.spreadsheets.values.append({
                    auth,
                    spreadsheetId,
                    range: "Sheet1!C6",
                    valueInputOption: "USER_ENTERED",
                    resource: {
                        values: [
                            [ 
                                copyright
                            ]
                        ]
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }
    }
}



module.exports = { copyright };
