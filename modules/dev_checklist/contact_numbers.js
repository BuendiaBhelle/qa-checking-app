const {Builder, By} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../config");
const { log } = require("winston");

const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
});

const spreadsheetId = config.spreadsheetId_dev_checklist;



async function contact_numbers(timestamp, link) {
    const client = await auth.getClient();
    var googleSheets = google.sheets({ version: "v4", auth: client });
    var driver = await new Builder().forBrowser("chrome").build();

    await driver.get(link);
    await driver.sleep(3000);

    let contact_number_count = await driver.executeScript("return document.getElementsByTagName('p').length");
    try {
        for (let index = 0; index < contact_number_count; index++) {

            let contact_number = await driver.executeScript("return document.getElementsByTagName('p')[" + index + "].innerText");
            let hasNumber = /\d/;
    
            if ((hasNumber.test(contact_number) === true) && (contact_number.includes("480"))) {
                console.log(contact_number);
                try {
                    // write to sheet
                    await googleSheets.spreadsheets.values.append({
                        auth,
                        spreadsheetId,
                        range: "Contact Numbers!A1",
                        valueInputOption: "USER_ENTERED",
                        resource: {
                            values: [
                                [ 
                                    contact_number
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


module.exports = { contact_numbers };
