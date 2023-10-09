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
        "Sheet!A15:B15"
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
        "Sheet!C15"
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
        "Sheet!D15:E15"
    ]

    //navigate to broken link page
    try {
        await driver.get(link + "wp-admin/admin.php?page=blc_local");

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
        }

    } catch (error) {
        console.log(error);
    }
}



module.exports = { broken_links };
