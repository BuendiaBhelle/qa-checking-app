const {google} = require("googleapis");
const {Builder, By, Key} = require("selenium-webdriver");
require('dotenv').config();

const config = require("../../config");
const server = require('../../server');
const sheet = require('../../middleware/gsheet');

const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
});

const spreadsheetId = process.env.SPREADSHEETID_NITROPACK;
let output = config.date;
let strTime = config.strTime;
let site_ids = config.site_ids;
let urls = config.urls;
let ranges_other = config.ranges_other;
let pagespeed_url = config.pagespeed_url;
let ranges_mobile_and_desktop = config.ranges_mobile_and_desktop;
let sheet_names = config.sheet_names;
const module_name = config.module_name_nitropack;
const reports_range = config.reports_range;

async function insertRow(timestamp) {
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })

    // add rows to sheet
    try {
        for (let index = 0; index < site_ids.length; index++) {
            let requests = [{
                insertRange: {
                    range: {
                        sheetId: site_ids[index],
                        startRowIndex: 3,
                        endRowIndex: 4,
                        startColumnIndex: 0,
                    },
                    shiftDimension: "ROWS"
                }
            }];
    
            const batchUpdateRequest = {requests};
    
            await googleSheets.spreadsheets.batchUpdate({
                auth,
                spreadsheetId,
                resource: batchUpdateRequest,
                }, (err, response) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(site_ids[index]);
                }
            });
        }  
        console.log("NITROPACK - add row success.");
        value = [ "", "", "info", "add row success.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        console.log("NITROPACK - add row failed.");
        value = [ "", "", "error", "add row failed.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    console.log("add rows");
}

async function listTestDetails(timestamp) {
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })
    
    // list other test details
    try {
        for (let index = 0; index < urls.length; index++) {
            let values = [
                [
                    urls[index],
                    output,
                    strTime
                ],
            ];
    
            const resource = {
                values,
            };
    
            const range = ranges_other[index];
    
            await googleSheets.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: range,
                valueInputOption: "RAW",
                resource: resource
            });
            console.log(range);
        }
        console.log("NITROPACK - list other test details success.");
        value = [ "", "", "info", "list other test details success.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        console.log("NITROPACK - list other test details failed.");
        value = [ "", "", "error", "list other test details failed.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    console.log("other details");
}

async function mobile_and_desktopScore(timestamp) {
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })

    // let driver = await new Builder().forBrowser('MicrosoftEdge').build();

    var driver = await new Builder().forBrowser("chrome").build();
    
    try {
        for (let index = 0; index < urls.length; index++) {
            const range = ranges_mobile_and_desktop[index];
      
            // get mobile score
            try {
                await driver.get(pagespeed_url);
                await driver.findElement(By.name("url")).sendKeys(urls[index], Key.RETURN);

                await driver.sleep(50000);
        
                let mobile_score = await driver.executeScript("return document.getElementsByClassName('lh-gauge__percentage')[0].innerHTML");
                var mobile_scoreFin = Number(mobile_score);
                console.log(mobile_scoreFin);

                let desktop_score = await driver.executeScript("return document.getElementsByClassName('lh-exp-gauge__percentage')[1].innerHTML");
                var desktop_scoreFin = Number(desktop_score);
                console.log(desktop_scoreFin);

            } catch (error) {
                console.log(error);
            }
    
            let values = [
                [
                    desktop_scoreFin,
                    mobile_scoreFin
                ],
            ];
    
            const resource = {
                values,
            };
    
            // write the scores to sheet
            try {
                await googleSheets.spreadsheets.values.append({
                    auth,
                    spreadsheetId,
                    range: range,
                    valueInputOption: "RAW",
                    resource: resource
                });
                console.log(range);
            } catch (error) {
                console.log("NITROPACK - write mobile score to sheet failed.");
                value = [ "", "", "error", "write mobile score to sheet failed.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value);
            }
    
            await driver.switchTo().newWindow('tab');
        }
        console.log("NITROPACK - write mobile score to sheet success.");
        value = [ "", "", "info", "write mobile score to sheet success.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        console.log("NITROPACK - write mobile score to sheet failed.");
        value = [ "", "", "error", "write mobile score to sheet failed.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    console.log("mobile");
}

async function displayFails(timestamp) {
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });

    // Read PageSpeed Scores from google sheet
    try {
        try {
            await googleSheets.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: reports_range,
                valueInputOption: "USER_ENTERED",
                resource: {
                    values: [
                        [
                            "Nitropack fails (" + config.date + "):"
                        ]
                    ]
                }
            });
        } catch (error) {
            console.log(error);
        }
        for (let index = 0; index < sheet_names.length; index++) {
            const getPageSpeedScore = await googleSheets.spreadsheets.values.get({
                auth,
                spreadsheetId,
                range: sheet_names[index] + "!D4:E4",
            });
    
            const data_desktop = getPageSpeedScore.data.values[0][0];
            const data_mobile = getPageSpeedScore.data.values[0][1];

            if (data_mobile <= 49) {
                console.log("   * " + urls[index]);
                try {
                    await googleSheets.spreadsheets.values.append({
                        auth,
                        spreadsheetId,
                        range: reports_range,
                        valueInputOption: "USER_ENTERED",
                        resource: {
                            values: [
                                [
                                    "* " + urls[index]
                                ]
                            ]
                        }
                    });
                } catch (error) {
                    console.log(error);
                }
                if (data_desktop <= 49) {
                    console.log("   - Desktop: " + data_desktop);
                    try {
                        await googleSheets.spreadsheets.values.append({
                            auth,
                            spreadsheetId,
                            range: reports_range,
                            valueInputOption: "USER_ENTERED",
                            resource: {
                                values: [
                                    [
                                        "   - Desktop: " + data_desktop
                                    ]
                                ]
                            }
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }
                console.log("     - Mobile: " + data_mobile);
                try {
                    await googleSheets.spreadsheets.values.append({
                        auth,
                        spreadsheetId,
                        range: reports_range,
                        valueInputOption: "USER_ENTERED",
                        resource: {
                            values: [
                                [
                                    "   - Mobile: " + data_mobile
                                ]
                            ]
                        }
                    });
                } catch (error) {
                    console.log(error);
                }
            }
            else if (data_desktop <= 49) {
                console.log("   * " + urls[index]);
                console.log("     - Desktop: " + data_desktop);
                try {
                    await googleSheets.spreadsheets.values.append({
                        auth,
                        spreadsheetId,
                        range: reports_range,
                        valueInputOption: "USER_ENTERED",
                        resource: {
                            values: [
                                [
                                    "* " + urls[index],
                                ]
                            ]
                        }
                    });
                } catch (error) {
                    console.log(error);
                }

                try {
                    await googleSheets.spreadsheets.values.append({
                        auth,
                        spreadsheetId,
                        range: reports_range,
                        valueInputOption: "USER_ENTERED",
                        resource: {
                            values: [
                                [
                                    "   - Desktop: " + data_desktop
                                ]
                            ]
                        }
                    });
                } catch (error) {
                    console.log(error);
                }
                if (data_mobile <= 49) {
                    console.log("     - Mobile: " + data_mobile);
                    try {
                        await googleSheets.spreadsheets.values.append({
                            auth,
                            spreadsheetId,
                            range: reports_range,
                            valueInputOption: "USER_ENTERED",
                            resource: {
                                values: [
                                    [
                                        "   - Mobile: " + data_mobile
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
        console.log("NITROPACK - get page speed scores success.");
        value = [ "", "", "info", "get page speed scores success.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
        // process.exit();
    } catch (error) {
        console.log("NITROPACK - get page speed scores failed.");
        value = [ "", "", "error", "get page speed scores failed.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }
    // end test
    console.log("test ends.");
    value = [ "", "", "info", "test ends.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
    await sheet.addRow();
    await sheet.appendValues(value);

    console.log("fails");

}



module.exports = {
    insertRow,
    listTestDetails,
    mobile_and_desktopScore,
    displayFails
}