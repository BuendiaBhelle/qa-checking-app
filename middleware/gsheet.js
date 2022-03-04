const {google} = require("googleapis");
const config = require("./config");

const auth = config.auth;
const spreadsheetId = config.spreadsheetId;


async function gsheet(value) {
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })

    let values = [];
    values.push(value);

    try {
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Logs!A2",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [values[0]]
                ]
            }
        });
        console.log("success.");
    } catch (error) {
        console.log(error);
    }
}

module.exports = { gsheet };
