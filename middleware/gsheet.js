const {google} = require("googleapis");
const config = require("./config");

const auth = config.auth;
const spreadsheetId = config.spreadsheetId;


async function addRow() {
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })

    let requests = [{
        insertRange: {
            range: {
                sheetId: 0,
                startRowIndex: 1,
                endRowIndex: 2,
                startColumnIndex: 0,
            },
            shiftDimension: "ROWS"
        }
    }];   
    
    const batchUpdateRequest = {requests};
    
    // add columns
    await googleSheets.spreadsheets.batchUpdate({
        auth,
        spreadsheetId,
        resource: batchUpdateRequest,
        }, (err, response) => {
        if (err) {
            console.log(err);
        } else {
            console.log("success.");
        }
    });
}


async function appendValues(value) {
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })

    // let ranges = [
    //     "Logs!E2",
    //     "Logs!A2",
    //     "Logs!B2",
    //     "Logs!C2",
    //     "Logs!D2"
    // ]

    let ranges = [
        "Logs!O2",
        "Logs!A2",
        "Logs!B2",
        "Logs!C2",
        "Logs!D2",
        "Logs!E2",
        "Logs!F2",
        "Logs!G2",
        "Logs!H2",
        "Logs!I2",
        "Logs!J2",
        "Logs!K2",
        "Logs!L2",
        "Logs!M2",
        "Logs!N2"
    ]

    for (let index = 0; index < ranges.length; index++) {
        try {
            await googleSheets.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: ranges[index],
                valueInputOption: "USER_ENTERED",
                resource: {
                    values: [
                        [value[index]]
                    ]
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

}


async function clearLogs() {
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })

    const request = {
        spreadsheetId: spreadsheetId,
        range: 'Logs!A2:N200',
        auth: client,
    };
    
    try {
        const response = (await googleSheets.spreadsheets.values.clear(request)).data;
        console.log(JSON.stringify(response, null, 2));
    } catch (err) {
        console.error(err);
    }
}



module.exports = { addRow, appendValues, clearLogs };
