const {Builder, By} = require("selenium-webdriver");
const logger = require('../../../middleware/logger.js');
const server = require('../../../server.js');
const sheet = require('../../../middleware/gsheet.js');
const config = require("../config");

const nitropack_url = config.nitropack_url;
const np_email = config.np_email;
const np_password = config.np_password;
const module_name = "NITROPACK SETTINGS";


async function displayNitropackSettings(site, email, password, timestamp) {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get(nitropack_url);

    await driver.executeScript("return document.getElementsByClassName('btn nav-link-btn px-xl-2 py-xl-3 sign-in-dashboard text-dark')[0].click()");
    
    try {
        // nitropack login
        try {
            if ((email) && (password)) {
                await driver.findElement(By.id("login-email")).sendKeys(email);
                await driver.findElement(By.id("login-password")).sendKeys(password);
                logger.logger.log({ level: 'info', message: 'NITROPACK SETTINGS - edit credentials success.', tester: server.userId });
                console.log("NITROPACK SETTINGS - edit credentials success.");
                value = [ "", "", "info", "edit credentials success.", server.userId, timestamp, module_name, site, email + "\n" + password, "", "", "", "", "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value);
            } else {
                await driver.findElement(By.id("login-email")).sendKeys(np_email);
                await driver.findElement(By.id("login-password")).sendKeys(np_password);
            }
            await driver.executeScript("return document.getElementsByClassName('mb-3 mt-5 btn btn-lg btn-primary btn-block')[0].click()");

            await driver.sleep(5000);

            // login error
            let login_error = await driver.executeScript("return document.getElementsByClassName('alert-danger')[0]");
            if (login_error) {
                logger.logger.log({ level: 'error', message: 'NITROPACK SETTINGS - nitropack login failed.', tester: server.userId });
                console.log("NITROPACK SETTINGS - nitropack login failed.");
                value = [ "", "", "error", "nitropack login failed.", server.userId, timestamp, module_name, site, email + "\n" + password, "", "", "", "", "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value);
            } else {
                if ((email) && (password)) {
                    logger.logger.log({ level: 'info', message: 'NITROPACK SETTINGS - nitropack login success.', tester: server.userId });
                    console.log("NITROPACK SETTINGS - nitropack login success.");
                    value = [ "", "", "info", "nitropack login success.", server.userId, timestamp, module_name, site, email + "\n" + password, "", "", "", "", "", "", "" ];
                    await sheet.addRow();
                    await sheet.appendValues(value);
                } else {
                    logger.logger.log({ level: 'info', message: 'NITROPACK SETTINGS - nitropack login success.', tester: server.userId });
                    console.log("NITROPACK SETTINGS - nitropack login success.");
                    value = [ "", "", "info", "nitropack login success.", server.userId, timestamp, module_name, site, np_email + "\n" + np_password, "", "", "", "", "", "", "" ];
                    await sheet.addRow();
                    await sheet.appendValues(value);
                }
            }
        } catch (error) {
            logger.logger.log({ level: 'error', message: 'NITROPACK SETTINGS - login unsuccessful.', tester: server.userId });
            console.log("NITROPACK SETTINGS - login unsuccessful.");
            value = [ "", "", "error", "login unsuccessful.", server.userId, timestamp, module_name, site, email + "\n" + password, "", "", "", "", "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }

        await driver.sleep(2000);

        // switch website
        try {
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
            logger.logger.log({ level: 'info', message: 'NITROPACK SETTINGS - switch website success.', tester: server.userId });
            console.log("NITROPACK SETTINGS - switch website success.");
            value = [ "", "", "info", "switch website success.", server.userId, timestamp, module_name, site, email + "\n" + password, "", "", "", "", "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        } catch (error) {
            logger.logger.log({ level: 'error', message: 'NITROPACK SETTINGS - switch website failed.', tester: server.userId });
            console.log("NITROPACK SETTINGS - switch website failed.");
            value = [ "", "", "error", "switch website failed.", server.userId, timestamp, module_name, site, email + "\n" + password, "", "", "", "", "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, site, email + "\n" + password, "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }
    // end test
    logger.logger.log({ level: 'info', message: 'test ends.', tester: server.userId });
    console.log("test ends.");
    value = [ "", "", "info", "test ends.", server.userId, timestamp, module_name, site, email + "\n" + password, "", "", "", "", "", "", "" ];
    await sheet.addRow();
    await sheet.appendValues(value);
}



module.exports = { displayNitropackSettings };
