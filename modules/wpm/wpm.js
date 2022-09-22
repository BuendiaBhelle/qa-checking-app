const {google} = require("googleapis");
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
    const acc = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "ACC!A4:N4",
    });

    const blj = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "BLJ!A4:O4",
    });

    const rlx = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "RLX!A171:N171",
    });

    const aims = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "AIMS!A4:M4",
    });

    const aims_screenshot_link_mobile = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "AIMS!M4:M5",
    });

    const ox = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "OX!A4:N4",
    });

    const pma = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "PMA!A4:N4",
    });

    const pma_screenshot_link_mobile = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "PMA!N4:N5",
    });

    const pv = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "PV!A4:N4",
    });

    const pv_screenshot_link_mobile = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "PV!N4:N5",
    });

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

    const isc_screenshot_link_mobile = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "ISC!O20:P20",
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

    const scaz_screenshot_link_mobile = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "SCAZ!O4:P4",
    });

    const i_n = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "IN!A4:O4",
    });

    const i_n_screenshot_link_mobile = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "IN!O4:P4",
    });

    const np = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "NP!A4:O4",
    });

    const np_screenshot_link_mobile = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "NP!O4:P4",
    });

    const frl = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "FRL!A4:O4",
    });

    const frl_screenshot_link_mobile = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "FRL!O4:P4",
    });

    const bd = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "BD!A4:O4",
    });

    const bd_screenshot_link_mobile = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "BD!O4:P4",
    });

    const cfhec = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "CFHEC!A4:O4",
    });

    const cfhec_screenshot_link_mobile = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "CFHEC!O4:P4",
    });

    const apj = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "APJ!A4:O4",
    });

    const apj_screenshot_link_mobile = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "APJ!O4:P4",
    });

    const dmm = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "DMM!A4:P4",
    });

    const dmm_screenshot_link_mobile = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "DMM!O4:P4",
    });

    const at = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "AT!A4:P4",
    });

    const at_screenshot_link_mobile = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "AT!O4:P4",
    });

    const iic = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "IIC!A4:P4",
    });

    const iic_screenshot_link_mobile = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "IIC!O4:P4",
    });

    const sites = [
        acc.data.values,
        blj.data.values,
        rlx.data.values,
        aims.data.values,
        ox.data.values,
        pma.data.values,
        pv.data.values,
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
        dmm.data.values,
        at.data.values,
        iic.data.values
    ]

    // console.log(sites.length);

    let screenshot_link_md = {
        aims: aims_screenshot_link_mobile.data.values[0] + "\n" + aims_screenshot_link_mobile.data.values[1],
        pma: pma_screenshot_link_mobile.data.values[0] + "\n" + pma_screenshot_link_mobile.data.values[1],
        pv: pv_screenshot_link_mobile.data.values[0] + "\n" + pv_screenshot_link_mobile.data.values[1],
        isc: isc_screenshot_link_mobile.data.values[0][0] + "\n" + isc_screenshot_link_mobile.data.values[0][1],
        scaz: scaz_screenshot_link_mobile.data.values[0][0] + "\n" + scaz_screenshot_link_mobile.data.values[0][1],
        i_n: i_n_screenshot_link_mobile.data.values[0][0] + "\n" + i_n_screenshot_link_mobile.data.values[0][1],
        np: np_screenshot_link_mobile.data.values[0][0] + "\n" + np_screenshot_link_mobile.data.values[0][1],
        frl: frl_screenshot_link_mobile.data.values[0][0] + "\n" + frl_screenshot_link_mobile.data.values[0][1],
        bd: bd_screenshot_link_mobile.data.values[0][0] + "\n" + bd_screenshot_link_mobile.data.values[0][1],
        cfhec: cfhec_screenshot_link_mobile.data.values[0][0] + "\n" + cfhec_screenshot_link_mobile.data.values[0][1],
        apj: apj_screenshot_link_mobile.data.values[0][0] + "\n" + apj_screenshot_link_mobile.data.values[0][1],
        dmm: dmm_screenshot_link_mobile.data.values[0][0] + "\n" + dmm_screenshot_link_mobile.data.values[0][1],
        at: at_screenshot_link_mobile.data.values[0][0] + "\n" + at_screenshot_link_mobile.data.values[0][1],
        iic: iic_screenshot_link_mobile.data.values[0][0] + "\n" + iic_screenshot_link_mobile.data.values[0][1]
    }

    console.log("ALL SITES WITH ISSUES:");

    // ACC-LIG
    for (let index = 0; index <= 6; index++) {
        sites[index][0].splice(0, 0, site_names[index]);
        sites[index][0].splice(5, 0, '');
        
        if (sites[index][0][0] === "AIMS") {
            sites[index][0].splice(11, 0, '');
        }

        sites[index][0].splice(13, 0, '');        
    }

    sites[3][0].splice(16, 1, screenshot_link_md.aims);
    sites[5][0].splice(16, 1, screenshot_link_md.pma);
    sites[6][0].splice(16, 1, screenshot_link_md.pv);

    // GPS-APJ
    for (let index = 7; index < sites.length; index++) {
        sites[index][0].splice(0, 0, site_names[index]);
        sites[index][0].splice(13, 0, '');
    }

    sites[13][0].splice(16, 1, screenshot_link_md.isc);
    sites[15][0].splice(16, 1, screenshot_link_md.scaz);
    sites[16][0].splice(16, 1, screenshot_link_md.i_n);
    sites[17][0].splice(16, 1, screenshot_link_md.np);
    sites[18][0].splice(16, 1, screenshot_link_md.frl);
    sites[19][0].splice(16, 1, screenshot_link_md.bd);
    sites[20][0].splice(16, 1, screenshot_link_md.cfhec);
    sites[21][0].splice(16, 1, screenshot_link_md.apj);
    sites[22][0].splice(16, 1, screenshot_link_md.dmm);
    sites[23][0].splice(16, 1, screenshot_link_md.at);
    sites[24][0].splice(16, 1, screenshot_link_md.iic);


    // check site with issues
    try {
        var array_count=0;
        for (let index = 0; index < sites.length; index++) {
            let site = sites[index][0][0];
            let security_score = sites[index][0][5];
            let first_byte_time = sites[index][0][6];
            let keep_alive_enabled = sites[index][0][7];
            let compress_transfer = sites[index][0][8];
            let compress_images = sites[index][0][9];
            let cache_static_content = sites[index][0][10];
            let effective_use_of_cdn = sites[index][0][11];
    
            if ((security_score === score[0] || security_score === score[1] || security_score === score[2] || security_score === score[3]) ||
            (first_byte_time === score[0] || first_byte_time === score[1] || first_byte_time === score[2] || first_byte_time === score[3]) ||
            (keep_alive_enabled === score[0] || keep_alive_enabled === score[1] || keep_alive_enabled === score[2] || keep_alive_enabled === score[3]) ||
            (compress_transfer === score[0] || compress_transfer === score[1] || compress_transfer === score[2] || compress_transfer === score[3]) ||
            (compress_images === score[0] || compress_images === score[1] || compress_images === score[2] || compress_images === score[3]) ||
            (cache_static_content === score[0] || cache_static_content === score[1] || cache_static_content === score[2] || cache_static_content === score[3]) ||
            (effective_use_of_cdn === "X")) {
                
                array_count+=1;
    
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
                                sites[index][0]
                            ]
                        }
                    });
                } catch (error) {
                    console.log(error);
                }
    
                // console.log(sites[index][0]);
                
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

    console.log(array_count);

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
    
            if ((security_score === score[0] || security_score === score[1] || security_score === score[2] || security_score === score[3]) && (site !== "CFHEC" && site !== "EPS" && site !== "GPS" && site !== "CDG" && site !== "RLX" && site !== "IN" && site !== "ISC" && site !== "DMM" && site !== "SCAZ")) {
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
    
            if ((first_byte_time === score[0] || first_byte_time === score[1] || first_byte_time === score[2] || first_byte_time === score[3]) && (site !== "CFHEC" && site !== "EPS" && site !== "GPS" && site !== "CDG" && site !== "RLX" && site !== "IN" && site !== "ISC" && site !== "DMM" && site !== "SCAZ")) {
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
        await element.sendKeys("No Effective Use of CDN:" + "\n");
        console.log("No Effective Use of CDN:")
        for (let k = 0; k < data.length; k++) {
            var site = data[k][0];
            var effective_use_of_cdn = data[k][11];
            var screenshot_link = data[k][12];
           
            if (effective_use_of_cdn === "X") {
                if (site === "IN") {
                    console.log("No Effective Use of SDN for IN.");
                } else {
                    await element.sendKeys("* " + site + " - " + screenshot_link + "\n");
                    console.log("* " + site + " - " + screenshot_link)
                }
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