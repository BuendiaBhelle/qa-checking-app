let monthNames = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12];
let dateObj = new Date();
let month = monthNames[dateObj.getMonth()];
let day = String(dateObj.getDate()).padStart(2, '0');
let year = dateObj.getFullYear();
const date = month  + "/" + day  + '/' + year;

const usernameData_devs = [
    "mbuendia@optimizex.com",
    "jmagnaye@optimizex.com",
    "jaguilar@optimizex.com",
    "jolligue@optimizex.com"
]

const usernameData_marketing = [
    "gale@optimizex.com",
    "marketing@primeview.com"
]

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
    "optimizex",
    "sellusyourcaraz",
    "freddabranyon",
    "frlawgroup",
    "primemedicalpain",
    "sunrisejewelryusa",
    "randosouthwest",
    "primeview",
    "phoenixritecare",
    "versatile",
    "solutionsforum",
    "lignans",
    "natina",
    "newhopemedicalcenter",
    "culpepper",
    "aeroturbine",
    "collisioncenternorthscottsdale",
    "jewelryoutletinc",
    "paysondermatology",
    "renewscal",
    "risingsunmartialartsaz",
    "gatorskin",
    "virtualassistantsoutsourcing",
    "dentistryatthebiltmore",
    "mcbuildingmaintenance",
    "cma"
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
        password: "rM6qH2pO3cC2tO4e"   
    },
    kyrenefamilydentistry: {
        username: "pvadmin",
        password: "JQR&H*i$fUA%wCcit@!TP8Jh"
    },
    optimizex: {
        username: "oxadmin",
        password: "SwP!Dw3iJwqj#dOj%ZVVV7a7"
    },
    sellusyourcaraz: {
        username: "admin",
        password: "bA9:kB0~eI8$gS"
    },
    freddabranyon: {
        username: "pvadmin",
        password: "cHJxubk0*E8q^J$M1A%Hpk*P"
    },
    frlawgroup: {
        username: "pvadmin",
        password: "5M^S)oi5U4Krr5YugUNEJUSM"
    },
    primemedicalpain: {
        username: "pvadmin",
        password: "^24)zwOSdIJsVJVK8K&YASRx"
    },
    sunrisejewelryusa: {
        username: "pvadmin",
        password: "jX6#dN5?oR7#vU5#"
    },
    randosouthwest: {
        username: "pvadmin",
        password: "&4c^I6WjO&SfVJ3fiSCz0dRd"
    },
    primeview: {
        username: "pvadmin",
        password: "Nkp$leidilGxzKH*RcrKdPmJ"
    },
    phoenixritecare: {
        username: "pvadmin",
        password: "lGmeVv#22rTn"
    },
    versatile: {
        username: "pvadmin",
        password: "bZX(?{U<a960"
    },
    solutionsforum: {
        username: "pvadmin",
        password: "p@iWoX3pvx0r2"
    },
    lignans: {
        username: "PrimeView",
        password: "wV0^7*FT4NZ$VfZM"
    },
    natina: {
        username: "primeview",
        password: "pD5nE4sC8dD1"
    },
    newhopemedicalcenter: {
        username: "pvadmin",
        password: "TK#%uA8ZrvZe9Au9*@jFm%Yd"
    },
    culpepper: {
        username: "Culpepper",
        password: "1Elizab3th"
    },
    aeroturbine: {
        username: "pvadmin",
        password: "!kIKQGXHRc18"
    },
    collisioncenternorthscottsdale: {
        username: "pvadmin",
        password: "Ida5v)MSFCT@Vwh7!2u2n0ZH"
    },
    jewelryoutletinc: {
        username: "pvadmin",
        password: "AuAKL4TTFeQ^2DlBF8l8VBE!"
    },
    paysondermatology: {
        username: "pvadmin",
        password: "ExvkE3I7$olXiHhAuDt6RJld"
    },
    renewscal: {
        username: "pvadmin",
        password: "(^Qpo(!LsSR2Zi$J$Gi417fy"
    },
    risingsunmartialartsaz: {
        username: "pvadmin",
        password: "uR3$hH0)tQ6%"
    },
    gatorskin: {
        username: "pvadmin",
        password: "p5PBJAlQYA4jH*iI(dw!Gtml"
    },
    virtualassistantsoutsourcing: {
        username: "pvadmin",
        password: "[zJdPOoINX[8u(ed"
    },
    dentistryatthebiltmore: {
        username: "pvadmin",
        password: "sbDDKFc0VYqf39LgP0SrZGh4"
    },
    mcbuildingmaintenance: {
        username: "pvadmin",
        password: "]wuB34Q{DbhF"
    },
    cma: {
        username: "pvadmin",
        password: "iR4wW]uPU1V("
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
        live: "https://www.judefrances.com/"
    },
    kyrenefamilydentistry: {
        dev: "https://kyrenefamilydentistry.primeview.com/",
        live: "https://www.kyrenefamilydentistry.com/"
    },
    optimizex: {
        dev: "https://optimizexdev.primeview.com/",
        live: "https://www.optimizex.com/"
    },
    sellusyourcaraz: {
        dev: "https://sellusyourcarazdev.primeview.com/",
        live: "https://www.sellusyourcaraz.com/"
    },
    freddabranyon: {
        dev: "https://freddabranyondev.primeview.com/",
        live: "https://www.freddabranyon.com/"
    },
    frlawgroup: {
        dev: "https://frlawgroupdev.primeview.com/",
        live: "https://www.frlawgroup.com/"
    },
    primemedicalpain: {
        dev: "",
        live: "https://www.primemedicalpain.com/"
    },
    sunrisejewelryusa: {
        dev: "https://sunrisejewelryusa.primeview.com/",
        live: "https://www.sunrisejewelryusa.com/"
    },
    randosouthwest: {
        dev: "https://randosouthwestdev.primeview.com/",
        live: "https://www.randosouthwest.com/"
    },
    primeview: {
        dev: "",
        live: "https://www.primeview.com/"
    },
    phoenixritecare: {
        dev: "",
        live: "https://www.phoenixritecare.org/"
    },
    versatile: {
        dev: "https://versatiledev.primeview.com/",
        live: ""
    },
    solutionsforum: {
        dev: "https://solutionsforum.primeview.com/",
        live: ""
    },
    lignans: {
        dev: "https://lignansdev.primeview.com/",
        live: "https://www.lignans.net/"
    },
    natina: {
        dev: "https://natinadev.primeview.com/",
        live: ""
    },
    newhopemedicalcenter: {
        dev: "https://newhopemedicalcenter.primeview.com/",
        live: "https://www.newhopemedicalcenter.com/"
    },
    culpepper: {
        dev: "https://chrisassoc.primeview.com/",
        live: "https://www.culpepper-associates.com/"
    },
    aeroturbine: {
        dev: "https://aeroturbinedev.primeview.com/",
        live: ""
    },
    collisioncenternorthscottsdale: {
        dev: "https://collisioncenternorthscottsdaledev.primeview.com/",
        live: "https://www.collisioncenternorthscottsdale.com/"
    },
    jewelryoutletinc: {
        dev: "https://jewelry.primeview.com/",
        live: "https://www.jewelryoutletinc.com/"
    },
    paysondermatology: {
        dev: "https://paysondermatologydev.primeview.com/",
        live: "https://www.paysondermatology.com/"
    },
    renewscal: {
        dev: "",
        live: "https://renewscal.primeview.com/"
    },
    risingsunmartialartsaz: {
        dev: "https://risingsunmartialartsdev.primeview.com/",
        live: "https://www.risingsunmartialartsaz.com/"
    },
    gatorskin: {
        dev: "https://gatorskin.primeview.com/",
        live: "https://www.gatorskin.us/"
    },
    virtualassistantsoutsourcing: {
        dev: "",
        live: "https://virtualassistantsoutsourcing.com/"
    },
    dentistryatthebiltmore: {
        dev: "",
        live: "https://www.dentistryatthebiltmore.com/"
    },
    mcbuildingmaintenance: {
        dev: "https://mcbuildingmaintenancedev.primeview.com/",
        live: "https://www.mcbuildingmaintenance.com/"
    },
    cma: {
        dev: "https://cmahrdev.primeview.com/",
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
        form2: "",
        form3: "join-our-clubs/"
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
        form1: "",
        form2: "schedule-an-appointment/"
    },
    optimizex: {
        form1: "/",
        form2: "search-engine-optimization/",
        form3: "contact-us/"
    },
    sellusyourcaraz: {
        form1: "",
        form2: "",
        form3: "contact-us/"
    },
    freddabranyon: {
        form1: "contact/"
    },
    frlawgroup: {
        form1: "troy-froderman/",
        form2: "category/news-and-updates/",
        form3: "contact/"
    },
    primemedicalpain: {
        form1: "",
        form2: "contact-us/"
    },
    sunrisejewelryusa: {
        form1: "contact-us/"
    },
    randosouthwest: {
        form1: ""
    },
    primeview: {
        form1: "",
        form2: "contact/",
        form3: "contact/request-a-proposal/",
        form4: "free-seo-quote/",
        form5: "live-agent/",
        form6: "blog/",
        form7: "blog/"
    },
    phoenixritecare: {
        form1: "",
        form2: "",
        form3: "",
        form4: "contact-us/",
        form5: "ritecare/",
        form6: "ritecare/",
        form7: "coach/",
        form8: "driver/",
        form9: "evaluator/"
    },
    versatile: {
        form1: "contact-us/",
        form2: "custom-tiles/",
        form3: "about/",
        form4: ""
    },
    solutionsforum: {
        form1: "contact-us/"
    },
    lignans: {
        form1: "contact/"
    },
    natina: {
        form1: "contact/"
    },
    newhopemedicalcenter: {
        form1: "",
        form2: "stories-of-hope/timothy-chiaruttini-patient-testimonial/",
        form3: "new-hope-medical-ppc-layout-3/",
        form4: "immunotherapy-treatment/",
        form5: "liver-cancer/",
        form6: "the-journey-to-nhu/",
        form7: "contact-us/",
        form8: "treatments-for-cancer/",
        form9: "ppc-3-test/",
    },
    culpepper: {
        form1: "contact/"
    },
    aeroturbine: {
        form1: "contact-us/"
    },
    collisioncenternorthscottsdale: {
        form1: "customer-authorization-form/",
        form2: "schedule-a-reservation/",
        form3: "body-shop-repair-estimate/",
        form4: "major-collision-damage/"
    },
    jewelryoutletinc: {
        form1: "contact-us/",
        form2: "credit-application/"
    },
    paysondermatology: {
        form1: "about-us/"
    },
    renewscal: {
        form1: "",
        form2: "contact-us/"
    },
    risingsunmartialartsaz: {
        form1: "contact-us/"
    },
    gatorskin: {
        form1: "contact/"
    },
    virtualassistantsoutsourcing: {
        form1: "contact/"
    },
    dentistryatthebiltmore: {
        form1: "",
        form2: "about-us/",
        form3: "contact/"
    },
    mcbuildingmaintenance: {
        form1: "contact-us/",
        form2: "about-us/"
    },
    cma: {
        form1: ""
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
    optimizex: 610692665,
    sellusyourcaraz: 2085688851,
    freddabranyon: 1296321677,
    frlawgroup: 273755578,
    primemedicalpain: 1077043857,
    sunrisejewelryusa: 1432843299,
    randosouthwest: 1298381075,
    primeview: 376138285,
    phoenixritecare: 1351577327,
    versatile: 1955196721,
    solutionsforum: 1648766915,
    lignans: 1781929333,
    natina: 1726917041,
    newhopemedicalcenter: 1475574979,
    culpepper: 1784007282,
    aeroturbine: 716332200,
    collisioncenternorthscottsdale: 657428829,
    jewelryoutletinc: 1528265251,
    paysondermatology: 1897422886,
    renewscal: 1177615742,
    risingsunmartialartsaz: 2093063365,
    gatorskin: 1363791668,
    virtualassistantsoutsourcing: 763505033,
    dentistryatthebiltmore: 968628360,
    mcbuildingmaintenance: 283258278,
    cma: 2088597437
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
    ],
    sites[15] = [
        [
            "Sell us your Car AZ!Q2",
            "Sell us your Car AZ!A2",
            "Sell us your Car AZ!B2",
            "Sell us your Car AZ!C2",
            "Sell us your Car AZ!C3",
            "Sell us your Car AZ!D2",
            "Sell us your Car AZ!E2",
            "Sell us your Car AZ!G2",
        ]
    ],
    sites[16] = [
        [
            "Fredda Branyon!Q2",
            "Fredda Branyon!A2",
            "Fredda Branyon!B2",
            "Fredda Branyon!C2",
            "Fredda Branyon!C3",
            "Fredda Branyon!D2",
            "Fredda Branyon!E2",
            "Fredda Branyon!G2",
        ]
    ],
    sites[17] = [
        [
            "FR Law Group!Q2",
            "FR Law Group!A2",
            "FR Law Group!B2",
            "FR Law Group!C2",
            "FR Law Group!C3",
            "FR Law Group!D2",
            "FR Law Group!E2",
            "FR Law Group!G2",
        ]
    ],
    sites[18] = [
        [
            "Prime Medical Pain Management Centers!Q2",
            "Prime Medical Pain Management Centers!A2",
            "Prime Medical Pain Management Centers!B2",
            "Prime Medical Pain Management Centers!C2",
            "Prime Medical Pain Management Centers!C3",
            "Prime Medical Pain Management Centers!D2",
            "Prime Medical Pain Management Centers!E2",
            "Prime Medical Pain Management Centers!G2",
        ]
    ],
    sites[19] = [
        [
            "Sunrise Jewelry!Q2",
            "Sunrise Jewelry!A2",
            "Sunrise Jewelry!B2",
            "Sunrise Jewelry!C2",
            "Sunrise Jewelry!C3",
            "Sunrise Jewelry!D2",
            "Sunrise Jewelry!E2",
            "Sunrise Jewelry!G2",
        ]
    ],
    sites[20] = [
        [
            "Rando South West!Q2",
            "Rando South West!A2",
            "Rando South West!B2",
            "Rando South West!C2",
            "Rando South West!C3",
            "Rando South West!D2",
            "Rando South West!E2",
            "Rando South West!G2",
        ]
    ],
    sites[21] = [
        [
            "Primeview!Q2",
            "Primeview!A2",
            "Primeview!B2",
            "Primeview!C2",
            "Primeview!C3",
            "Primeview!D2",
            "Primeview!E2",
            "Primeview!G2",
        ]
    ],
    sites[22] = [
        [
            "Phoenix Scottish Rite!Q2",
            "Phoenix Scottish Rite!A2",
            "Phoenix Scottish Rite!B2",
            "Phoenix Scottish Rite!C2",
            "Phoenix Scottish Rite!C3",
            "Phoenix Scottish Rite!D2",
            "Phoenix Scottish Rite!E2",
            "Phoenix Scottish Rite!G2",
        ]
    ],
    sites[23] = [
        [
            "Versatile!Q2",
            "Versatile!A2",
            "Versatile!B2",
            "Versatile!C2",
            "Versatile!C3",
            "Versatile!D2",
            "Versatile!E2",
            "Versatile!G2",
        ]
    ],
    sites[24] = [
        [
            "The Solutions Forum!Q2",
            "The Solutions Forum!A2",
            "The Solutions Forum!B2",
            "The Solutions Forum!C2",
            "The Solutions Forum!C3",
            "The Solutions Forum!D2",
            "The Solutions Forum!E2",
            "The Solutions Forum!G2",
        ]
    ],
    sites[25] = [
        [
            "Lignans!Q2",
            "Lignans!A2",
            "Lignans!B2",
            "Lignans!C2",
            "Lignans!C3",
            "Lignans!D2",
            "Lignans!E2",
            "Lignans!G2",
        ]
    ],
    sites[26] = [
        [
            "Natina!Q2",
            "Natina!A2",
            "Natina!B2",
            "Natina!C2",
            "Natina!C3",
            "Natina!D2",
            "Natina!E2",
            "Natina!G2",
        ]
    ],
    sites[27] = [
        [
            "New Hope Medical Center!Q2",
            "New Hope Medical Center!A2",
            "New Hope Medical Center!B2",
            "New Hope Medical Center!C2",
            "New Hope Medical Center!C3",
            "New Hope Medical Center!D2",
            "New Hope Medical Center!E2",
            "New Hope Medical Center!G2",
        ]
    ],
    sites[28] = [
        [
            "Culpepper & Associates!Q2",
            "Culpepper & Associates!A2",
            "Culpepper & Associates!B2",
            "Culpepper & Associates!C2",
            "Culpepper & Associates!C3",
            "Culpepper & Associates!D2",
            "Culpepper & Associates!E2",
            "Culpepper & Associates!G2",
        ]
    ],
    sites[29] = [
        [
            "Aero Turbine!Q2",
            "Aero Turbine!A2",
            "Aero Turbine!B2",
            "Aero Turbine!C2",
            "Aero Turbine!C3",
            "Aero Turbine!D2",
            "Aero Turbine!E2",
            "Aero Turbine!G2",
        ]
    ],
    sites[30] = [
        [
            "Airpark Collision Center!Q2",
            "Airpark Collision Center!A2",
            "Airpark Collision Center!B2",
            "Airpark Collision Center!C2",
            "Airpark Collision Center!C3",
            "Airpark Collision Center!D2",
            "Airpark Collision Center!E2",
            "Airpark Collision Center!G2",
        ]
    ],
    sites[31] = [
        [
            "Jewelry Outlet!Q2",
            "Jewelry Outlet!A2",
            "Jewelry Outlet!B2",
            "Jewelry Outlet!C2",
            "Jewelry Outlet!C3",
            "Jewelry Outlet!D2",
            "Jewelry Outlet!E2",
            "Jewelry Outlet!G2",
        ]
    ],
    sites[32] = [
        [
            "Payson Dermatology!Q2",
            "Payson Dermatology!A2",
            "Payson Dermatology!B2",
            "Payson Dermatology!C2",
            "Payson Dermatology!C3",
            "Payson Dermatology!D2",
            "Payson Dermatology!E2",
            "Payson Dermatology!G2",
        ]
    ],
    sites[33] = [
        [
            "Renew Stem Cell & Laser!Q2",
            "Renew Stem Cell & Laser!A2",
            "Renew Stem Cell & Laser!B2",
            "Renew Stem Cell & Laser!C2",
            "Renew Stem Cell & Laser!C3",
            "Renew Stem Cell & Laser!D2",
            "Renew Stem Cell & Laser!E2",
            "Renew Stem Cell & Laser!G2",
        ]
    ],
    sites[34] = [
        [
            "Rising Sun!Q2",
            "Rising Sun!A2",
            "Rising Sun!B2",
            "Rising Sun!C2",
            "Rising Sun!C3",
            "Rising Sun!D2",
            "Rising Sun!E2",
            "Rising Sun!G2",
        ]
    ],
    sites[35] = [
        [
            "Gatorskin!Q2",
            "Gatorskin!A2",
            "Gatorskin!B2",
            "Gatorskin!C2",
            "Gatorskin!C3",
            "Gatorskin!D2",
            "Gatorskin!E2",
            "Gatorskin!G2",
        ]
    ],
    sites[36] = [
        [
            "Virtual Assistant Outsourcing!Q2",
            "Virtual Assistant Outsourcing!A2",
            "Virtual Assistant Outsourcing!B2",
            "Virtual Assistant Outsourcing!C2",
            "Virtual Assistant Outsourcing!C3",
            "Virtual Assistant Outsourcing!D2",
            "Virtual Assistant Outsourcing!E2",
            "Virtual Assistant Outsourcing!G2",
        ]
    ],
    sites[37] = [
        [
            "Dentistry At The Biltmore!Q2",
            "Dentistry At The Biltmore!A2",
            "Dentistry At The Biltmore!B2",
            "Dentistry At The Biltmore!C2",
            "Dentistry At The Biltmore!C3",
            "Dentistry At The Biltmore!D2",
            "Dentistry At The Biltmore!E2",
            "Dentistry At The Biltmore!G2",
        ]
    ],
    sites[38] = [
        [
            "MC Building Maintenance!Q2",
            "MC Building Maintenance!A2",
            "MC Building Maintenance!B2",
            "MC Building Maintenance!C2",
            "MC Building Maintenance!C3",
            "MC Building Maintenance!D2",
            "MC Building Maintenance!E2",
            "MC Building Maintenance!G2",
        ]
    ],
    sites[39] = [
        [
            "CMA!Q2",
            "CMA!A2",
            "CMA!B2",
            "CMA!C2",
            "CMA!C3",
            "CMA!D2",
            "CMA!E2",
            "CMA!G2",
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
    optimizex: range[14][0],
    sellusyourcaraz:  range[15][0],
    freddabranyon: range[16][0],
    frlawgroup: range[17][0],
    primemedicalpain: range[18][0],
    sunrisejewelryusa: range[19][0],
    randosouthwest: range[20][0],
    primeview: range[21][0],
    phoenixritecare: range[22][0],
    versatile: range[23][0],
    solutionsforum: range[24][0],
    lignans: range[25][0],
    natina: range[26][0],
    newhopemedicalcenter: range[27][0],
    culpepper: range[28][0],
    aeroturbine: range[29][0],
    collisioncenternorthscottsdale: range[30][0],
    jewelryoutletinc: range[31][0],
    paysondermatology: range[32][0],
    renewscal: range[33][0],
    risingsunmartialartsaz: range[34][0],
    gatorskin: range[35][0],
    virtualassistantsoutsourcing: range[36][0],
    dentistryatthebiltmore: range[37][0],
    mcbuildingmaintenance: range[38][0],
    cma: range[39][0]
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
        form2: "Talk to a Consultant Form",
        form3: "Personalized Quote Form Step 1",
        form4: "Refer a Business",
        form5: "Register To Become A Channel Partner"
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
    },
    sellusyourcaraz: {
        form1: "Get A Quote Banner/Popup",
        form2: "Get A Quote Modal",
        form3: "Contact Page Form"
    },
    freddabranyon: {
        form1: "Contact form 1"
    },
    frlawgroup: {
        form1: "CTA Contact Form",
        form2: "Contact Us Form - SB",
        form3: "Contact Us Form"
    },
    primemedicalpain: {
        form1: "Contact us - Homepage (New Theme)",
        form2: "Contact form @ Contact Us Page"
    },
    sunrisejewelryusa: {
        form1: "Contact Us"
    },
    randosouthwest: {
        form1: "Contact Us ( Form )"
    },
    primeview: {
        form1: "QUICK QUOTE (Footer)",
        form2: "Contact Us ( Page )",
        form3: "Free Website Quote",
        form4: "Free SEO Quote",
        form5: "Crankwheel Form",
        form6: "Quote Form ( Sidebar )",
        form7: "PDF Form"
    },
    phoenixritecare: {
        form1: "Arizona Scholarship - Form",
        form2: "National Scholarship - Form",
        form3: "Voucher - Form",
        form4: "Send Us a Message - Form",
        form5: "Evaluation - Form",
        form6: "Hearing Test - Form",
        form7: "Coach Volunteer - Form",
        form8: "Driver Volunteer - Form",
        form9: "Evaluator Volunteer - Form"
    },
    versatile: {
        form1: "Get In Touch With Us - Contact Us",
        form2: "Custom Tiles Form",
        form3: "Newsletter-Footer",
        form4: "Get In Touch With Us"
    },
    solutionsforum: {
        form1: "Contact form 1"
    },
    lignans: {
        form1: "Contact Form - Basic"
    },
    natina: {
        form1: "Request a quote"
    },
    newhopemedicalcenter: {
        form1: "Home Page Contact",
        form2: "Stories of Hope Form",
        form3: "New PPC Form",
        form4: "Immunotherapy Form",
        form5: "Cancer Page Sidebar Form",
        form6: "Quick Contact Sidebar Form",
        form7: "Contact Us Page Form",
        form8: "Cancer Page Template Form",
        form9: "New PPC Form Test"
    },
    culpepper: {
        form1: "Contact Form"
    },
    aeroturbine: {
        form1: "Contact Us"
    },
    collisioncenternorthscottsdale: {
        form1: "ACC Authorization Form",
        form2: "Appointment",
        form3: "Body Shop Repair Estimate",
        form4: "Body Shop Repair Estimate (Landing Page)"
    },
    jewelryoutletinc: {
        form1: "Contact form 1",
        form2: "Credit Application"
    },
    paysondermatology: {
        form1: "Request an Appointment"
    },
    renewscal: {
        form1: "Join Our VIP List",
        form2: "Schedule your consult"
    },
    risingsunmartialartsaz: {
        form1: "Contact Us"
    },
    gatorskin: {
        form1: "Contact Page | Form"
    },
    virtualassistantsoutsourcing: {
        form1: "Get in Touch with Us - Bottom"
    },
    dentistryatthebiltmore: {
        form1: "Book a Consultation",
        form2: "Get Started!",
        form3: "Contact"
    },
    mcbuildingmaintenance: {
        form1: "Contact form 1",
        form2: "Sidebar Form"
    },
    cma: {
        form1: "CMA - Contact Form"
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
        form2: '[contact-form-7 id="7891" title="Talk to a Consultant Form"]',
        form3: '[contact-form-7 id="7903" title="Personalized Quote Form Step 1"]',
        form4: '[contact-form-7 id="8649" title="Refer a Business"]',
        form5: '[contact-form-7 id="8646" title="Register To Become A Channel Partner"]'
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
    },
    sellusyourcaraz: {
        form1: '[contact-form-7 id="117" title="Get A Quote Banner/Popup"]',
        form2: '[contact-form-7 id="2612" title="Get A Quote Modal"]',
        form3: '[contact-form-7 id="130" title="Contact Page Form"]'
    },
    freddabranyon: {
        form1: '[contact-form-7 id="4" title="Contact form 1"]'
    },
    frlawgroup: {
        form1: '[contact-form-7 id="807" title="CTA Contact Form"]',
        form2: '[contact-form-7 id="390" title="Contact Us Form - SB"]',
        form3: '[contact-form-7 id="317" title="Contact Us Form"]'
    },
    primemedicalpain: {
        form1: '[contact-form-7 id="673" title="Contact us - Homepage (New Theme)"]',
        form2: '[contact-form-7 id="310" title="Contact form @ Contact Us Page"]'
    },
    sunrisejewelryusa: {
        form1: '[contact-form-7 id="2297" title="Contact Us"]'
    },
    randosouthwest: {
        form1: '[contact-form-7 id="4" title="Contact Us ( Form )"]'
    },
    primeview: {
        form1: '[contact-form-7 id="10415" title="QUICK QUOTE (Footer)"]',
        form2: '[contact-form-7 id="5608" title="Contact Us ( Page )"]',
        form3: '[contact-form-7 id="5612" title="Free Website Quote"]',
        form4: '[contact-form-7 id="5610" title="Free SEO Quote"]',
        form5: '[contact-form-7 id="17730" title="Crankwheel Form"]',
        form6: '[contact-form-7 id="65" title="Quote Form ( Sidebar )"]',
        form7: '[contact-form-7 id="5607" title="PDF Form"]'
    },
    phoenixritecare: {
        form1: '[contact-form-7 id="269" title="Arizona Scholarship - Form"]',
        form2: '[contact-form-7 id="457" title="National Scholarship - Form"]',
        form3: '[contact-form-7 id="95" title="Voucher - Form"]',
        form4: '[contact-form-7 id="31" title="Send us a Message - Form"]',
        form5: '[contact-form-7 id="489" title="Evaluation - Form"]',
        form6: '[contact-form-7 id="487" title="Hearing Test - Form"]',
        form7: '[contact-form-7 id="461" title="Coach Volunteer - Form"]',
        form8: '[contact-form-7 id="462" title="Driver Volunteer - Form"]',
        form9: '[contact-form-7 id="463" title="Evaluator Volunteer - Form"]'
    },
    versatile: {
        form1: '[contact-form-7 id="183" title="Get In Touch With Us - Contact Us"]',
        form2: '[contact-form-7 id="187" title="Custom Tiles Form"]',
        form3: '[contact-form-7 id="52" title="Newsletter - Footer"]',
        form4: '[contact-form-7 id="12" title="Get In Touch With Us"]'
    },
    solutionsforum: {
        form1: '[contact-form-7 id="5" title="Contact form 1"]'
    },
    lignans: {
        form1: '[contact-form-7 id="74" title="Contact Form - Basic"]'
    },
    natina: {
        form1: '[contact-form-7 id="192" title="Request a quote"]'
    },
    newhopemedicalcenter: {
        form1: 'gform_1',
        form2: 'gform_2',
        form3: 'gform_3',
        form4: 'gform_5',
        form5: 'gform_6',
        form6: 'gform_7',
        form7: 'gform_8',
        form8: 'gform_4',
        form9: 'gform_10'
    },
    culpepper: {
        form1: '[ninja_form id=1]'
    },
    aeroturbine: {
        form1: '[contact-form-7 id="187" title="Contact Us"]'
    },
    collisioncenternorthscottsdale: {
        form1: '[contact-form-7 id="5381" title="ACC Authorization Form"]',
        form2: '[contact-form-7 id="116" title="Appointment"]',
        form3: '[contact-form-7 id="4" title="Body Shop Repair Estimate"]',
        form4: '[contact-form-7 id="4095" title="Body Shop Repair Estimate (Landing Page)"]'
    },
    jewelryoutletinc: {
        form1: '[contact-form-7 id="33" title="Contact form 1"]',
        form2: '[contact-form-7 id="891" title="Credit Application"]'
    },
    paysondermatology: {
        form1: '[contact-form-7 id="453" title="Request an Appointment"]'
    },
    renewscal: {
        form1: 'gform_3',
        form2: 'gform_1'
    },
    risingsunmartialartsaz: {
        form1: '[contact-form-7 id="5" title="Contact Us"]'
    },
    gatorskin: {
        form1: '[contact-form-7 id="23" title="Contact Page | Form"]'
    },
    virtualassistantsoutsourcing: {
        form1: '[contact-form-7 id="66" title="Get in Touch with Us - Bottom"]'
    },
    dentistryatthebiltmore: {
        form1: '[contact-form-7 id="804" title="Book a Consultation"]',
        form2: '[contact-form-7 id="805" title="Get Started!"]',
        form3: '[contact-form-7 id="155" title="Contact"]'
    },
    mcbuildingmaintenance: {
        form1: '[contact-form-7 id="8" title="Contact form 1"]',
        form2: '[contact-form-7 id="407" title="Sidebar Form"]'
    },
    cma: {
        form1: '[contact-form-7 id="56" title="CMA - Contact Form"]'
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
    optimizex: "OptimizeX!H2",
    sellusyourcaraz: "Sell us your Car AZ!H2",
    freddabranyon: "Fredda Branyon!H2",
    frlawgroup: "FR Law Group!H2",
    primemedicalpain: "Prime Medical Pain Management Centers!H2",
    sunrisejewelryusa: "Sunrise Jewelry!H2",
    randosouthwest: "Rando South West!H2",
    primeview: "Primeview!H2",
    phoenixritecare: "Phoenix Scottish Rite!H2",
    versatile: "Versatile!H2",
    solutionsforum: "The Solutions Forum!H2",
    lignans: "Lignans!H2",
    natina: "Natina!H2",
    newhopemedicalcenter: "New Hope Medical Center!H2",
    culpepper: "Culpepper & Associates!H2",
    aeroturbine: "Aero Turbine!H2",
    collisioncenternorthscottsdale: "Airpark Collision Center!H2",
    jewelryoutletinc: "Jewelry Outlet!H2",
    paysondermatology: "Payson Dermatology!H2",
    renewscal: "Renew Stem Cell & Laser!H2",
    risingsunmartialartsaz: "Rising Sun!H2",
    gatorskin: "Gatorskin!H2",
    virtualassistantsoutsourcing: "Virtual Assistant Outsourcing!H2",
    dentistryatthebiltmore: "Dentistry At The Biltmore!H2",
    mcbuildingmaintenance: "MC Building Maintenance!H2",
    cma: "CMA!H2"
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
    optimizex: "OptimizeX!I2",
    sellusyourcaraz: "Sell us your Car AZ!I2",
    freddabranyon: "Fredda Branyon!I2",
    frlawgroup: "FR Law Group!I2",
    primemedicalpain: "Prime Medical Pain Management Centers!I2",
    sunrisejewelryusa: "Sunrise Jewelry!I2",
    randosouthwest: "Rando South West!I2",
    primeview: "Primeview!I2",
    phoenixritecare: "Phoenix Scottish Rite!I2",
    versatile: "Versatile!I2",
    solutionsforum: "The Solutions Forum!I2",
    lignans: "Lignans!I2",
    natina: "Natina!I2",
    newhopemedicalcenter: "New Hope Medical Center!I2",
    culpepper: "Culpepper & Associates!I2",
    aeroturbine: "Aero Turbine!I2",
    collisioncenternorthscottsdale: "Airpark Collision Center!I2",
    jewelryoutletinc: "Jewelry Outlet!I2",
    paysondermatology: "Payson Dermatology!I2",
    renewscal: "Renew Stem Cell & Laser!I2",
    risingsunmartialartsaz: "Rising Sun!I2",
    gatorskin: "Gatorskin!I2",
    virtualassistantsoutsourcing: "Virtual Assistant Outsourcing!I2",
    dentistryatthebiltmore: "Dentistry At The Biltmore!I2",
    mcbuildingmaintenance: "MC Building Maintenance!I2",
    cma: "CMA!I2"
}

const qa_email = "mbuendia@optimizex.com, qa@primeview.com";

let module_name = {
    checkout: "CHECKOUT",
    image_optimization: "IMAGE OPTIMIZATION",
    responsiveness: "RESPONSIVENESS",
    visibility: "VISIBILITY",
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
            form1: "Contact Us",
            form2: "Request Information"
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
    },
    sellusyourcaraz: {
        dev: {
            form1: "Get A Quote Banner/Popup",
            form2: "Get A Quote Modal",
            form3: "Contact Page Form"
        },
        live: {
            form1: "Get A Quote Banner/Popup",
            form2: "Get A Quote Modal",
            form3: "Contact Page Form"
        }
    },
    freddabranyon: {
        dev: {
            form1: "Contact form 1"
        },
        live: {
            form1: "Contact form 1"
        }
    },
    frlawgroup: {
        dev: {
            form1: "CTA Contact Form",
            form2: "Contact Us Form - SB",
            form3: "Contact Us Form"
        },
        live: {
            form1: "CTA Contact Form",
            form2: "Contact Us Form - SB",
            form3: "Contact Us Form"
        }
    },
    primemedicalpain: {
        dev: {
            form1: "",
            form2: ""
        },
        live: {
            form1: "Contact us - Homepage (New Theme)",
            form2: "Contact form @ Contact Us Page"
        }
    },
    sunrisejewelryusa: {
        dev: {
            form1: "Contact Us"
        },
        live: {
            form1: "Contact Us"
        }
    },
    randosouthwest: {
        dev: {
            form1: "Contact Us ( Form )"
        },
        live: {
            form1: "Contact Us ( Form )"
        }
    },
    primeview: {
        dev: {
            form1: "",
            form2: "",
            form3: "",
            form4: "",
            form5: "",
            form6: "",
            form7: ""
        },
        live: {
            form1: "QUICK QUOTE (Footer)",
            form2: "Contact Us ( Page )",
            form3: "Free Website Quote",
            form4: "Free SEO Quote",
            form5: "Crankwheel Form",
            form6: "Quote Form ( Sidebar )",
            form7: "PDF Form"
        }
    },
    phoenixritecare: {
        dev: {
            form1: "",
            form2: "",
            form3: "",
            form4: "",
            form5: "",
            form6: "",
            form7: "",
            form8: "",
            form9: ""
        },
        live: {
            form1: "Arizona Scholarship - Form",
            form2: "National Scholarship - Form",
            form3: "Voucher - Form",
            form4: "Send Us a Message - Form",
            form5: "Evaluation - Form",
            form6: "Hearing Test - Form",
            form7: "Coach Volunteer - Form",
            form8: "Driver Volunteer - Form",
            form9: "Evaluator Volunteer - Form"
        }
    },
    versatile: {
        dev: {
            form1: "Get In Touch With Us - Contact Us",
            form2: "Custom Tiles Form",
            form3: "Newsletter-Footer",
            form4: "Get In Touch With Us"
        },
        live: {
            form1: "",
            form2: "",
            form3: "",
            form4: ""
        }
    },
    solutionsforum: {
        dev: {
            form1: "Contact form 1"
        },
        live: {
            form1: ""
        }
    },
    lignans: {
        dev: {
            form1: "Contact Form - Basic"
        },
        live: {
            form1: "Contact Form - Basic"
        }
    },
    natina: {
        dev: {
            form1: "Request a quote"
        },
        live: {
            form1: ""
        }
    },
    newhopemedicalcenter: {
        dev: {
            form1: "Home Page Contact",
            form2: "Stories of Hope Form",
            form3: "New PPC Form",
            form4: "Immunotherapy Form",
            form5: "Cancer Page Sidebar Form",
            form6: "Quick Contact Sidebar Form",
            form7: "Contact Us Page Form",
            form8: "Cancer Page Template Form",
            form9: "New PPC Form Test"
        },
        live: {
            form1: "Home Page Contact",
            form2: "Stories of Hope Form",
            form3: "New PPC Form",
            form4: "Immunotherapy Form",
            form5: "Cancer Page Sidebar Form",
            form6: "Quick Contact Sidebar Form",
            form7: "Contact Us Page Form",
            form8: "Cancer Page Template Form",
            form9: "New PPC Form Test"
        }
    },
    culpepper: {
        dev: {
            form1: "Contact Form"
        },
        live: {
            form1: "Contact Form"
        }
    },
    aeroturbine: {
        dev: {
            form1: "Contact Us"
        },
        live: {
            form1: ""
        }
    },
    collisioncenternorthscottsdale: {
        dev: {
            form1: "ACC Authorization Form",
            form2: "Appointment",
            form3: "Body Shop Repair Estimate",
            form4: "Body Shop Repair Estimate (Landing Page)"
        },
        live: {
            form1: "ACC Authorization Form",
            form2: "Appointment",
            form3: "Body Shop Repair Estimate",
            form4: "Body Shop Repair Estimate (Landing Page)"
        }
    },
    jewelryoutletinc: {
        dev: {
            form1: "Contact form 1",
            form2: "Credit Application"
        },
        live: {
            form1: "Contact form 1",
            form2: "Credit Application"
        }
    },
    paysondermatology: {
        dev: {
            form1: "Request an Appointment"
        },
        live: {
            form1: "Request an Appointment"
        }
    },
    renewscal: {
        dev: {
            form1: "",
            form2: ""
        },
        live: {
            form1: "Join Our VIP List",
            form2: "Schedule your consult"
        }
    },
    risingsunmartialartsaz: {
        dev: {
            form1: "Contact Us"
        },
        live: {
            form1: "Contact Us"
        }
    },
    gatorskin: {
        dev: {
            form1: "Contact Page | Form"
        },
        live: {
            form1: "Contact Page | Form"
        }
    },
    virtualassistantsoutsourcing: {
        dev: {
            form1: ""
        },
        live: {
            form1: "Get in Touch with Us - Bottom"
        }
    },
    dentistryatthebiltmore: {
        dev: {
            form1: "",
            form2: "",
            form3: ""
        },
        live: {
            form1: "Book a Consultation",
            form2: "Get Started!",
            form3: "Contact"
        }
    },
    mcbuildingmaintenance: {
        dev: {
            form1: "Contact form 1",
            form2: "Sidebar Form"
        },
        live: {
            form1: "Contact form 1",
            form2: "Sidebar Form"
        }
    },
    cma: {
        dev: {
            form1: "CMA - Contact Form"
        },
        live: {
            form1: "CMA - Contact Form"
        }
    }
}


let form_page = {
    accidentchiropracticaz: {
        dev: {
            form1: "/admin.php?page=wpcf7&post=46&action=edit",
            form2: "/admin.php?page=wpcf7&post=1032&action=edit"
        },
        live: {
            form1: "/admin.php?page=wpcf7&post=46&action=edit",
            form2: "/admin.php?page=wpcf7&post=1032&action=edit"
        }
    },
    advancedimagemedspa: {
        dev: {
            form1: "/admin.php?page=wpcf7&post=40&action=edit",
            form2: "/admin.php?page=wpcf7&post=6960&action=edit",
            form3: "/admin.php?page=wpcf7&post=8775&action=edit"
        },
        live: {
            form1: "/admin.php?page=wpcf7&post=40&action=edit",
            form2: "/admin.php?page=wpcf7&post=6960&action=edit",
            form3: "/admin.php?page=wpcf7&post=8775&action=edit"
        }
    },
    aerialengagement: {
        dev: {
            form1: "/admin.php?page=wpcf7&post=19&action=edit"
        },
        live: {
            form1: "/admin.php?page=wpcf7&post=19&action=edit"
        }
    },
    americanleatherusa: {
        dev: {
            form1: "/admin.php?page=wpcf7&post=10&action=edit"
        },
        live: {
            form1: "/admin.php?page=wpcf7&post=10&action=edit"
        }
    },
    andresperezjurado: {
        dev: {
            form1: "/admin.php?page=wpcf7&post=324&action=edit"
        },
        live: {
            form1: "/admin.php?page=wpcf7&post=324&action=edit"
        }
    },
    azdoordoctor: {
        dev: {
            form1: "/admin.php?page=wpcf7&post=1133&action=edit",
            form2: "/admin.php?page=wpcf7&post=1385&action=edit",
            form3: "/admin.php?page=wpcf7&post=1372&action=edit"
        },
        live: {
            form1: "/admin.php?page=wpcf7&post=1133&action=edit",
            form2: "/admin.php?page=wpcf7&post=1385&action=edit",
            form3: "/admin.php?page=wpcf7&post=1372&action=edit"
        }
    },
    biltmoreloanandjewelry: {
        dev: {
            form1: "/admin.php?page=wpcf7&post=41813&action=edit",
            form2: "/admin.php?page=wpcf7&post=41779&action=edit",
            form3: "/admin.php?page=wpcf7&post=3898&action=edit",
            form4: "/admin.php?page=wpcf7&post=4&action=edit",
            form5: "/admin.php?page=wpcf7&post=31398&action=edit",
            form6: "/admin.php?page=wpcf7&post=3975&action=edit"
        },
        live: {
            form1: "/admin.php?page=wpcf7&post=41813&action=edit",
            form2: "/admin.php?page=wpcf7&post=41779&action=edit",
            form3: "/admin.php?page=wpcf7&post=3898&action=edit",
            form4: "/admin.php?page=wpcf7&post=4&action=edit",
            form5: "/admin.php?page=wpcf7&post=31398&action=edit",
            form6: "/admin.php?page=wpcf7&post=3975&action=edit"
        }
    },
    buckeyederm: {
        dev: {
            form1: "/admin.php?page=wpcf7&post=67&action=edit"
        },
        live: {
            form1: "/admin.php?page=wpcf7&post=67&action=edit"
        }
    },
    canyonfallshairextensioncompany: {
        dev: {
            form1: "/admin.php?page=wpcf7&post=10173&action=edit",
            form2: "/admin.php?page=wpcf7&post=9439&action=edit"
        },
        live: {
            form1: "/admin.php?page=wpcf7&post=10173&action=edit",
            form2: "/admin.php?page=wpcf7&post=9439&action=edit"
        },
    },
    crexendo: {
        dev: {
            form1: "/admin.php?page=wpcf7&post=7624&action=edit",
            form2: "/admin.php?page=wpcf7&post=7891&action=edit",
            form3: "/admin.php?page=wpcf7&post=7903&action=edit",
            form4: "/admin.php?page=wpcf7&post=8649&action=edit",
            form5: "/admin.php?page=wpcf7&post=8646&action=edit"
        },
        live: {
            form1: "/admin.php?page=wpcf7&post=7624&action=edit",
            form2: "/admin.php?page=wpcf7&post=7891&action=edit",
            form3: "/admin.php?page=wpcf7&post=7903&action=edit",
            form4: "/admin.php?page=wpcf7&post=8649&action=edit",
            form5: "/admin.php?page=wpcf7&post=8646&action=edit"
        }
    },
    ewingconstruction: {
        dev: {
            form1: "/admin.php?page=wpcf7&post=31&action=edit"
        },
        live: {
            form1: "/admin.php?page=wpcf7&post=31&action=edit"
        }
    },
    indinspect: {
        dev: {
            form1: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=1",
            form2: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=2"
        },
        live: {
            form1: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=1",
            form2: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=2"
        }
    },
    judefrancesjewelry: {
        dev: {
            form1: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=1",
            form2: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=2",
            form3: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=3",
            form4: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=4",
            form5: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=5",
            form6: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=6"
        },
        live: {
            form1: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=1",
            form2: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=2",
            form3: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=3",
            form4: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=4",
            form5: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=5",
            form6: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=6"
        }
    },
    kyrenefamilydentistry: {
        dev: {
            form1: "/admin.php?page=wpcf7&post=2476&action=edit",
            form2: "/admin.php?page=wpcf7&post=2481&action=edit"
        },
        live: {
            form1: "/admin.php?page=wpcf7&post=2476&action=edit",
            form2: "/admin.php?page=wpcf7&post=2481&action=edit"
        }
    },
    optimizex: {
        dev: {
            form1: "/admin.php?page=wpcf7&post=11882&action=edit",
            form2: "/admin.php?page=wpcf7&post=11883&action=edit",
            form3: "/admin.php?page=wpcf7&post=11935&action=edit"
        },
        live: {
            form1: "/admin.php?page=wpcf7&post=11882&action=edit",
            form2: "/admin.php?page=wpcf7&post=11883&action=edit",
            form3: "/admin.php?page=wpcf7&post=11935&action=edit"
        }
    },
    sellusyourcaraz: {
        dev: {
            form1: "/admin.php?page=wpcf7&post=117&action=edit",
            form2: "/admin.php?page=wpcf7&post=2612&action=edit",
            form3: "/admin.php?page=wpcf7&post=130&action=edit"
        },
        live: {
            form1: "/admin.php?page=wpcf7&post=117&action=edit",
            form2: "/admin.php?page=wpcf7&post=2612&action=edit",
            form3: "/admin.php?page=wpcf7&post=130&action=edit"
        }
    },
    freddabranyon: {
        dev: {
            form1: "/admin.php?page=wpcf7&post=4&action=edit"
        },
        live: {
            form1: "/admin.php?page=wpcf7&post=4&action=edit"
        }
    },
    frlawgroup: {
        dev: {
            form1: "/admin.php?page=wpcf7&post=807&action=edit",
            form2: "/admin.php?page=wpcf7&post=390&action=edit",
            form3: "/admin.php?page=wpcf7&post=317&action=edit"
        },
        live: {
            form1: "/admin.php?page=wpcf7&post=807&action=edit",
            form2: "/admin.php?page=wpcf7&post=390&action=edit",
            form3: "/admin.php?page=wpcf7&post=317&action=edit"
        }
    },
    primemedicalpain: {
        dev: {
            form1: "/admin.php?page=wpcf7&post=673&action=edit",
            form2: "/admin.php?page=wpcf7&post=310&action=edit"
        },
        live: {
            form1: "/admin.php?page=wpcf7&post=673&action=edit",
            form2: "/admin.php?page=wpcf7&post=310&action=edit"
        }
    },
    sunrisejewelryusa: {
        dev: {
            form1: "/admin.php?page=wpcf7&post=2297&action=edit"
        },
        live: {
            form1: "/admin.php?page=wpcf7&post=2297&action=edit"
        }
    },
    randosouthwest: {
        dev: {
            form1: "/admin.php?page=wpcf7&post=4&action=edit"
        },
        live: {
            form1: "/admin.php?page=wpcf7&post=4&action=edit"
        }
    },
    primeview: {
        dev: {
            form1: "/admin.php?page=wpcf7&post=10415&action=edit",
            form2: "/admin.php?page=wpcf7&post=5608&action=edit",
            form3: "/admin.php?page=wpcf7&post=5612&action=edit",
            form4: "/admin.php?page=wpcf7&post=5610&action=edit",
            form5: "/admin.php?page=wpcf7&post=17730&action=edit",
            form6: "/admin.php?page=wpcf7&post=65&action=edit",
            form7: "/admin.php?page=wpcf7&post=5607&action=edit"
        },
        live: {
            form1: "/admin.php?page=wpcf7&post=10415&action=edit",
            form2: "/admin.php?page=wpcf7&post=5608&action=edit",
            form3: "/admin.php?page=wpcf7&post=5612&action=edit",
            form4: "/admin.php?page=wpcf7&post=5610&action=edit",
            form5: "/admin.php?page=wpcf7&post=17730&action=edit",
            form6: "/admin.php?page=wpcf7&post=65&action=edit",
            form7: "/admin.php?page=wpcf7&post=5607&action=edit"
        }
    },
    phoenixritecare: {
        dev: {
            form1: "/admin.php?page=wpcf7&post=269&action=edit",
            form2: "/admin.php?page=wpcf7&post=457&action=edit",
            form3: "/admin.php?page=wpcf7&post=95&action=edit",
            form4: "/admin.php?page=wpcf7&post=31&action=edit",
            form5: "/admin.php?page=wpcf7&post=489&action=edit",
            form6: "/admin.php?page=wpcf7&post=487&action=edit",
            form7: "/admin.php?page=wpcf7&post=461&action=edit",
            form8: "/admin.php?page=wpcf7&post=462&action=edit",
            form9: "/admin.php?page=wpcf7&post=463&action=edit"
        },
        live: {
            form1: "/admin.php?page=wpcf7&post=269&action=edit",
            form2: "/admin.php?page=wpcf7&post=457&action=edit",
            form3: "/admin.php?page=wpcf7&post=95&action=edit",
            form4: "/admin.php?page=wpcf7&post=31&action=edit",
            form5: "/admin.php?page=wpcf7&post=489&action=edit",
            form6: "/admin.php?page=wpcf7&post=487&action=edit",
            form7: "/admin.php?page=wpcf7&post=461&action=edit",
            form8: "/admin.php?page=wpcf7&post=462&action=edit",
            form9: "/admin.php?page=wpcf7&post=463&action=edit"
        }
    },
    versatile: {
        dev: {
            form1: "/admin.php?page=wpcf7&post=183&action=edit",
            form2: "/admin.php?page=wpcf7&post=187&action=edit",
            form3: "/admin.php?page=wpcf7&post=52&action=edit",
            form4: "/admin.php?page=wpcf7&post=12&action=edit"
        },
        live: {
            form1: "/admin.php?page=wpcf7&post=183&action=edit",
            form2: "/admin.php?page=wpcf7&post=187&action=edit",
            form3: "/admin.php?page=wpcf7&post=52&action=edit",
            form4: "/admin.php?page=wpcf7&post=12&action=edit"
        }
    },
    solutionsforum: {
        dev: {
            form1: "/admin.php?page=wpcf7&post=5&action=edit"
        },
        live: {
            form1: "/admin.php?page=wpcf7&post=5&action=edit"
        }
    },
    lignans: {
        dev: {
            form1: "/admin.php?page=wpcf7&post=74&action=edit"
        },
        live: {
            form1: "/admin.php?page=wpcf7&post=74&action=edit"
        }
    },
    natina: {
        dev: {
            form1: "/admin.php?page=wpcf7&post=192&action=edit"
        },
        live: {
            form1: "/admin.php?page=wpcf7&post=192&action=edit"
        }
    },
    newhopemedicalcenter: {
        dev: {
            form1: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=1",
            form2: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=2",
            form3: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=3",
            form4: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=5",
            form5: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=6",
            form6: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=7",
            form7: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=8",
            form8: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=4",
            form9: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=10"
        },
        live: {
            form1: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=1",
            form2: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=2",
            form3: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=3",
            form4: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=5",
            form5: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=6",
            form6: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=7",
            form7: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=8",
            form8: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=4",
            form9: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=10"
        }
    },
    culpepper: {
        dev: {
            form1: ""
        },
        live: {
            form1: "/admin.php?page=ninja-forms&form_id=1"
        }
    },
    aeroturbine: {
        dev: {
            form1: "/admin.php?page=wpcf7&post=187&action=edit"
        },
        live: {
            form1: ""
        }
    },
    collisioncenternorthscottsdale: {
        dev: {
            form1: "/admin.php?page=wpcf7&post=5381&action=edit",
            form2: "/admin.php?page=wpcf7&post=116&action=edit",
            form3: "/admin.php?page=wpcf7&post=4&action=edit",
            form4: "/admin.php?page=wpcf7&post=4095&action=edit"
        },
        live: {
            form1: "/admin.php?page=wpcf7&post=5381&action=edit",
            form2: "/admin.php?page=wpcf7&post=116&action=edit",
            form3: "/admin.php?page=wpcf7&post=4&action=edit",
            form4: "/admin.php?page=wpcf7&post=4095&action=edit"
        }
    },
    jewelryoutletinc: {
        dev: {
            form1: "/admin.php?page=wpcf7&post=33&action=edit",
            form2: "/admin.php?page=wpcf7&post=891&action=edit"
        },
        live: {
            form1: "/admin.php?page=wpcf7&post=33&action=edit",
            form2: "/admin.php?page=wpcf7&post=891&action=edit"
        }
    },
    paysondermatology: {
        dev: {
            form1: "/admin.php?page=wpcf7&post=453&action=edit"
        },
        live: {
            form1: "/admin.php?page=wpcf7&post=453&action=edit"
        }
    },
    renewscal: {
        dev: {
            form1: "",
            form2: ""
        },
        live: {
            form1: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=3",
            form2: "/admin.php?page=gf_edit_forms&view=settings&subview=notification&id=1"
        }
    },
    risingsunmartialartsaz: {
        dev: {
            form1: "/admin.php?page=wpcf7&post=5&action=edit"
        },
        live: {
            form1: "/admin.php?page=wpcf7&post=5&action=edit"
        }
    },
    gatorskin: {
        dev: {
            form1: "/admin.php?page=wpcf7&post=23&action=edit"
        },
        live: {
            form1: "/admin.php?page=wpcf7&post=23&action=edit"
        }
    },
    virtualassistantsoutsourcing: {
        dev: {
            form1: ""
        },
        live: {
            form1: "/admin.php?page=wpcf7&post=66&action=edit"
        }
    },
    dentistryatthebiltmore: {
        dev: {
            form1: "",
            form2: "",
            form3: ""
        },
        live: {
            form1: "/admin.php?page=wpcf7&post=804&action=edit",
            form2: "/admin.php?page=wpcf7&post=805&action=edit",
            form3: "/admin.php?page=wpcf7&post=155&action=edit"
        }
    },
    mcbuildingmaintenance: {
        dev: {
            form1: "/admin.php?page=wpcf7&post=8&action=edit",
            form2: "/admin.php?page=wpcf7&post=407&action=edit"
        },
        live: {
            form1: "/admin.php?page=wpcf7&post=8&action=edit",
            form2: "/admin.php?page=wpcf7&post=407&action=edit"
        }
    },
    cma: {
        dev: {
            form1: "/admin.php?page=wpcf7&post=56&action=edit"
        },
        live: {
            form1: "/admin.php?page=wpcf7&post=56&action=edit"
        }
    }
}


// responsiveness
const lambdatest_site = "https://app.lambdatest.com/console/realtime";

let creds_lambdatest = {
    email: "pvqa@primeview.com",
    password: "iN1vN6lU1qD8",
}

let devices = {
    desktop: "DESKTOP",
    mobile: "MOBILE",
    tablet: "TABLET"
}

let versions = {
    desktop: {
        version1: "Windows 11",
        version2: "Windows 8",
        version3: "Windows 7",
        version4: "macOS Sierra 10.12"
    },
    mobile:  {
        version1: "Samsung Galaxy M30s",
        version2: "Google Pixel 5",
        version3: "OnePlus 9",
        version4: "Xiaomi Mi 11",
        version5: "Realme 5",
        version6: "Huawei P30 Pro",
        version7: "Sony Xperia xz2",
        version8: "Moto G6",
        version9: "LG G6",
        version10: "iPhone 13 Pro Max",
        version11: "iPhone 13 Pro",
        version12: "iPhone 13",
        version13: "iPhone 12 Pro Max",
        version14: "iPhone 11 Pro Max",
        version15: "iPhone X",
    },
    tablet: {
        version1: "iPad Air (4th generation)",
        version2: "Galaxy Tab S7 Plus",
        version3: "Galaxy Tab S6"
    }
}

let device_desktop = {
    windows_11: " Windows 11",
    windows_8: " Windows 8",
    windows_7: " Windows 7",
    macos_sierra: " macOS Sierra"
}

// mobile
let os_mobile = {
    android: "Android",
    ios: "IOS"
}

let brand_mobile = {
    samsung: "Samsung",
    google: "Google",
    oneplus: "OnePlus",
    microsoft: "Microsoft",
    xiaomi: "Xiaomi",
    realme: "Realme",
    huawei: "Huawei",
    sony: "Sony",
    motorola: "Motorola",
    lg: "LG",
    htc: "HTC",
    oppo: "Oppo",
    gionee: "Gionee",
    amazon: "Amazon",
    vivo: "Vivo",
    zebra: "Zebra",
    iphone: "iPhone"
}

let deviceOrOS_mobile = {
    samsung_galaxy_m30s: " Galaxy M30s\n12.0",
    google_pixel_5_5g: " Google Pixel 5 - 5G\n12.0",
    one_plus_9: " OnePlus 9 Pro\n12.0",
    xiaomi_mi_11: " Xiaomi Mi 11 Pro\n11.0",
    real_me_5: " Realme 5\n10.0",
    huawei_p30_pro: " Huawei P30 Pro\n9.0",
    sony_xperia_xz2: " Sony Xperia xz2\n8.0",
    moto_g6: " Moto G6\n9.0",
    lg_g6: " LG G6\n8.0",
    iphone_13_pro_max: " iPhone 13 Pro Max",
    iphone_13_pro: " iPhone 13 Pro",
    iphone_13: " iPhone 13",
    iphone_12_pro_max: " iPhone 12 Pro Max",
    iphone_11_pro_max: " iPhone 11 Pro Max",
    iphone_x: " iPhone X"
}


// tablet
let os_tablet = {
    android: "Android",
    ios: "IOS"
}

let brand_tablet = {
    samsung: "Samsung",
    ipad: "iPad"
}

let deviceOrOS_tablet = {
    ipad_air_4th_gen: " iPad Air (4th generation)",
    galaxy_tab_s7_plus: " Galaxy Tab S7 Plus\n11.0",
    galaxy_tab_s6: " Galaxy Tab S6\n9.0"
}


let brand = {
    mobile : {
        samsung: "return document.getElementsByTagName('li')[202].click()",
        google: "return document.getElementsByTagName('li')[203].click()",
        one_plus: "return document.getElementsByTagName('li')[204].click()",
        xiaomi: "return document.getElementsByTagName('li')[206].click()",
        real_me: "return document.getElementsByTagName('li')[207].click()",
        huawei: "return document.getElementsByTagName('li')[208].click()",
        sony: "return document.getElementsByTagName('li')[209].click()",
        motorola: "return document.getElementsByTagName('li')[210].click()",
        lg: "return document.getElementsByTagName('li')[211].click()",
        iphone: "return document.getElementById('apple-icon').click()"
    },
    tablet: {
        ios: "return document.getElementById('apple-icon').click()",
        android: "return document.getElementById('android-icon').click()"
    }
}

let device_mobile = {
    samsung_galaxy_m30s: "return document.getElementsByTagName('li')[218].click()",
    google_pixel_5_5g: "return document.getElementsByTagName('li')[183].click()",
    one_plus_9: "return document.getElementsByTagName('li')[181].click()",
    xiaomi_mi_11: "return document.getElementsByTagName('li')[178].click()",
    real_me_5: "return document.getElementsByTagName('li')[165].click()",
    huawei_p30_pro: "return document.getElementsByTagName('li')[166].click()",
    sony_xperia_xz2: "return document.getElementsByTagName('li')[162].click()",
    moto_g6: "return document.getElementsByTagName('li')[163].click()",
    lg_g6: "return document.getElementsByTagName('li')[165].click()",
    iphone_13_pro_max: "return document.getElementsByTagName('li')[141].click()",
    iphone_13_pro: "return document.getElementsByTagName('li')[142].click()",
    iphone_13: "return document.getElementsByTagName('li')[144].click()",
    iphone_12_pro_max: "return document.getElementsByTagName('li')[145].click()",
    iphone_11_pro_max: "return document.getElementsByTagName('li')[150].click()",
    iphone_x: "return document.getElementsByTagName('li')[156].click()"
}

// tablet
let device_tablet = {
    ipad_air_4th_gen: "return document.getElementsByTagName('li')[218].click()",
    galaxy_tab_s7_plus: "return document.getElementsByTagName('li')[222].click()",
    galaxy_tab_s6: "return document.getElementsByTagName('li')[258].click()"
}




module.exports = {
    usernameData_devs,
    usernameData_marketing,
    date,
    wp_creds,
    domain,
    forms,
    sheetId,
    ranges,
    range_recipient,
    range_thankyou_page,
    qa_email,
    module_name,
    launch,
    contact_form_name,
    contact_form_shortcode,
    webforms,
    form_page,
    lambdatest_site, 
    creds_lambdatest, 
    devices,
    versions,
    device_desktop,
    brand,
    device_mobile,
    device_tablet,
    os_mobile,
    brand_mobile,
    deviceOrOS_mobile,
    os_tablet,
    brand_tablet,
    deviceOrOS_tablet
};

