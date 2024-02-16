const {Builder, By} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../../config");

const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
});

const spreadsheetId = config.spreadsheetId_broken_links;



async function broken_links(timestamp, link, username, password) {
    const client = await auth.getClient();
    var googleSheets = google.sheets({ version: "v4", auth: client });
    var driver = await new Builder().forBrowser("chrome").build();
    // let driver = await new Builder().forBrowser('MicrosoftEdge').build();

    await driver.get(link + "pvlogin");
    await driver.sleep(3000);

    //wp login
    try {
        await driver.findElement(By.id("user_login")).sendKeys(username);
        await driver.findElement(By.id("user_pass")).sendKeys(password);
        await driver.findElement(By.id("wp-submit")).click();
        await driver.sleep(3000);
    
        var admin_email_verification = await driver.executeScript("return document.querySelector('form').classList.contains('admin-email-confirm-form')");  
        if (admin_email_verification === true) {
            await driver.executeScript("return document.getElementsByTagName('a')[3].click()");
        } else {
            console.log("BLC - wordpress login success.");
        }
    } catch (error) {
        console.log(error);
    }

    let ranges_i = [
        "Sheet!A2:B2",
        "Sheet!A3:B3",
        "Sheet!A4:B4",
        "Sheet!A5:B5",
        "Sheet!A6:B6",
        "Sheet!A7:B7",
        "Sheet!A8:B8",
        "Sheet!A9:B9",
        "Sheet!A10:B10",
        "Sheet!A11:B11",
        "Sheet!A12:B12",
        "Sheet!A13:B13",
        "Sheet!A14:B14",
        "Sheet!A15:B15",
        "Sheet!A16:B16",
        "Sheet!A17:B17",
        "Sheet!A18:B18",
        "Sheet!A19:B19",
        "Sheet!A20:B20",
        "Sheet!A21:B21",
        "Sheet!A22:B22",
        "Sheet!A23:B23",
        "Sheet!A24:B24",
        "Sheet!A25:B25",
        "Sheet!A26:B26",
        "Sheet!A27:B27",
        "Sheet!A28:B28",
        "Sheet!A29:B29",
        "Sheet!A30:B30",
        "Sheet!A31:B31",
        "Sheet!A31:B32",
        "Sheet!A31:B33",
        "Sheet!A31:B34",
        "Sheet!A31:B35",
        "Sheet!A31:B36",
        "Sheet!A31:B37",
        "Sheet!A31:B38",
        "Sheet!A31:B39",
        "Sheet!A31:B40",
        "Sheet!A31:B41",
        "Sheet!A31:B42",
        "Sheet!A31:B43",
        "Sheet!A31:B44",
        "Sheet!A31:B45",
        "Sheet!A31:B46",
        "Sheet!A31:B47",
        "Sheet!A31:B48",
        "Sheet!A31:B49",
        "Sheet!A31:B50",
        "Sheet!A31:B51",
    ]

    let ranges_j = [
        "Sheet!C2",
        "Sheet!C3",
        "Sheet!C4",
        "Sheet!C5",
        "Sheet!C6",
        "Sheet!C7",
        "Sheet!C8",
        "Sheet!C9",
        "Sheet!C10",
        "Sheet!C11",
        "Sheet!C12",
        "Sheet!C13",
        "Sheet!C14",
        "Sheet!C15",
        "Sheet!C16",
        "Sheet!C17",
        "Sheet!C18",
        "Sheet!C19",
        "Sheet!C20",
        "Sheet!C21",
        "Sheet!C22",
        "Sheet!C23",
        "Sheet!C24",
        "Sheet!C25",
        "Sheet!C26",
        "Sheet!C27",
        "Sheet!C28",
        "Sheet!C29",
        "Sheet!C30",
        "Sheet!C31",
        "Sheet!C32",
        "Sheet!C33",
        "Sheet!C34",
        "Sheet!C35",
        "Sheet!C36",
        "Sheet!C37",
        "Sheet!C38",
        "Sheet!C39",
        "Sheet!C40",
        "Sheet!C41",
        "Sheet!C42",
        "Sheet!C43",
        "Sheet!C44",
        "Sheet!C45",
        "Sheet!C46",
        "Sheet!C47",
        "Sheet!C48",
        "Sheet!C49",
        "Sheet!C50",
        "Sheet!C51",
    ]

    let ranges_k = [
        "Sheet!D2:E2",
        "Sheet!D3:E3",
        "Sheet!D4:E4",
        "Sheet!D5:E5",
        "Sheet!D6:E6",
        "Sheet!D7:E7",
        "Sheet!D8:E8",
        "Sheet!D9:E9",
        "Sheet!D10:E10",
        "Sheet!D11:E11",
        "Sheet!D12:E12",
        "Sheet!D13:E13",
        "Sheet!D14:E14",
        "Sheet!D15:E15",
        "Sheet!D16:E16",
        "Sheet!D17:E17",
        "Sheet!D18:E18",
        "Sheet!D19:E19",
        "Sheet!D20:E20",
        "Sheet!D21:E21",
        "Sheet!D22:E22",
        "Sheet!D23:E23",
        "Sheet!D24:E24",
        "Sheet!D25:E25",
        "Sheet!D26:E26",
        "Sheet!D27:E27",
        "Sheet!D28:E28",
        "Sheet!D29:E29",
        "Sheet!D30:E30",
        "Sheet!D31:E31",
        "Sheet!D32:E32",
        "Sheet!D33:E33",
        "Sheet!D34:E34",
        "Sheet!D35:E35",
        "Sheet!D36:E36",
        "Sheet!D37:E37",
        "Sheet!D38:E38",
        "Sheet!D39:E39",
        "Sheet!D40:E40",
        "Sheet!D41:E41",
        "Sheet!D42:E42",
        "Sheet!D43:E43",
        "Sheet!D44:E44",
        "Sheet!D45:E45",
        "Sheet!D46:E46",
        "Sheet!D47:E47",
        "Sheet!D48:E48",
        "Sheet!D49:E49",
        "Sheet!D50:E50",
        "Sheet!D51:E51",
    ]

    //navigate to broken link page
    try {
        await driver.get(link + "wp-admin/admin.php?page=blc_local");
        // await driver.get(link + "wp-admin/admin.php?page=blc_local&paged=15");
        await driver.sleep(3000);

        let broken_link_count = await driver.executeScript("return document.getElementsByClassName('blc-link-url').length");

        //columns URL to status
        let status;
        for (let i = 0; i < broken_link_count; i++) {
            let url = await driver.executeScript("return document.getElementsByClassName('blc-link-url')[" + i + "].innerText");
            status = await driver.executeScript("return document.getElementsByClassName('status-text')[" + i + "].innerText");

            console.log(url);
            console.log(status);

            if (status === "Not Found") {
                status = "404 Not Found";
            } else if (status === "Forbidden") {
                status = "403 Forbidden";
            } else if (status === "Internal Server Error") {
                status = "500 Internal Server Error";
            } else if (status === "Gone") {
                status = "410 Gone";
            } else if (status === "Service Unavailable") {
                status = "503 Service Unavailable";
            } else if (status === "Playlist Restricted") {
                status = "403 Playlist Restricted";
            } 

            const r_i = ranges_i[i];

            try {
                await googleSheets.spreadsheets.values.append({
                    auth,
                    spreadsheetId,
                    range: r_i,
                    valueInputOption: "USER_ENTERED",
                    resource: {
                        values: [
                            [ 
                                url,
                                status
                            ]
                        ]
                    }
                });
            } catch (error) {
                console.log(error);
            }
            await driver.sleep(1000);
        }
        
        //column link text
        for (let j = 1; j <= broken_link_count; j++) {
            let link_text = await driver.executeScript("return document.getElementsByClassName('column-new-link-text')[" + j + "].innerText");
            console.log(link_text);

            const r_j = ranges_j[j-1];

            try {
                await googleSheets.spreadsheets.values.append({
                    auth,
                    spreadsheetId,
                    range: r_j,
                    valueInputOption: "USER_ENTERED",
                    resource: {
                        values: [
                            [ 
                                link_text
                            ]
                        ]
                    }
                });
            } catch (error) {
                console.log(error);
            }
            await driver.sleep(1000);
        }

        //columns source to source link
        for (let k = 0; k < broken_link_count; k++) {
            let source = await driver.executeScript("return document.getElementsByClassName('row-title')[" + k + "].innerText");
            let source_link = await driver.executeScript("return document.getElementsByClassName('view')[" + k + "].children[0].getAttribute('href')");
            
            console.log(source);
            console.log(source_link);

            const r_k = ranges_k[k];

            try {
                await googleSheets.spreadsheets.values.append({
                    auth,
                    spreadsheetId,
                    range: r_k,
                    valueInputOption: "USER_ENTERED",
                    resource: {
                        values: [
                            [ 
                                source,
                                source_link
                            ]
                        ]
                    }
                });
            } catch (error) {
                console.log(error);
            }
            await driver.sleep(1000);
        }

    } catch (error) {
        console.log(error);
    }
}



module.exports = { broken_links };
