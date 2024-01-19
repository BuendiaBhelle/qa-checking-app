const {Builder, By, until} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../config");

const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
});

const spreadsheetId = config.spreadsheetId_calendar;
const td_url = config.td_url;
const tw_url = config.tw_url;


async function calendar(timestamp, user) {
    const client = await auth.getClient();
    var googleSheets = google.sheets({ version: "v4", auth: client });
    // var driver = await new Builder().forBrowser("chrome").build();
    let driver = await new Builder().forBrowser('MicrosoftEdge').build();

    await driver.get(td_url);

    if ((user === "user2") || user === "user4") {
        await driver.findElement(By.id("signinButtonGoogle")).click();
        await driver.sleep(30000);
        await driver.get(td_url);
    } else {
        await driver.sleep(30000);
    }

    await driver.sleep(10000);

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

    const task_links = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet!D3:D20",
    });

    let client_name = task_links.data.values;
    let task_links_length = client_name.length;

    await driver.switchTo().newWindow('tab');

    await driver.sleep(3000);

    await driver.get(tw_url);
    await driver.sleep(7000);

    if ((user === "user2") || user === "user4") {
        await driver.executeScript("return document.getElementsByClassName('w-button__label')[1].click()");
        await driver.executeScript("return document.getElementsByClassName('wLBAL')[0].click()");
    } else {
        await driver.sleep(30000);
    }

    await driver.sleep(3000);

    let ranges_client = [
        "Sheet!B3",
        "Sheet!B4",
        "Sheet!B5",
        "Sheet!B6",
        "Sheet!B7",
        "Sheet!B8",
        "Sheet!B9",
        "Sheet!B10",
        "Sheet!B11",
        "Sheet!B12",
        "Sheet!B13",
        "Sheet!B14",
        "Sheet!B15",
        "Sheet!B16",
        "Sheet!B17",
        "Sheet!B18",
        "Sheet!B19",
        "Sheet!B20",
    ]

    for (let index = 0; index < task_links_length; index++) {
        await driver.switchTo().newWindow('tab');

        await driver.get(client_name[index][0]);
    
        await driver.sleep(5000);

        let client = await driver.executeScript("return document.getElementsByClassName('truncate max-w-full canClickToEdit')[0].innerText");
        
        console.log(client);

        const range_client = ranges_client[index];
    
        try {
            await googleSheets.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: range_client,
                valueInputOption: "USER_ENTERED",
                resource: {
                    values: [
                        [ 
                            client
                        ]
                    ]
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    console.log("CALENDAR AUTOMATION DONE.");
}



module.exports = { calendar };
