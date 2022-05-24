const {google} = require("googleapis");
const {Builder, By, Key, util} = require("selenium-webdriver");
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

const spreadsheetId = process.env.SPREADSHEETID_WPM;
const sheet_id = config.sheet_id;
const module_name = config.module_name;
const startRowIndex = config.startRowIndex;
const endRowIndex = config.endRowIndex;
const startColumnIndex = config.startColumnIndex;
let site_names = config.site_names;
let score = config.score;
const list_sites_range = config.list_sites_range;
const display_sites_range = config.display_sites_range;


async function insertRow(timestamp) {
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })

    // add rows to sheet
    try {
        let requests = [{
            insertRange: {
                range: {
                    sheetId: sheet_id,
                    startRowIndex: startRowIndex,
                    endRowIndex: endRowIndex,
                    startColumnIndex: startColumnIndex,
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
                console.log("rows added.");
            }
        });
        logger.logger.log({ level: 'info', message: 'WEBFORMS - add rows success.', tester: server.userId });
        console.log("WEBFORMS - add rows success.");
        value = [ "", "", "info", "add rows success.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: 'WEBFORMS - add rows failed.', tester: server.userId });
        console.log("WEBFORMS - add rows failed.");
        value = [ "", "", "error", "add rows failed.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

}

async function listSitesWithIssues(timestamp) {
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })

    // Read rows from google sheets
    // ACC - LIG SITES ARE NOT INCLUDED YET SINCE SHEETS FOR THOSE AREN'T UNIFORM.
    const gps = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "GPS!A4:O4",
    });

    const nhu = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "NHU!A174:O174",
    });

    const fb = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "FB!A175:O175",
    });

    const sj = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "SJ!A4:O4",
    });

    const azrs = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "AZRS!A4:O4",
    });

    const kfd = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "KFD!A4:O4",
    });

    const isc = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "ISC!A20:O20",
    });

    const al = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "AL!A4:O4",
    });

    const scaz = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "SCAZ!A4:O4",
    });

    const i_n = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "IN!A4:O4",
    });

    const np = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "NP!A4:O4",
    });

    const frl = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "FRL!A4:O4",
    });

    const bd = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "BD!A4:O4",
    });

    const cfhec = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "CFHEC!A4:O4",
    });

    const apj = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "APJ!A4:O4",
    });

    const sites = [
        gps.data.values,
        nhu.data.values,
        fb.data.values,
        sj.data.values,
        azrs.data.values,
        kfd.data.values,
        isc.data.values,
        al.data.values,
        scaz.data.values,    
        i_n.data.values,
        np.data.values,
        frl.data.values,
        bd.data.values,
        cfhec.data.values,
        apj.data.values,
    ]

    console.log(sites.length);

    for (let j = 0; j < site_names.length; j++) {
        sites[j][0].splice(0, 0, site_names[j]);
        sites[j][0].splice(13, 0, '');

    }

    // list sites
    try {
        for (let i = 0; i < sites.length; i++) {
            for (let j = 0; j < sites[i].length; j++) {
                let security_score = sites[i][j][5];
                let site = sites[i][j][0];
                let url = sites[i][j][2];
                let date = sites[i][j][3];
                let first_byte_time = sites[i][j][6];
                let keep_alive_enabled = sites[i][j][7];
                let compress_transfer = sites[i][j][8];
                let compress_images = sites[i][j][9];
                let cache_static_content = sites[i][j][10];
                let effective_use_of_cdn = sites[i][j][11];
    
                if ((security_score === score[0] || security_score === score[1] || security_score === score[2] || security_score === score[3]) ||
                (first_byte_time === score[0] || first_byte_time === score[1] || first_byte_time === score[2] || first_byte_time === score[3]) ||
                (keep_alive_enabled === score[0] || keep_alive_enabled === score[1] || keep_alive_enabled === score[2] || keep_alive_enabled === score[3]) ||
                (compress_transfer === score[0] || compress_transfer === score[1] || compress_transfer === score[2] || compress_transfer === score[3]) ||
                (compress_images === score[0] || compress_images === score[1] || compress_images === score[2] || compress_images === score[3]) ||
                (cache_static_content === score[0] || cache_static_content === score[1] || cache_static_content === score[2] || cache_static_content === score[3]) ||
                (effective_use_of_cdn === "X")) {
    
                    console.log(site);
    
                    // Write rows to google sheet
                    try {
                        await googleSheets.spreadsheets.values.append({
                            auth,
                            spreadsheetId,
                            range: list_sites_range,
                            valueInputOption: "USER_ENTERED",
                            resource: {
                                values: [
                                    sites[i][j]
                                ]
                            }
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }
            } 
        }
        logger.logger.log({ level: 'info', message: 'WEBFORMS - list sites with issue success.', tester: server.userId });
        console.log("WEBFORMS - list sites with issue success.");
        value = [ "", "", "info", "list sites with issue success.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: 'WEBFORMS - list sites with issue failed.', tester: server.userId });
        console.log("WEBFORMS - list sites with issue failed.");
        value = [ "", "", "error", "list sites with issue failed.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }
}

async function displaySitesToBeReported(timestamp) {
    const program = 'C:/Program Files/Windows Application Driver/WinAppDriver.exe';
    spawn(program, [], { cwd: dirname(program) });

    const appExe = 'C:/Windows/System32/notepad.exe';
    await driver.startWithCapabilities(windowsAppDriverCapabilities(appExe));

    const element = By2.nativeXpath('//*[@ClassName="Edit"]');
    await element.click();

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });

    // Read rows from google sheet
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: display_sites_range,
    });

    const data = getRows.data.values;

    console.log(data.length)

    // Security Score
    try {
        await element.sendKeys("Security Score Fails:" + "\n");
        console.log("Security Score Fails:")
        for (let i = 0; i < data.length; i++) {
            var site = data[i][0];
            var security_score = data[i][5];
            var screenshot_link = data[i][12];
    
            if ((security_score === score[0] || security_score === score[1] || security_score === score[2] || security_score === score[3]) && (site !== "CFHEC" && site !== "EPS" && site !== "GPS" && site !== "CDG" && site !== "RLX" && site !== "IN" && site !== "ISC")) {
                await element.sendKeys("* " + site + " - " + screenshot_link + "\n");
                console.log("* " + site + " - " + screenshot_link)
            }
        }
        await element.sendKeys("-----------------------" + "\n");
        console.log("-----------------------")
        logger.logger.log({ level: 'info', message: 'WEBFORMS - display security score fails success.', tester: server.userId });
        console.log("WEBFORMS - display security score fails success.");
        value = [ "", "", "info", "display security score fails success.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: 'WEBFORMS - display security score fails failed.', tester: server.userId });
        console.log("WEBFORMS - display security score fails failed.");
        value = [ "", "", "error", "display security score fails failed.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    // First Byte Time
    try {
        await element.sendKeys("First Byte Time Fails:" + "\n");
        console.log("First Byte Time Fails:")
        for (let j = 0; j < data.length; j++) {
            var site = data[j][0];
            var first_byte_time = data[j][6];
            var screenshot_link = data[j][12];
    
            if ((first_byte_time === score[0] || first_byte_time === score[1] || first_byte_time === score[2] || first_byte_time === score[3]) && (site !== "CFHEC" && site !== "EPS" && site !== "GPS" && site !== "CDG" && site !== "RLX" && site !== "IN" && site !== "ISC")) {
                await element.sendKeys("* " + site + " - " + screenshot_link + "\n");
                console.log("* " + site + " - " + screenshot_link)
            }
        }
        await element.sendKeys("-----------------------" + "\n");
        console.log("-----------------------")
        logger.logger.log({ level: 'info', message: 'WEBFORMS - display first byte time fails success.', tester: server.userId });
        console.log("WEBFORMS - display first byte time fails success.");
        value = [ "", "", "info", "display first byte time fails success.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: 'WEBFORMS - display first byte time fails failed.', tester: server.userId });
        console.log("WEBFORMS - display first byte time fails failed.");
        value = [ "", "", "error", "display first byte time fails failed.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    // Effective Use of CDN
    try {
        await element.sendKeys("Effective Use of CDN Fails:" + "\n");
        console.log("Effective Use of CDN Fails:")
        for (let k = 0; k < data.length; k++) {
            var site = data[k][0];
            var effective_use_of_cdn = data[k][11];
            var screenshot_link = data[k][12];
           
            if (effective_use_of_cdn === "X") {
                await element.sendKeys("* " + site + " - " + screenshot_link + "\n");
                console.log("* " + site + " - " + screenshot_link)
            }
        }
        logger.logger.log({ level: 'info', message: 'WEBFORMS - display effective use of cdn fails success.', tester: server.userId });
        console.log("WEBFORMS - display effective use of cdn fails success.");
        value = [ "", "", "info", "display effective use of cdn fails success.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        logger.logger.log({ level: 'error', message: 'WEBFORMS - display effective use of cdn fails failed.', tester: server.userId });
        console.log("WEBFORMS - display effective use of cdn fails failed.");
        value = [ "", "", "error", "display effective use of cdn fails failed.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }
    // end test
    logger.logger.log({ level: 'info', message: 'test ends.', tester: server.userId });
    console.log("test ends.");
    value = [ "", "", "info", "test ends.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
    await sheet.addRow();
    await sheet.appendValues(value);
}



module.exports = {
    insertRow,
    listSitesWithIssues,
    displaySitesToBeReported
}