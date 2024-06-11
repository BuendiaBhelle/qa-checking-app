const webdriver = require("selenium-webdriver");
const key = webdriver.Key;
const By = webdriver.By;
const until = webdriver.until;
const server = require('../../server');
const sheet = require('../../middleware/gsheet');
const config = require("../../config");

var adminUrl = config.adminUrl_newsletter;
var esReportUrl = config.esReportUrl_newsletter;
var wp_creds_username = config.wp_creds.freddabranyon.username;
var wp_creds_password = config.wp_creds.freddabranyon.password;
const module_name = config.module_name_newsletter;

async function executeTest(timestamp, username, password, domain){
    let driver = await new webdriver.Builder().forBrowser("chrome").build();

    try {
        await driver.get(adminUrl);
        const originalWindow = await driver.getWindowHandle();
        console.log("WP Admin is loaded");

        // wp login
        try {
            if ((username) && (password)) {
                await driver.findElement(By.id("user_login")).sendKeys(username);
                await driver.findElement(By.id("user_pass")).sendKeys(password);
                console.log("NEWSLETTER - edit credentials success.");
                value = [ "", "", "info", "edit credentials success.", server.userId, timestamp, module_name, domain, username + "\n" + password, "", "", "", "", "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value);
            } else {
                await driver.findElement(By.id("user_login")).sendKeys(wp_creds_username);
                await driver.findElement(By.id("user_pass")).sendKeys(wp_creds_password);
                console.log("NEWSLETTER - same credentials.");
                value = [ "", "", "info", "same credentials.", server.userId, timestamp, module_name, domain, wp_creds_username + "\n" + wp_creds_password, "", "", "", "", "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value);
            }

            await driver.findElement(By.id('wp-submit')).click();
            console.log("Logged in to WP Admin");

            let login_error = await driver.executeScript("return document.getElementById('login_error')");
            if (login_error) {
                console.log("NEWSLETTER - wordpress login failed.");
                value = [ "", "", "error", "wordpress login failed.", server.userId, timestamp, module_name, domain, "", "", "", "", "", "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value);
            } else {
                console.log("NEWSLETTER - wordpress login success.");
                value = [ "", "", "info", "wordpress login success.", server.userId, timestamp, module_name, domain, "", "", "", "", "", "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value);
            }

            var admin_email_verification = await driver.executeScript("return document.querySelector('form').classList.contains('admin-email-confirm-form')");  
            if (admin_email_verification === true) {
                await driver.executeScript("return document.getElementsByTagName('a')[3].click()");
                console.log("NEWSLETTER - admin email verification.");
                value = [ "", "", "info", "admin email verification.", server.userId, timestamp, module_name, domain, "", "", "", "", "", "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value);
            } else {
                console.log("NEWSLETTER - no admin email verification.");
                value = [ "", "", "info", "no admin email verification.", server.userId, timestamp, module_name, domain, "", "", "", "", "", "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value);
            }
        } catch (error) {
            console.log(error);
            value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", "", "", "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }

        // send now
        try {
            await driver.executeScript("window.location = \'"+esReportUrl+"\'");
            console.log("ES Report");
            await driver.wait(until.elementLocated(By.className('send_now')), 50000);
            console.log("Send Now Is loaded");
            var done = false;
            while(!done) {
                if (driver.findElement(By.css("span.send_now a")).isDisplayed()) {
                    var url = await driver.findElement(By.css("span.send_now a")).getAttribute('href');
                    await driver.switchTo().newWindow('tab');
                    await driver.get(url);
                    console.log(url);
                    await driver.close();
                    await driver.switchTo().window(originalWindow);
                }
                else {
                    done = true;
                }
            }
            console.log("NEWSLETTER - click send now success.");
            value = [ "", "", "info", "click send now success.", server.userId, timestamp, module_name, domain, "", "", "", "", "", "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        } catch (error) {
            console.log(error);
            value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", "", "", "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }
    }
    catch(error) {  
        console.log(error);
        value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", "", "", "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    await driver.quit();
    // end test
    console.log("test ends.");
    value = [ "", "", "info", "test ends.", server.userId, timestamp, module_name, domain, "", "", "", "", "", "", "", "" ];
    await sheet.addRow();
    await sheet.appendValues(value);

}   


module.exports = { executeTest };