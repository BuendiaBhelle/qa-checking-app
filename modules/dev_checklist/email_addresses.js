const {Builder, By} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../config");
const { log } = require("winston");

const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
});

const spreadsheetId = config.spreadsheetId_dev_checklist;



async function email_addresses(timestamp, link) {
    const client = await auth.getClient();
    var googleSheets = google.sheets({ version: "v4", auth: client });
    var driver = await new Builder().forBrowser("chrome").build();

    await driver.get(link);
    await driver.sleep(3000);

    let email_addresses_count = await driver.executeScript("return document.getElementsByTagName('p').length");
    try {
        for (let index = 0; index < email_addresses_count; index++) {

            let email_addresses = await driver.executeScript("return document.getElementsByTagName('p')[" + index + "].innerText");
    
            if (email_addresses.includes("@")) {
                console.log(email_addresses);
                try {
                    // write to sheet
                    await googleSheets.spreadsheets.values.append({
                        auth,
                        spreadsheetId,
                        range: "Email Addresses!A1",
                        valueInputOption: "USER_ENTERED",
                        resource: {
                            values: [
                                [ 
                                    email_addresses
                                ]
                            ]
                        }
                    });
                    await driver.sleep(1000);
                } catch (error) {
                    console.log(error);
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = { email_addresses };
