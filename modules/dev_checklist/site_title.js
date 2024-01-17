const {Builder, By} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../config");
const { log } = require("winston");

const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
});

const spreadsheetId = config.spreadsheetId_broken_links;



async function site_title(timestamp, link) {
    const client = await auth.getClient();
    var googleSheets = google.sheets({ version: "v4", auth: client });
    var driver = await new Builder().forBrowser("chrome").build();

    await driver.get(link);
    // await driver.sleep(3000);

    let site_title = await driver.executeScript("return document.getElementsByTagName('title')[0].innerText");
    console.log(site_title);

    try {
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Sheet1!C2",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [ 
                        site_title
                    ]
                ]
            }
        });
    } catch (error) {
        console.log(error);
    }
}


module.exports = { site_title };
