const {Builder, By, Key} = require("selenium-webdriver");
const {google} = require("googleapis");

const config = require("../../../config");
const server = require('../../../server');
const sheet = require('../../../middleware/gsheet');

const auth = config.auth;
const spreadsheetId = config.spreadsheetId_checkout;

async function checkout(domain, username, password, module_name, launch, range_product_name, timestamp, wp_creds_username, wp_creds_password, product_name, range_coupons, range_thankyou_page, product_link, co_site) {
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })

    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get(domain + "my-account/");

    // site login
    try {
        if ((username) && (password)) {
            await driver.findElement(By.id("username")).sendKeys(username);
            await driver.findElement(By.id("password")).sendKeys(password);
            await driver.findElement(By.name("login")).click();
            console.log("CHECKOUT - edit credentials success.");
            value = [ "", "", "info", "edit credentials success.", server.userId, timestamp, module_name, domain, username + "\n" + password, "", "", launch, product_name, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        } else {
            await driver.findElement(By.id("username")).sendKeys(wp_creds_username);
            await driver.findElement(By.id("password")).sendKeys(wp_creds_password);
            await driver.findElement(By.name("login")).click();
            console.log("CHECKOUT - same credentials.");
            value = [ "", "", "info", "same credentials.", server.userId, timestamp, module_name, domain, wp_creds_username + "\n" + wp_creds_password, "", "", launch, product_name, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }
    } catch (error) {
        console.log(error);
        value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    // check if cart is empty
    try {
        await driver.get(domain + "cart/");
        let items = await driver.executeScript("return document.getElementsByClassName('remove-item')[0]");
        if (items) {
            console.log("cart not empty.");
            let items_count = await driver.executeScript("return document.getElementsByClassName('remove-item').length");
            for (let index = items_count; index > 0; index--) {
                var index_updated = index-1;
                await driver.executeScript("return document.getElementsByClassName('remove-item')[" + index_updated + "].click()");
            }
            console.log("CHECKOUT - empty cart success.");
            value = [ "", "", "info", "empty cart success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }
    } catch (error) {
        console.log(error);
        value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    // add to cart
    try {
        await driver.get(domain + product_link);
        await driver.executeScript("return document.getElementsByName('add-to-cart')[0].click()");
        await driver.executeScript("return document.getElementsByClassName('button wc-forward')[0].click()");
       
        // track product name
        try {
            let product_item_name = await driver.executeScript("return document.getElementsByClassName('product-item-name')[0].innerHTML");
            await googleSheets.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: range_product_name,
                valueInputOption: "USER_ENTERED",
                resource: {
                    values: [
                        [domain + product_link, product_item_name]
                    ]
                }
            });
            console.log("CHECKOUT - list product name success.");
            value = [ "", "", "info", "list product name success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value); 
        } catch (error) {
            console.log(error);
            value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);      
        }

        // get coupon code
        try {
            let coupon_code = await googleSheets.spreadsheets.values.get({
                auth,
                spreadsheetId,
                range: range_coupons,
            });

            let coupon = coupon_code.data.values[0][0];
            console.log("coupon: " + coupon);

            await driver.findElement(By.id("coupon_code")).sendKeys(coupon);
            await driver.executeScript("return document.getElementsByName('apply_coupon')[0].click()");
            await driver.sleep(1000);

            let woocommerce_error = await driver.executeScript("return document.getElementsByClassName('woocommerce-error')[0]");        
            let woocommerce_message = await driver.executeScript("return document.getElementsByClassName('woocommerce-message')[0]");

            if (woocommerce_error) {
                console.log("CHECKOUT - apply coupon failed.");
                value = [ "", "", "error", "apply coupon failed.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value); 
            }
            else if (woocommerce_message) {
                console.log("CHECKOUT - apply coupon success.");
                value = [ "", "", "info", "apply coupon success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value); 
            } 
        } catch (error) {
            console.log(error);
            value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value); 
        }

        await driver.findElement(By.id("customer_notes_text")).sendKeys("Please take note that this is a test purchase. Disregard or do not complete the purchase. Thanks.");
        await driver.sleep(1000);
        await driver.executeScript("return document.getElementsByClassName('checkout-button button alt wc-forward')[0].click()");
        console.log("CHECKOUT - checkout page success.");
        value = [ "", "", "info", "checkout page success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value); 
    } catch (error) {
        console.log(error);
        value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);     
    }

    // form fill in
    try {
        await driver.findElement(By.id("billing_first_name")).sendKeys(Key.CONTROL, "a" + Key.DELETE); 
        await driver.findElement(By.id("billing_first_name")).sendKeys("Primeview"); 
        await driver.sleep(1000);
    
        await driver.findElement(By.id("billing_last_name")).sendKeys(Key.CONTROL, "a" + Key.DELETE); 
        await driver.findElement(By.id("billing_last_name")).sendKeys("Test"); 
        await driver.sleep(1000);

        await driver.findElement(By.id("billing_company")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
        await driver.findElement(By.id("billing_company")).sendKeys("Lead Test Submission");
        await driver.sleep(1000);

        await driver.findElement(By.id("select2-billing_country-container")).click();
        let country = await driver.executeScript("return document.getElementById('billing_country').children[235]");
        country.click();
        await driver.sleep(3000);

        await driver.findElement(By.id("billing_address_1")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
        await driver.findElement(By.id("billing_address_1")).sendKeys("7620 E McKellips Rd");
        await driver.sleep(1000);

        await driver.findElement(By.id("billing_city")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
        await driver.findElement(By.id("billing_city")).sendKeys("Scottsdale");
        await driver.sleep(1000);

        await driver.findElement(By.id("select2-billing_state-container")).click();
        let state = await driver.executeScript("return document.getElementById('billing_state').children[3]");
        state.click();
        await driver.sleep(3000);

        await driver.findElement(By.id("billing_postcode")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
        await driver.findElement(By.id("billing_postcode")).sendKeys("85257");
        await driver.sleep(1000);

        await driver.findElement(By.id("billing_phone")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
        await driver.findElement(By.id("billing_phone")).sendKeys("4806480839");
        await driver.sleep(1000);

        await driver.findElement(By.id("billing_email")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
        await driver.findElement(By.id("billing_email")).sendKeys("qa@primeview.com");
        await driver.sleep(1000);
    
        await driver.findElement(By.id("order_comments")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
        await driver.findElement(By.id("order_comments")).sendKeys("Please take note that this is a test purchase. Disregard or do not complete the purchase. Thanks.");
        await driver.sleep(1000);

        console.log("CHECKOUT - checkout form fill in success.");
        value = [ "", "", "info", "checkout form fill in success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value); 
    } catch (error) {
        console.log(error);
        value = [ "", "", "error", 'checkout form fill in failed.', server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value); 
    }

    // checkout
    try {
        let saved_payment_method_length = await driver.executeScript("return document.getElementsByClassName('woocommerce-SavedPaymentMethods wc-saved-payment-methods')[0].children.length");
        for (let index = 0; index < saved_payment_method_length; index++) {
            let saved_payment_method_innertext = await driver.executeScript("return document.getElementsByClassName('woocommerce-SavedPaymentMethods wc-saved-payment-methods')[0].children[" + index + "].children[1].innerText");
            if (saved_payment_method_innertext === "Visa ending in 4242 (expires 07/24)") {
                await driver.executeScript("return document.getElementsByClassName('woocommerce-SavedPaymentMethods wc-saved-payment-methods')[0].children[" + index + "].children[0].click()");
                await driver.executeScript("return document.getElementsByClassName('button alt')[0].click()");
                console.log("CHECKOUT - checkout success.");
                value = [ "", "", "info", "checkout success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value); 
                break;
            }
        }
    } catch (error) {
        console.log("CHECKOUT - checkout failed.");
        value = [ "", "", "error", "checkout failed.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);     
    }

    // track thank you page
    await driver.sleep(10000);
    let ty_page_url = await driver.getCurrentUrl();
    console.log("ty_page_url: " + ty_page_url);

    try {
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: range_thankyou_page,
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [ty_page_url]
                ]
            }
        });
        console.log("CHECKOUT - list thank you page success.");
        value = [ "", "", "info", "list thank you page success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value); 
    } catch (error) {
        console.log(error);
        value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);    
    }

}


module.exports = { checkout };