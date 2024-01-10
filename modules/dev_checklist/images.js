const {Builder, By} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../config");
const { log } = require("winston");

const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
});

const spreadsheetId = config.spreadsheetId_dev_checklist_images;



async function images(timestamp, link) {
    const client = await auth.getClient();
    var googleSheets = google.sheets({ version: "v4", auth: client });
    var driver = await new Builder().forBrowser("chrome").build();

    await driver.get(link);
    await driver.sleep(3000);

    let images_count = await driver.executeScript("return document.getElementsByTagName('img').length");
    for (let index = 0; index < images_count; index++) {
        let image_source = await driver.executeScript("return document.getElementsByTagName('img')[" + index + "].src");
    
        var img_jpg = ".jpg";
        var img_png = ".png";
        var img_jpeg = ".jpeg";

        // let ranges = [
        //     "Sheet!A1:B2",
        //     "Sheet!A3:B3",
        //     "Sheet!A4:B4",
        //     "Sheet!A5:B5",
        //     "Sheet!A6:B6",
        //     "Sheet!A7:B7",
        //     "Sheet!A8:B8",
        //     "Sheet!A9:B9",
        //     "Sheet!A10:B10",
        //     "Sheet!A11:B11",
        //     "Sheet!A12:B12",
        //     "Sheet!A13:B13",
        //     "Sheet!A14:B14",
        //     "Sheet!A15:B15",
        //     "Sheet!A16:B16",
        //     "Sheet!A17:B17",
        //     "Sheet!A18:B18",
        //     "Sheet!A19:B19",
        //     "Sheet!A20:B20",
        //     "Sheet!A21:B21",
        //     "Sheet!A22:B22",
        //     "Sheet!A23:B23",
        //     "Sheet!A24:B24",
        //     "Sheet!A25:B25",
        //     "Sheet!A26:B26",
        //     "Sheet!A27:B27",
        //     "Sheet!A28:B28",
        //     "Sheet!A29:B29",
        //     "Sheet!A30:B30",
        //     "Sheet!A31:B31",
        //     "Sheet!A31:B32",
        //     "Sheet!A31:B33",
        //     "Sheet!A31:B34",
        //     "Sheet!A31:B35",
        //     "Sheet!A31:B36",
        //     "Sheet!A31:B37",
        //     "Sheet!A31:B38",
        //     "Sheet!A31:B39",
        //     "Sheet!A31:B40",
        //     "Sheet!A31:B41",
        //     "Sheet!A31:B42",
        //     "Sheet!A31:B43",
        //     "Sheet!A31:B44",
        //     "Sheet!A31:B45",
        //     "Sheet!A31:B46",
        //     "Sheet!A31:B47",
        //     "Sheet!A31:B48",
        //     "Sheet!A31:B49",
        //     "Sheet!A31:B50",
        //     "Sheet!A31:B51",
        // ]
        
        if ((image_source.includes(img_jpg) || (image_source.includes(img_png)) || (image_source.includes(img_jpeg)))) {
            // const range = ranges[index];

            // try {
            //     await googleSheets.spreadsheets.values.append({
            //         auth,
            //         spreadsheetId,
            //         range: range,
            //         valueInputOption: "USER_ENTERED",
            //         resource: {
            //             values: [
            //                 [ 
            //                     image_source
            //                 ]
            //             ]
            //         }
            //     });
            // } catch (error) {
            //     console.log(error);
            // }

            try {
                // write date to sheet
                await googleSheets.spreadsheets.values.append({
                    auth,
                    spreadsheetId,
                    range: "Images!A1",
                    valueInputOption: "USER_ENTERED",
                    resource: {
                        values: [
                            [ 
                                image_source
                            ]
                        ]
                    }
                });
            } catch (error) {
                console.log(error);
            }

          console.log(image_source);
        } 

    }
    

}



module.exports = { images };
