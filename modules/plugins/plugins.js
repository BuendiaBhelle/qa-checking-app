const {Builder, By} = require("selenium-webdriver");
const alert = require("alert"); 
const config = require("../../config");
const server = require('../../server.js');
const sheet = require('../../middleware/gsheet.js');

let credentials = config.credentials_blc_backend;
const module_name = "PLUGIN";

let url;
let username;
let password;
async function plugins(timestamp, domains, broken_link_checker, yoast) {

    async function error_log_in() {
        let login_error = await driver.executeScript("return document.getElementById('login_error')");
        if (login_error) {
            console.log("PLUGIN - wordpress login failed.");
            value = [ "", "", "error", "wordpress login failed.", server.userId, timestamp, module_name, url, username + "\n" + password, "", "", "", "", "", "", "" ];
            await sheet.addRow();
            await sheet.appendValues(value);
            await driver.sleep(1000);
        } else {
            var admin_email_verification = await driver.executeScript("return document.querySelector('form').classList.contains('admin-email-confirm-form')");  
            if (admin_email_verification === true) {
                await driver.executeScript("return document.getElementsByTagName('a')[3].click()");
                console.log("PLUGIN - admin email verification.");
                value = [ "", "", "info", "admin email verification.", server.userId, timestamp, module_name, url, username + "\n" + password, "", "", "", "", "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value);
                await driver.sleep(1000);
            } else {
                console.log("PLUGIN - wordpress login success.");
                value = [ "", "", "info", "wordpress login success.", server.userId, timestamp, module_name, url, username + "\n" + password, "", "", "", "", "", "", "" ];
                await sheet.addRow();
                await sheet.appendValues(value);
                await driver.sleep(1000);
            }
        }
    }


    for (let index = 0; index < credentials.length; index++) {
        url = credentials[index][0];
        username = credentials[index][1];
        password = credentials[index][2];


        if (url.includes(domains) === true) {
            console.log(url);
            var driver = await new Builder().forBrowser("chrome").build();

            // wp login
            if (url === "https://www.hospiceofyuma.com") {
                await driver.get(url + "/hoylogin");

                await driver.findElement(By.name("log")).sendKeys(username);
                await driver.findElement(By.name("pwd")).sendKeys(password);
                await driver.findElement(By.id("wp-submit")).click();
                error_log_in();

                await driver.get("https://hospiceofyuma.com/hoylogin/plugins.php");
            } 
            else if (url === "https://www.phoenixritecare.org") {
                await driver.get(url + "/pvlogin");

                await driver.findElement(By.id("user_login")).sendKeys(username);
                await driver.findElement(By.id("user_pass")).sendKeys(password);
                await driver.executeScript("return document.getElementsByClassName('button button-primary button-large')[0].click()");
                error_log_in();
        
                let button_length = await driver.executeScript("return document.getElementsByClassName('btn').length");
                for (let index = 0; index < button_length; index++) {
                    let button_innertext = await driver.executeScript("return document.getElementsByClassName('btn')[" + index + "].innerText");
                    if (button_innertext === "Website") {
                        await driver.executeScript("return document.getElementsByClassName('btn')[" + index + "].click()");
                        console.log("WEBSITE");
                        break;
                    }
                }
        
                await driver.get(url + "/wp-admin/plugins.php");
            }
            else if ((url === "https://www.businesstrendstoday.com") || (url === "https://www.virtualassistantsoutsourcing.com")
            || (url === "https://www.bbllessons.com") || (url === "https://www.thesolutionsforum.com") 
            || (url === "https://www.primeleisures.com") || (url === "https://www.mcbuildingmaintenance.com")
            || (url === "https://www.drmazaheri.com")
            || (url === "https://www.aerialengagement.com") || (url === "https://www.ewingconstruction.com")
            || (url === "https://www.buckeyederm.com") || (url === "https://www.jelleyvision.com")
            || (url === "https://staffportal.optimizex.com") || (url === "https://www.gatorskin.us")
            || (url === "https://www.culpepper-associates.com") || (url === "https://www.opakapakagrillandbar.com")
            || (url === "https://www.southwestdirectmortgage.com") || (url === "https://www.turbineaero.com")
            || (url === "https://www.torontostravel.com") || (url === "https://www.westechrecyclers.com")
            || (url === "https://www.collisioncenternorthscottsdale.com") || (url === "https://www.trezpro.com")
            || (url === "https://www.primemedicalpain.com") || (url === "https://www.frlawgroup.com")
            || (url === "https://www.indinspect.com") || (url === "https://www.indinspect.com")
            || (url === "https://www.kyrenefamilydentistry.com") || (url === "https://www.onlinebrandreputation.com")
            || (url === "https://www.optimizex.com") || (url === "https://www.randosouthwest.com")
            || (url === "https://www.accidentchiropracticaz.com") || (url === "https://www.aerotecinternational.com")
            || (url === "https://www.alliancedermatology.com") || (url === "https://www.jechvac.com")
            || (url === "https://www.oxlocalsearch.com") || (url === "https://www.buckeyelot.com")
            || (url === "https://www.dentistryatthebiltmore.com") || (url === "https://www.fccongoaz.com")
            || (url === "https://www.freddabranyon.com") || (url === "https://www.gebionline.com")
            || (url === "https://www.genovation.com") || (url === "https://gentryrealestategroup.com")
            || (url === "https://www.inspired-engagement.com") || (url === "https://www.johnsoninjurylaw.com")
            || (url === "https://keenindependent.com") || (url === "https://www.mhsjackrabbitsfoundation.com")
            || (url === "https://www.myseoagency.com") || (url === "https://www.ngaaz.org")
            || (url === "https://www.ocmedspa.com") || (url === "https://search.optimizex.com")
            || (url === "https://www.orionisg.com") || (url === "https://www.pmrtimeshares.com")
            || (url === "https://www.suncliffsedona.com") || (url === "https://www.jmrestoration.com")
            || (url === "https://www.valuesquest.com") || (url === "https://www.paysondermatology.com")
            || (url === "https://www.americanleatherusa.com") || (url === "https://amblaw.com")
            || (url === "https://www.teamleadership.org") || (url === "https://www.kyotoscottsdale.com")
            || (url === "https://www.americanwestpallets.com") || (url === "https://www.coachingliteracy.com")
            || (url === "https://www.drgholampeyman.com") || (url === "https://www.pressuresystemsinc.com")
            || (url === "https://www.risingsunmartialartsaz.com") || (url === "https://www.goimpacttechnology.com")
            || (url === "https://www.hbmgov.com") || (url === "https://www.primeview.com")
            || (url === "https://www.sunrisejewelryusa.com") || (url === "https://www.andresperezjurado.com")
            || (url === "https://www.jewelryoutletinc.com") || (url === "https://www.advancedimagemedspa.com")
            || (url === "https://www.arizonaretinalspecialists.com") || (url === "https://www.amissionofmercy.org")
            || (url === "https://www.biltmoreloanandjewelry.com") || (url === "https://www.everythingjustrocks.com")
            || (url === "https://www.truckerpaths.com") || (url === "https://www.natina.com")
            || (url === "https://www.airgain.com") || (url === "https://www.maintenancebest.com"
            || (url === "https://www.molnarwalkingy.com"))) {
                await driver.get(url + "/pvlogin");

                await driver.findElement(By.name("log")).sendKeys(username);
                await driver.findElement(By.name("pwd")).sendKeys(password);
                await driver.findElement(By.id("wp-submit")).click();
                error_log_in();
                await driver.get(url + "/wp-admin/plugins.php");
            } 
            else {
                await driver.get(url + "/wp-admin/plugins.php");

                await driver.findElement(By.name("log")).sendKeys(username);
                await driver.findElement(By.name("pwd")).sendKeys(password);
                await driver.findElement(By.id("wp-submit")).click();
                error_log_in();
            }

            // check for Broken Link Checker plugin 
            if (broken_link_checker) {
                console.log("BROKEN LINK CHECKER");
                try {            
                    let plugin_list = await driver.executeScript("return document.getElementsByTagName('strong').length");
                    for (let i = 0; i < plugin_list; i++) {
                        let plugin = await driver.executeScript("return document.getElementsByTagName('strong')[" + i + "].innerText");
                        if (plugin === "Broken Link Checker") {
                            console.log("With Broken Link Checker.");   
                            alert("With Broken Link Checker.");
                        }
                    }
                    console.log("PLUGIN - check for plugin success.");
                    value = [ "", "", "info", "check for plugin success.", server.userId, timestamp, module_name, url, username + "\n" + password, "", "", "", "", "", "", "" ];
                    await sheet.addRow();
                    await sheet.appendValues(value);
                    await driver.sleep(1000);
                } catch (error) {
                    console.log(error);
                    value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, url, username + "\n" + password, "", "", "", "", "", "", "" ];
                    await sheet.addRow();
                    await sheet.appendValues(value);
                    await driver.sleep(1000);
                }
            }

            // check for Yoast SEO plugin 
            else if (yoast) {
                console.log("YOAST");
                try {            
                    let plugin_list = await driver.executeScript("return document.getElementsByTagName('strong').length");
                    for (let i = 0; i < plugin_list; i++) {
                        let plugin = await driver.executeScript("return document.getElementsByTagName('strong')[" + i + "].innerText");
                        if (plugin === "Yoast SEO") {
                            console.log("With Yoast SEO.");   
                            alert("With Yoast SEO.");
                        }
                    }
                    console.log("PLUGIN - check for plugin success.");
                    value = [ "", "", "info", "check for plugin success.", server.userId, timestamp, module_name, url, username + "\n" + password, "", "", "", "", "", "", "" ];
                    await sheet.addRow();
                    await sheet.appendValues(value);
                    await driver.sleep(1000);
                } catch (error) {
                    console.log(error);
                    value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, url, username + "\n" + password, "", "", "", "", "", "", "" ];
                    await sheet.addRow();
                    await sheet.appendValues(value);
                    await driver.sleep(1000);
                }
            }    

        }
        // else {
        //     console.log("SITE NOT RECOGNIZED BY THE APP.");
        //     alert("SITE NOT RECOGNIZED BY THE APP.");
        // }
    }

    // end test
    console.log("test ends.");
    value = [ "", "", "info", "test ends.", server.userId, timestamp, module_name, url, username + "\n" + password, "", "", "", "", "", "", "" ];
    await sheet.addRow();
    await sheet.appendValues(value);
    await driver.sleep(1000);
    
}



module.exports = { plugins };
