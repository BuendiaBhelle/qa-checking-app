const {google} = require("googleapis");
require('dotenv').config();

const config = require("../../config");
const server = require('../../server');
const sheet = require('../../middleware/gsheet');

const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
});

const spreadsheetId = process.env.SPREADSHEETID_WPM;
const sheet_id = config.sheet_id;
const module_name = config.module_name_wpm;
const startRowIndex = config.startRowIndex;
const endRowIndex = config.endRowIndex;
const startColumnIndex = config.startColumnIndex;
let site_names = config.site_names;
let score = config.score;
const list_sites_range = config.list_sites_range;
const reports_range = config.reports_range_wpm;
const display_sites_range = config.display_sites_range;
let output = config.date;


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
        console.log("WEBFORMS - add rows success.");
        value = [ "", "", "info", "add rows success.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
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
    
    const fb = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "FB!A175:O175",
    });

    const gps = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "GPS!A4:O4",
    });

    const kfd = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "KFD!A4:O4",
    });

    const nhu = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "NHU!A174:O174",
    });

    const azrs = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "AZRS!A4:O4",
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

    // const bd = await googleSheets.spreadsheets.values.get({
    //     auth,
    //     spreadsheetId,
    //     range: "BD!A4:O4",
    // });

    // const bd_screenshot_link_mobile = await googleSheets.spreadsheets.values.get({
    //     auth,
    //     spreadsheetId,
    //     range: "BD!O4:P4",
    // });

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

    const atu = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "ATU!A4:P4",
    });

    const atu_screenshot_link_mobile = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "ATU!O4:P4",
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

    const jfj = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "JFJ!A4:O4",
    });

    const al = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "AL!A4:O4",
    });

    const sj = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "SJ!A4:O4",
    });

    const bs = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "BS!A4:P4",
    });

    const bs_screenshot_link_mobile = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "BS!O4:P4",
    });

    const vts = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "VTS!A4:P4",
    });

    const vts_screenshot_link_mobile = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "VTS!O4:P4",
    });


    const sites = [
        acc.data.values,
        blj.data.values,
        rlx.data.values,
        aims.data.values,
        ox.data.values,
        pma.data.values,
        pv.data.values,
        fb.data.values,
        gps.data.values,
        kfd.data.values,
        nhu.data.values,
        azrs.data.values,
        np.data.values,
        i_n.data.values,
        frl.data.values,
        cfhec.data.values,
        atu.data.values,
        iic.data.values,
        jfj.data.values,
        al.data.values,
        sj.data.values,
        bs.data.values,
        vts.data.values
    ]

    // console.log(sites.length);

    let screenshot_link_md = {
        aims: aims_screenshot_link_mobile.data.values[0] + "\n" + aims_screenshot_link_mobile.data.values[1],
        pma: pma_screenshot_link_mobile.data.values[0] + "\n" + pma_screenshot_link_mobile.data.values[1],
        pv: pv_screenshot_link_mobile.data.values[0] + "\n" + pv_screenshot_link_mobile.data.values[1],
        i_n: i_n_screenshot_link_mobile.data.values[0][0] + "\n" + i_n_screenshot_link_mobile.data.values[0][1],
        np: np_screenshot_link_mobile.data.values[0][0] + "\n" + np_screenshot_link_mobile.data.values[0][1],
        frl: frl_screenshot_link_mobile.data.values[0][0] + "\n" + frl_screenshot_link_mobile.data.values[0][1],
        cfhec: cfhec_screenshot_link_mobile.data.values[0][0] + "\n" + cfhec_screenshot_link_mobile.data.values[0][1],
        atu: atu_screenshot_link_mobile.data.values[0][0] + "\n" + atu_screenshot_link_mobile.data.values[0][1],
        iic: iic_screenshot_link_mobile.data.values[0][0] + "\n" + iic_screenshot_link_mobile.data.values[0][1],
        bs: bs_screenshot_link_mobile.data.values[0][0] + "\n" + bs_screenshot_link_mobile.data.values[0][1],
        vts: vts_screenshot_link_mobile.data.values[0][0] + "\n" + vts_screenshot_link_mobile.data.values[0][1]
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

    sites[12][0].splice(16, 1, screenshot_link_md.np);
    sites[13][0].splice(16, 1, screenshot_link_md.i_n);
    sites[14][0].splice(16, 1, screenshot_link_md.frl);
    sites[15][0].splice(16, 1, screenshot_link_md.cfhec);
    sites[16][0].splice(16, 1, screenshot_link_md.atu);
    sites[17][0].splice(16, 1, screenshot_link_md.iic);
    sites[21][0].splice(16, 1, screenshot_link_md.bs);
    sites[22][0].splice(16, 1, screenshot_link_md.vts);



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
        console.log("WEBFORMS - list sites with issue success.");
        value = [ "", "", "info", "list sites with issue success.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        console.log("WEBFORMS - list sites with issue failed.");
        value = [ "", "", "error", "list sites with issue failed.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    console.log(array_count);

}


async function displaySitesToBeReported(timestamp) {
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })

    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: display_sites_range,
    });

    const data = getRows.data.values;

    console.log(data.length)

    try {
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: reports_range,
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [
                        output,
                    ]
                ]
            }
        });
    } catch (error) {
        console.log(error);
    }

    // Security Score
    try {
        console.log("Security Score Fails:")
        try {
            await googleSheets.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: reports_range,
                valueInputOption: "USER_ENTERED",
                resource: {
                    values: [
                        [
                            "Security Score Fails:"
                        ]
                    ]
                }
            });
        } catch (error) {
            console.log(error);
        }
        for (let i = 0; i < data.length; i++) {
            var site = data[i][0];
            var security_score = data[i][5];
            var screenshot_link = data[i][12];
    
            if ((security_score === score[0] || security_score === score[1] || security_score === score[2] || security_score === score[3]) && (site !== "CFHEC" && site !== "EPS" && site !== "GPS" && site !== "CDG" && site !== "RLX" && site !== "IN" && site !== "ISC" && site !== "DMM" && site !== "SCAZ")) {
                console.log("* " + site + " - " + screenshot_link)
                try {
                    await googleSheets.spreadsheets.values.append({
                        auth,
                        spreadsheetId,
                        range: reports_range,
                        valueInputOption: "USER_ENTERED",
                        resource: {
                            values: [
                                [
                                    "* " + site + " - " + screenshot_link,
                                ]
                            ]
                        }
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }
        console.log("-----------------------")
        console.log("WEBFORMS - display security score fails success.");
        value = [ "", "", "info", "display security score fails success.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        console.log("WEBFORMS - display security score fails failed.");
        value = [ "", "", "error", "display security score fails failed.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    // First Byte Time
    try {
        console.log("First Byte Time Fails:")
        try {
            await googleSheets.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: reports_range,
                valueInputOption: "USER_ENTERED",
                resource: {
                    values: [
                        [
                            "First Byte Time Fails:"
                        ]
                    ]
                }
            });
        } catch (error) {
            console.log(error);
        }
        for (let j = 0; j < data.length; j++) {
            var site = data[j][0];
            var first_byte_time = data[j][6];
            var screenshot_link = data[j][12];
    
            if ((first_byte_time === score[0] || first_byte_time === score[1] || first_byte_time === score[2] || first_byte_time === score[3]) && 
            (site !== "CFHEC" && site !== "GPS" && site !== "RLX" && site !== "IN")) {
                console.log("* " + site + " - " + screenshot_link)
                try {
                    await googleSheets.spreadsheets.values.append({
                        auth,
                        spreadsheetId,
                        range: reports_range,
                        valueInputOption: "USER_ENTERED",
                        resource: {
                            values: [
                                [
                                    "* " + site + " - " + screenshot_link,
                                ]
                            ]
                        }
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }
        console.log("-----------------------")
        console.log("WEBFORMS - display first byte time fails success.");
        value = [ "", "", "info", "display first byte time fails success.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        console.log("WEBFORMS - display first byte time fails failed.");
        value = [ "", "", "error", "display first byte time fails failed.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    // Effective Use of CDN
    try {
        console.log("No Effective Use of CDN:")
        try {
            await googleSheets.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: reports_range,
                valueInputOption: "USER_ENTERED",
                resource: {
                    values: [
                        [
                            "No Effective Use of CDN:"
                        ]
                    ]
                }
            });
        } catch (error) {
            console.log(error);
        }
        for (let k = 0; k < data.length; k++) {
            var site = data[k][0];
            var effective_use_of_cdn = data[k][11];
            var screenshot_link = data[k][12];
           
            if (effective_use_of_cdn === "X") {
                if (site === "IN") {
                    console.log("No Effective Use of CDN for IN.");
                } else {
                    console.log("* " + site + " - " + screenshot_link)
                    try {
                        await googleSheets.spreadsheets.values.append({
                            auth,
                            spreadsheetId,
                            range: reports_range,
                            valueInputOption: "USER_ENTERED",
                            resource: {
                                values: [
                                    [
                                        "* " + site + " - " + screenshot_link,
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
        console.log("WEBFORMS - display effective use of cdn fails success.");
        value = [ "", "", "info", "display effective use of cdn fails success.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    } catch (error) {
        console.log("WEBFORMS - display effective use of cdn fails failed.");
        value = [ "", "", "error", "display effective use of cdn fails failed.", server.userId, timestamp, module_name, "", "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }
    // end test
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