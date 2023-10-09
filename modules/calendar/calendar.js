const {Builder, By} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../config");
const { logger } = require("../../middleware/logger");
// const logger = require('../../../middleware/logger.js');
// const server = require('../../../server.js');
// const sheet = require('../../../middleware/gsheet.js');

const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
});

const spreadsheetId = config.spreadsheetId_calendar;

// let credentials = config.credentials;
// let output = config_nitropack.output;
// const module_name = "WEBSITE AUTOUPDATE MONITORING - BACKEND";


async function calendar(timestamp, dev) {
    const client = await auth.getClient();
    var googleSheets = google.sheets({ version: "v4", auth: client });
    var driver = await new Builder().forBrowser("chrome").build();

    await driver.get("https://primeviewllc.timedoctor.com/v2/index.php?page=time_use_report");

    await driver.findElement(By.id("email")).sendKeys("mbuendia@optimizex.com");
    await driver.findElement(By.id("password")).sendKeys("mA1+sN5>bZ6%");
    await driver.findElement(By.id("signinFormButton")).click();
    await driver.sleep(3000);

    await driver.findElement(By.id("prevDayBtn")).click();

    await driver.sleep(5000);

    let ranges = [
        "Sheet!C3:E3",
        "Sheet!C4:E4",
        "Sheet!C5:E5",
        "Sheet!C6:E6",
        "Sheet!C7:E7",
        "Sheet!C8:E8",
        "Sheet!C9:E9",
        "Sheet!C10:E10",
        "Sheet!C11:E11",
        "Sheet!C12:E12",
        "Sheet!C13:E13",
        "Sheet!C14:E14",
        "Sheet!C15:E15",
        "Sheet!C16:E16",
        "Sheet!C17:E17",
        "Sheet!C18:E18",
        "Sheet!C19:E19",
        "Sheet!C20:E20",
    ]

    // let ranges = [
    //     "Sheet!C18:E18",
    //     "Sheet!C19:E19",
    //     "Sheet!C20:E20",
    //     "Sheet!C21:E21",
    //     "Sheet!C22:E22",
    //     "Sheet!C23:E23",
    //     "Sheet!C24:E24",
    //     "Sheet!C25:E25",
    //     "Sheet!C26:E26",
    //     "Sheet!C27:E27",
    //     "Sheet!C28:E28",
    //     "Sheet!C29:E29",
    // ]

    let task_link_count = await driver.executeScript("return document.getElementsByClassName('task-link').length");

    for (let j = 0; j < task_link_count; j++) {
        let task_name = await driver.executeScript("return document.getElementsByClassName('task-link')[" + j + "].innerText");
        let task_link = await driver.executeScript("return document.getElementsByClassName('task-link')[" + j + "].href");
        let total_time = await driver.executeScript("return document.getElementsByClassName('time-use-data-time-in-seconds')[" + j + "].innerText");

        console.log(task_name);
        console.log(task_link);
        console.log(total_time);

        const range = ranges[j];
    
        try {
            await googleSheets.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: range,
                valueInputOption: "USER_ENTERED",
                resource: {
                    values: [
                        [ 
                            task_name,
                            task_link,
                            total_time
                        ]
                    ]
                }
            });
        } catch (error) {
            console.log(error);
        }

    }

    // for (let i = 0; i < task_link_count; i++) {
    //     let task_links = await driver.executeScript("return document.getElementsByClassName('task-link')[" + i + "].href");
    //     await driver.switchTo().newWindow('tab');
    //     console.log(task_links);
    //     await driver.get(task_links);

    //     await driver.sleep(5000);

    //     await driver.findElement(By.id("loginemail")).sendKeys("mbuendia@optimizex.com");
    //     await driver.findElement(By.id("loginpassword")).sendKeys("mA1+sN5>bZ6%");
    //     let teamwork_login = await driver.executeScript("return document.getElementsByClassName('w-button w-button--blue')[0]");
    //     teamwork_login.click();
    //     await driver.sleep(3000);


    //     let client_name = await driver.executeScript("return document.getElementsByClassName('truncate max-w-full canClickToEdit')[0].innerText");
    //     console.log(client_name);
    // }
}



module.exports = { calendar };
