const {Builder, By, Key} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../../config");
const logger = require('../../../../../../middleware/logger.js');
const server = require('../../../../../../server.js');

const wp_username = config.creds_sunrisejewelryusa.username;
const wp_password = config.creds_sunrisejewelryusa.password;
const auth = config.auth;
const spreadsheetId = config.spreadsheetId;


async function wordpressFinish(domain, username, password, email) {
    const wp_site = domain + "wp-admin";
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })

    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get(wp_site);

    // wp login
    try {
        if ((username) && (password)) {
            await driver.findElement(By.name("log")).sendKeys(username);
            await driver.findElement(By.name("pwd")).sendKeys(password);
            logger.logger.log({ level: 'info', message: 'CHECKOUT - edit credentials success.', tester: server.userId });
            console.log("CHECKOUT - edit credentials success.");
        } else {
            await driver.findElement(By.name("log")).sendKeys(wp_username);
            await driver.findElement(By.name("pwd")).sendKeys(wp_password);
            logger.logger.log({ level: 'info', message: 'CHECKOUT - same credentials.', tester: server.userId });
            console.log("CHECKOUT - same credentials.");
        }

        await driver.findElement(By.id("wp-submit")).click();

        let login_error = await driver.executeScript("return document.getElementById('login_error')");
        if (login_error) {
            logger.logger.log({ level: 'error', message: 'CHECKOUT - wordpress login failed.', tester: server.userId });
            console.log("CHECKOUT - wordpress login failed.");
        } else {
            logger.logger.log({ level: 'info', message: 'CHECKOUT - wordpress login success.', tester: server.userId });
            console.log("CHECKOUT - wordpress login success.");
        }

        var admin_email_verification = await driver.executeScript("return document.querySelector('form').classList.contains('admin-email-confirm-form')");  
        if (admin_email_verification === true) {
            await driver.executeScript("return document.getElementsByTagName('a')[3].click()");
            logger.logger.log({ level: 'info', message: 'CHECKOUT - admin email verification.', tester: server.userId });
            console.log("CHECKOUT - admin email verification.");
        } else {
            logger.logger.log({ level: 'info', message: 'CHECKOUT - no admin email verification.', tester: server.userId });
            console.log("CHECKOUT - no admin email verification.");
        }
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);    
    }
    
    await driver.executeScript("return document.getElementsByTagName('a')[50].click()");
    
    // edit emails tab
    await driver.executeScript("return document.getElementsByClassName('nav-tab')[6].click()");
    
    // new order    
    try {
        await driver.executeScript("return document.getElementsByClassName('button alignright')[0].click()");

        // get new order recipients
        try {
            let new_order_recipients = await googleSheets.spreadsheets.values.get({
                auth,
                spreadsheetId,
                range: "Sunrise Jewelry USA!F2",
            });
            let no_recipients = new_order_recipients.data.values[0][0];
            console.log("no_recipients: " + no_recipients);

            // put new order recipients
            await driver.findElement(By.id("woocommerce_new_order_recipient")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
            await driver.findElement(By.id("woocommerce_new_order_recipient")).sendKeys(no_recipients);
            await driver.findElement(By.name("save")).click();

            logger.logger.log({ level: 'info', message: 'CHECKOUT - get new order recipient success.', tester: server.userId });
            console.log("CHECKOUT - get new order recipient success.");
        } catch (error) {
            logger.logger.log({ level: 'error', message: error, tester: server.userId });
            console.log(error);
        }
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);    
    }
    

    // cancelled order
    try {
        let cancelled_order_url = await driver.getCurrentUrl();
        console.log("cancelled_order_url: " + cancelled_order_url);
        
        await driver.switchTo().newWindow('tab');
        await driver.get(cancelled_order_url);

        await driver.executeScript("return document.getElementsByClassName('nav-tab')[6].click()");
        await driver.executeScript("return document.getElementsByClassName('button alignright')[1].click()");

        // get cancelled order recipients
        try {
            let cancelled_order_recipients = await googleSheets.spreadsheets.values.get({
                auth,
                spreadsheetId,
                range: "Sunrise Jewelry USA!G2",
            });
            let co_recipients = cancelled_order_recipients.data.values[0][0];
            console.log("co_recipients: " + co_recipients);
            
            // put cancelled order recipients
            await driver.findElement(By.id("woocommerce_cancelled_order_recipient")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
            await driver.findElement(By.id("woocommerce_cancelled_order_recipient")).sendKeys(co_recipients);
            await driver.findElement(By.name("save")).click();

            logger.logger.log({ level: 'info', message: 'CHECKOUT - get cancelled order recipient success.', tester: server.userId });
            console.log("CHECKOUT - get cancelled order recipient success.");
        } catch (error) {
            logger.logger.log({ level: 'error', message: error, tester: server.userId });
            console.log(error);
        }
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);    
    }
    
    
    // failed order
    try {
        let failed_order_url = await driver.getCurrentUrl();
        console.log("failed_order_url: " + failed_order_url);

        await driver.switchTo().newWindow('tab');
        
        await driver.get(failed_order_url);

        await driver.executeScript("return document.getElementsByClassName('nav-tab')[6].click()"); 
        await driver.executeScript("return document.getElementsByClassName('button alignright')[2].click()");
        
        // get failed order recipients
        try {
            let failed_order_recipients = await googleSheets.spreadsheets.values.get({
                auth,
                spreadsheetId,
                range: "Sunrise Jewelry USA!H2",
            });
            let fo_recipients = failed_order_recipients.data.values[0][0];
            console.log("fo_recipients: " + fo_recipients);
            
            // put failed order recipients
            await driver.findElement(By.id("woocommerce_failed_order_recipient")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
            await driver.findElement(By.id("woocommerce_failed_order_recipient")).sendKeys(fo_recipients);
            await driver.findElement(By.name("save")).click(); 

            logger.logger.log({ level: 'info', message: 'CHECKOUT - get failed order recipient success.', tester: server.userId });
            console.log("CHECKOUT - get failed order recipient success.");
        } catch (error) {
            logger.logger.log({ level: 'error', message: error, tester: server.userId });
            console.log(error);
        } 
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);    
    }

    return true;
    
}


module.exports = { wordpressFinish };