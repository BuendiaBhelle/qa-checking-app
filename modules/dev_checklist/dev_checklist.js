const {Builder, By} = require("selenium-webdriver");
const {google} = require("googleapis");
const config = require("../../config.js");
require('chromedriver');

const auth = config.auth;
const spreadsheetId = config.spreadsheetId_dev_checklist;


async function dev_checklist(link, username, password) {
    const client = await auth.getClient();
    var googleSheets = google.sheets({ version: "v4", auth: client });
    var driver = await new Builder().forBrowser("chrome").build();


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
        let plugin_active_is_uninstallable_length = await driver.executeScript("return document.getElementsByClassName('active is-uninstallable').length");
        var plugins_count = plugin_active_is_uninstallable_length-1;
        for (let i = 0; i <= plugins_count; i++) {
            let plugin_active_is_uninstallable = await driver.executeScript("return document.getElementsByClassName('active is-uninstallable')[" + i + "].getAttribute('data-slug')");

            // check for Broken Link Checker plugin 
            if (plugin_active_is_uninstallable === "broken-link-checker") {
                console.log("With Broken Link Checker.");   
                await googleSheets.spreadsheets.values.append({
                    auth,
                    spreadsheetId,
                    range: "Sheet1!C4",
                    valueInputOption: "USER_ENTERED",
                    resource: {
                        values: [
                            [ 
                                "With Broken Link Checker."
                            ]
                        ]
                    }
                });
            }
            // check for Yoast SEO plugin 
            if (plugin_active_is_uninstallable === "wordpress-seo") {
                console.log("With Yoast SEO.");   
                await googleSheets.spreadsheets.values.append({
                    auth,
                    spreadsheetId,
                    range: "Sheet1!C5",
                    valueInputOption: "USER_ENTERED",
                    resource: {
                        values: [
                            [ 
                                "With Yoast SEO."
                            ]
                        ]
                    }
                });
            }
        }
        console.log("DEFAULT PLUGINS - check for plugin success.");
        await driver.sleep(1000);
    } catch (error) {
        console.log(error);
        await driver.sleep(1000);
    }

    // COPYRIGHT 
    await driver.switchTo().newWindow('tab');
    await driver.get(link);
    await driver.sleep(3000);

    let p_count = await driver.executeScript("return document.getElementsByTagName('p').length");

    for (let index = 0; index < p_count; index++) {
        let copyright = await driver.executeScript("return document.getElementsByTagName('p')[" + index + "].innerText");

        if (copyright.includes("All Rights Reserved")) {
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
                                copyright
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


    // TERMS & PRIVACY
    var range = "Sheet1!C16";
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
    var range = "Sheet1!C17";
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


    // H1 TAGS
    let h1_count = await driver.executeScript("return document.getElementsByTagName('h1').length");
    console.log(h1_count);
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
                        h1_count
                    ]
                ]
            }
        });
        await driver.sleep(1000);
    } catch (error) {
        console.log(error);
    }
    await driver.sleep(1000);


    // end test
    console.log("test ends.");
}


module.exports = { dev_checklist };
