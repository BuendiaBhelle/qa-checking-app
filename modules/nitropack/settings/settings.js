const {Builder, By, Key} = require("selenium-webdriver");
const {google} = require("googleapis");
// const config_webforms = require("../config");
// const logger = require('../../../middleware/logger.js');
// const server = require('../../../server.js');
// const sheet = require('../../../middleware/gsheet.js');
const config = require("../config");

// const auth = config_webforms.auth;
// const spreadsheetId = config_webforms.spreadsheetId;

const nitropack_url = config.nitropack_url;

const email = config.email;

const password = config.password;



async function displayNitropackSettings(site) {
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get(nitropack_url);

    
    await driver.executeScript("return document.getElementsByClassName('btn nav-link-btn px-xl-2 py-xl-3 sign-in-dashboard text-dark')[0].click()");

    // nitropack login
    try {
        await driver.findElement(By.id("login-email")).sendKeys(email);
        await driver.findElement(By.id("login-password")).sendKeys(password);
        await driver.executeScript("return document.getElementsByClassName('mb-3 mt-5 btn btn-lg btn-primary btn-block')[0].click()");

        await driver.sleep(2000);

        await driver.executeScript("return document.getElementsByClassName('chevron-down-solid')[0].click()");

        // search for the site
        try {
            let see_all_connected_sites_length = await driver.executeScript("return document.getElementsByClassName('text-strong-success title').length");
            console.log("see_all_connected_sites_length: " + see_all_connected_sites_length);
            for (let index = 0; index < see_all_connected_sites_length; index++) {
                let see_all_connected_sites_innertext = await driver.executeScript("return document.getElementsByClassName('text-strong-success title')[" + index + "].innerText");
                console.log(see_all_connected_sites_innertext);
                if (see_all_connected_sites_innertext === "See all connected sites") {
                    console.log("HERE");
                    await driver.executeScript("return document.getElementsByClassName('text-strong-success title')[" + index + "].click()");
                    break;
                }
            }
            await driver.sleep(1000);
            await driver.findElement(By.id("findWebsiteBy")).sendKeys(site);
            await driver.executeScript("return document.getElementsByClassName('btn btn-primary btn-sm')[0].click()");
            await driver.executeScript("return document.getElementsByClassName('settings-1-icon')[1].click()");
            await driver.sleep(3000);
            // let configuration = await driver.executeScript("return document.getElementById('range').getAttribute('class')");
            // console.log("configuration: " + configuration);

            // let configuration = await driver.executeScript("return document.getElementById('range-container').children[1].children[1].getAttribute('class')");
            // console.log("configuration: " + configuration);
        } catch (error) {
            console.log(error);
        }


        // console.log("SITE: " + site);



        // if ((username) && (password)) {
        //     await driver.findElement(By.id("user_login")).sendKeys(username);
        //     await driver.findElement(By.id("user_pass")).sendKeys(password);
        //     logger.logger.log({ level: 'info', message: 'WEBFORMS - edit credentials success.', tester: server.userId });
        //     console.log("WEBFORMS - edit credentials success.");
        //     value = [ "", "", "info", "edit credentials success.", server.userId, timestamp, module_name, domain, username + "\n" + password, "", "", launch, "", webforms, "", "" ];
        //     await sheet.addRow();
        //     await sheet.appendValues(value);
        // } else {
        //     await driver.findElement(By.id("user_login")).sendKeys(wp_creds_username);
        //     await driver.findElement(By.id("user_pass")).sendKeys(wp_creds_password);
        // }
        // await driver.executeScript("return document.getElementsByClassName('tml-button')[0].click()");


        // let login_error = await driver.executeScript("return document.getElementById('login_error')");
        // if (login_error) {
        //     logger.logger.log({ level: 'error', message: 'WEBFORMS - wordpress login failed.', tester: server.userId });
        //     console.log("WEBFORMS - wordpress login failed.");
        //     value = [ "", "", "error", "wordpress login failed.", server.userId, timestamp, module_name, domain, "", "", "", launch, "", webforms, "", "" ];
        //     await sheet.addRow();
        //     await sheet.appendValues(value);
        // } else {
        //     if ((username) && (password)) {
        //         logger.logger.log({ level: 'info', message: 'WEBFORMS - wordpress login success.', tester: server.userId });
        //         console.log("WEBFORMS - wordpress login success.");
        //         value = [ "", "", "info", "wordpress login success.", server.userId, timestamp, module_name, domain, username + "\n" + password, "", "", launch, "", webforms, "", "" ];
        //         await sheet.addRow();
        //         await sheet.appendValues(value);
        //     } else {
        //         logger.logger.log({ level: 'info', message: 'WEBFORMS - wordpress login success.', tester: server.userId });
        //         console.log("WEBFORMS - wordpress login success.");
        //         value = [ "", "", "info", "wordpress login success.", server.userId, timestamp, module_name, domain, wp_creds_username + "\n" + wp_creds_password, "", "", launch, "", webforms, "", "" ];
        //         await sheet.addRow();
        //         await sheet.appendValues(value);
        //     }
        // }


    } catch (error) {
        // logger.logger.log({ level: 'error', message: error, tester: server.userId });
        // console.log(error);
        // value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, "", webforms, "", "" ];
        // await sheet.addRow();
        // await sheet.appendValues(value);
    }

    
}

// displayNitropackSettings();



module.exports = { displayNitropackSettings };
