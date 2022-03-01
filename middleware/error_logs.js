const {Builder, By, Key} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("./config");
const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, json } = format;


const auth = config.auth;
const spreadsheetId = config.spreadsheetId;
const date = config.date;

async function errorLog(userId) {
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })

    const logger = createLogger({
        format: combine(
            timestamp(),
            json()
        ),
        transports: [
            new winston.transports.File({ filename: 'error.log', level: 'error' }),
            new winston.transports.File({ filename: 'combined.log' }),
        ]
    });
    
    logger.log({
        level: 'error',
        message: 'Hello distributed log files!',
        tester: userId
    });

    logger.log({
        level: 'info',
        message: 'What time is the testing at?',
        tester: userId
    });

    let values = [
        "try"
    ]

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

module.exports = { errorLog };
