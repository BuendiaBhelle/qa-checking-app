const {google} = require("googleapis");
const server_config = require("../../config");


const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
});

const spreadsheetId = "1hu8GFGLvC9W53BFn-eO_fsP--pcqGgF39sajOwam-6I";

let monthNames = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12];
let dateObj = new Date();
let month = monthNames[dateObj.getMonth()];
let day = String(dateObj.getDate()).padStart(2, '0');
let year = dateObj.getFullYear();
const date = month  + "/" + day  + '/' + year;


let wp_creds = {
    sunrisejewelryusa: {
        username: server_config.wp_creds.sunrisejewelryusa.username,
        password: server_config.wp_creds.sunrisejewelryusa.password
    },
    americanleatherusa: {
        username: server_config.wp_creds.americanleatherusa.username,
        password: server_config.wp_creds.americanleatherusa.password
    },
    andresperezjurado: {
        username: server_config.wp_creds.andresperezjurado.username,
        password: server_config.wp_creds.andresperezjurado.password
    },
    randosouthwest: {
        username: server_config.wp_creds.randosouthwest.username,
        password: server_config.wp_creds.randosouthwest.password
    }
}

let domain = {
    sunrisejewelryusa: {
        dev: server_config.domain.sunrisejewelryusa.dev,
        live: server_config.domain.sunrisejewelryusa.live
    },
    americanleatherusa: {
        dev: server_config.domain.americanleatherusa.dev,
        live: server_config.domain.americanleatherusa.live
    },
    andresperezjurado: {
        dev: server_config.domain.andresperezjurado.dev,
        live: server_config.domain.andresperezjurado.live
    },
    randosouthwest: {
        dev: server_config.domain.randosouthwest.dev,
        live: server_config.domain.randosouthwest.live
    }
}

let sheetId = {
    sunrisejewelryusa: 1340779865,
    americanleatherusa: 1204224677,
    andresperezjurado: 830580824,
    randosouthwest: 157692758
}

let ranges = {
    sunrisejewelryusa: "Sunrise Jewelry USA!A2:C2",
    americanleatherusa: "American Leather USA!A2:C2",
    andresperezjurado: "Andres Perez Jurado!A2:C2",
    randosouthwest: "Rando Southwest!A2:C2"
}

let launch = {
    dev: "Pre-launch",
    live: "Post-launch"
}

let range_product_name = {
    sunrisejewelryusa: "Sunrise Jewelry USA!D2:E2",
    americanleatherusa: "American Leather USA!D2:E2",
    andresperezjurado: "Andres Perez Jurado!D2:E2",
    randosouthwest: "Rando Southwest!D2:E2"
}

let range_recipients = {
    sunrisejewelryusa: {
        new_order: "Sunrise Jewelry USA!F2",
        cancelled_order: "Sunrise Jewelry USA!G2",
        failed_order: "Sunrise Jewelry USA!H2"
    },
    americanleatherusa: {
        new_order: "American Leather USA!F2",
        cancelled_order: "American Leather USA!G2",
        failed_order: "American Leather USA!H2"
    },
    andresperezjurado: {
        new_order: "Andres Perez Jurado!F2",
        cancelled_order: "Andres Perez Jurado!G2",
        failed_order: "Andres Perez Jurado!H2"
    },
    randosouthwest: {
        new_order: "Rando Southwest!F2",
        cancelled_order: "Rando Southwest!G2",
        failed_order: "Rando Southwest!H2"
    }
}

let range_coupons = {
    sunrisejewelryusa: "Sunrise Jewelry USA!M2:N2",
    americanleatherusa: "American Leather USA!M2:N2",
    andresperezjurado: "Andres Perez Jurado!M2:N2",
    randosouthwest: "Rando Southwest!M2:N2"
}

let range_thankyou_page = {
    sunrisejewelryusa: "Sunrise Jewelry USA!I2",
    americanleatherusa: "American Leather USA!I2",
    andresperezjurado: "Andres Perez Jurado!I2",
    randosouthwest: "Rando Southwest!I2"
}

const qa_email = "mbuendia@optimizex.com, qa@primeview.com";

const module_name = "CHECKOUT";

const tax_page = "/admin.php?page=wc-settings&tab=tax";

const payments_page = "/admin.php?page=wc-settings&tab=checkout";

const emails_page = "/admin.php?page=wc-settings&tab=email";

const emails_newOrder_page = "/admin.php?page=wc-settings&tab=email&section=wc_email_new_order";

const emails_cancelledOrder_page = "/admin.php?page=wc-settings&tab=email&section=wc_email_cancelled_order";

const emails_failedOrder_page = "/admin.php?page=wc-settings&tab=email&section=wc_email_failed_order";

const coupons_page = "/edit.php?post_type=shop_coupon";

const pricesEnteredWithTax_script = "return document.getElementsByName('woocommerce_prices_include_tax')[1].checked";

const displayPricesInTheShop_script = "return document.getElementById('select2-woocommerce_tax_display_shop-container').title";

const displayPricesDuringCartAndCheckout_script = "return document.getElementById('select2-woocommerce_tax_display_cart-container').title";

let product = {
    sunrisejewelryusa: {
            product1: "White Buffalo Round Silver Earrings",
            product2: "Tear Shaped White Buffalo Silver Ring"
    },
    americanleatherusa: {
        product1: "Python Card Holder",
        product2: "Ostrich Legs Card Holder"
    },
    andresperezjurado: {
        product1: "Red Flowers Coffee Mug"
    },
    randosouthwest: {
        product1: "Regular Seasoning (2.5 ounce)"
    }
}

let product_link = {
    sunrisejewelryusa: {
            product1: "product/white-buffalo-round-silver-earrings/",
            product2: "product/tear-shaped-white-buffalo-silver-ring/"
    },
    americanleatherusa: {
        product1: "product/python-card-holder/",
        product2: "product/ostrich-legs-card-holder/"
    },
    andresperezjurado: {
        product1: "shop/red-flowers-coffee-mug/",
    },
    randosouthwest: {
        product1: "product/regular-seasoning-2-5-ounce/",
    }
}



module.exports = { 
    qa_email, 
    auth, 
    spreadsheetId, 
    date, 
    module_name,
    launch,
    range_product_name,
    product,
    domain,
    wp_creds,
    tax_page,
    payments_page,
    emails_page,
    pricesEnteredWithTax_script,
    displayPricesInTheShop_script,
    displayPricesDuringCartAndCheckout_script,
    sheetId,
    ranges,
    range_recipients,
    emails_newOrder_page,
    emails_cancelledOrder_page,
    emails_failedOrder_page,
    coupons_page,
    range_coupons,
    range_thankyou_page,
    product_link
};
