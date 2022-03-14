const {google} = require("googleapis");
const config = require("./config");

const auth = config.auth;
const spreadsheetId = config.spreadsheetId;


async function addROw() {
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

    let ranges = [
        "Logs!E2",
        "Logs!A2",
        "Logs!B2",
        "Logs!C2",
        "Logs!D2"
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
        range: 'Logs!A2:D100',
        auth: client,
    };
    
    try {
        const response = (await googleSheets.spreadsheets.values.clear(request)).data;
        console.log(JSON.stringify(response, null, 2));
    } catch (err) {
        console.error(err);
    }
}



module.exports = { addROw, appendValues, clearLogs };
