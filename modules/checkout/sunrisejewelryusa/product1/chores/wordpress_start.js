const {Builder, By, Key} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../config");

const wp_username = config.creds_sunrisejewelryusa.username;
const wp_password = config.creds_sunrisejewelryusa.password;
const qa_email = config.qa_email;
const wp_site = config.wp_site;
const auth = config.auth;
const spreadsheetId = config.spreadsheetId;
const date = config.date;


async function wordpressStart(username, password, email) {
    console.log("username1: " + username);
    console.log("password1: " + password);

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })

    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get(wp_site);

    // wp login
    try {
        if ((username) && (password)) {
            console.log("creds was edited.");
            await driver.findElement(By.name("log")).sendKeys(username);
            await driver.findElement(By.name("pwd")).sendKeys(password);
            await driver.findElement(By.id("wp-submit")).click();
        } else {
            console.log("creds was not edited.");
            await driver.findElement(By.name("log")).sendKeys(wp_username);
            await driver.findElement(By.name("pwd")).sendKeys(wp_password);
            await driver.findElement(By.id("wp-submit")).click();
        }
        var admin_email_verification = await driver.executeScript("return document.querySelector('form').classList.contains('admin-email-confirm-form')");  
        if (admin_email_verification === true) {
            await driver.executeScript("return document.getElementsByTagName('a')[3].click()");
            console.log("with admin email verification.");
            console.log("admin_email_verification: " + admin_email_verification);
        }
    } catch (error) {
        console.log(error);
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
            console.log("tax tab checked.");
            let tax_page = await driver.getCurrentUrl();
            console.log("tax_page: " + tax_page);
            await driver.switchTo().newWindow('tab');
            await driver.get(tax_page);
    
            await driver.executeScript("return document.getElementsByClassName('nav-tab')[4].click()");
            await driver.executeScript("return document.getElementsByClassName('button alignright')[4].click()");

            // check payments tab
            let enable_or_disable = await driver.executeScript("return document.getElementsByName('woocommerce_stripe_enabled')[0].checked");
            if (enable_or_disable === true) {
                console.log("checked.");
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
                        }, (err, response) => {
                        if (err) {
                            console.log(err);
                        } else {
                        
                            console.log("Success");
                        }
                    });
                } catch (error) {
                    console.log(error);
                }
                
                // edit emails tab
                await driver.executeScript("return document.getElementsByClassName('nav-tab')[6].click()");
    
                try {
                    await googleSheets.spreadsheets.values.append({
                        auth,
                        spreadsheetId,
                        range: "Sunrise Jewelry USA!B2:C2",
                        valueInputOption: "USER_ENTERED",
                        resource: {
                            values: [
                                [
                                    date, 
                                    wp_username + "\n" + wp_password]
                            ]
                        }
                    });
                    console.log("success.");
                } catch (error) {
                    console.log(error);
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
                        console.log("success.");
                    } catch (error) {
                        console.log(error);
                    }
        
                    await driver.findElement(By.id("woocommerce_new_order_recipient")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
                    if (email) {
                        console.log("qa email was edited.");
                        await driver.findElement(By.id("woocommerce_new_order_recipient")).sendKeys(email);
                    } else {
                        console.log("qa email was not edited.");
                        await driver.findElement(By.id("woocommerce_new_order_recipient")).sendKeys(qa_email);
                    }
                    await driver.findElement(By.name("save")).click();
            
                } catch (error) {
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
                        console.log("success.");
                    } catch (error) {
                        console.log(error);
                    }
        
                    await driver.findElement(By.id("woocommerce_cancelled_order_recipient")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
                    if (email) {
                        console.log("qa email was edited.");
                        await driver.findElement(By.id("woocommerce_cancelled_order_recipient")).sendKeys(email);
                    } else {
                        console.log("qa email was not edited.");
                        await driver.findElement(By.id("woocommerce_cancelled_order_recipient")).sendKeys(qa_email);
                    }
                    await driver.findElement(By.name("save")).click();
                } catch (error) {
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
                        console.log("success.");
                    } catch (error) {
                        console.log(error);
                    }
                    await driver.findElement(By.id("woocommerce_failed_order_recipient")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
                    if (email) {
                        console.log("qa email was edited.");
                    await driver.findElement(By.id("woocommerce_failed_order_recipient")).sendKeys(email);
                    } else {
                        console.log("qa email was not edited.");
                    await driver.findElement(By.id("woocommerce_failed_order_recipient")).sendKeys(qa_email);
                    }
                    await driver.findElement(By.name("save")).click();  
                } catch (error) {
                    console.log(error);
                }

                // get coupons
                try {
                    let current_page_url = await driver.getCurrentUrl();
                    console.log("current_page_url: " + current_page_url);
        
                    await driver.switchTo().newWindow('tab');
                    await driver.get(current_page_url);

                    await driver.executeScript("return document.getElementsByTagName('a')[47].click()");

                    let coupon_code = await driver.executeScript("return document.getElementsByClassName('row-title')[0].innerHTML");
                    let coupon_expiry_date = await driver.executeScript("return document.getElementsByClassName('expiry_date column-expiry_date')[0].innerHTML");
                    
                    // put coupons in tracker
                    try {
                        await googleSheets.spreadsheets.values.append({
                            auth,
                            spreadsheetId,
                            // range: "Sunrise Jewelry USA!M2",
                            range: "Sunrise Jewelry USA!M2:N2",
                            valueInputOption: "USER_ENTERED",
                            resource: {
                                values: [
                                    // [coupon_code]
                                    [coupon_code, coupon_expiry_date]
                                ]
                            }
                        });
                        console.log("success.");
                    } catch (error) {
                        console.log(error);
                    }

                } catch (error) {
                    console.log(error);
                }
            }
            else {
                console.log("unchecked.");
                await driver.findElement(By.id("woocommerce_stripe_enabled")).click();
            }
        }
        else {
            console.log("error");
            // await driver.executeScript("return document.getElementsByName('woocommerce_prices_include_tax')[1].click()");
            // let element = await driver.executeScript("return document.getElementsByClassName('select2-selection__rendered')[3]");
            // element.click();
        }
    } catch (error) {
        console.log(error);
    }

    return true;
    
}


module.exports = { wordpressStart };