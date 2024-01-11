const {Builder, By} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../config");
const { log } = require("winston");

const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
});

const spreadsheetId = config.spreadsheetId_dev_checklist;



async function external_links(timestamp, link) {
    const client = await auth.getClient();
    var googleSheets = google.sheets({ version: "v4", auth: client });
    var driver = await new Builder().forBrowser("chrome").build();

    await driver.get(link);
    await driver.sleep(3000);

    let external_links_count = await driver.executeScript("return document.getElementsByTagName('a').length");
    console.log(external_links_count);

    try {
        for (let index = 0; index < external_links_count; index++) {
            let external_links = await driver.executeScript("return document.getElementsByTagName('a')[" + index + "].getAttribute('href')");

            if (external_links != null) {
                let host = await driver.executeScript("return window.location.hostname");
                let link_checker = external_links.slice(0, 1);
                let link_checker2 = external_links.slice(0, 3);

                if ((!external_links.includes(host)) && (external_links.length != 0)) {
                    if ((link_checker != "/") && (link_checker != "#") && (link_checker2 != "tel")) {
                        console.log(external_links);

                        let target_attribute = await driver.executeScript("return document.getElementsByTagName('a')[" + index + "].getAttribute('target')");
                        console.log(target_attribute);
                        try {
                            // write to sheet
                            await googleSheets.spreadsheets.values.append({
                                auth,
                                spreadsheetId,
                                range: "External Links!A1:B1",
                                valueInputOption: "USER_ENTERED",
                                resource: {
                                    values: [
                                        [ 
                                            external_links,
                                            target_attribute
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
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = { external_links };
