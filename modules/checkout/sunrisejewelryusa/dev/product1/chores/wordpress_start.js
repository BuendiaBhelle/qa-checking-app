const {Builder, By, Key} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../../config");
const logger = require('../../../../../../middleware/logger.js');
const server = require('../../../../../../server.js');
const sheet = require('../../../../../../middleware/gsheet.js');

const wp_username = config.creds_sunrisejewelryusa.username;
const wp_password = config.creds_sunrisejewelryusa.password;
const qa_email = config.qa_email;
const auth = config.auth;
const spreadsheetId = config.spreadsheetId;
const date = config.date;
const module_name = config.module_name;
const launch = config.launch.dev;
const product = config.product.site.site1.product1;


async function wordpressStart(domain, username, password, email, timestamp) {
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
            value = [ "", "info", "edit credentials success.", server.userId, timestamp, module_name, domain, username + "\n" + password, "", "", launch, product, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        } else {
            await driver.findElement(By.name("log")).sendKeys(wp_username);
            await driver.findElement(By.name("pwd")).sendKeys(wp_password);
            logger.logger.log({ level: 'info', message: 'CHECKOUT - same credentials.', tester: server.userId });
            console.log("CHECKOUT - same credentials.");
            value = [ "", "info", "same credentials.", server.userId, timestamp, module_name, domain, wp_username + "\n" + wp_password, "", "", launch, product, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }

        await driver.findElement(By.id("wp-submit")).click();

        let login_error = await driver.executeScript("return document.getElementById('login_error')");
        if (login_error) {
            logger.logger.log({ level: 'error', message: 'CHECKOUT - wordpress login failed.', tester: server.userId });
            console.log("CHECKOUT - wordpress login failed.");
            value = [ "", "error", "wordpress login failed.", server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        } else {
            logger.logger.log({ level: 'info', message: 'CHECKOUT - wordpress login success.', tester: server.userId });
            console.log("CHECKOUT - wordpress login success.");
            value = [ "", "info", "wordpress login success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }

        var admin_email_verification = await driver.executeScript("return document.querySelector('form').classList.contains('admin-email-confirm-form')");  
        if (admin_email_verification === true) {
            await driver.executeScript("return document.getElementsByTagName('a')[3].click()");
            logger.logger.log({ level: 'info', message: 'CHECKOUT - admin email verification.', tester: server.userId });
            console.log("CHECKOUT - admin email verification.");
            value = [ "", "info", "admin email verification.", server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        } else {
            logger.logger.log({ level: 'info', message: 'CHECKOUT - no admin email verification.', tester: server.userId });
            console.log("CHECKOUT - no admin email verification.");
            value = [ "", "info", "no admin email verification.", server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }
    
    await driver.executeScript("return document.getElementsByTagName('a')[50].click()");

    await driver.executeScript("return document.getElementsByClassName('nav-tab')[2].click()");

    // check tax tab
    let prices_entered_with_tax = await driver.executeScript("return document.getElementsByName('woocommerce_prices_include_tax')[1].checked");
    console.log("prices_entered_with_tax: " + prices_entered_with_tax); 

    let display_prices_in_the_shop = await driver.executeScript("return document.getElementById('select2-woocommerce_tax_display_shop-container').title");
    console.log("display_prices_in_the_shop: " + display_prices_in_the_shop);

    let display_prices_during_cart_and_checkout = await driver.executeScript("return document.getElementById('select2-woocommerce_tax_display_cart-container').title");
    console.log("display_prices_during_cart_and_checkout: " + display_prices_during_cart_and_checkout);

    try {
        if ((prices_entered_with_tax === true) && (display_prices_in_the_shop === "Excluding tax") && (display_prices_during_cart_and_checkout === "Excluding tax")) {
            logger.logger.log({ level: 'info', message: 'CHECKOUT - tax tab checked.', tester: server.userId });
            console.log("CHECKOUT - tax tab checked.");
            value = [ "", "info", "tax tab checked.", server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
            let tax_page = await driver.getCurrentUrl();
            console.log("tax_page: " + tax_page);
            await driver.switchTo().newWindow('tab');
            await driver.get(tax_page);
    
            await driver.executeScript("return document.getElementsByClassName('nav-tab')[4].click()");
            await driver.executeScript("return document.getElementsByClassName('button alignright')[4].click()");

            // check payments tab
            let enable_or_disable = await driver.executeScript("return document.getElementsByName('woocommerce_stripe_enabled')[0].checked");
            if (enable_or_disable === true) {
                logger.logger.log({ level: 'info', message: 'CHECKOUT - payments tab checked.', tester: server.userId });
                console.log("CHECKOUT - payments tab checked.");
                value = [ "", "info", "payments tab checked.", server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value);
                let payments_page = await driver.getCurrentUrl();
                console.log("payments_page: " + payments_page);
                await driver.switchTo().newWindow('tab');
                await driver.get(payments_page);
                let requests = [{
                    insertRange: {
                        range: {
                            sheetId: 1340779865,
                            startRowIndex: 1,
                            endRowIndex: 2,
                            startColumnIndex: 0,
                        },
                        shiftDimension: "ROWS"
                    }
                }];   

                const batchUpdateRequest = {requests};
                
                // add columns
                try {
                    await googleSheets.spreadsheets.batchUpdate({
                        auth,
                        spreadsheetId,
                        resource: batchUpdateRequest,
                    });
                    logger.logger.log({ level: 'info', message: 'CHECKOUT - add columns success.', tester: server.userId });
                    console.log("CHECKOUT - add columns success.");
                    value = [ "", "info", "add columns success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
                    await sheet.addRow();
                    await sheet.appendValues(value);
                } catch (error) {
                    logger.logger.log({ level: 'error', message: error, tester: server.userId });
                    console.log(error);
                    value = [ "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
                    await sheet.addRow();
                    await sheet.appendValues(value);              
                }
                
                // edit emails tab
                await driver.executeScript("return document.getElementsByClassName('nav-tab')[6].click()");
    
                try {
                    await googleSheets.spreadsheets.values.append({
                        auth,
                        spreadsheetId,
                        range: "Sunrise Jewelry USA!A2:C2",
                        valueInputOption: "USER_ENTERED",
                        resource: {
                            values: [
                                [
                                    "Pre-launch",
                                    date, 
                                    wp_username + "\n" + wp_password]
                            ]
                        }
                    });
                    logger.logger.log({ level: 'info', message: 'CHECKOUT - list date and creds success.', tester: server.userId });
                    console.log("CHECKOUT - list date and creds success.");
                    value = [ "", "info", "list date and creds success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
                    await sheet.addRow();
                    await sheet.appendValues(value);  
                } catch (error) {
                    logger.logger.log({ level: 'error', message: error, tester: server.userId });
                    console.log(error);
                    value = [ "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
                    await sheet.addRow();
                    await sheet.appendValues(value); 
                }
        
                // new order
                try {
                    await driver.executeScript("return document.getElementsByClassName('button alignright')[0].click()");
    
                    let new_order = await driver.findElement(By.id("woocommerce_new_order_recipient")).getAttribute('value');
                    console.log("new_order: " + new_order);
        
                    try {
                        await googleSheets.spreadsheets.values.append({
                            auth,
                            spreadsheetId,
                            range: "Sunrise Jewelry USA!F2",
                            valueInputOption: "USER_ENTERED",
                            resource: {
                                values: [
                                    [new_order]
                                ]
                            }
                        });
                        logger.logger.log({ level: 'info', message: 'CHECKOUT - list new order recipient success.', tester: server.userId });
                        console.log("CHECKOUT - list new order recipient success.");
                        value = [ "", "info", "list new order recipient success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
                        await sheet.addRow();
                        await sheet.appendValues(value);                      
                    } catch (error) {
                        logger.logger.log({ level: 'error', message: error, tester: server.userId });
                        console.log(error);
                        value = [ "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
                        await sheet.addRow();
                        await sheet.appendValues(value); 
                    }
        
                    await driver.findElement(By.id("woocommerce_new_order_recipient")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
                    if (email) {
                        await driver.findElement(By.id("woocommerce_new_order_recipient")).sendKeys(email);
                        logger.logger.log({ level: 'info', message: 'CHECKOUT - change qa email success.', tester: server.userId });
                        console.log("CHECKOUT - change qa email success.");
                        value = [ "", "info", "change qa email success.", server.userId, timestamp, module_name, domain, "", "", email, launch, product, "", "", "" ];
                        await sheet.addRow();
                        await sheet.appendValues(value);   
                    } else {
                        await driver.findElement(By.id("woocommerce_new_order_recipient")).sendKeys(qa_email);
                        logger.logger.log({ level: 'info', message: 'CHECKOUT - same qa email.', tester: server.userId });
                        console.log("CHECKOUT - same qa email.");
                        value = [ "", "info", "same qa email.", server.userId, timestamp, module_name, domain, "", "", qa_email, launch, product, "", "", "" ];
                        await sheet.addRow();
                        await sheet.appendValues(value);  
                    }
                    await driver.findElement(By.name("save")).click();
                } catch (error) {
                    logger.logger.log({ level: 'error', message: error, tester: server.userId });
                    console.log(error);
                    value = [ "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
                    await sheet.addRow();
                    await sheet.appendValues(value);                
                }
                
                // cancelled order
                try {
                    let cancelled_order_url = await driver.getCurrentUrl();
                    console.log("cancelled_order_url: " + cancelled_order_url);
        
                    await driver.switchTo().newWindow('tab');
                               
                    await driver.get(cancelled_order_url);
                    
                    await driver.executeScript("return document.getElementsByClassName('nav-tab')[6].click()");
        
                    
                    await driver.executeScript("return document.getElementsByClassName('button alignright')[1].click()");
        
                    let cancelled_order = await driver.findElement(By.id("woocommerce_cancelled_order_recipient")).getAttribute('value');
                    console.log("cancelled_order: " + cancelled_order);
        
                    try {
                        await googleSheets.spreadsheets.values.append({
                            auth,
                            spreadsheetId,
                            range: "Sunrise Jewelry USA!G2",
                            valueInputOption: "USER_ENTERED",
                            resource: {
                                values: [
                                    [cancelled_order]
                                ]
                            }
                        });
                        logger.logger.log({ level: 'info', message: 'CHECKOUT - list cancelled order recipient success.', tester: server.userId });
                        console.log("CHECKOUT - list cancelled order recipient success.");
                        value = [ "", "info", "list cancelled order recipient success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
                        await sheet.addRow();
                        await sheet.appendValues(value);                        
                    } catch (error) {
                        logger.logger.log({ level: 'error', message: error, tester: server.userId });
                        console.log(error);
                        value = [ "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
                        await sheet.addRow();
                        await sheet.appendValues(value);                  
                    }
        
                    await driver.findElement(By.id("woocommerce_cancelled_order_recipient")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
                    if (email) {
                        await driver.findElement(By.id("woocommerce_cancelled_order_recipient")).sendKeys(email);
                        logger.logger.log({ level: 'info', message: 'CHECKOUT - change qa email success.', tester: server.userId });
                        console.log("CHECKOUT - change qa email success.");
                        value = [ "", "info", "change qa email success.", server.userId, timestamp, module_name, domain, "", "", email, launch, product, "", "", "" ];
                        await sheet.addRow();
                        await sheet.appendValues(value); 
                    } else {
                        await driver.findElement(By.id("woocommerce_cancelled_order_recipient")).sendKeys(qa_email);
                        logger.logger.log({ level: 'info', message: 'CHECKOUT - same qa email.', tester: server.userId });
                        console.log("CHECKOUT - same qa email.");
                        value = [ "", "info", "same qa email.", server.userId, timestamp, module_name, domain, "", "", qa_email, launch, product, "", "", "" ];
                        await sheet.addRow();
                        await sheet.appendValues(value);
                    }
                    await driver.findElement(By.name("save")).click();
                } catch (error) {
                    logger.logger.log({ level: 'error', message: error, tester: server.userId });
                    console.log(error);
                    value = [ "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
                    await sheet.addRow();
                    await sheet.appendValues(value);
                }

                // failed order
                try {
                    let failed_order_url = await driver.getCurrentUrl();
                    console.log("failed_order_url: " + failed_order_url);
        
                    await driver.switchTo().newWindow('tab');
                    
                    await driver.get(failed_order_url);
        
                    await driver.executeScript("return document.getElementsByClassName('nav-tab')[6].click()");
                    
                    await driver.executeScript("return document.getElementsByClassName('button alignright')[2].click()");
        
                    let failed_order = await driver.findElement(By.id("woocommerce_failed_order_recipient")).getAttribute('value');
                    console.log("failed_order: " + failed_order);
        
                    try {
                        await googleSheets.spreadsheets.values.append({
                            auth,
                            spreadsheetId,
                            range: "Sunrise Jewelry USA!H2",
                            valueInputOption: "USER_ENTERED",
                            resource: {
                                values: [
                                    [failed_order]
                                ]
                            }
                        });
                        logger.logger.log({ level: 'info', message: 'CHECKOUT - list failed order recipient success.', tester: server.userId });
                        console.log("CHECKOUT - list failed order recipient success.");
                        value = [ "", "info", "list failed order recipient success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
                        await sheet.addRow();
                        await sheet.appendValues(value);                    
                    } catch (error) {
                        logger.logger.log({ level: 'error', message: error, tester: server.userId });
                        console.log(error);
                        value = [ "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
                        await sheet.addRow();
                        await sheet.appendValues(value);                    
                    }
                    await driver.findElement(By.id("woocommerce_failed_order_recipient")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
                    if (email) {
                        await driver.findElement(By.id("woocommerce_failed_order_recipient")).sendKeys(email);
                        logger.logger.log({ level: 'info', message: 'CHECKOUT - change qa email success.', tester: server.userId });
                        console.log("CHECKOUT - change qa email success.");
                        value = [ "", "info", "change qa email success.", server.userId, timestamp, module_name, domain, "", "", email, launch, product, "", "", "" ];
                        await sheet.addRow();
                        await sheet.appendValues(value); 
                    } else {
                        await driver.findElement(By.id("woocommerce_failed_order_recipient")).sendKeys(qa_email);
                        logger.logger.log({ level: 'info', message: 'CHECKOUT - same qa email.', tester: server.userId });
                        console.log("CHECKOUT - same qa email.");
                        value = [ "", "info", "same qa email.", server.userId, timestamp, module_name, domain, "", "", qa_email, launch, product, "", "", "" ];
                        await sheet.addRow();
                        await sheet.appendValues(value); 
                    }
                    await driver.findElement(By.name("save")).click();  
                } catch (error) {
                    logger.logger.log({ level: 'error', message: error, tester: server.userId });
                    console.log(error);
                    value = [ "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
                    await sheet.addRow();
                    await sheet.appendValues(value);            
                }

                // get coupons
                try {
                    let current_page_url = await driver.getCurrentUrl();
                    console.log("current_page_url: " + current_page_url);
                    await driver.switchTo().newWindow('tab');
                    await driver.get(current_page_url);
                    await driver.executeScript("return document.getElementsByTagName('a')[47].click()");
                    logger.logger.log({ level: 'info', message: 'CHECKOUT - coupons page success.', tester: server.userId });
                    console.log("CHECKOUT - coupons page success.");
                    value = [ "", "info", "coupons page success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
                    await sheet.addRow();
                    await sheet.appendValues(value); 
                } catch (error) {
                    logger.logger.log({ level: 'error', message: error, tester: server.userId });
                    console.log(error);
                    value = [ "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
                    await sheet.addRow();
                    await sheet.appendValues(value);                
                }

                // put coupons in tracker
                try {
                    let coupon_code = await driver.executeScript("return document.getElementsByClassName('row-title')[0].innerHTML");
                    let coupon_expiry_date = await driver.executeScript("return document.getElementsByClassName('expiry_date column-expiry_date')[0].innerHTML");
                    await googleSheets.spreadsheets.values.append({
                        auth,
                        spreadsheetId,
                        range: "Sunrise Jewelry USA!M2:N2",
                        valueInputOption: "USER_ENTERED",
                        resource: {
                            values: [
                                [coupon_code, coupon_expiry_date]
                            ]
                        }
                    });
                    logger.logger.log({ level: 'info', message: 'CHECKOUT - list coupon details success.', tester: server.userId });
                    console.log("CHECKOUT - list coupon details success.");
                    value = [ "", "info", "list coupon details success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
                    await sheet.addRow();
                    await sheet.appendValues(value);                   
                } catch (error) {
                    logger.logger.log({ level: 'error', message: error, tester: server.userId });
                    console.log(error);
                    value = [ "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
                    await sheet.addRow();
                    await sheet.appendValues(value);                 
                }
            }
            else {
                await driver.findElement(By.id("woocommerce_stripe_enabled")).click();
                logger.logger.log({ level: 'info', message: 'CHECKOUT - enable stripe success.', tester: server.userId });
                console.log("CHECKOUT - enable stripe success.");
                value = [ "", "info", "enable stripe success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value); 
            }
        }
        else {
            logger.logger.log({ level: 'error', message: 'CHECKOUT - tax tab failed.', tester: server.userId });
            console.log("CHECKOUT - tax tab failed.");
            value = [ "", "error", "tax tab failed.", server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value); 
        }
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);    
    }

    return true;
    
}


module.exports = { wordpressStart };