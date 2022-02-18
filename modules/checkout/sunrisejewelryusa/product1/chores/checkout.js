const {Builder, By} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../config");

const site = config.site;
const wp_username = config.creds_sunrisejewelryusa.username;
const wp_password = config.creds_sunrisejewelryusa.password;
const auth = config.auth;
const spreadsheetId = config.spreadsheetId;


async function checkout(username, password, email) {
    console.log("username2: " + username);
    console.log("password2: " + password);

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })

    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get(site);

    // site login
    try {
        await driver.executeScript("return document.getElementsByTagName('a')[36].click()");
        if ((username) && (password)) {
            console.log("creds was edited.");
            await driver.findElement(By.id("username")).sendKeys(username);
            await driver.findElement(By.id("password")).sendKeys(password);
            await driver.findElement(By.name("login")).click();
        } else {
            console.log("creds was not edited.");
            await driver.findElement(By.id("username")).sendKeys(wp_username);
            await driver.findElement(By.id("password")).sendKeys(wp_password);
            await driver.findElement(By.name("login")).click();
        }
    } catch (error) {
        console.log(error);
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
        }
    } catch (error) {
        console.log(error);
    }

    // add to cart
    try {
        await driver.executeScript("return document.getElementsByTagName('img')[1].click()");
        await driver.executeScript("return document.getElementsByClassName('side-card-header')[4].click()");
        await driver.findElement(By.name("orderby")).sendKeys('ssss');
        await driver.executeScript("return document.getElementsByClassName('button product_type_simple add_to_cart_button ajax_add_to_cart')[0].click()");
        await driver.sleep(3000);

        // go to cart
        await driver.executeScript("return document.getElementsByTagName('i')[0].click()");
        await driver.findElement(By.id("customer_notes_text")).sendKeys("Please take note that this is a test purchase. Disregard or do not complete the purchase. Thank you.");             
        await driver.executeScript("return document.getElementsByClassName('checkout-button button alt wc-forward')[0].click()");
        // await driver.sleep(3000);
    } catch (error) {
        console.log(error);
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
        
        await driver.executeScript("document.getElementsByName('wc-stripe-payment-token')[0].click()");

        let payment_method = await driver.executeScript("return document.getElementsByClassName('woocommerce-SavedPaymentMethods-token')[0].childNodes[3].innerHTML");
        console.log("payment_method: " + payment_method);

        if (payment_method === "Visa ending in 4242 (expires 07/24)") {
            console.log("checkout success");
            await driver.executeScript("return document.getElementsByClassName('button alt')[0].click()");
        }
        else {
            console.log("checkout fail");
        }
    } catch (error) {
        console.log();
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
        console.log("success.");
    } catch (error) {
        console.log(error);
    }

    return true;

}


module.exports = { checkout };