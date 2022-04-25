const wordpress = require("../wordpress.js");
const webform = require("./form6");

async function index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms) {
    await wordpress.wordpressStart(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, range_recipient, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms);
    await webform.webforms(domain, timestamp, forms, range_thankyou_page, module_name, launch, webforms);
    await wordpress.wordpressEnd(domain, timestamp, forms, range_recipient, module_name, launch, webforms);
}


module.exports = { index };


