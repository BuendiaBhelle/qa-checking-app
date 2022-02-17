const {google} = require("googleapis");

const site = "https://sunrisejewelryusa.primeview.com/";
const wp_username = "pvadmin";
const wp_password = "jX6#dN5?oR7#vU5#";
const qa_email = "mbuendia@optimizex.com, qa@primeview.com";
const wp_site = site + "wp-admin";

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


module.exports = { site, wp_username, wp_password, qa_email, wp_site, auth, spreadsheetId, date };
