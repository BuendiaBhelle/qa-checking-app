const {Builder, By} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../config");
const { log } = require("winston");

const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
});

const spreadsheetId = config.spreadsheetId_dev_checklist;



async function copyright_year(timestamp, link) {
    const client = await auth.getClient();
    var googleSheets = google.sheets({ version: "v4", auth: client });
    var driver = await new Builder().forBrowser("chrome").build();

    await driver.get(link);

    let p_count = await driver.executeScript("return document.getElementsByTagName('p').length");

    for (let index = 0; index < p_count; index++) {
        let copyright_year = await driver.executeScript("return document.getElementsByTagName('p')[" + index + "].innerText");

        if ((copyright_year.length !=0) && (copyright_year.includes("2024"))) {
            console.log(copyright_year);
            try {
                // write date to sheet
                await googleSheets.spreadsheets.values.append({
                    auth,
                    spreadsheetId,
                    range: "Sheet1!C5",
                    valueInputOption: "USER_ENTERED",
                    resource: {
                        values: [
                            [ 
                                copyright_year
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



module.exports = { copyright_year };
