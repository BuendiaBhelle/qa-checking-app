const {Builder, By} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../config");

const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
});

const spreadsheetId = config.spreadsheetId_dev_checklist;


async function h1(timestamp, link) {
    const client = await auth.getClient();
    var googleSheets = google.sheets({ version: "v4", auth: client });
    // var driver = await new Builder().forBrowser("chrome").build();
    let driver = await new Builder().forBrowser('MicrosoftEdge').build();

    await driver.get(link);

    let h1_count = await driver.executeScript("return document.getElementsByTagName('h1').length");
    console.log(h1_count);
    try {
        // write data to sheet
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Sheet1!C18",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [ 
                        h1_count
                    ]
                ]
            }
        });
    } catch (error) {
        console.log(error);
    }
}


module.exports = { h1 };
