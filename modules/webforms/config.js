const {google} = require("googleapis");

let creds_accidentchiropracticaz = {
    username: "pvadmin",
    password: "^24)zwOSdIJsVJVK8K&YASRx",
}

let creds_advancedimagemedspa = {
    username: "pvadmin",
    password: "kT*D3jzk%%ifOcY3N1lbB%sg",
}

let creds_aerialengagement = {
    username: "pvadmin",
    password: "CCa(c@[iDz*8",
}

let creds_americanleatherusa = {
    username: "pvadmin",
    password: "1L$YRb8ovrch5YpiHkYIf9WX",
}

const qa_email = "mbuendia@optimizex.com, qa@primeview.com";

const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
});

const spreadsheetId = "12kLaYAzd0qsJ0v3jDZElfuR1x8GHP56gWG-3zmCf_48";

let monthNames = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12];
let dateObj = new Date();
let month = monthNames[dateObj.getMonth()];
let day = String(dateObj.getDate()).padStart(2, '0');
let year = dateObj.getFullYear();
const date = month  + "/" + day  + '/' + year;


module.exports = { 
    creds_accidentchiropracticaz, 
    creds_advancedimagemedspa, 
    creds_aerialengagement, 
    creds_americanleatherusa, 
    qa_email, 
    auth, 
    spreadsheetId, 
    date 
};
