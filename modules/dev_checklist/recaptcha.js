const {Builder, By} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../config");
const { log } = require("winston");

const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
});

const spreadsheetId = config.spreadsheetId_dev_checklist;



async function recaptcha(timestamp, link) {
    const client = await auth.getClient();
    var googleSheets = google.sheets({ version: "v4", auth: client });
    var driver = await new Builder().forBrowser("chrome").build();

    await driver.get(link);

    await driver.executeScript("window.scrollBy(0,1000)", "");
    await driver.sleep(2000);

    let recaptcha = await driver.executeScript("return document.getElementsByClassName('rc-anchor-pt')[0]");

    // if (recaptcha != undefined) {
    //     console.log("With Recaptcha");
    // } else {
    //     console.log("Without Recaptcha");
    // }

    console.log(JSON.stringify(recaptcha));



    // let site_title = await driver.executeScript("return document.getElementsByTagName('title')[0].innerText");
    // console.log(site_title);

    // if (site_title === "XML Sitemap") {
    //     console.log("With Sitemap.");
    // } else if (site_title.includes("Page Not Found")) {
    //     console.log("Without Sitemap.");
    // }


}



module.exports = { recaptcha };
