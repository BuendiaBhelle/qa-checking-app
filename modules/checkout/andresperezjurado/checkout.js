const {Builder, By, Key} = require("selenium-webdriver");
const {google} = require("googleapis");
const alert = require("alert"); 

const config = require("../config");
const logger = require('../../../middleware/logger');
const server = require('../../../server');
const sheet = require('../../../middleware/gsheet');
const config_server = require("../../../config");

const auth = config.auth;
const spreadsheetId = config.spreadsheetId;

async function checkout(domain, username, password, module_name, launch, range_product_name, timestamp, wp_creds_username, wp_creds_password, product_name, range_coupons, range_thankyou_page, product_link, co_site) {
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })

    let driver = await new Builder().forBrowser("chrome").build();

    // check if cart is empty
    try {
        await driver.get(domain + "cart/");
        let items = await driver.executeScript("return document.getElementsByClassName('remove')[0]");
        if (items) {
            console.log("cart not empty.");
            let items_count = await driver.executeScript("return document.getElementsByClassName('remove').length");
            for (let index = items_count; index > 0; index--) {
                var index_updated = index-1;
                await driver.executeScript("return document.getElementsByClassName('remove')[" + index_updated + "].click()");
            }
            logger.logger.log({ level: 'info', message: 'CHECKOUT - empty cart success.', tester: server.userId });
            console.log("CHECKOUT - empty cart success.");
            value = [ "", "", "info", "empty cart success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    // add to cart
    try {
        await driver.get(domain + product_link);
        await driver.sleep(3000);
        await driver.findElement(By.id("pa_sizes")).click();
        await driver.findElement(By.id("pa_sizes")).sendKeys(Key.DOWN + Key.ENTER);

        await driver.executeScript("return document.getElementsByClassName('single_add_to_cart_button button alt')[0].click()");
        await driver.executeScript("return document.getElementsByClassName('button wc-forward')[0].click()");
       
        // track product name
        try {
            let product_item_name = await driver.executeScript("return document.getElementsByClassName('product-name pt-3 td-40')[0].innerText");
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
            logger.logger.log({ level: 'info', message: 'CHECKOUT - list product name success.', tester: server.userId });
            console.log("CHECKOUT - list product name success.");
            value = [ "", "", "info", "list product name success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value); 
        } catch (error) {
            logger.logger.log({ level: 'error', message: error, tester: server.userId });
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
                logger.logger.log({ level: 'error', message: 'CHECKOUT - apply coupon failed.', tester: server.userId });
                console.log("CHECKOUT - apply coupon failed.");
                value = [ "", "", "error", "apply coupon failed.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value); 
            }
            else if (woocommerce_message) {
                logger.logger.log({ level: 'info', message: 'CHECKOUT - apply coupon success.', tester: server.userId });
                console.log("CHECKOUT - apply coupon success.");
                value = [ "", "", "info", "apply coupon success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value); 
            } 
        } catch (error) {
            logger.logger.log({ level: 'error', message: error, tester: server.userId });
            console.log(error);
            value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value); 
        }

        await driver.executeScript("return document.getElementsByClassName('shipping-calculator-button')[0].click()");
        
        await driver.findElement(By.id("select2-calc_shipping_country-container")).click();
        await driver.sleep(1000);
        let country = await driver.executeScript("return document.getElementsByClassName('select2-search__field')[0]");
        country.sendKeys("united states" + Key.ENTER);
        await driver.sleep(1000);

        await driver.findElement(By.id("select2-calc_shipping_state-container")).click();
        await driver.sleep(1000);
        let state = await driver.executeScript("return document.getElementsByClassName('select2-search__field')[0]");
        state.sendKeys("arizona" + Key.ENTER);
        await driver.sleep(1000);

        await driver.findElement(By.id("calc_shipping_city")).sendKeys(Key.CONTROL, "a" + Key.DELETE); 
        await driver.findElement(By.id("calc_shipping_city")).sendKeys("Scottsdale"); 
        await driver.sleep(1000);

        await driver.findElement(By.id("calc_shipping_postcode")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
        await driver.findElement(By.id("calc_shipping_postcode")).sendKeys("85257");
        await driver.sleep(1000);

        await driver.findElement(By.name("calc_shipping")).click();

        await driver.sleep(2000);

        await driver.executeScript("return document.getElementsByClassName('checkout-button button alt wc-forward')[0].click()");

        logger.logger.log({ level: 'info', message: 'CHECKOUT - checkout page success.', tester: server.userId });
        console.log("CHECKOUT - checkout page success.");
        value = [ "", "", "info", "checkout page success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value); 
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);     
    }

    await driver.sleep(3000);

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
        await driver.sleep(1000);
        let country = await driver.executeScript("return document.getElementsByClassName('select2-search__field')[0]");
        country.sendKeys("united states" + Key.ENTER);
        await driver.sleep(3000);

        await driver.findElement(By.id("billing_address_1")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
        await driver.findElement(By.id("billing_address_1")).sendKeys("7620 E McKellips Rd");
        await driver.sleep(1000);

        await driver.findElement(By.id("billing_city")).sendKeys(Key.CONTROL, "a" + Key.DELETE);
        await driver.findElement(By.id("billing_city")).sendKeys("Scottsdale");
        await driver.sleep(1000);

        await driver.findElement(By.id("select2-billing_state-container")).click();
        await driver.sleep(1000);
        let state = await driver.executeScript("return document.getElementsByClassName('select2-search__field')[0]");
        state.sendKeys("arizona" + Key.ENTER);
        await driver.sleep(1000);

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

        logger.logger.log({ level: 'info', message: 'CHECKOUT - checkout form fill in success.', tester: server.userId });
        console.log("CHECKOUT - checkout form fill in success.");
        value = [ "", "", "info", "checkout form fill in success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value); 
    } catch (error) {
        logger.logger.log({ level: 'error', message: 'CHECKOUT - checkout form fill in failed.', tester: server.userId });
        console.log(error);
        value = [ "", "", "error", 'checkout form fill in failed.', server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value); 
    }

    // add credit card details
    alert("Please input card details.")
    await driver.sleep(20000);


    // track thank you page
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
        logger.logger.log({ level: 'info', message: 'CHECKOUT - list thank you page success.', tester: server.userId });
        console.log("CHECKOUT - list thank you page success.");
        value = [ "", "", "info", "list thank you page success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value); 
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product_name, "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);    
    }

}


module.exports = { checkout };