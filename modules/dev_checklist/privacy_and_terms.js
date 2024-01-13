const {Builder, By} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../config");
const { log } = require("winston");

const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
});

const spreadsheetId = config.spreadsheetId_dev_checklist;


async function privacy_and_terms(timestamp, link) {
    const client = await auth.getClient();
    var googleSheets = google.sheets({ version: "v4", auth: client });
    var driver = await new Builder().forBrowser("chrome").build();

    await driver.get(link);
    await driver.sleep(3000);

    let links_count = await driver.executeScript("return document.getElementsByTagName('a').length");

    var privacy_or_terms_link;
    for (let index = 0; index < links_count; index++) {
        let privacy_or_terms_text = await driver.executeScript("return document.getElementsByTagName('a')[" + index + "].innerText");
        privacy_or_terms_link = await driver.executeScript("return document.getElementsByTagName('a')[" + index + "].getAttribute('href')");
        let hostname = await driver.executeScript("return window.location.hostname");
        
        if ((privacy_or_terms_text.includes("Privacy Policy")) || (privacy_or_terms_text.includes("Terms and Conditions")) || (privacy_or_terms_text.includes("Terms & Conditions"))) {
            console.log(privacy_or_terms_text);

            if (privacy_or_terms_link.substring(0,1) === "/") {
                privacy_or_terms_link = hostname + privacy_or_terms_link;
                console.log(privacy_or_terms_link);
            } else {
                console.log(privacy_or_terms_link);
            }
            
            try {
                // write date to sheet
                await googleSheets.spreadsheets.values.append({
                    auth,
                    spreadsheetId,
                    range: "Privacy Policy/Terms and Conditions!A1:B1",
                    valueInputOption: "USER_ENTERED",
                    resource: {
                        values: [
                            [ 
                                privacy_or_terms_text,
                                privacy_or_terms_link
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



module.exports = { privacy_and_terms };
