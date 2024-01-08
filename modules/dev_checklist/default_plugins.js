const {Builder, By} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../config.js");
const server = require('../../server.js');
const sheet = require('../../middleware/gsheet.js');
const { drive } = require("googleapis/build/src/apis/drive");
require('chromedriver');

const auth = config.auth;
const spreadsheetId = config.spreadsheetId_waum;
let output = config.date;
const module_name = "DEV CHECKLIST - DEFAULT PLUGINS";


async function default_plugins(timestamp, link, username, password) {
    const client = await auth.getClient();
    var googleSheets = google.sheets({ version: "v4", auth: client });
    var driver = await new Builder().forBrowser("chrome").build();
    
    if (link === "https://www.hospiceofyuma.com") {
        await driver.get(link + "hoylogin");
    } else if (link === "https://www.phoenixritecare.org") {
        await driver.get(link + "members-login/");
    } else if ((link === "https://www.thehairextensioncompany.com") || (link === "https://www.inspirednetworks.com")) {
        await driver.get(link + "wp-admin");
    } else {
        await driver.get(link + "pvlogin");
    }

    // wp login
    try {
        if (link === "https://www.phoenixritecare.org") {
            await driver.findElement(By.id("user_login")).sendKeys(username);
            await driver.findElement(By.id("user_pass")).sendKeys(password);
            await driver.executeScript("return document.getElementsByClassName('tml-button')[0].click()");
    
            let button_length = await driver.executeScript("return document.getElementsByClassName('btn').length");
            for (let index = 0; index < button_length; index++) {
                let button_innertext = await driver.executeScript("return document.getElementsByClassName('btn')[" + index + "].innerText");
                if (button_innertext === "Website") {
                    await driver.executeScript("return document.getElementsByClassName('btn')[" + index + "].click()");
                    console.log("WEBSITE");
                    break;
                }
            }
    
            await driver.executeScript("return document.getElementsByClassName('wp-menu-image dashicons-before dashicons-admin-plugins')[0].click()");
            await driver.sleep(1000);
            await driver.get(link + "wp-admin/plugins.php");
        } if (link === "https://www.maintenancebest.com") {
            await driver.findElement(By.id("1helauaoii80")).sendKeys(username);
            await driver.findElement(By.id("6afbbvfn0560")).sendKeys(password);
            await driver.executeScript("return document.getElementsByClassName('pp-submit-form ppform-submit-button')[0].click()");
            await driver.sleep(1000);
            await driver.get(link + "wp-admin/plugins.php");
        } 
        else {
            await driver.findElement(By.name("log")).sendKeys(username);
            await driver.findElement(By.name("pwd")).sendKeys(password);
            await driver.findElement(By.id("wp-submit")).click();
            await driver.sleep(1000);
            await driver.get(link + "wp-admin/plugins.php");
        }

        let login_error = await driver.executeScript("return document.getElementById('login_error')");
        var admin_email_verification = await driver.executeScript("return document.querySelector('form').classList.contains('admin-email-confirm-form')");  
        if (login_error) {
            console.log("DEFAULT PLUGINS - wordpress login failed.");
        } else if (admin_email_verification === true) {
                await driver.executeScript("return document.getElementsByTagName('a')[3].click()");
                await driver.sleep(1000);
                await driver.get(link + "wp-admin/plugins.php");
                console.log("DEFAULT PLUGINS - admin email verification.");
            } else {
                console.log("DEFAULT PLUGINS - wordpress login success.");
            }    
    } catch (error) {
        console.log(error);
    }

    // check for default plugins
    try {            
        let plugin_active_is_uninstallable_length = await driver.executeScript("return document.getElementsByClassName('active is-uninstallable').length");
        var plugins_count = plugin_active_is_uninstallable_length-1;
        for (let i = 0; i <= plugins_count; i++) {
            let plugin_active_is_uninstallable = await driver.executeScript("return document.getElementsByClassName('active is-uninstallable')[" + i + "].getAttribute('data-slug')");

            // check for Broken Link Checker plugin 
            if (plugin_active_is_uninstallable === "broken-link-checker") {
                console.log("With Broken Link Checker.");   
            }
            // check for Yoast SEO plugin 
            if (plugin_active_is_uninstallable === "wordpress-seo") {
                console.log("With Yoast SEO.");   
            }
        }
        console.log("DEFAULT PLUGINS - check for plugin success.");
        await driver.sleep(1000);
    } catch (error) {
        console.log(error);
        await driver.sleep(1000);
    }

    // end test
    console.log("test ends.");
    
}



module.exports = { default_plugins };
