const {Builder, By, Key, Capabilities} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../../config");
const server = require('../../../server.js');
const sheet = require('../../../middleware/gsheet.js');
require('chromedriver');

const auth = config.auth;
const spreadsheetId = config.spreadsheetId_waum;
let search_key = config.search_key;
let output = config.date;
const module_name = "WEBSITE AUTOUPDATE MONITORING - FRONTEND";
let search_engine1 = "https://www.google.com/";
let search_engine2 = "https://www.bing.com/";
let search_engine3 = "https://search.yahoo.com/";


var searchable_google;
var searchable_bing;
var searchable_yahoo;
async function searchability() {
    const client = await auth.getClient();
    var googleSheets = google.sheets({ version: "v4", auth: client });


    // write date to sheet
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "SEARCHABILITY!A1:D1",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [
                [ output, "Google", "Bing", "Yahoo" ]
            ]
        }
    });

    let driver = await new Builder().forBrowser("chrome").build();

    for (let index = 0; index < search_key.length; index++) {
        // Google
        await driver.get(search_engine1);
        await driver.findElement(By.name("q")).sendKeys(search_key[index][1], Key.RETURN);

        await driver.sleep(10000);


        try {
            let search_results_count_google = await driver.executeScript("return document.getElementsByTagName('cite').length");
            for (let j = 0; j < search_results_count_google; j++) {
                let search_results_google = await driver.executeScript("return document.getElementsByTagName('cite')[" + j + "].innerText");
          
                if ((search_results_google != '') && (search_results_google != undefined)) {

                    if (search_results_google != "www.google.com/webmasters/") {
                        console.log("Google - ", search_results_google);

                        let host = await driver.executeScript("return window.location.hostname");
                        let link_checker = host.slice(0, 1);
                        // let link_checker2 = external_links.slice(0, 3);
                        console.log(link_checker);

                        if ((search_key[index][0].includes(search_results_google)) || (search_key[index][0] === search_results_google)) {
                            searchable_google = "Y";
                            break;
                        } else {
                            searchable_google = "N";
                            break;
                        }   
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }


        // Bing
        await driver.sleep(3000);
        await driver.switchTo().newWindow('tab');
        await driver.get(search_engine2);
        await driver.sleep(1000);
        await driver.findElement(By.id("sb_form_q")).sendKeys(search_key[index][1], Key.RETURN);
        await driver.sleep(10000);

        try {
            let search_results_count_bing = await driver.executeScript("return document.getElementsByTagName('cite').length");
            for (let k = 0; k < search_results_count_bing; k++) {
                let search_results_bing = await driver.executeScript("return document.getElementsByTagName('cite')[" + k + "].innerText");
          
                if ((search_results_bing != '') && (search_results_bing != undefined)) {
                    console.log("BING - ", search_results_bing);

                    if (search_key[index][0].includes(search_results_bing)) {
                        searchable_bing = "Y";
                        break;
                    } else {
                        searchable_bing = "N";
                        break;
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }

        // Yahoo
        await driver.sleep(3000);
        await driver.switchTo().newWindow('tab');
        await driver.get(search_engine3);
        await driver.findElement(By.id("yschsp")).sendKeys(search_key[index][1], Key.RETURN);
        await driver.sleep(10000);

        try {
            let search_results_count_yahoo = await driver.executeScript("return document.getElementsByClassName('compTitle options-toggle').length");
            for (let l = 0; l < search_results_count_yahoo; l++) {
                let search_results_yahoo = await driver.executeScript("return document.getElementsByClassName('compTitle options-toggle')[" + l + "].children[1].children[0].innerHTML");

                if ((search_results_yahoo != '') && (search_results_yahoo != undefined)) {
                    console.log("YAHOO - ", search_results_yahoo);

                    if (search_key[index][0].includes(search_results_yahoo)) {
                        searchable_yahoo = "Y";
                        break;
                    } else {
                        searchable_yahoo = "N";
                        break;
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }

        await driver.sleep(3000);

        try {
            // write site to sheets
            await googleSheets.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: "SEARCHABILITY!A1:D1",
                valueInputOption: "USER_ENTERED",
                resource: {
                    values: [
                        [ search_key[index][0], searchable_google, searchable_bing, searchable_yahoo ]
                    ]
                }
            });
        } catch (error) {
            console.log(error);
        }



        await driver.sleep(10000);
        await driver.switchTo().newWindow('tab');
        
    }
    // end test
    console.log("test ends.");
    
}

 

module.exports = { searchability };
