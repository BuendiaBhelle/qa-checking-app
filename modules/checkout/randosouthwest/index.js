const wordpress = require("../wordpress");
const checkout = require("./checkout");

async function index(domain, username, password, email, module_name, launch, range_product_name, timestamp, wp_creds_username, wp_creds_password, tax_page, payments_page, emails_page, pricesEnteredWithTax_script, displayPricesInTheShop_script, displayPricesDuringCartAndCheckout_script, product_name, sheetId, ranges, range_recipients_newOrder, range_recipients_cancelledOrder, range_recipients_failedOrder, emails_newOrder_page, emails_cancelledOrder_page, emails_failedOrder_page, coupons_page, range_coupons, range_thankyou_page, product_link, co_site) {
    await wordpress.wordpressStart(domain, username, password, email, module_name, launch, timestamp, wp_creds_username, wp_creds_password, tax_page, payments_page, emails_page, pricesEnteredWithTax_script, displayPricesInTheShop_script, displayPricesDuringCartAndCheckout_script, product_name, sheetId, ranges, range_recipients_newOrder, range_recipients_cancelledOrder, range_recipients_failedOrder, emails_newOrder_page, emails_cancelledOrder_page, emails_failedOrder_page, coupons_page, range_coupons);
    await checkout.checkout(domain, username, password, module_name, launch, range_product_name, timestamp, wp_creds_username, wp_creds_password, product_name, range_coupons, range_thankyou_page, product_link, co_site);
    await wordpress.wordpressEnd(domain, module_name, launch, timestamp, payments_page, emails_page, product_name, range_recipients_newOrder, range_recipients_cancelledOrder, range_recipients_failedOrder, emails_newOrder_page, emails_cancelledOrder_page, emails_failedOrder_page);
}


module.exports = { index };


