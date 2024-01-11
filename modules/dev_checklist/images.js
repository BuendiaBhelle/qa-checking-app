const {Builder, By} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../config");
const { log } = require("winston");

const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
});

const spreadsheetId = config.spreadsheetId_dev_checklist;



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
        
        if ((image_source.includes(img_jpg) || (image_source.includes(img_png)) || (image_source.includes(img_jpeg)))) {

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
