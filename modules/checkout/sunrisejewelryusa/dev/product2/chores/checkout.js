const {Builder, By} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../../config");
const logger = require('../../../../../../middleware/logger.js');
const server = require('../../../../../../server.js');
const sheet = require('../../../../../../middleware/gsheet.js');

const wp_username = config.creds_sunrisejewelryusa.username;
const wp_password = config.creds_sunrisejewelryusa.password;
const auth = config.auth;
const spreadsheetId = config.spreadsheetId;
const module_name = config.module_name;
const launch = config.launch.dev;
const product = config.product.site.site1.product2;


async function checkout(domain, username, password, email, timestamp) {
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })

    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get(domain);

    // site login
    try {
        await driver.executeScript("return document.getElementsByTagName('a')[36].click()");
        if ((username) && (password)) {
            await driver.findElement(By.id("username")).sendKeys(username);
            await driver.findElement(By.id("password")).sendKeys(password);
            await driver.findElement(By.name("login")).click();
            logger.logger.log({ level: 'info', message: 'CHECKOUT - edit credentials success.', tester: server.userId });
            console.log("CHECKOUT - edit credentials success.");
            value = [ "", "", "info", "edit credentials success.", server.userId, timestamp, module_name, domain, username + "\n" + password, "", "", launch, product, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        } else {
            await driver.findElement(By.id("username")).sendKeys(wp_username);
            await driver.findElement(By.id("password")).sendKeys(wp_password);
            await driver.findElement(By.name("login")).click();
            logger.logger.log({ level: 'info', message: 'CHECKOUT - same credentials.', tester: server.userId });
            console.log("CHECKOUT - same credentials.");
            value = [ "", "", "info", "same credentials.", server.userId, timestamp, module_name, domain, wp_username + "\n" + wp_password, "", "", launch, product, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value); 
    }

    // check if cart is empty
    try {
        await driver.executeScript("return document.getElementsByClassName('wpmenucart-icon-shopping-cart-0')[0].click()");
        let items = await driver.executeScript("return document.getElementsByClassName('remove-item')[0]");

        if (items) {
            console.log("cart not empty.");
            let items_count = await driver.executeScript("return document.getElementsByClassName('remove-item').length");
            for (let index = items_count; index > 0; index--) {
                var index_updated = index-1;
                await driver.executeScript("return document.getElementsByClassName('remove-item')[" + index_updated + "].click()");
            }
            logger.logger.log({ level: 'info', message: 'CHECKOUT - empty cart success.', tester: server.userId });
            console.log("CHECKOUT - empty cart success.");
            value = [ "", "", "info", "empty cart success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    // add to cart
    try {
        await driver.executeScript("return document.getElementsByTagName('img')[1].click()");
        await driver.executeScript("return document.getElementsByClassName('side-card-header')[0].click()");
        await driver.findElement(By.name("orderby")).sendKeys('ssss');
        let orderby = await driver.executeScript("return document.getElementsByName('orderby')[0].selectedOptions[0].innerHTML");
        if (orderby === "Sort by price: low to high") {
            logger.logger.log({ level: 'info', message: 'CHECKOUT - sort success.', tester: server.userId });
            console.log("CHECKOUT - sort success.");
            value = [ "", "", "info", "sort success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
            await driver.executeScript("return document.getElementsByClassName('button product_type_simple add_to_cart_button ajax_add_to_cart')[0].click()");
            await driver.sleep(3000);
        } else {
            logger.logger.log({ level: 'error', message: 'CHECKOUT - sort failed.', tester: server.userId });
            console.log("CHECKOUT - sort failed.");
            value = [ "", "", "error", "sort failed.", server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }
        
        // go to cart
        await driver.executeScript("return document.getElementsByTagName('i')[0].click()");
        let product_name = await driver.executeScript("return document.getElementsByClassName('product-item-name')[0].innerHTML");

        // track product name
        try {
            await googleSheets.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: "Sunrise Jewelry USA!E2",
                valueInputOption: "USER_ENTERED",
                resource: {
                    values: [
                        [product_name]
                    ]
                }
            });
            logger.logger.log({ level: 'info', message: 'CHECKOUT - list product name success.', tester: server.userId });
            console.log("CHECKOUT - list product name success.");
            value = [ "", "", "info", "list product name success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value); 
        } catch (error) {
            logger.logger.log({ level: 'error', message: error, tester: server.userId });
            console.log(error);
            value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);      
        }

        await driver.findElement(By.id("customer_notes_text")).sendKeys("Please take note that this is a test purchase. Disregard or do not complete the purchase. Thank you.");             
        await driver.executeScript("return document.getElementsByClassName('checkout-button button alt wc-forward')[0].click()");
        // await driver.sleep(3000);
        logger.logger.log({ level: 'info', message: 'CHECKOUT - add to cart success.', tester: server.userId });
        console.log("CHECKOUT - add to cart success.");
        value = [ "", "", "info", "add to cart success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value); 
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value); 
    }

    // checkout
    try {
        // get coupon code
        let coupon_code = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "Sunrise Jewelry USA!M2",
        });

        let coupon = coupon_code.data.values[0][0];
        console.log("coupon: " + coupon);

        await driver.findElement(By.id("coupon_code")).sendKeys(coupon);
        await driver.executeScript("return document.getElementsByName('apply_coupon')[0].click()");
        await driver.sleep(3000);
        
        let woocommerce_error = await driver.executeScript("return document.getElementsByClassName('woocommerce-error')[0]");        
        let woocommerce_message = await driver.executeScript("return document.getElementsByClassName('woocommerce-message')[0]");
        
        if (woocommerce_error) {
            logger.logger.log({ level: 'error', message: 'CHECKOUT - apply coupon failed.', tester: server.userId });
            console.log("CHECKOUT - apply coupon failed.");
            value = [ "", "", "error", "apply coupon failed.", server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value); 
        }
        else if (woocommerce_message) {
            logger.logger.log({ level: 'info', message: 'CHECKOUT - apply coupon success.', tester: server.userId });
            console.log("CHECKOUT - apply coupon success.");
            value = [ "", "", "info", "apply coupon success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value); 
        } 

        await driver.sleep(3000);
        await driver.executeScript("return document.getElementsByName('wc-stripe-payment-token')[0].click()");

        let payment_method = await driver.executeScript("return document.getElementsByClassName('woocommerce-SavedPaymentMethods-token')[0].childNodes[3].innerHTML");
        console.log("payment_method: " + payment_method);

        if (payment_method === "Visa ending in 4242 (expires 07/24)") {
            await driver.executeScript("return document.getElementsByClassName('button alt')[0].click()");
            logger.logger.log({ level: 'info', message: 'CHECKOUT - checkout success.', tester: server.userId });
            console.log("CHECKOUT - checkout success.");
            value = [ "", "", "info", "checkout success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
        } else {
            logger.logger.log({ level: 'error', message: 'CHECKOUT - checkout failed.', tester: server.userId });
            console.log("CHECKOUT - checkout failed.");
            value = [ "", "", "error", "checkout failed.", server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value); 
        }
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
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
            range: "Sunrise Jewelry USA!I2",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [ty_page_url]
                ]
            }
        });
        logger.logger.log({ level: 'info', message: 'CHECKOUT - list thank you page success.', tester: server.userId });
        console.log("CHECKOUT - list thank you page success.");
        value = [ "", "", "info", "list thank you page success.", server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value); 
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, domain, "", "", "", launch, product, "", "", "" ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }

    return true;

}


module.exports = { checkout };