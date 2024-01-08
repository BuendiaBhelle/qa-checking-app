const {Builder, By} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../config");
const { log } = require("winston");

const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
});

const spreadsheetId = config.spreadsheetId_broken_links;



async function copyright(timestamp, link) {
    const client = await auth.getClient();
    var googleSheets = google.sheets({ version: "v4", auth: client });
    var driver = await new Builder().forBrowser("chrome").build();

    await driver.get(link);
    // await driver.sleep(3000);

    let copyright_line1 = await driver.executeScript("return document.getElementsByClassName('text-center site_copyright')[0].getElementsByTagName('p')[0].innerText");
    let copyright_line2 = await driver.executeScript("return document.getElementsByClassName('text-center site_copyright')[0].getElementsByTagName('p')[1].innerText");

    console.log(copyright_line1);
    console.log(copyright_line2);
}



module.exports = { copyright };
