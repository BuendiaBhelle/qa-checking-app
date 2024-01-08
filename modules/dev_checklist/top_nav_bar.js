const {Builder, By} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../config");
const { log } = require("winston");

const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
});

const spreadsheetId = config.spreadsheetId_broken_links;



async function top_nav_bar(timestamp, link) {
    const client = await auth.getClient();
    var googleSheets = google.sheets({ version: "v4", auth: client });
    var driver = await new Builder().forBrowser("chrome").build();

    await driver.get(link);
    // await driver.sleep(3000);

    // var header = "site-header";
    // let nav_bar_position = await driver.executeScript("return document.getElementsByClassName('" + header + "')[0].style.position");

    // let nav_bar_position = await driver.executeScript("return document.getElementsByClassName('site-header')[0].style.position");

    let element = await driver.executeScript("return document.querySelector('.site-header')");

    console.log(element);

}



module.exports = { top_nav_bar };
