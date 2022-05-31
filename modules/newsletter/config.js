
const config_server = require("../../config");


var siteUrl = config_server.domain.freddabranyon.live;
var adminUrl = siteUrl + '/wp-admin';
var esReportUrl = '/wp-admin/admin.php?page=es_reports';
var wp_creds_username = config_server.wp_creds.freddabranyon.username;
var wp_creds_password = config_server.wp_creds.freddabranyon.password;
const module_name = "NEWSLETTER";



module.exports = { 
    siteUrl,
    adminUrl,
    esReportUrl,
    wp_creds_username,
    wp_creds_password,
    module_name
};
