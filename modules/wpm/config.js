const monthNames = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12];
const dateObj = new Date();
const month = monthNames[dateObj.getMonth()];
const day = String(dateObj.getDate()).padStart(2, '0');
const year = dateObj.getFullYear();
const output = month  + "/" + day  + '/' + year;

var hours = dateObj.getHours();
var minutes = dateObj.getMinutes();
var ampm = hours >= 12 ? 'pm' : 'am';
hours = hours % 12;
hours = hours ? hours : 12;
minutes = minutes < 10 ? '0'+minutes : minutes;
var strTime = hours + ':' + minutes + ' ' + ampm;

const sheet_id = 282054145;

const module_name = "WPM";

const startRowIndex = 6;

const endRowIndex = 25;

const startColumnIndex = 0;

let site_names = [
    "ACC",
    "BLJ",
    "RLX",
    "AIMS",
    "OX",
    "PMA",
    "PV",
    "LIG",
    "GPS",
    "NHU",
    "FB",
    "SJ",
    "AZRS",
    "KFD",
    "ISC",
    "AL",
    "SCAZ",
    "IN",
    "NP",
    "FRL",
    "BD",
    "CFHEC",
    "APJ"
]

let score = ['C', 'D', 'E', 'F'];

const list_sites_range = "Summary!A7:Q25";

const display_sites_range = "Summary!A7:Q25";


module.exports = { 
    output, 
    strTime,
    sheet_id,
    module_name,
    startRowIndex,
    endRowIndex,
    startColumnIndex,
    site_names,
    score,
    list_sites_range,
    display_sites_range
};