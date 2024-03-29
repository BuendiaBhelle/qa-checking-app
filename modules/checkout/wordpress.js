const {Builder, By, Key} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../config");
const server = require('../../server');
const sheet = require('../../middleware/gsheet');

const auth = config.auth;
const spreadsheetId = config.spreadsheetId_checkout;
var date = config.date;
const qa_email = config.qa_email;

var googleSheets;
var driver;
var current_page_url;
async function wordpressStart(domain, username, password, email, module_name, launch, timestamp, wp_creds_username, wp_creds_password, tax_page, payments_page, emails_page, pricesEnteredWithTax_script, displayPricesInTheShop_script, displayPricesDuringCartAndCheckout_script, product_name, sheetId, ranges, range_recipients_newOrder, range_recipients_cancelledOrder, range_recipients_failedOrder, emails_newOrder_page, emails_cancelledOrder_page, emails_failedOrder_page, coupons_page, range_coupons) {
    const wp_site = domain + "wp-admin";
    const client = await auth.getClient();
    googleSheets = google.sheets({ version: "v4", auth: client })

    driver = await new Builder().forBrowser("chrome").build();
    await driver.get(wp_site);

    // wp login
    try {
        if ((username) && (password)) {
            await driver.findElement(By.name("log")).sendKeys(username);
            await driver.findElement(By.name("pwd")).sendKeys(password);
            console.log("CHECKOUT - edit credentials success.");
            value = [ "", "", "info", "edit credentials success.", server.userId, timestamp, module_name, domain, username + "\n" + password, "", "", launch, product_name, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        } else {
            await driver.findElement(By.name("log")).sendKeys(wp_creds_username);
            await driver.findElement(By.name("pwd")).sendKeys(wp_creds_password);
            console.log("CHECKOUT - same credentials.");
            value = [ "", "", "info", "same credentials.", server.userId, timestamp, module_name, domain, wp_creds_username + "\n" + wp_creds_password, "", "", launch, product_name, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }

        await driver.findElement(By.id("wp-submit")).click();

        let login_error = await driver.executeScript("return document.getElementById('login_error')");
        if (login_error) {
            console.log("CHECKOUT - wordpress login failed.");
            value = [ "", "", "error", "wordpress login failed.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        } else {
            console.log("CHECKOUT - wordpress login success.");
            value = [ "", "", "info", "wordpress login success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }

        var admin_email_verification = await driver.executeScript("return document.querySelector('form').classList.contains('admin-email-confirm-form')");  
        if (admin_email_verification === true) {
            await driver.executeScript("return document.getElementsByTagName('a')[3].click()");
            console.log("CHECKOUT - admin email verification.");
            value = [ "", "", "info", "admin email verification.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        } else {
            console.log("CHECKOUT - no admin email verification.");
            value = [ "", "", "info", "no admin email verification.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }
    } catch (error) {
        console.log(error);
        value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    await driver.get(wp_site + tax_page);

    // check tax tab
    let prices_entered_with_tax = await driver.executeScript(pricesEnteredWithTax_script);
    console.log("prices_entered_with_tax: " + prices_entered_with_tax); 

    let display_prices_in_the_shop = await driver.executeScript(displayPricesInTheShop_script);
    console.log("display_prices_in_the_shop: " + display_prices_in_the_shop);

    let display_prices_during_cart_and_checkout = await driver.executeScript(displayPricesDuringCartAndCheckout_script);
    console.log("display_prices_during_cart_and_checkout: " + display_prices_during_cart_and_checkout);

    try {
        if ((prices_entered_with_tax === true) && (display_prices_in_the_shop === "Excluding tax") && (display_prices_during_cart_and_checkout === "Excluding tax")) {
            console.log("CHECKOUT - tax tab checked.");
            value = [ "", "", "info", "tax tab checked.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);

            // PAYMENTS tab
            await driver.switchTo().newWindow('tab');
            await driver.get(wp_site + payments_page);
            await driver.sleep(3000);

            // stripe
            let method_length = await driver.executeScript("return document.getElementsByTagName('tr').length");
            for (let index = 4; index < method_length; index++) {
                let stripe_innertext = await driver.executeScript("return document.getElementsByTagName('tr')[" + index + "].children[1].children[0].innerText");
                if (stripe_innertext === "Stripe") {
                    console.log(stripe_innertext);
                    let stripe_enabled = await driver.executeScript("return document.getElementsByTagName('tr')[" + index + "].children[2].children[0].children[0].getAttribute('aria-label')");
                    console.log("stripe_enabled: " + stripe_enabled);
                    
                    if (stripe_enabled === 'The "Stripe" payment method is currently enabled') {
                        await driver.executeScript("return document.getElementsByTagName('tr')[" + index + "].children[1].children[0].click()");
                        await driver.sleep(3000);

                        if ((domain === config.domain.americanleatherusa.live) || (domain === config.domain.andresperezjurado.dev) || (domain === config.domain.sunrisejewelryusa.live) || (domain === config.domain.randosouthwest.live)) {
                            await driver.findElement(By.id("tab-panel-0-settings")).click();
                            await driver.sleep(3000);
                            let enable_test_mode_checked = await driver.executeScript("return document.getElementById('inspector-checkbox-control-9')");
                            if (enable_test_mode_checked) {
                                console.log("not checked yet.");
                                await driver.findElement(By.id("inspector-checkbox-control-9")).click();
                                await driver.executeScript("return document.getElementsByClassName('components-button is-primary')[0].click()");
                                console.log("CHECKOUT - test mode enabled.");
                                value = [ "", "", "info", "test mode enabled.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
                                await sheet.addRow();
                                await sheet.appendValues(value);
                            } else {
                                console.log("checked already.");
                                console.log("CHECKOUT - test mode already enabled.");
                                value = [ "", "", "info", "test mode already enabled.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
                                await sheet.addRow();
                                await sheet.appendValues(value);
                            }
                        } else {
                            let test_mode = await driver.executeScript("return document.getElementsByName('woocommerce_stripe_testmode')[0].checked");
                    
                            if (test_mode === false) {
                                await driver.executeScript("return document.getElementsByName('woocommerce_stripe_testmode')[0].click()");
                                await driver.executeScript("return document.getElementsByName('save')[0].click()");
                                console.log("CHECKOUT - enable stripe success.");
                                value = [ "", "", "info", "enable stripe success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
                                await sheet.addRow();
                                await sheet.appendValues(value);
                            } else {
                                console.log("CHECKOUT - already enabled.");
                                value = [ "", "", "info", "already enabled.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
                                await sheet.addRow();
                                await sheet.appendValues(value);
                            }
                        }
                    }
                    break;
                }
            }

            let requests = [{
                insertRange: {
                    range: {
                        sheetId: sheetId,
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
                console.log("CHECKOUT - add columns success.");
                value = [ "", "", "info", "add columns success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value);
            } catch (error) {
                console.log(error);
                value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value);              
            }
            
            // EMAILS tab
            await driver.switchTo().newWindow('tab');
            await driver.get(wp_site + emails_page);

            if ((username) && (password)) {
                var values_data = [[launch, date, username + "\n" + password]]
                console.log(values_data);
            } else {
                var values_data = [[launch, date, wp_creds_username + "\n" + wp_creds_password]]
                console.log(values_data);
            }

            try {
                await googleSheets.spreadsheets.values.append({
                    auth,
                    spreadsheetId,
                    range: ranges,
                    valueInputOption: "USER_ENTERED",
                    resource: {
                        values: values_data
                    }
                });
                console.log("CHECKOUT - list date and creds success.");
                value = [ "", "", "info", "list date and creds success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value);  
            } catch (error) {
                console.log(error);
                value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value); 
            }
    
            // new order
            await driver.switchTo().newWindow('tab');
            await driver.get(wp_site + emails_newOrder_page);
            await driver.sleep(1000);
            try {
                let new_order = await driver.findElement(By.id("woocommerce_new_order_recipient")).getAttribute('value');
                console.log("new_order: " + new_order);
    
                try {
                    await googleSheets.spreadsheets.values.append({
                        auth,
                        spreadsheetId,
                        range: range_recipients_newOrder,
                        valueInputOption: "USER_ENTERED",
                        resource: {
                            values: [
                                [new_order]
                            ]
                        }
                    });
                    console.log("CHECKOUT - list new order recipient success.");
                    value = [ "", "", "info", "list new order recipient success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
                    await sheet.addRow();
                    await sheet.appendValues(value);                      
                } catch (error) {
                    console.log(error);
                    value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
                    await sheet.addRow();
                    await sheet.appendValues(value); 
                }
    
                await driver.findElement(By.id("woocommerce_new_order_recipient")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
                if (email) {
                    await driver.findElement(By.id("woocommerce_new_order_recipient")).sendKeys(email);
                    console.log("CHECKOUT - change qa email success.");
                    value = [ "", "", "info", "change qa email success.", server.userId, timestamp, module_name, domain, "", "", email, launch, product_name, "", "", "" ];
                    await sheet.addRow();
                    await sheet.appendValues(value);   
                } else {
                    await driver.findElement(By.id("woocommerce_new_order_recipient")).sendKeys(qa_email);
                    console.log("CHECKOUT - same qa email.");
                    value = [ "", "", "info", "same qa email.", server.userId, timestamp, module_name, domain, "", "", qa_email, launch, product_name, "", "", "" ];
                    await sheet.addRow();
                    await sheet.appendValues(value);  
                }
                await driver.executeScript("return document.getElementsByName('save')[0].click()");
            } catch (error) {
                console.log(error);
                value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value);                
            }
            
            // cancelled order
            await driver.switchTo().newWindow('tab');
            await driver.get(wp_site + emails_cancelledOrder_page);
            await driver.sleep(1000);
            try {
                let cancelled_order = await driver.findElement(By.id("woocommerce_cancelled_order_recipient")).getAttribute('value');
                console.log("cancelled_order: " + cancelled_order);
    
                try {
                    await googleSheets.spreadsheets.values.append({
                        auth,
                        spreadsheetId,
                        range: range_recipients_cancelledOrder,
                        valueInputOption: "USER_ENTERED",
                        resource: {
                            values: [
                                [cancelled_order]
                            ]
                        }
                    });
                    console.log("CHECKOUT - list cancelled order recipient success.");
                    value = [ "", "", "info", "list cancelled order recipient success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
                    await sheet.addRow();
                    await sheet.appendValues(value);                        
                } catch (error) {
                    console.log(error);
                    value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
                    await sheet.addRow();
                    await sheet.appendValues(value);                  
                }
    
                await driver.findElement(By.id("woocommerce_cancelled_order_recipient")).sendKeys(Key.CONTROL, "a" + Key.DELETE);

                if (email) {
                    await driver.findElement(By.id("woocommerce_cancelled_order_recipient")).sendKeys(email);
                    console.log("CHECKOUT - change qa email success.");
                    value = [ "", "", "info", "change qa email success.", server.userId, timestamp, module_name, domain, "", "", email, launch, product_name, "", "", "" ];
                    await sheet.addRow();
                    await sheet.appendValues(value); 
                } else {
                    await driver.findElement(By.id("woocommerce_cancelled_order_recipient")).sendKeys(qa_email);
                    console.log("CHECKOUT - same qa email.");
                    value = [ "", "", "info", "same qa email.", server.userId, timestamp, module_name, domain, "", "", qa_email, launch, product_name, "", "", "" ];
                    await sheet.addRow();
                    await sheet.appendValues(value);
                }
                await driver.executeScript("return document.getElementsByName('save')[0].click()");
            } catch (error) {
                console.log(error);
                value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value);
            }

            // failed order
            await driver.switchTo().newWindow('tab');
            await driver.get(wp_site + emails_failedOrder_page);
            await driver.sleep(1000);
            try {
                let failed_order = await driver.findElement(By.id("woocommerce_failed_order_recipient")).getAttribute('value');
                console.log("failed_order: " + failed_order);
    
                try {
                    await googleSheets.spreadsheets.values.append({
                        auth,
                        spreadsheetId,
                        range: range_recipients_failedOrder,
                        valueInputOption: "USER_ENTERED",
                        resource: {
                            values: [
                                [failed_order]
                            ]
                        }
                    });
                    console.log("CHECKOUT - list failed order recipient success.");
                    value = [ "", "", "info", "list failed order recipient success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
                    await sheet.addRow();
                    await sheet.appendValues(value);                    
                } catch (error) {
                    console.log(error);
                    value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
                    await sheet.addRow();
                    await sheet.appendValues(value);                    
                }
                await driver.findElement(By.id("woocommerce_failed_order_recipient")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
                if (email) {
                    await driver.findElement(By.id("woocommerce_failed_order_recipient")).sendKeys(email);
                    console.log("CHECKOUT - change qa email success.");
                    value = [ "", "", "info", "change qa email success.", server.userId, timestamp, module_name, domain, "", "", email, launch, product_name, "", "", "" ];
                    await sheet.addRow();
                    await sheet.appendValues(value); 
                } else {
                    await driver.findElement(By.id("woocommerce_failed_order_recipient")).sendKeys(qa_email);
                    console.log("CHECKOUT - same qa email.");
                    value = [ "", "", "info", "same qa email.", server.userId, timestamp, module_name, domain, "", "", qa_email, launch, product_name, "", "", "" ];
                    await sheet.addRow();
                    await sheet.appendValues(value); 
                }
                await driver.executeScript("return document.getElementsByName('save')[0].click()");
            } catch (error) {
                console.log(error);
                value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value);            
            }

            console.log("DOMAIN: " + domain);
            console.log("DOMAIN_SERVER: " + config.domain.randosouthwest.live);

            // get coupons
            if ((domain === config.domain.randosouthwest.dev) || (domain === config.domain.randosouthwest.live)) {
                console.log("site is randosouthwest");
            } else {
                console.log("site is not randosouthwest");
                await driver.switchTo().newWindow('tab');
                await driver.get(wp_site + coupons_page);
                await driver.sleep(1000);
                try {
                    let coupon_code = await driver.executeScript("return document.getElementsByClassName('row-title')[0].innerHTML");
                    let coupon_expiry_date = await driver.executeScript("return document.getElementsByClassName('expiry_date column-expiry_date')[0].innerHTML");
                    await googleSheets.spreadsheets.values.append({
                        auth,
                        spreadsheetId,
                        range: range_coupons,
                        valueInputOption: "USER_ENTERED",
                        resource: {
                            values: [
                                [coupon_code, coupon_expiry_date]
                            ]
                        }
                    });
                    console.log("CHECKOUT - list coupon details success.");
                    value = [ "", "", "info", "list coupon details success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
                    await sheet.addRow();
                    await sheet.appendValues(value);                   
                } catch (error) {
                    console.log(error);
                    value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
                    await sheet.addRow();
                    await sheet.appendValues(value);                 
                }
            }
        }
        else {
            console.log("CHECKOUT - tax tab failed.");
            value = [ "", "", "error", "tax tab failed.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value); 
        }
    } catch (error) {
        console.log(error);
        value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);    
    }

    current_page_url = await driver.getCurrentUrl();
    await driver.sleep(1000);

    return true;
    
}

async function wordpressEnd(domain, module_name, launch, timestamp, payments_page, emails_page, product_name, range_recipients_newOrder, range_recipients_cancelledOrder, range_recipients_failedOrder, emails_newOrder_page, emails_cancelledOrder_page, emails_failedOrder_page) {
// async function wordpressEnd(domain, module_name, launch, timestamp, product_name, emails_page, emails_newOrder_page, emails_cancelledOrder_page, emails_failedOrder_page, range_recipients_newOrder, range_recipients_cancelledOrder, range_recipients_failedOrder) {
    console.log("current_page_url: " + current_page_url);
    const wp_site = domain + "wp-admin";
    await driver.switchTo().newWindow('tab');
    await driver.get(wp_site + payments_page);
    await driver.sleep(3000);
    
    // stripe
    let method_length = await driver.executeScript("return document.getElementsByTagName('tr').length");
    for (let index = 4; index < method_length; index++) {
        let stripe_innertext = await driver.executeScript("return document.getElementsByTagName('tr')[" + index + "].children[1].children[0].innerText");
        if (stripe_innertext === "Stripe") {
            console.log(stripe_innertext);
            let stripe_enabled = await driver.executeScript("return document.getElementsByTagName('tr')[" + index + "].children[2].children[0].children[0].getAttribute('aria-label')");
            console.log("stripe_enabled: " + stripe_enabled);
            
            if (stripe_enabled === 'The "Stripe" payment method is currently enabled') {
                await driver.executeScript("return document.getElementsByTagName('tr')[" + index + "].children[1].children[0].click()");
                await driver.sleep(3000);

                if ((domain === config.domain.americanleatherusa.live) || (domain === config.domain.andresperezjurado.dev) || (domain === config.domain.sunrisejewelryusa.live) || (domain === config.domain.randosouthwest.live)) {
                    console.log("LIVE");
                    await driver.findElement(By.id("tab-panel-0-settings")).click();
                    await driver.sleep(3000);
                    let enable_test_mode_checked = await driver.executeScript("return document.getElementById('inspector-checkbox-control-9')");
                    if (enable_test_mode_checked) {
                        console.log("checked.");
                        await driver.findElement(By.id("inspector-checkbox-control-9")).click();
                        await driver.executeScript("return document.getElementsByClassName('components-button is-primary')[0].click()");
                        console.log("CHECKOUT - test mode enabled.");
                        value = [ "", "", "info", "test mode enabled.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
                        await sheet.addRow();
                        await sheet.appendValues(value);
                    } else {
                        console.log("not checked yet.");
                        console.log("CHECKOUT - test mode already enabled.");
                        value = [ "", "", "info", "test mode already enabled.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
                        await sheet.addRow();
                        await sheet.appendValues(value);
                    }
                } else {
                    let test_mode = await driver.executeScript("return document.getElementsByName('woocommerce_stripe_testmode')[0].checked");
                    
                    if (test_mode === true) {
                        await driver.executeScript("return document.getElementsByName('woocommerce_stripe_testmode')[0].click()");
                        await driver.executeScript("return document.getElementsByName('save')[0].click()");
                        console.log("CHECKOUT - disable stripe success.");
                        value = [ "", "", "info", "disable stripe success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
                        await sheet.addRow();
                        await sheet.appendValues(value);
                    } else {
                        console.log("CHECKOUT - already disabled.");
                        value = [ "", "", "info", "already disabled.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
                        await sheet.addRow();
                        await sheet.appendValues(value);
                    }
                }


            }
            break;
        }
    }
    
    await driver.switchTo().newWindow('tab');
    await driver.get(wp_site + emails_page);
    await driver.sleep(1000);
    
    // new order    
    try {
        await driver.switchTo().newWindow('tab');
        await driver.get(wp_site + emails_newOrder_page);
        await driver.sleep(1000);

        // get new order recipients
        try {
            let new_order_recipients = await googleSheets.spreadsheets.values.get({
                auth,
                spreadsheetId,
                range: range_recipients_newOrder,
            });
            let no_recipients = new_order_recipients.data.values[0][0];
            console.log("no_recipients: " + no_recipients);

            // put new order recipients
            await driver.findElement(By.id("woocommerce_new_order_recipient")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
            await driver.findElement(By.id("woocommerce_new_order_recipient")).sendKeys(no_recipients);
            await driver.executeScript("return document.getElementsByName('save')[0].click()");
            console.log("CHECKOUT - get new order recipient success.");
            value = [ "", "", "info", "get new order recipient success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        } catch (error) {
            console.log(error);
            value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }
    } catch (error) {
        console.log(error);
        value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);  
    }
    

    // cancelled order
    await driver.switchTo().newWindow('tab');
    await driver.get(wp_site + emails_cancelledOrder_page);
    await driver.sleep(1000);
    try {
        // get cancelled order recipients
        try {
            let cancelled_order_recipients = await googleSheets.spreadsheets.values.get({
                auth,
                spreadsheetId,
                range: range_recipients_cancelledOrder,
            });
            let co_recipients = cancelled_order_recipients.data.values[0][0];
            console.log("co_recipients: " + co_recipients);
            
            // put cancelled order recipients
            await driver.findElement(By.id("woocommerce_cancelled_order_recipient")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
            await driver.findElement(By.id("woocommerce_cancelled_order_recipient")).sendKeys(co_recipients);
            await driver.executeScript("return document.getElementsByName('save')[0].click()");
            console.log("CHECKOUT - get cancelled order recipient success.");
            value = [ "", "", "info", "get cancelled order recipient success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        } catch (error) {
            console.log(error);
            value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }
    } catch (error) {
        console.log(error);
        value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);   
    }
    
    
    // failed order
    await driver.switchTo().newWindow('tab');
    await driver.get(wp_site + emails_failedOrder_page);
    await driver.sleep(1000);
    try {
        // get failed order recipients
        try {
            let failed_order_recipients = await googleSheets.spreadsheets.values.get({
                auth,
                spreadsheetId,
                range: range_recipients_failedOrder,
            });
            let fo_recipients = failed_order_recipients.data.values[0][0];
            console.log("fo_recipients: " + fo_recipients);
            
            // put failed order recipients
            await driver.findElement(By.id("woocommerce_failed_order_recipient")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
            await driver.findElement(By.id("woocommerce_failed_order_recipient")).sendKeys(fo_recipients);
            await driver.executeScript("return document.getElementsByName('save')[0].click()");
            console.log("CHECKOUT - get failed order recipient success.");
            value = [ "", "", "info", "get failed order recipient success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        } catch (error) {
            console.log(error);
            value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        } 
    } catch (error) {
        console.log(error);
        value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);  
    }
    // end test
    console.log("test ends.");
    value = [ "", "", "info", "test ends.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
    await sheet.addRow();
    await sheet.appendValues(value);

    return true;
    
}


module.exports = { wordpressStart, wordpressEnd };