const {google} = require("googleapis");
const {Builder, By, Key} = require("selenium-webdriver");
require('dotenv').config();
const { dirname } = require("path");
const { spawn } = require("child_process");
const { driver, By2, windowsAppDriverCapabilities } = require("selenium-appium");

const config = require("../../../config");
const server = require('../../../server');
const sheet = require('../../../middleware/gsheet');

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
let ranges_mobile = config.ranges_mobile;
let ranges_desktop = config.ranges_desktop;
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
        console.log("WEBFORMS - add row success.");
        value = [ "", "", "info", "add row success.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        console.log("WEBFORMS - add row failed.");
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
        console.log("WEBFORMS - list other test details success.");
        value = [ "", "", "info", "list other test details success.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        console.log("WEBFORMS - list other test details failed.");
        value = [ "", "", "error", "list other test details failed.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    console.log("other details");
}

async function mobileScore(timestamp) {
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })

    const driver = await new Builder().forBrowser("chrome").build();
    
    try {
        for (let index = 0; index < urls.length; index++) {
            const range = ranges_mobile[index];
      
            // get mobile score
            try {
                await driver.get(pagespeed_url);
                await driver.findElement(By.name("url")).sendKeys(urls[index], Key.RETURN);
                let current_page_url = await driver.getCurrentUrl();
                await driver.get(current_page_url + "&form_factor=mobile");
                await driver.sleep(50000);

                await driver.executeScript("window.scrollBy(0,650)", "");
        
                let loading = await driver.executeScript("return document.getElementsByClassName('VfPpkd-JGcpL-IdXvz-LkdAo-Bd00G')[0]");
                if (loading) {
                    console.log("loading....");
                    await driver.sleep(20000);
                }
        
                let score = await driver.executeScript("return document.getElementsByClassName('lh-gauge__percentage')[0].innerText");
                var scoreFin = Number(score);
                console.log(scoreFin);

                // if (scoreFin === 0) {
                //     console.log("FAILED TO LOAD");
                //     await driver.sleep(20000);
                //     let scoreFin = await driver.executeScript("return document.getElementsByClassName('lh-gauge__percentage')[0].innerText");
                //     console.log(scoreFin);
                // }
            } catch (error) {
                console.log(error);
            }
    
    
            let values = [
                [
                    scoreFin
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
                console.log("WEBFORMS - write mobile score to sheet failed.");
                value = [ "", "", "error", "write mobile score to sheet failed.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value);
            }
    
            await driver.switchTo().newWindow('tab');
        }
        console.log("WEBFORMS - write mobile score to sheet success.");
        value = [ "", "", "info", "write mobile score to sheet success.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        console.log("WEBFORMS - write mobile score to sheet failed.");
        value = [ "", "", "error", "write mobile score to sheet failed.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    console.log("mobile");
}

async function desktopScore(timestamp) {
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })
    const driver = await new Builder().forBrowser("chrome").build();
    
    try {
        for (let index = 0; index < urls.length; index++) {
            const range = ranges_desktop[index];
      
            // get desktop score
            try {
                await driver.get(pagespeed_url);
                await driver.findElement(By.name("url")).sendKeys(urls[index], Key.RETURN);
                let current_page_url = await driver.getCurrentUrl();
                await driver.get(current_page_url + "&form_factor=desktop");
                await driver.sleep(30000);

                await driver.executeScript("window.scrollBy(0,650)", "");
        
                let loading = await driver.executeScript("return document.getElementsByClassName('VfPpkd-JGcpL-IdXvz-LkdAo-Bd00G')[0]");
                if (loading) {
                    console.log("loading....");
                    await driver.sleep(20000);
                }
        
                let score = await driver.executeScript("return document.getElementsByClassName('lh-gauge__percentage')[20].innerText");
                var scoreFin = Number(score);
                console.log(scoreFin);
            } catch (error) {
                console.log(error);
            }
    
    
            let values = [
                [
                    scoreFin
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
                console.log(error);
            }
    
            await driver.switchTo().newWindow('tab');
        }
        console.log("WEBFORMS - write desktop score to sheet success.");
        value = [ "", "", "info", "write desktop score to sheet success.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        console.log("WEBFORMS - write desktop score to sheet failed.");
        value = [ "", "", "error", "write desktop score to sheet failed.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    console.log("desktop");
}

async function displayFails(timestamp) {
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });

    let date = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "ACC!B4",
    });

    const date_data = date.data.values[0][0];

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
                            "Nitropack fails (" + config.output + "):"
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
                console.log("   * " + sheet_names[index]);
                try {
                    await googleSheets.spreadsheets.values.append({
                        auth,
                        spreadsheetId,
                        range: reports_range,
                        valueInputOption: "USER_ENTERED",
                        resource: {
                            values: [
                                [
                                    "* " + sheet_names[index]
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
                console.log("   * " + sheet_names[index]);
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
                                    "* " + sheet_names[index],
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
        console.log("WEBFORMS - get page speed scores success.");
        value = [ "", "", "info", "get page speed scores success.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
        // process.exit();
    } catch (error) {
        console.log("WEBFORMS - get page speed scores failed.");
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
    mobileScore,
    desktopScore,
    displayFails
}