const {Builder, By} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../config.js");
const alert = require("alert");
require('chromedriver');

const auth = config.auth;
const spreadsheetId = config.spreadsheetId_dev_checklist;


async function dev_checklist(link, username, password, woocommerce) {
    const client = await auth.getClient();
    var googleSheets = google.sheets({ version: "v4", auth: client });
    var driver = await new Builder().forBrowser("chrome").build();

    console.log(woocommerce);

    function write_link_to_sheets(range, values) {
        try {
            setTimeout(() => {
                googleSheets.spreadsheets.values.append({
                    auth,
                    spreadsheetId,
                    range: range,
                    valueInputOption: "USER_ENTERED",
                    resource: {
                        values: [
                            [ 
                                values
                            ]
                        ]
                    }
                });
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }
    
    // DEFAULT PLUGINS
    if (link === "https://www.hospiceofyuma.com") {
        await driver.get(link + "hoylogin");
    } else if (link === "https://www.phoenixritecare.org") {
        await driver.get(link + "members-login/");
    } else if ((link === "https://www.thehairextensioncompany.com") || (link === "https://www.inspirednetworks.com")) {
        await driver.get(link + "wp-admin");
    } else {
        await driver.get(link + "pvlogin");
    }

    // wp login
    try {
        if (link === "https://www.phoenixritecare.org") {
            await driver.findElement(By.id("user_login")).sendKeys(username);
            await driver.findElement(By.id("user_pass")).sendKeys(password);
            await driver.executeScript("return document.getElementsByClassName('tml-button')[0].click()");
    
            let button_length = await driver.executeScript("return document.getElementsByClassName('btn').length");
            for (let index = 0; index < button_length; index++) {
                let button_innertext = await driver.executeScript("return document.getElementsByClassName('btn')[" + index + "].innerText");
                if (button_innertext === "Website") {
                    await driver.executeScript("return document.getElementsByClassName('btn')[" + index + "].click()");
                    console.log("WEBSITE");
                    break;
                }
            }
    
            await driver.executeScript("return document.getElementsByClassName('wp-menu-image dashicons-before dashicons-admin-plugins')[0].click()");
            await driver.sleep(1000);
            await driver.get(link + "wp-admin/plugins.php");
        } if (link === "https://www.maintenancebest.com") {
            await driver.findElement(By.id("1helauaoii80")).sendKeys(username);
            await driver.findElement(By.id("6afbbvfn0560")).sendKeys(password);
            await driver.executeScript("return document.getElementsByClassName('pp-submit-form ppform-submit-button')[0].click()");
            await driver.sleep(1000);
            await driver.get(link + "wp-admin/plugins.php");
        } 
        else {
            await driver.findElement(By.name("log")).sendKeys(username);
            await driver.findElement(By.name("pwd")).sendKeys(password);
            await driver.findElement(By.id("wp-submit")).click();
            await driver.sleep(1000);
            await driver.get(link + "wp-admin/plugins.php");
        }

        let login_error = await driver.executeScript("return document.getElementById('login_error')");
        var admin_email_verification = await driver.executeScript("return document.querySelector('form').classList.contains('admin-email-confirm-form')");  
        if (login_error) {
            console.log("DEFAULT PLUGINS - wordpress login failed.");
        } else if (admin_email_verification === true) {
                await driver.executeScript("return document.getElementsByTagName('a')[3].click()");
                await driver.sleep(1000);
                await driver.get(link + "wp-admin/plugins.php");
                console.log("DEFAULT PLUGINS - admin email verification.");
            } else {
                console.log("DEFAULT PLUGINS - wordpress login success.");
            }    
    } catch (error) {
        console.log(error);
    }

    // check for default plugins
    try {            
        let plugin_active_is_uninstallable_length = await driver.executeScript("return document.getElementsByClassName('active').length");
        var plugins_count = plugin_active_is_uninstallable_length-1;
        for (let i = 0; i <= plugins_count; i++) {
            let plugin_active_is_uninstallable = await driver.executeScript("return document.getElementsByClassName('active')[" + i + "].getAttribute('data-slug')");

            // check for Broken Link Checker plugin 
            if (plugin_active_is_uninstallable === "broken-link-checker") {
                console.log("With Broken Link Checker.");   
                googleSheets.spreadsheets.values.append({
                    auth,
                    spreadsheetId,
                    range: "Sheet1!C3",
                    valueInputOption: "USER_ENTERED",
                    resource: {
                        values: [
                            [ 
                                "With Broken Link Checker."
                            ]
                        ]
                    }
                });
                await driver.sleep(1000);
            }
            // check for Yoast SEO plugin 
            if (plugin_active_is_uninstallable === "wordpress-seo") {
                console.log("With Yoast SEO.");   
                googleSheets.spreadsheets.values.append({
                    auth,
                    spreadsheetId,
                    range: "Sheet1!C4",
                    valueInputOption: "USER_ENTERED",
                    resource: {
                        values: [
                            [ 
                                "With Yoast SEO."
                            ]
                        ]
                    }
                });
                await driver.sleep(1000);            }
            // check for SMTP plugin 
            if (plugin_active_is_uninstallable === "wp-mail-smtp") {
                console.log("With SMTP.");   
                googleSheets.spreadsheets.values.append({
                    auth,
                    spreadsheetId,
                    range: "Sheet1!C5",
                    valueInputOption: "USER_ENTERED",
                    resource: {
                        values: [
                            [ 
                                "With SMTP."
                            ]
                        ]
                    }
                });
                await driver.sleep(1000);
            }
        }
        console.log("DEFAULT PLUGINS - check for plugin success.");
        await driver.sleep(1000);
    } catch (error) {
        console.log(error);
        await driver.sleep(1000);
    }

    // SITE TITLE
    await driver.switchTo().newWindow('tab');
    await driver.get(link);
    await driver.sleep(3000);

    let site_title = await driver.executeScript("return document.getElementsByTagName('title')[0].innerText");
    console.log(site_title);

    try {
        googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Sheet1!C2",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [ 
                        "[ " + site_title + " ]"
                    ]
                ]
            }
        });
        await driver.sleep(1000);
    } catch (error) {
        console.log(error);
    }
    await driver.sleep(1000);


    // COPYRIGHT 
    let p_count = await driver.executeScript("return document.getElementsByTagName('p').length");

    for (let index = 0; index < p_count; index++) {
        let copyright = await driver.executeScript("return document.getElementsByTagName('p')[" + index + "].innerText");
        
        if ((copyright.includes("Copyright")) || (copyright.includes("All Rights Reserved")) || (copyright.includes("©")) 
        || (copyright.includes("ALL RIGHTS RESERVED"))) {
            console.log(copyright);
            try {
                // write date to sheet
                await googleSheets.spreadsheets.values.append({
                    auth,
                    spreadsheetId,
                    range: "Sheet1!C6",
                    valueInputOption: "USER_ENTERED",
                    resource: {
                        values: [
                            [ 
                                "[ " + copyright + " ]"
                            ]
                        ]
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }
    }
    await driver.sleep(1000);


    // IMAGES
    var range = "Sheet1!C8";
    var values = "https://docs.google.com/spreadsheets/d/1Fnni9jm4brdAzJk8btvQ-pJ_0467mmBktiOWBCN9rjg/edit#gid=592523417";
    let images_count = await driver.executeScript("return document.getElementsByTagName('img').length");
    for (let index = 0; index < images_count; index++) {
        let image_source = await driver.executeScript("return document.getElementsByTagName('img')[" + index + "].src");
    
        var img_jpg = ".jpg";
        var img_png = ".png";
        var img_jpeg = ".jpeg";
        
        if ((image_source.includes(img_jpg) || (image_source.includes(img_png)) || (image_source.includes(img_jpeg)))) {
            try {
                googleSheets.spreadsheets.values.append({
                    auth,
                    spreadsheetId,
                    range: "Images!A2",
                    valueInputOption: "USER_ENTERED",
                    resource: {
                        values: [
                            [ 
                                image_source
                            ]
                        ]
                    }
                });
                await driver.sleep(1000);
            } catch (error) {
                console.log(error);
            }
          console.log(image_source);
        } 
    }
    write_link_to_sheets(range, values);
    await driver.sleep(1000);


    // EXTERNAL LINKS
    var range = "Sheet1!C9";
    var values = "https://docs.google.com/spreadsheets/d/1Fnni9jm4brdAzJk8btvQ-pJ_0467mmBktiOWBCN9rjg/edit#gid=1250732519";
    let external_links_count = await driver.executeScript("return document.getElementsByTagName('a').length");
    console.log(external_links_count);

    try {
        for (let index = 0; index < external_links_count; index++) {
            let external_links = await driver.executeScript("return document.getElementsByTagName('a')[" + index + "].getAttribute('href')");

            if (external_links != null) {
                let host = await driver.executeScript("return window.location.hostname");
                let link_checker = external_links.slice(0, 1);
                let link_checker2 = external_links.slice(0, 3);

                if ((!external_links.includes(host)) && (external_links.length != 0)) {
                    if ((link_checker != "/") && (link_checker != "#") && (link_checker2 != "tel")) {
                        console.log(external_links);

                        let target_attribute = await driver.executeScript("return document.getElementsByTagName('a')[" + index + "].getAttribute('target')");
                        console.log(target_attribute);
                        try {
                            googleSheets.spreadsheets.values.append({
                                auth,
                                spreadsheetId,
                                range: "External Links!A2:B2",
                                valueInputOption: "USER_ENTERED",
                                resource: {
                                    values: [
                                        [ 
                                            external_links,
                                            target_attribute
                                        ]
                                    ]
                                }
                            });
                            await driver.sleep(1000);
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
    write_link_to_sheets(range, values);
    await driver.sleep(1000);


    // CONTACT NUMBERS
    var range = "Sheet1!C10";
    var values = "https://docs.google.com/spreadsheets/d/1Fnni9jm4brdAzJk8btvQ-pJ_0467mmBktiOWBCN9rjg/edit#gid=989210029";
    try {
        for (let index = 0; index < p_count; index++) {

            let contact_number = await driver.executeScript("return document.getElementsByTagName('p')[" + index + "].innerText");
            let hasNumber = /\d/;
    
            if ((hasNumber.test(contact_number) === true) && (contact_number.includes("480"))) {
                console.log(contact_number);
                try {
                    googleSheets.spreadsheets.values.append({
                        auth,
                        spreadsheetId,
                        range: "Contact Numbers!A2",
                        valueInputOption: "USER_ENTERED",
                        resource: {
                            values: [
                                [ 
                                    contact_number
                                ]
                            ]
                        }
                    });
                    await driver.sleep(1000);
                } catch (error) {
                    console.log(error);
                }
            }


        }
    } catch (error) {
        console.log(error);
    }
    write_link_to_sheets(range, values);
    await driver.sleep(1000);


    // EMAIL ADDRESSES
    var range = "Sheet1!C11";
    var values = "https://docs.google.com/spreadsheets/d/1Fnni9jm4brdAzJk8btvQ-pJ_0467mmBktiOWBCN9rjg/edit#gid=447596669";
    try {
        for (let index = 0; index < p_count; index++) {

            let email_addresses = await driver.executeScript("return document.getElementsByTagName('p')[" + index + "].innerText");
    
            if (email_addresses.includes("@")) {
                console.log(email_addresses);
                try {
                    googleSheets.spreadsheets.values.append({
                        auth,
                        spreadsheetId,
                        range: "Email Addresses!A2",
                        valueInputOption: "USER_ENTERED",
                        resource: {
                            values: [
                                [ 
                                    email_addresses
                                ]
                            ]
                        }
                    });
                    await driver.sleep(1000);
                } catch (error) {
                    console.log(error);
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
    write_link_to_sheets(range, values);
    await driver.sleep(1000);


    // SEARCH FUNCTION
    let search1 = await driver.executeScript("return document.getElementsByClassName('search-field')[0]");
    let search2 = await driver.executeScript("return document.getElementsByClassName('fa fa-search')[0]");
    let search3 = await driver.executeScript("return document.getElementsByClassName('vantage-icon-search')[0]");
    let search4 = await driver.executeScript("return document.getElementsByClassName('adas_search')[1]");
    let search5 = await driver.executeScript("return document.getElementsByClassName('fas fa-search')[0]");

    try {
        if ((search1 != undefined) || (search2 != undefined) || (search3 != undefined) || (search4 != undefined)
        || (search5 != undefined)) {
            console.log("With Search function.");
            try {
                googleSheets.spreadsheets.values.append({
                    auth,
                    spreadsheetId,
                    range: "Sheet1!C12",
                    valueInputOption: "USER_ENTERED",
                    resource: {
                        values: [
                            [ 
                                "With Search function."
                            ]
                        ]
                    }
                });
                await driver.sleep(1000);
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Without Search function.");
            try {
                googleSheets.spreadsheets.values.append({
                    auth,
                    spreadsheetId,
                    range: "Sheet1!C12",
                    valueInputOption: "USER_ENTERED",
                    resource: {
                        values: [
                            [ 
                                "Without Search function."
                            ]
                        ]
                    }
                });
                await driver.sleep(1000);
            } catch (error) {
                console.log(error);
            }
        }
    } catch (error) {
        console.log(error);
    }
    await driver.sleep(1000);


    // TERMS & PRIVACY
    var range = "Sheet1!C14";
    var values = "https://docs.google.com/spreadsheets/d/1Fnni9jm4brdAzJk8btvQ-pJ_0467mmBktiOWBCN9rjg/edit#gid=1894558610";
    let links_count = await driver.executeScript("return document.getElementsByTagName('a').length");

    var privacy_or_terms_link;
    for (let index = 0; index < links_count; index++) {
        let privacy_or_terms_text = await driver.executeScript("return document.getElementsByTagName('a')[" + index + "].innerText");
        privacy_or_terms_link = await driver.executeScript("return document.getElementsByTagName('a')[" + index + "].getAttribute('href')");
        let hostname = await driver.executeScript("return window.location.hostname");
        
        if ((privacy_or_terms_text.includes("Privacy Policy")) || (privacy_or_terms_text.includes("Terms and Conditions")) || (privacy_or_terms_text.includes("Terms & Conditions"))) {
            console.log(privacy_or_terms_text);

            if (privacy_or_terms_link.substring(0,1) === "/") {
                privacy_or_terms_link = hostname + privacy_or_terms_link;
                console.log(privacy_or_terms_link);
            } else {
                console.log(privacy_or_terms_link);
            }
            try {
                googleSheets.spreadsheets.values.append({
                    auth,
                    spreadsheetId,
                    range: "Privacy Policy/Terms and Conditions!A2:B2",
                    valueInputOption: "USER_ENTERED",
                    resource: {
                        values: [
                            [ 
                                privacy_or_terms_text,
                                privacy_or_terms_link
                            ]
                        ]
                    }
                });
                await driver.sleep(1000);
            } catch (error) {
                console.log(error);
            }
        } 
    }
    write_link_to_sheets(range, values);
    await driver.sleep(1000);


    // SOCIAL MEDIA LINKS
    var range = "Sheet1!C15";
    var values = "https://docs.google.com/spreadsheets/d/1Fnni9jm4brdAzJk8btvQ-pJ_0467mmBktiOWBCN9rjg/edit#gid=633909758";
    let social_media_links_count = await driver.executeScript("return document.getElementsByTagName('a').length");

    try {
        for (let index = 0; index < social_media_links_count; index++) {
            let social_media_links = await driver.executeScript("return document.getElementsByTagName('a')[" + index + "].getAttribute('href')");

            if (social_media_links != null) {
                if ((social_media_links.includes("facebook")) || (social_media_links.includes("twitter")) || (social_media_links.includes("instagram")) || (social_media_links.includes("linkedin"))) {
                    console.log(social_media_links);

                    try {
                        // write to sheet
                        googleSheets.spreadsheets.values.append({
                            auth,
                            spreadsheetId,
                            range: "Social Media Links!A2",
                            valueInputOption: "USER_ENTERED",
                            resource: {
                                values: [
                                    [ 
                                        social_media_links
                                    ]
                                ]
                            }
                        });
                        await driver.sleep(1000);
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
    write_link_to_sheets(range, values);
    await driver.sleep(1000);


    // SITEMAP
    await driver.switchTo().newWindow('tab');
    await driver.get(link + "sitemap_index.xml");
    await driver.sleep(1000);
    let xml_url = await driver.executeScript("return document.getElementsByTagName('title')[0].innerText");
    console.log(xml_url);

    if (xml_url.includes("XML Sitemap")) {
        console.log("With Sitemap.");
        try {
            // write data to sheet
            googleSheets.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: "Sheet1!C16",
                valueInputOption: "USER_ENTERED",
                resource: {
                    values: [
                        [ 
                            "With Sitemap."
                        ]
                    ]
                }
            });
            await driver.sleep(1000);
        } catch (error) {
            console.log(error);
        }
    } else if ((xml_url.includes("Page Not Found")) || (xml_url.includes("404 not found"))) {
        console.log("Without Sitemap.");
        try {
            // write data to sheet
            googleSheets.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: "Sheet1!C17",
                valueInputOption: "USER_ENTERED",
                resource: {
                    values: [
                        [ 
                            "Without Sitemap."
                        ]
                    ]
                }
            });
            await driver.sleep(1000);
        } catch (error) {
            console.log(error);
        }
    }
    await driver.sleep(1000);


    // H1 TAGS
    let h1_count = await driver.executeScript("return document.getElementsByTagName('h1').length");
    console.log(h1_count);
    try {
        // write data to sheet
        googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Sheet1!C17",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [ 
                        "[ " + h1_count + " ]"
                    ]
                ]
            }
        });
        await driver.sleep(1000);
    } catch (error) {
        console.log(error);
    }
    await driver.sleep(1000);


    // RECAPTCHA
    await driver.switchTo().newWindow('tab');
    await driver.get(link);
    await driver.sleep(1000);
    await driver.executeScript("window.scrollBy(0,9999)", "");
    await driver.sleep(5000);

    let recaptcha = await driver.executeScript("return document.getElementsByClassName('grecaptcha-badge')[0]");

    if ((recaptcha === undefined) || (recaptcha === null)) {
        console.log("Without Recaptcha");
        try {
            // write data to sheet
            googleSheets.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: "Sheet1!C13",
                valueInputOption: "USER_ENTERED",
                resource: {
                    values: [
                        [ 
                            "Without Recaptcha."
                        ]
                    ]
                }
            });
            await driver.sleep(1000);
        } catch (error) {
            console.log(error);
        }
    } else {
        console.log("With Recaptcha");
        try {
            // write data to sheet
            googleSheets.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: "Sheet1!C13",
                valueInputOption: "USER_ENTERED",
                resource: {
                    values: [
                        [ 
                            "With Recaptcha."
                        ]
                    ]
                }
            });
            await driver.sleep(1000);
        } catch (error) {
            console.log(error);
        }
    }


    if (woocommerce) {
        console.log("WOOCOMMERCE--------------------------");
        // SHIPPING AND RETURN POLICY
        let a_count = await driver.executeScript("return document.getElementsByTagName('a').length");

        try {
            for (let index = 0; index < a_count; index++) {
                let footer_link = await driver.executeScript("return document.getElementsByTagName('a')[" + index + "].innerText");

                if (footer_link != undefined) {
                    if ((footer_link.includes("Shipping / Exchange Policy")) || (footer_link.includes("Shipping and Return Policy")) || (footer_link.includes("Shipping"))) {
                        console.log("With Shipping Policy.");
                        try {
                            // write data to sheet
                            googleSheets.spreadsheets.values.append({
                                auth,
                                spreadsheetId,
                                range: "Sheet1!C18",
                                valueInputOption: "USER_ENTERED",
                                resource: {
                                    values: [
                                        [ 
                                            "With Shipping Policy."
                                        ]
                                    ]
                                }
                            });
                            await driver.sleep(1000);
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    if ((footer_link.includes("Request for Return")) || (footer_link.includes("Refund & Store Policies")) || (footer_link.includes("Refund Policy"))
                    || (footer_link.includes("Shipping and Return Policy")) || (footer_link.includes("Return & Refund Policy")) || (footer_link.includes("Returns Policy"))) {
                        console.log("With Return & Refund Policy.");
                        try {
                            // write data to sheet
                            googleSheets.spreadsheets.values.append({
                                auth,
                                spreadsheetId,
                                range: "Sheet1!C19",
                                valueInputOption: "USER_ENTERED",
                                resource: {
                                    values: [
                                        [ 
                                            "With Return & Refund Policy."
                                        ]
                                    ]
                                }
                            });
                            await driver.sleep(1000);
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            
            }
        } catch (error) {
            console.log(error);
        }


        // COUPONS
        var range = "Sheet1!C20";
        var values = "https://docs.google.com/spreadsheets/d/1Fnni9jm4brdAzJk8btvQ-pJ_0467mmBktiOWBCN9rjg/edit#gid=1156654261";
        await driver.switchTo().newWindow('tab');
        await driver.get(link + "wp-admin/edit.php?post_type=shop_coupon");

        // check for coupons
        try {            
            let code_length = await driver.executeScript("return document.getElementsByClassName('row-title').length");
            for (let i = 0; i < code_length; i++) {
                let code = await driver.executeScript("return document.getElementsByClassName('row-title')[" + i + "].innerText");
                let expiry_date = await driver.executeScript("return document.getElementsByClassName('expiry_date column-expiry_date')[" + i + "].innerText");
                console.log(code);
                console.log(expiry_date);
                try {
                    // write to sheet
                    googleSheets.spreadsheets.values.append({
                        auth,
                        spreadsheetId,
                        range: "Coupons!A2:B2",
                        valueInputOption: "USER_ENTERED",
                        resource: {
                            values: [
                                [ 
                                    code,
                                    expiry_date
                                ]
                            ]
                        }
                    });
                    await driver.sleep(1000);
                } catch (error) {
                    console.log(error);
                }

            }
            await driver.sleep(1000);
        } catch (error) {
            console.log(error);
            await driver.sleep(1000);
        }
        write_link_to_sheets(range, values);
        await driver.sleep(1000);
    }



    // end test
    console.log("test ends.");
    alert("DONE");
}


module.exports = { dev_checklist };
