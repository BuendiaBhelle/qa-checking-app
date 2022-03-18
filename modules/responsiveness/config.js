const lambdatest_site = "https://app.lambdatest.com/console/realtime";

let creds_lambdatest = {
    email: "pvqa@primeview.com",
    password: "iN1vN6lU1qD8",
}

const module_name = "RESPONSIVENESS";

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



module.exports = { 
    lambdatest_site, 
    creds_lambdatest, 
    module_name,
    devices,
    versions
};
