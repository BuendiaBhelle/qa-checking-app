const {Builder, By} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("./config");
// const logger = require('../../../middleware/logger.js');
// const server = require('../../../server.js');
// const sheet = require('../../../middleware/gsheet.js');

const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
});

const spreadsheetId_belle = config.sheet_id.Belle;
const spreadsheetId = config.spreadsheetId;

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

    // let task_link_count = await driver.executeScript("return document.getElementsByClassName('task-link').length");
    // for (let i = 3; i < 14; i++) {
    //     for (let j = 0; j < task_link_count; j++) {
    //     let task_name = await driver.executeScript("return document.getElementsByClassName('task-link')[" + j + "].innerText");
    //     let task_link = await driver.executeScript("return document.getElementsByClassName('task-link')[" + j + "].href");
    //     let total_time = await driver.executeScript("return document.getElementsByClassName('time-use-data-time-in-seconds')[" + j + "].innerText");

    //         await googleSheets.spreadsheets.values.append({
    //             auth,
    //             spreadsheetId,
    //             // range: "Belle!C3:E3",
    //             range: "Belle!C"+i+":E"+i,
    //             valueInputOption: "USER_ENTERED",
    //             resource: {
    //                 values: [
    //                     [ 
    //                         task_name,
    //                         task_link,
    //                         total_time
    //                     ]
    //                 ]
    //             }
    //         });
            
    //     }
    // }

    // for (let index = 3; index <= 14; index++) {
    //     let ranges = "Belle!C"+index+":E"+index;

            
    //     let task_name = await driver.executeScript("return document.getElementsByClassName('task-link')[0].innerText");
    //     let task_link = await driver.executeScript("return document.getElementsByClassName('task-link')[0].href");
    //     let total_time = await driver.executeScript("return document.getElementsByClassName('time-use-data-time-in-seconds')[0].innerText");

    //     let task_name2 = await driver.executeScript("return document.getElementsByClassName('task-link')[1].innerText");
    //     let task_link2 = await driver.executeScript("return document.getElementsByClassName('task-link')[1].href");
    //     let total_time2 = await driver.executeScript("return document.getElementsByClassName('time-use-data-time-in-seconds')[1].innerText");

    //     await googleSheets.spreadsheets.values.append({
    //         auth,
    //         spreadsheetId,
    //         range: "Belle!C3:E3",
    //         valueInputOption: "USER_ENTERED",
    //         resource: {
    //             values: [
    //                 [ 
    //                     task_name,
    //                     task_link,
    //                     total_time
    //                 ]
    //             ]
    //         }
    //     });    
        
    //     console.log(ranges);
    // }
    


    // for (let i = 3; i <= 14; i++) {
    //     let range = "Belle!C"+i+":E"+i;
    //     console.log(range);
    // }


    let ranges = [
        "Belle!C3",
        "Belle!C4",
        "Belle!C5",
        "Belle!C6",
        "Belle!C7",
        "Belle!C8",
        "Belle!C9",
        "Belle!C10",
        "Belle!C11",
    ]

    let task_link_count = await driver.executeScript("return document.getElementsByClassName('task-link').length");
    // let task_name;
    for (let j = 0; j < task_link_count; j++) {
        let task_name = await driver.executeScript("return document.getElementsByClassName('task-link')[" + j + "].innerText");
        let task_link = await driver.executeScript("return document.getElementsByClassName('task-link')[" + j + "].href");
        let total_time = await driver.executeScript("return document.getElementsByClassName('time-use-data-time-in-seconds')[" + j + "].innerText");

        console.log(task_name);
        // console.log(task_link);
        // console.log(total_time);

        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            // range: "Belle!C3",
            range: ranges,
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [ 
                        task_name,
                    ]
                ]
            }
        });

        // for (let i = 3; i < 14; i++) {
        //     await googleSheets.spreadsheets.values.append({
        //         auth,
        //         spreadsheetId,
        //         // range: "Belle!C3:E3",
        //         range: "Belle!C"+i+":E"+i,
        //         valueInputOption: "USER_ENTERED",
        //         resource: {
        //             values: [
        //                 [ 
        //                     task_name,
        //                 ]
        //             ]
        //         }
        //     });
        // }

        // await googleSheets.spreadsheets.values.append({
        //     auth,
        //     spreadsheetId,
        //     range: "Belle!C3:C14",
        //     valueInputOption: "USER_ENTERED",
        //     resource: {
        //         values: [
        //             [ 
        //                 task_name
        //             ]
        //         ]
        //     }
        // });

        // await googleSheets.spreadsheets.values.append({
        //     auth,
        //     spreadsheetId,
        //     range: "Belle!D3:D14",
        //     valueInputOption: "USER_ENTERED",
        //     resource: {
        //         values: [
        //             [ 
        //                 task_link
        //             ]
        //         ]
        //     }
        // });

        // await googleSheets.spreadsheets.values.append({
        //     auth,
        //     spreadsheetId,
        //     range: "Belle!E3:E14",
        //     valueInputOption: "USER_ENTERED",
        //     resource: {
        //         values: [
        //             [ 
        //                 total_time
        //             ]
        //         ]
        //     }
        // });
    }

    // for (let i = 3; i <= 14; i++) {
    //     await googleSheets.spreadsheets.values.append({
    //         auth,
    //         spreadsheetId,
    //         // range: "Belle!C"+i+":E"+i,
    //         range: "Belle!C"+i+":E"+i,
    //         valueInputOption: "USER_ENTERED",
    //         resource: {
    //             values: [
    //                 [ 
    //                     task_name,
    //                 ]
    //             ]
    //         }
    //     });
    // }




    // let task_link_count = await driver.executeScript("return document.getElementsByClassName('task-link').length");
    // for (let index = 0; index < task_link_count; index++) {
    //     // let task_name = await driver.executeScript("return document.getElementsByClassName('task-link')[" + index + "].innerText");
    //     // let task_link = await driver.executeScript("return document.getElementsByClassName('task-link')[" + index + "].href");
    //     // let total_time = await driver.executeScript("return document.getElementsByClassName('time-use-data-time-in-seconds')[" + index + "].innerText");

     
    //     // console.log(task_name);
    //     // console.log(task_link);
    //     // console.log(total_time);

    //     // const task_column = [[task_name, task_link, total_time]];
    //     // // task_name_array.push(task_name);
    //     // console.log(task_column[0]);


    //     // let task_name = JSON.stringify(await driver.executeScript("return document.getElementsByClassName('task-link')[" + index + "].innerText"));

    //     // if (dev === "dev4") {
    //         // let values = [
    //         //     [
    //         //         task_name
    //         //     ],
    //         // ];

    //         let values = [
    //             [
    //                 'Internal: QA App Maintenance',
    //                 'https://primeview.teamwork.com/#/tasks/27226252',
    //                 '2:17:17'
    //             ],
    //             [
    //                 'New Phone Number | mitoredlight.com',
    //                 'https://primeview.teamwork.com/#/tasks/27305102',
    //                 '1:14:27'
    //             ],
    //             [
    //                 'Daily Monitoring: NitroPack Scores',
    //                 'https://primeview.teamwork.com/#/tasks/21596731',
    //                 '0:38:43'
    //             ],
    //             [
    //                 'Phone number change | https://jewelryoutletinc.com/',
    //                 'https://primeview.teamwork.com/#/tasks/27311298',
    //                 '0:34:55'
    //             ],
    //             [
    //                 'Daily Task Preparations',
    //                 'https://primeview.teamwork.com/#/tasks/23900042',
    //                 '0:20:10'
    //             ],
    //             [
    //                 'Internal Task: Checking Emails',
    //                 'https://primeview.teamwork.com/#/tasks/20968472',
    //                 '0:08:39'
    //             ],
    //             [
    //                 'RECURRING: Website Performance Monitoring',
    //                 'https://primeview.teamwork.com/#/tasks/19787827',
    //                 '0:08:33'
    //             ],
    //         ];
        
    //         const resource = {
    //             values,
    //         };
        
    //         console.log(resource);
        
    //         await googleSheets.spreadsheets.values.append({
    //             auth,
    //             spreadsheetId,
    //             range: "Belle!C3:E3",
    //             valueInputOption: "USER_ENTERED",
    //             resource: resource
    //             // resource: {
    //             //     values: [
    //             //         [ 
    //             //             task_column[0]
    //             //         ]
    //             //     ]
    //             // }
    //         });
        
    //         // console.log(spreadsheetId);
    //         // console.log(dev);
    //     // }
    // }






}



module.exports = { calendar };
