const {Builder, By, Key} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../../../config");

const wp_username = config.credentials.indinspect.username;
const wp_password = config.credentials.indinspect.password;


async function wordpressFinish(domain, checkbox, username, password) {
    const wp_site = domain + "wp-admin";

    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get(wp_site);
    
    // wp login
    try {
        if ((username) && (password)) {
            console.log("creds was edited.");
            await driver.findElement(By.name("log")).sendKeys(username);
            await driver.findElement(By.name("pwd")).sendKeys(password);
        } else {
            console.log("creds was not edited.");
            await driver.findElement(By.name("log")).sendKeys(wp_username);
            await driver.findElement(By.name("pwd")).sendKeys(wp_password);
        }
        await driver.findElement(By.id("wp-submit")).click();
        var admin_email_verification = await driver.executeScript("return document.querySelector('form').classList.contains('admin-email-confirm-form')");  
        if (admin_email_verification === true) {
            await driver.executeScript("return document.getElementsByTagName('a')[3].click()");
            console.log("with admin email verification.");
            console.log("admin_email_verification: " + admin_email_verification);
        }
    } catch (error) {
        console.log(error);
    }

    await driver.executeScript("return document.getElementsByClassName('wp-menu-name')[6].click()");
    await driver.executeScript("return document.getElementsByTagName('a')[210].click()");

    // set admin notif to active
    let admin_notif_status = await driver.executeScript("return document.getElementsByClassName('gform-status-indicator-status')[0].innerHTML");
    console.log("admin_notif_status: " + admin_notif_status);

    try {
        if (admin_notif_status === "Inactive") {
            await driver.executeScript("return document.getElementsByClassName('gform-status-indicator-status')[0].click()");
        }
    } catch (error) {
        console.log(error);
    }

    // set qa notif to inactive
    let qa_notif_status = await driver.executeScript("return document.getElementsByClassName('gform-status-indicator-status')[1].innerHTML");
    console.log("qa_notif_status: " + qa_notif_status);

    try {
        if (qa_notif_status === "Active") {
            await driver.executeScript("return document.getElementsByClassName('gform-status-indicator-status')[1].click()");
        }
    } catch (error) {
        console.log(error);
    }

    return true;

}



module.exports = { wordpressFinish };
