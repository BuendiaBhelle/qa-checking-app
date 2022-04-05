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
    ewingconstruction: {
        username: "pvadmin",
        password: "pXq9]r?4+HNh"
    },
    indinspect: {
        username: "pvadmin",
        password: "ChtB1]>Q3Zzw"
    },
    judefrancesjewelry: {
        username: "pvadmin",
        password: "%XsJl4Uu%/]5"   
    },
    kyrenefamilydentistry: {
        username: "pvadmin",
        password: "JQR&H*i$fUA%wCcit@!TP8Jh"
        // password: "admin"
    },
    optimizex: {
        username: "oxadmin",
        password: "SwP!Dw3iJwqj#dOj%ZVVV7a7"
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
    ewingconstruction: {
        form1: "contact/"
    },
    indinspect: {
        form1: "contact/",
        form2: "services-offered/specialty-testing/"
    },
    judefrancesjewelry: {
        form1: "returns/",
        form2: "jewelry-repairs/",
        form3: "replacing-lost-jewelry/",
        form4: "product-inquiry/",
        form5: "contact/",
        form6: "feedback/"
    },
    kyrenefamilydentistry: {
        form1: "/",
        form2: "/schedule-an-appointment/"
    },
    optimizex: {
        form1: "/",
        form2: "search-engine-optimization/",
        form3: "contact-us/"
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

const module_name = "WEB FORMS";

let launch = {
    dev: "dev",
    live: "live"
}

let webforms = {
    accidentchiropracticaz: {
        dev: {
            form1: "Schedule an Appointment - Home",
            form2: "Schedule an Appointment - Sidebar",
        },
        live: {
            form1: "Schedule an Appointment - Home",
            form2: "Schedule an Appointment - Sidebar",
        }
    },
    advancedimagemedspa: {
        dev: {
            form1: "Contact Form ( Contact Us Page )",
            form2: "Homepage Contact Us",
            form3: "Request Form ( Sidebar ) - New Layout",
        },
        live: {
            form1: "Contact Form ( Contact Us Page )",
            form2: "Homepage Contact Us",
            form3: "Request Form ( Sidebar ) - New Layout",
        }
    },
    aerialengagement: {
        dev: {
            form1: "Contact Us"
        },
        live: {
            form1: "Contact Us"
        }
    },
    americanleatherusa: {
        dev: {
            form1: "Contact form 1"
        },
        live: {
            form1: "Contact form 1"
        }
    },
    andresperezjurado: {
        dev: {
            form1: "Custom Inquiry"
        },
        live: {
            form1: "Custom Inquiry"
        }
    },
    azdoordoctor: {
        dev: {
            form1: "Contact Us",
            form2: "Contact Us | Sidebar",
            form3: "Schedule an Appointment"
        },
        live: {
            form1: "Contact Us",
            form2: "Contact Us | Sidebar",
            form3: "Schedule an Appointment"
        }
    },
    biltmoreloanandjewelry: {
        dev: {
            form1: "Request an Appraisal - Sell Your Jewelry",
            form2: "Request an Appraisal - Get a Loan",
            form3: "Book an Appointment (SB)",
            form4: "Contact form 1",
            form5: "Request an Appraisal | Landing Page 2019",
            form6: "Book an Appointment (Page)"
        },
        live: {
            form1: "Request an Appraisal - Sell Your Jewelry",
            form2: "Request an Appraisal - Get a Loan",
            form3: "Book an Appointment (SB)",
            form4: "Contact form 1",
            form5: "Request an Appraisal | Landing Page 2019",
            form6: "Book an Appointment (Page)"
        }
    },
    buckeyederm: {
        dev: {
            form1: "Schedule an Appointment"
        },
        live: {
            form1: "Schedule an Appointment"
        }
    },
    canyonfallshairextensioncompany: {
        dev1: {
            form1: "Request an Appointment",
            form2: "Return Request Form"
        },
        dev2: {
            form1: "Request an Appointment",
            form2: "Return Request Form"
        }
    },
    crexendo: {
        dev: {
            form1: "Sign-Up for your Free Demonstration",
            form2: "Talk to a Consultant Form",
            form3: "Personalized Quote Form Step 1",
            form4: "Refer a Business",
            form5: "Register To Become A Channel Partner"
        },
        live: {
            form1: "Sign-Up for your Free Demonstration",
            form2: "Talk to a Consultant Form",
            form3: "Personalized Quote Form Step 1",
            form4: "Refer a Business",
            form5: "Register To Become A Channel Partner"
        }
    },
    ewingconstruction: {
        dev: {
            form1: "Contact Us"
        },
        live: {
            form1: "Contact Us"
        }
    },
    indinspect: {
        dev: {
            form1: "Contact Us",
            form2: "Request Information"
        },
        live: {
            form1: "Contact Us"
        }
    },
    judefrancesjewelry: {
        dev: {
            form1: "Returns",
            form2: "Repairs",
            form3: "Replacing Lost Jewelry",
            form4: "Product Inquiry",
            form5: "General Questions",
            form6: "Feedback"
        },
        live: {
            form1: "Returns",
            form2: "Repairs",
            form3: "Replacing Lost Jewelry",
            form4: "Product Inquiry",
            form5: "General Questions",
            form6: "Feedback"
        }    
    },
    kyrenefamilydentistry: {
        dev: {
            form1: "Quick Contact",
            form2: "Schedule an Appointment"
        },
        live: {
            form1: "Quick Contact",
            form2: "Schedule an Appointment"
        }
    },
    optimizex: {
        dev: {
            form1: "SEO Quote",
            form2: "Sidebar - SEO Quote",
            form3: "Contact Us - Page"
        },
        live: {
            form1: "SEO Quote",
            form2: "Sidebar - SEO Quote",
            form3: "Contact Us - Page"
        }
    }
}



module.exports = { 
    credentials,
    forms,
    qa_email, 
    auth, 
    spreadsheetId, 
    date,
    module_name,
    launch,
    webforms
};
