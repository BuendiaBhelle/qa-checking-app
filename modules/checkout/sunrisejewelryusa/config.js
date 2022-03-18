const {google} = require("googleapis");

// const site = "https://sunrisejewelryusa.primeview.com/";

let creds_sunrisejewelryusa = {
    username: "pvadmin",
    password: "jX6#dN5?oR7#vU5#",
}

const qa_email = "mbuendia@optimizex.com, qa@primeview.com";

// const wp_site = site + "wp-admin";

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

const module_name = "CHECKOUT";

let launch = {
    dev: "dev",
    live: "live"
}

let product = {
    site: {
        site1: {
            product1: "White Buffalo Round Silver Earrings",
            product2: "Kingman Turquoise Bracelet"
        }
    }
}



module.exports = { 
    creds_sunrisejewelryusa, 
    qa_email, 
    auth, 
    spreadsheetId, 
    date, 
    module_name,
    launch,
    product
};
