const {Builder, By} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../config");
const { log } = require("winston");

const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
});

const spreadsheetId = config.spreadsheetId_broken_links;



async function images(timestamp, link) {
    const client = await auth.getClient();
    var googleSheets = google.sheets({ version: "v4", auth: client });
    var driver = await new Builder().forBrowser("chrome").build();

    await driver.get(link);
    await driver.sleep(1000);

    let images_count = await driver.executeScript("return document.getElementsByTagName('img').length");

    // for (let index = 0; index < images_count; index++) {
    //     // let image_source = await driver.executeScript("return document.getElementsByTagName('img')[" + index + "].getAttribute('src')");
    //     let image_source = await driver.executeScript("return document.getElementsByTagName('img')[20].getAttribute('src')");

    //     console.log(image_source);        
    // }

    let image_source = await driver.executeScript("return document.getElementsByTagName('img')[20].getAttribute('src')");

    console.log(image_source); 

}



module.exports = { images };
