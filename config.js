let monthNames = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12];
let dateObj = new Date();
let month = monthNames[dateObj.getMonth()];
let day = String(dateObj.getDate()).padStart(2, '0');
let year = dateObj.getFullYear();
const date = month  + "/" + day  + '/' + year;

const sites = [
    "accidentchiropracticaz",
    "advancedimagemedspa",
    "aerialengagement",
    "americanleatherusa",
    "andresperezjurado",
    "azdoordoctor",
    "biltmoreloanandjewelry",
    "buckeyederm",
    "canyonfallshairextensioncompany",
    "crexendo",
    "ewingconstruction",
    "indinspect",
    "judefrancesjewelry",
    "kyrenefamilydentistry",
    "optimizex"
]

let wp_creds = {
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

let domain = {
    accidentchiropracticaz: {
        dev: "https://accidentchiropracticazdev.primeview.com/",
        live: "https://www.accidentchiropracticaz.com/"
    },
    advancedimagemedspa: {
        dev: "https://advancedimagemedspadev.primeview.com/",
        live: "https://www.advancedimagemedspa.com/"
    },
    aerialengagement: {
        dev: "https://aerialengagementdev.primeview.com/",
        live: "https://www.aerialengagement.com/"
    },
    americanleatherusa: {
        dev: "https://americanleatherusa.primeview.com/",
        live: "https://www.americanleatherusa.com/"
    },
    andresperezjurado: {
        dev: "https://andresperezjurado.primeview.com/",
        live: "https://www.andresperezjurado.com/"
    },
    azdoordoctor: {
        dev: "https://azdoordoctor.primeview.com/",
        live: "https://www.azdoordoctor.com/"
    },
    biltmoreloanandjewelry: {
        dev: "https://biltmorelandj.primeview.com/",
        live: "https://www.biltmoreloanandjewelry.com/"
    },
    buckeyederm: {
        dev: "https://buckeyedermdev.primeview.com/",
        live: "https://www.buckeyederm.com/"
    },
    canyonfallshairextensioncompany: {
        dev: "https://thehairextensioncompany.primeview.com/",
        live: "https://www.thehairextensioncompany.com/"
    },
    crexendo: {
        dev: "https://crexendoredesign.primeview.com/",
        live: "https://www.crexendo.com/"
    },
    ewingconstruction: {
        dev: "https://ewingconstructiondev.primeview.com/",
        live: "https://www.ewingconstruction.com/"
    },
    indinspect: {
        dev: "https://indinspectdev.primeview.com/",
        live: "https://www.indinspect.com/"
    },
    judefrancesjewelry: {
        dev: "https://dev.judefrances.com/",
        live: ""
    },
    kyrenefamilydentistry: {
        dev: "https://kyrenefamilydentistry.primeview.com/",
        live: "https://www.kyrenefamilydentistry.com/"
    },
    optimizex: {
        dev: "https://optimizexdev.primeview.com/",
        live: ""
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

let sheetId = {
    accidentchiropracticaz: 1564137953,
    advancedimagemedspa: 249332906,
    aerialengagement: 996083886,
    americanleatherusa: 1193745199,
    andresperezjurado: 234319856,
    azdoordoctor: 1496243836,
    biltmoreloanandjewelry: 1843646550,
    buckeyederm: 1806416091,
    canyonfallshairextensioncompany: 859661691,
    crexendo: 285598398,
    ewingconstruction: 2001830382,
    indinspect: 1563257098,
    judefrancesjewelry: 1676737950,
    kyrenefamilydentistry: 1779652858,
    optimizex: 610692665
}

let range = [
    sites[0] = [
        [
            "Accident Chiropractic!Q2",
            "Accident Chiropractic!A2",
            "Accident Chiropractic!B2",
            "Accident Chiropractic!C2",
            "Accident Chiropractic!C3",
            "Accident Chiropractic!D2",
            "Accident Chiropractic!E2",
            "Accident Chiropractic!G2",
        ]
    ],
    sites[1] = [
        [
            "Advance Image Med Spa!Q2",
            "Advance Image Med Spa!A2",
            "Advance Image Med Spa!B2",
            "Advance Image Med Spa!C2",
            "Advance Image Med Spa!C3",
            "Advance Image Med Spa!D2",
            "Advance Image Med Spa!E2",
            "Advance Image Med Spa!G2",
        ]
    ],
    sites[2] = [
        [
            "Aerial Engagement!Q2",
            "Aerial Engagement!A2",
            "Aerial Engagement!B2",
            "Aerial Engagement!C2",
            "Aerial Engagement!C3",
            "Aerial Engagement!D2",
            "Aerial Engagement!E2",
            "Aerial Engagement!G2",
        ]
    ],
    sites[3] = [
        [
            "American Leather!Q2",
            "American Leather!A2",
            "American Leather!B2",
            "American Leather!C2",
            "American Leather!C3",
            "American Leather!D2",
            "American Leather!E2",
            "American Leather!G2",
        ]
    ],
    sites[4] = [
        [
            "Andres Perez Jurado!Q2",
            "Andres Perez Jurado!A2",
            "Andres Perez Jurado!B2",
            "Andres Perez Jurado!C2",
            "Andres Perez Jurado!C3",
            "Andres Perez Jurado!D2",
            "Andres Perez Jurado!E2",
            "Andres Perez Jurado!G2",
        ]
    ],
    sites[5] = [
        [
            "Azdoordoctor!Q2",
            "Azdoordoctor!A2",
            "Azdoordoctor!B2",
            "Azdoordoctor!C2",
            "Azdoordoctor!C3",
            "Azdoordoctor!D2",
            "Azdoordoctor!E2",
            "Azdoordoctor!G2",
        ]
    ],
    sites[6] = [
        [
            "Biltmore!Q2",
            "Biltmore!A2",
            "Biltmore!B2",
            "Biltmore!C2",
            "Biltmore!C3",
            "Biltmore!D2",
            "Biltmore!E2",
            "Biltmore!G2",
        ]
    ],
    sites[7] = [
        [
            "Buckeye Derm!Q2",
            "Buckeye Derm!A2",
            "Buckeye Derm!B2",
            "Buckeye Derm!C2",
            "Buckeye Derm!C3",
            "Buckeye Derm!D2",
            "Buckeye Derm!E2",
            "Buckeye Derm!G2",
        ]
    ],
    sites[8] = [
        [
            "Canyon Falls Hair Extension Company!Q2",
            "Canyon Falls Hair Extension Company!A2",
            "Canyon Falls Hair Extension Company!B2",
            "Canyon Falls Hair Extension Company!C2",
            "Canyon Falls Hair Extension Company!C3",
            "Canyon Falls Hair Extension Company!D2",
            "Canyon Falls Hair Extension Company!E2",
            "Canyon Falls Hair Extension Company!G2",
        ]
    ],
    sites[9] = [
        [
            "Crexendo!Q2",
            "Crexendo!A2",
            "Crexendo!B2",
            "Crexendo!C2",
            "Crexendo!C3",
            "Crexendo!D2",
            "Crexendo!E2",
            "Crexendo!G2",
        ]
    ],
    sites[10] = [
        [
            "Ewing Construction!Q2",
            "Ewing Construction!A2",
            "Ewing Construction!B2",
            "Ewing Construction!C2",
            "Ewing Construction!C3",
            "Ewing Construction!D2",
            "Ewing Construction!E2",
            "Ewing Construction!G2",
        ]
    ],
    sites[11] = [
        [
            "Industrial Inspection & Consulting!Q2",
            "Industrial Inspection & Consulting!A2",
            "Industrial Inspection & Consulting!B2",
            "Industrial Inspection & Consulting!C2",
            "Industrial Inspection & Consulting!C3",
            "Industrial Inspection & Consulting!D2",
            "Industrial Inspection & Consulting!E2",
            "Industrial Inspection & Consulting!G2",
        ]
    ],
    sites[12] = [
        [
            "Jude Frances Jewelry!Q2",
            "Jude Frances Jewelry!A2",
            "Jude Frances Jewelry!B2",
            "Jude Frances Jewelry!C2",
            "Jude Frances Jewelry!C3",
            "Jude Frances Jewelry!D2",
            "Jude Frances Jewelry!E2",
            "Jude Frances Jewelry!G2",
        ]
    ],
    sites[13] = [
        [
            "Kyrene Family Dentistry!Q2",
            "Kyrene Family Dentistry!A2",
            "Kyrene Family Dentistry!B2",
            "Kyrene Family Dentistry!C2",
            "Kyrene Family Dentistry!C3",
            "Kyrene Family Dentistry!D2",
            "Kyrene Family Dentistry!E2",
            "Kyrene Family Dentistry!G2",
        ]
    ],
    sites[14] = [
        [
            "OptimizeX!Q2",
            "OptimizeX!A2",
            "OptimizeX!B2",
            "OptimizeX!C2",
            "OptimizeX!C3",
            "OptimizeX!D2",
            "OptimizeX!E2",
            "OptimizeX!G2",
        ]
    ]
]

let ranges = {
    accidentchiropracticaz: range[0][0],
    advancedimagemedspa: range[1][0],
    aerialengagement: range[2][0],
    americanleatherusa: range[3][0],
    andresperezjurado: range[4][0],
    azdoordoctor: range[5][0],
    biltmoreloanandjewelry: range[6][0],
    buckeyederm: range[7][0],
    canyonfallshairextensioncompany: range[8][0],
    crexendo: range[9][0],
    ewingconstruction: range[10][0],
    indinspect: range[11][0],
    judefrancesjewelry: range[12][0],
    kyrenefamilydentistry: range[13][0],
    optimizex: range[14][0]
}

let launch = {
    dev: "Pre-launch",
    live: "Post-launch"
}

let contact_form_name = {
    accidentchiropracticaz: {
        form1: "Schedule an Appointment - Home",
        form2: "Schedule an Appointment - Sidebar"
    },
    advancedimagemedspa: {
        form1: "Contact Form ( Contact Us Page )",
        form2: "Homepage Contact Us",
        form3: "Request Form ( Sidebar ) - New Layout"
    },
    aerialengagement: {
        form1: "Contact Us"
    },
    americanleatherusa: {
        form1: "Contact form 1"
    },
    andresperezjurado: {
        form1: "Custom Inquiry"
    },
    azdoordoctor: {
        form1: "Contact Us",
        form2: "Contact Us | Sidebar",
        form3: "Schedule an Appointment"
    },
    biltmoreloanandjewelry: {
        form1: "Request an Appraisal - Sell Your Jewelry",
        form2: "Request an Appraisal - Get a Loan",
        form3: "Book an Appointment (SB)",
        form4: "Contact form 1",
        form5: "Request an Appraisal | Landing Page 2019",
        form6: "Book an Appointment (Page)"
    },
    buckeyederm: {
        form1: "Schedule an Appointment"
    },
    canyonfallshairextensioncompany: {
        form1: "Request an Appointment",
        form2: "Return Request Form"
    },
    crexendo: {
        form1: "Sign-Up for your Free Demonstration",
        form2: "Talk to a Consultant Form"
    },
    ewingconstruction: {
        form1: "Contact Us"
    },
    indinspect: {
        form1: "Contact Us",
        form2: "Request Information"
    },
    judefrancesjewelry: {
        form1: "Returns",
        form2: "Repairs",
        form3: "Replacing Lost Jewelry",
        form4: "Product Inquiry",
        form5: "General Questions",
        form6: "Feedback",
    },
    kyrenefamilydentistry: {
        form1: "Quick Contact",
        form2: "Schedule an Appointment"
    },
    optimizex: {
        form1: "SEO Quote",
        form2: "Sidebar - SEO Quote",
        form3: "Contact Us - Page"
    }
}

let contact_form_shortcode = {
    accidentchiropracticaz: {
        form1: '[contact-form-7 id="46" title="Schedule an Appointment - Home"]',
        form2: '[contact-form-7 id="1032" title="Schedule an Appointment - Sidebar"]'
    },
    advancedimagemedspa: {
        form1: '[contact-form-7 id="40" title="Contact Form ( Contact Us Page )"]',
        form2: '[contact-form-7 id="6960" title="Homepage Contact Us"]',
        form3: '[contact-form-7 id="8775" title="Request Form ( Sidebar ) - New Layout"]'
    },
    aerialengagement: {
        form1: '[contact-form-7 id="19" title="Contact Us"]'
    },
    americanleatherusa: {
        form1: '[contact-form-7 id="10" title="Contact form 1"]'
    },
    andresperezjurado: {
        form1: '[contact-form-7 id="324" title="Custom Inquiry"]'
    },
    azdoordoctor: {
        form1: '[contact-form-7 id="1133" title="Contact Us"]',
        form2: '[contact-form-7 id="1385" title="Contact Us | Sidebar"]',
        form3: '[contact-form-7 id="1372" title="Schedule an Appointment"]'
    },
    biltmoreloanandjewelry: {
        form1: '[contact-form-7 id="41813" title="Request an Appraisal - Sell Your Jewelry"]',
        form2: '[contact-form-7 id="41779" title="Request an Appraisal - Get a Loan"]',
        form3: '[contact-form-7 id="3898" title="Book an Appointment (SB)"]',
        form4: '[contact-form-7 id="4" title="Contact form 1"]',
        form5: '[contact-form-7 id="31398" title="Request an Appraisal | Landing Page 2019"]',
        form6: '[contact-form-7 id="3975" title="Book an Appointment (Page)"]'
    },
    buckeyederm: {
        form1: '[contact-form-7 id="67" title="Schedule an Appointment"]'
    },
    canyonfallshairextensioncompany: {
        form1: '[contact-form-7 id="10173" title="Request an Appointment"]',
        form2: '[contact-form-7 id="9439" title="Return Request Form"]'
    },
    crexendo: {
        form1: '[contact-form-7 id="7624" title="Sign-Up for your Free Demonstration"]',
        form2: '[contact-form-7 id="7891" title="Talk to a Consultant Form"]'
    },
    ewingconstruction: {
        form1: '[contact-form-7 id="31" title="Contact Us"]'
    },
    indinspect: {
        form1: 'gform_1',
        form2: 'gform_2'
    },
    judefrancesjewelry: {
        form1: 'gform_1',
        form2: 'gform_2',
        form3: 'gform_3',
        form4: 'gform_4',
        form5: 'gform_5',
        form6: 'gform_6',
    },
    kyrenefamilydentistry: {
        form1: '[contact-form-7 id="2476" title="Quick Contact"]',
        form2: '[contact-form-7 id="2481" title="Schedule an Appointment"]'
    },
    optimizex: {
        form1: '[contact-form-7 id="11882" title="SEO Quote"]',
        form2: '[contact-form-7 id="11883" title="Sidebar - SEO Quote"]',
        form3: '[contact-form-7 id="11935" title="Contact Us - Page"]'
    }
}


// console.log(values[14][0][2]);
// console.log(JSON.stringify(values[14][0][2]));


// let arrEl = [
//     "",
//     "date",
//     "wp_creds_username",
//     "wp_creds_password",
//     "domain + forms",
//     // "Contact Us - Page",
//     // '[contact-form-7 id="11935" title="Contact Us - Page"]',
// ]

// arrEl.splice(5, 0, "Contact Us - Page")
// arrEl.splice(6, 0, "[contact-form-7 id=11935]");
// arrEl.join()
// console.log(arrEl);




let wp_menu_name = {
    accidentchiropracticaz: {
        dev: "return document.getElementsByClassName('wp-menu-name')[8].click()",
        live: "return document.getElementsByClassName('wp-menu-name')[9].click()"    
    },
    advancedimagemedspa: {
        dev: "return document.getElementsByClassName('wp-menu-name')[8].click()",
        live: "return document.getElementsByClassName('wp-menu-name')[9].click()"    
    },
    aerialengagement: {
        dev: "return document.getElementsByClassName('wp-menu-name')[7].click()",
        live: "return document.getElementsByClassName('wp-menu-name')[7].click()"    
    },
    americanleatherusa: {
        dev: "return document.getElementsByClassName('wp-menu-name')[8].click()",
        live: "return document.getElementsByClassName('wp-menu-name')[8].click()"    
    },
    andresperezjurado: {
        dev: "return document.getElementsByClassName('wp-menu-name')[7].click()",
        live: "return document.getElementsByClassName('wp-menu-name')[8].click()"    
    },
    azdoordoctor: {
        dev: "return document.getElementsByClassName('wp-menu-name')[6].click()",
        live: "return document.getElementsByClassName('wp-menu-name')[9].click()"    
    },
    biltmoreloanandjewelry: {
        dev: "return document.getElementsByClassName('wp-menu-name')[14].click()",
        live: "return document.getElementsByClassName('wp-menu-name')[14].click()"    
    },
    buckeyederm: {
        dev: "return document.getElementsByClassName('wp-menu-name')[7].click()",
        live: "return document.getElementsByClassName('wp-menu-name')[8].click()"    
    },
    canyonfallshairextensioncompany: {
        dev: "return document.getElementsByClassName('wp-menu-name')[7].click()",
        live: "return document.getElementsByClassName('wp-menu-name')[6].click()"    
    },
    crexendo: {
        dev: "return document.getElementsByClassName('wp-menu-name')[10].click()",
        live: ""    
    },
    ewingconstruction: {
        dev: "return document.getElementsByClassName('wp-menu-name')[6].click()",
        live: ""    
    },
    indinspect: {
        dev: "return document.getElementsByClassName('wp-menu-name')[6].click()",
        live: "return document.getElementsByClassName('wp-menu-name')[4].click()"    
    },
    judefrancesjewelry: {
        dev: "return document.getElementsByClassName('wp-menu-name')[7].click()",
        live: ""    
    },
    kyrenefamilydentistry: {
        dev: "return document.getElementsByClassName('wp-menu-name')[14].click()",
        live: "return document.getElementsByClassName('wp-menu-name')[15].click()"
    },
    optimizex: {
        dev: "return document.getElementsByClassName('wp-menu-name')[8].click()",
        live: "return document.getElementsByClassName('wp-menu-name')[8].click()"
    }
}


let row_title = {
    accidentchiropracticaz: {
        dev: {
            form1: "return document.getElementsByClassName('row-title')[0].click()",
            form2: "return document.getElementsByClassName('row-title')[1].click()"
        },
        live: {
            form1: "return document.getElementsByClassName('row-title')[0].click()",
            form2: "return document.getElementsByClassName('row-title')[1].click()"
        }
    },
    advancedimagemedspa: {
        dev: {
            form1: "return document.getElementsByClassName('row-title')[0].click()",
            form2: "return document.getElementsByClassName('row-title')[1].click()",
            form3: "return document.getElementsByClassName('row-title')[3].click()"
        },
        live: {
            form1: "return document.getElementsByClassName('row-title')[0].click()",
            form2: "return document.getElementsByClassName('row-title')[1].click()",
            form3: "return document.getElementsByClassName('row-title')[3].click()"
        }
    },
    aerialengagement: {
        dev: {
            form1: "return document.getElementsByClassName('row-title')[0].click()",
        },
        live: {
            form1: "return document.getElementsByClassName('row-title')[0].click()",
        }
    },
    americanleatherusa: {
        dev: {
            form1: "return document.getElementsByClassName('row-title')[0].click()",
        },
        live: {
            form1: "return document.getElementsByClassName('row-title')[0].click()",
        }
    },
    andresperezjurado: {
        dev: {
            form1: "return document.getElementsByClassName('row-title')[1].click()",
        },
        live: {
            form1: "return document.getElementsByClassName('row-title')[1].click()",
        }
    },
    azdoordoctor: {
        dev: {
            form1: "return document.getElementsByClassName('row-title')[1].click()",
            form2: "return document.getElementsByClassName('row-title')[2].click()",
            form3: "return document.getElementsByClassName('row-title')[4].click()"
        },
        live: {
            form1: "return document.getElementsByClassName('row-title')[1].click()",
            form2: "return document.getElementsByClassName('row-title')[2].click()",
            form3: "return document.getElementsByClassName('row-title')[4].click()"
        }
    },
    biltmoreloanandjewelry: {
        dev: {
            form1: "return document.getElementsByClassName('row-title')[14].click()",
            form2: "return document.getElementsByClassName('row-title')[13].click()",
            form3: "return document.getElementsByClassName('row-title')[4].click()",
            form4: "return document.getElementsByClassName('row-title')[5].click()",
            form5: "return document.getElementsByClassName('row-title')[15].click()",
            form6: "return document.getElementsByClassName('row-title')[3].click()"
        },
        live: {
            form1: "return document.getElementsByClassName('row-title')[14].click()",
            form2: "return document.getElementsByClassName('row-title')[13].click()",
            form3: "return document.getElementsByClassName('row-title')[4].click()",
            form4: "return document.getElementsByClassName('row-title')[5].click()",
            form5: "return document.getElementsByClassName('row-title')[15].click()",
            form6: "return document.getElementsByClassName('row-title')[3].click()"
        }
    },
    buckeyederm: {
        dev: {
            form1: "return document.getElementsByClassName('row-title')[0].click()",
        },
        live: {
            form1: "return document.getElementsByClassName('row-title')[0].click()",
        }
    },
    canyonfallshairextensioncompany: {
        dev: {
            form1: "return document.getElementsByClassName('row-title')[0].click()",
            form2: "return document.getElementsByClassName('row-title')[1].click()"
        },
        live: {
            form1: "return document.getElementsByClassName('row-title')[0].click()",
            form2: "return document.getElementsByClassName('row-title')[1].click()"
        }
    },
    crexendo: {
        dev: {
            form1: "return document.getElementsByClassName('row-title')[7].click()",
            form2: "return document.getElementsByClassName('row-title')[8].click()"
        },
        live: {
            form1: "",
        }
    },
    ewingconstruction: {
        dev: {
            form1: "return document.getElementsByClassName('row-title')[0].click()"
        },
        live: {
            form1: ""
        }
    },
    indinspect: {
        dev: {
            form1: "",
        },
        live: {
            form1: "",
        }
    },
    judefrancesjewelry: {
        dev: {
            form1: "",
        },
        live: {
            form1: "",
        }
    },
    kyrenefamilydentistry: {
        dev: {
            form1: "return document.getElementsByClassName('row-title')[1].click()",
            form2: "return document.getElementsByClassName('row-title')[2].click()"
        },
        live: {
            form1: "return document.getElementsByClassName('row-title')[1].click()",
            form2: "return document.getElementsByClassName('row-title')[2].click()"
        }
    },
    optimizex: {
        dev: {
            form1: "return document.getElementsByClassName('row-title')[1].click()",
            form2: "return document.getElementsByClassName('row-title')[2].click()",
            form3: "return document.getElementsByClassName('row-title')[0].click()"
        },
        live: {
            form1: ""
        }
    }
}


let range_recipient = {
    accidentchiropracticaz: "Accident Chiropractic!H2",
    advancedimagemedspa: "Advance Image Med Spa!H2",
    aerialengagement: "Aerial Engagement!H2",
    americanleatherusa: "American Leather!H2",
    andresperezjurado: "Andres Perez Jurado!H2",
    azdoordoctor: "Azdoordoctor!H2",
    biltmoreloanandjewelry: "Biltmore!H2",
    buckeyederm: "Buckeye Derm!H2",
    canyonfallshairextensioncompany: "Canyon Falls Hair Extension Company!H2",
    crexendo: "Crexendo!H2",
    ewingconstruction: "Ewing Construction!H2",
    indinspect: "Industrial Inspection & Consulting!H2",
    judefrancesjewelry: "Jude Frances Jewelry!H2",
    kyrenefamilydentistry: "Kyrene Family Dentistry!H2",
    optimizex: "OptimizeX!H2"
}


let range_thankyou_page = {
    accidentchiropracticaz: "Accident Chiropractic!I2",
    advancedimagemedspa: "Advance Image Med Spa!I2",
    aerialengagement: "Aerial Engagement!I2",
    americanleatherusa: "American Leather!I2",
    andresperezjurado: "Andres Perez Jurado!I2",
    azdoordoctor: "Azdoordoctor!I2",
    biltmoreloanandjewelry: "Biltmore!I2",
    buckeyederm: "Buckeye Derm!I2",
    canyonfallshairextensioncompany: "Canyon Falls Hair Extension Company!I2",
    crexendo: "Crexendo!I2",
    ewingconstruction: "Ewing Construction!I2",
    indinspect: "Industrial Inspection & Consulting!I2",
    judefrancesjewelry: "Jude Frances Jewelry!I2",
    kyrenefamilydentistry: "Kyrene Family Dentistry!I2",
    optimizex: "OptimizeX!I2"
}

const qa_email = "mbuendia@optimizex.com, qa@primeview.com";

let module_name = {
    webforms: "WEB FORMS"
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
    date,
    wp_creds,
    domain,
    forms,
    sheetId,
    ranges,
    wp_menu_name,
    row_title,
    range_recipient,
    range_thankyou_page,
    qa_email,
    module_name,
    launch,
    contact_form_name,
    contact_form_shortcode,
    webforms
};


// console.log(values[0][0]);


// values
// username
// password
// wp_username
// wp_password
// email
// qa_email