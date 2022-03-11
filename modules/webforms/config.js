const {google} = require("googleapis");

let credentials = {
    accidentchiropracticaz: {
        username: "pvadmin",
        password: "^24)zwOSdIJsVJVK8K&YASRx"
    },
    advancedimagemedspa: {
        username: "pvadmin",
        password: "kT*D3jzk%%ifOcY3N1lbB%sg"
    },
    aerialengagement: {
        username: "pvadmin",
        password: "CCa(c@[iDz*8"
    },
    americanleatherusa: {
        username: "pvadmin",
        password: "1L$YRb8ovrch5YpiHkYIf9WX"
    },
    andresperezjurado: {
        username: "pvadmin",
        password: "t1tqAV@I}S>w"
    },
    azdoordoctor: {
        username: "pvadmin",
        password: "m*8ggXsJk7Py3Q*Ml)l0Z4WV"
    },
    biltmoreloanandjewelry: {
        username: "pvadmin",
        password: "%*j*4F^iQPLGi7e2aXV!3smf"
    },
    buckeyederm: {
        username: "pvadmin",
        password: "wd85cj5>}MF~"
    },
    canyonfallshairextensioncompany: {
        username: "devadmin",
        password: "p2@iH&8Lo1JHv02"
    },
    crexendo: {
        username: "pvadmin",
        password: "S4INhCIRoGpIfI*ss8KGXLmN"
    },
    indinspect: {
        username: "pvadmin",
        password: "ChtB1]>Q3Zzw"
    }
}


let forms = {
    accidentchiropracticaz: {
        form1: "about-us/",
        form2: "contact/"
    },
    advancedimagemedspa: {
        form1: "contact/",
        form2: "/",
        form3_dev: "boost-your-beauty-club/",
        form3_live: "join-our-clubs/"
    },
    aerialengagement: {
        form1: "contact-us/"
    },
    americanleatherusa: {
        form1: "contact-us/"
    },
    andresperezjurado: {
        form1: "custom-inquiry/"
    },
    azdoordoctor: {
        form1: "contact-us/",
        form2: "areas-we-service/",
        form3: "schedule-an-appointment/"
    },
    biltmoreloanandjewelry: {
        form1: "sell-luxury-items/",
        form2: "get-a-loan/",
        form3: "how-it-works-4/",
        form4: "contact-us/",
        form5: "collateral-loans-in-phoenix/",
        form6: "get-an-appraisal/"
    },
    buckeyederm: {
        form1: "contact/"
    },
    canyonfallshairextensioncompany: {
        form1: "request-an-appointment/",
        form2: "return-request-form/"
    },
    crexendo: {
        form1: "schedule-a-free-demo/",
        form2: "talk-to-consultant/",
        form3: "get-free-quote/",
        form4: "refer-a-business/",
        form5: "partner-registration/",
    },
    indinspect: {
        form1: "contact/",
        form2: "services-offered/specialty-testing/"
    }
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
    credentials,
    forms,
    qa_email, 
    auth, 
    spreadsheetId, 
    date 
};
