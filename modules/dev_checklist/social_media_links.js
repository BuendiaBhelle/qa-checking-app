const {Builder, By} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../config");
const { log } = require("winston");

const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
});

const spreadsheetId = config.spreadsheetId_dev_checklist;



async function social_media_links(timestamp, link) {
    const client = await auth.getClient();
    var googleSheets = google.sheets({ version: "v4", auth: client });
    var driver = await new Builder().forBrowser("chrome").build();

    await driver.get(link);
    await driver.sleep(3000);

    let social_media_links_count = await driver.executeScript("return document.getElementsByTagName('a').length");

    try {
        for (let index = 0; index < social_media_links_count; index++) {
            let social_media_links = await driver.executeScript("return document.getElementsByTagName('a')[" + index + "].getAttribute('href')");

            if (social_media_links != null) {
                if ((social_media_links.includes("facebook")) || (social_media_links.includes("twitter")) || (social_media_links.includes("instagram")) || (social_media_links.includes("linkedin"))) {
                    console.log(social_media_links);

                    try {
                        // write to sheet
                        await googleSheets.spreadsheets.values.append({
                            auth,
                            spreadsheetId,
                            range: "Social Media Links!A1",
                            valueInputOption: "USER_ENTERED",
                            resource: {
                                values: [
                                    [ 
                                        social_media_links
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
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = { social_media_links };
