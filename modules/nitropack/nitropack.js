const {google} = require("googleapis");
const {Builder, By, Key} = require("selenium-webdriver");
require('dotenv').config();
const { dirname } = require("path");
const { spawn } = require("child_process");
const { driver, By2, windowsAppDriverCapabilities } = require("selenium-appium");

const config = require("./config");
const logger = require('../../middleware/logger');
const server = require('../../server');
const sheet = require('../../middleware/gsheet');

const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
});

const spreadsheetId = process.env.SPREADSHEETID_NITROPACK;
let output = config.output;
let strTime = config.strTime;
let site_ids = config.site_ids;
let urls = config.urls;
let ranges_other = config.ranges_other;
let pagespeed_url = config.pagespeed_url;
let ranges_mobile = config.ranges_mobile;
let ranges_desktop = config.ranges_desktop;
let sheet_names = config.sheet_names;
const module_name = config.module_name;

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
        logger.logger.log({ level: 'info', message: 'WEBFORMS - add row success.', tester: server.userId });
        console.log("WEBFORMS - add row success.");
        value = [ "", "", "info", "add row success.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: 'WEBFORMS - add row failed.', tester: server.userId });
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
        logger.logger.log({ level: 'info', message: 'WEBFORMS - list other test details success.', tester: server.userId });
        console.log("WEBFORMS - list other test details success.");
        value = [ "", "", "info", "list other test details success.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: 'WEBFORMS - list other test details failed.', tester: server.userId });
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
                await driver.sleep(30000);
        
                let loading = await driver.executeScript("return document.getElementsByClassName('VfPpkd-JGcpL-IdXvz-LkdAo-Bd00G')[0]");
                if (loading) {
                    await driver.sleep(20000);
                }
        
                let score = await driver.executeScript("return document.getElementsByClassName('lh-gauge__percentage')[0].innerText");
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
                logger.logger.log({ level: 'error', message: 'WEBFORMS - write mobile score to sheet failed.', tester: server.userId });
                console.log("WEBFORMS - write mobile score to sheet failed.");
                value = [ "", "", "error", "write mobile score to sheet failed.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value);
            }
    
            await driver.switchTo().newWindow('tab');
        }
        logger.logger.log({ level: 'info', message: 'WEBFORMS - write mobile score to sheet success.', tester: server.userId });
        console.log("WEBFORMS - write mobile score to sheet success.");
        value = [ "", "", "info", "write mobile score to sheet success.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: 'WEBFORMS - write mobile score to sheet failed.', tester: server.userId });
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
        
                let loading = await driver.executeScript("return document.getElementsByClassName('VfPpkd-JGcpL-IdXvz-LkdAo-Bd00G')[0]");
                if (loading) {
                    await driver.sleep(20000);
                }
        
                let score = await driver.executeScript("return document.getElementsByClassName('lh-gauge__percentage')[1].innerText");
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
        logger.logger.log({ level: 'info', message: 'WEBFORMS - write desktop score to sheet success.', tester: server.userId });
        console.log("WEBFORMS - write desktop score to sheet success.");
        value = [ "", "", "info", "write desktop score to sheet success.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: 'WEBFORMS - write desktop score to sheet failed.', tester: server.userId });
        console.log("WEBFORMS - write desktop score to sheet failed.");
        value = [ "", "", "error", "write desktop score to sheet failed.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    console.log("desktop");
}

async function displayFails(timestamp) {
    const program = 'C:/Program Files/Windows Application Driver/WinAppDriver.exe';
    spawn(program, [], { cwd: dirname(program) });

    const appExe = 'C:/Windows/System32/notepad.exe';
    await driver.startWithCapabilities(windowsAppDriverCapabilities(appExe));

    const element = By2.nativeXpath('//*[@ClassName="Edit"]');
    await element.click();

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
        await element.sendKeys("Nitropack fails (" + date_data + "):" + "\n");
        console.log("Nitropack fails (" + config.output + "):");
        for (let index = 0; index < sheet_names.length; index++) {
            const getPageSpeedScore = await googleSheets.spreadsheets.values.get({
                auth,
                spreadsheetId,
                range: sheet_names[index] + "!D4:E4",
            });
    
            const data_desktop = getPageSpeedScore.data.values[0][0];
            const data_mobile = getPageSpeedScore.data.values[0][1];

            if (data_mobile <= 49) {
                await element.sendKeys("   * " + sheet_names[index] + "\n");
                console.log("   * " + sheet_names[index]);
                if (data_desktop <= 49) {
                    await element.sendKeys("     - Desktop: " + data_desktop + "\n");
                    console.log("     - Desktop: " + data_desktop);
                }
                await element.sendKeys("     - Mobile: " + data_mobile + "\n");
                console.log("     - Mobile: " + data_mobile);
            }
            else if (data_desktop <= 49) {
                await element.sendKeys("   * " + sheet_names[index] + "\n");
                await element.sendKeys("     - Desktop: " + data_desktop + "\n");
                console.log("   * " + sheet_names[index]);
                console.log("     - Desktop: " + data_desktop);
                if (data_mobile <= 49) {
                    await element.sendKeys("     - Mobile: " + data_mobile + "\n");
                    console.log("     - Mobile: " + data_mobile);
                }
            }
        }
        logger.logger.log({ level: 'info', message: 'WEBFORMS - get page speed scores success.', tester: server.userId });
        console.log("WEBFORMS - get page speed scores success.");
        value = [ "", "", "info", "get page speed scores success.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
        // process.exit();
    } catch (error) {
        logger.logger.log({ level: 'error', message: 'WEBFORMS - get page speed scores failed.', tester: server.userId });
        console.log("WEBFORMS - get page speed scores failed.");
        value = [ "", "", "error", "get page speed scores failed.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }
    // end test
    logger.logger.log({ level: 'info', message: 'test ends.', tester: server.userId });
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