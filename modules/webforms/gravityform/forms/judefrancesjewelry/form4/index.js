const wordpress = require("../../../wordpress");
const webform = require("./form4");


async function index(date, domain, checkbox, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, settings_arr, admin_notif, qa_notif, range_recipient, range_thankyou_page, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page) {
    await wordpress.wordpressStart(date, domain, username, password, email, timestamp, wp_creds_username, wp_creds_password, forms, sheetId, ranges, wp_menu_name, row_title, settings_arr, admin_notif, qa_notif, range_recipient, qa_email, module_name, launch, contact_form_name, contact_form_shortcode, webforms, form_page);
    await webform.webforms(domain, timestamp, forms, range_thankyou_page, module_name, launch, webforms);
    await wordpress.wordpressEnd(domain, username, password, timestamp, wp_creds_username, wp_creds_password, forms, wp_menu_name, row_title, settings_arr, module_name, launch, webforms);
}

module.exports = { index };