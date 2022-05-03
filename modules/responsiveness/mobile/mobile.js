const {Builder, By} = require("selenium-webdriver");
const logger = require('../../../middleware/logger.js');
const server = require('../../../server.js');
const sheet = require('../../../middleware/gsheet.js');


async function mobile(module_name, url, email, password, timestamp, lt_email, lt_password, lambdatest_site, devices, versions, brand, device_mobile, os_mobile, brand_mobile, deviceOrOS_mobile) {
    let driver = await new Builder().forBrowser("chrome").build();
    try {
        await driver.get(lambdatest_site);
        try {
            if ((email) && (password)) {
                await driver.findElement(By.id("email")).sendKeys(email);
                await driver.findElement(By.id("password")).sendKeys(password);
                logger.logger.log({ level: 'info', message: 'RESPONSIVENESS - edit credentials success.', tester: server.userId });
                console.log("RESPONSIVENESS - edit credentials success.");
                value = [ "", "", "info", "edit credentials success.", server.userId, timestamp, module_name, url, "", email + "\n" + password, "", "", "", "", devices, versions ];
                await sheet.addRow();
                await sheet.appendValues(value);
            } else {
                await driver.findElement(By.id("email")).sendKeys(lt_email);
                await driver.findElement(By.id("password")).sendKeys(lt_password);
                logger.logger.log({ level: 'info', message: 'RESPONSIVENESS - same credentials.', tester: server.userId });
                console.log("RESPONSIVENESS - same credentials.");
                value = [ "", "", "info", "same credentials.", server.userId, timestamp, module_name, url, "", lt_email + "\n" + lt_password, "", "", "", "", devices, versions ];
                await sheet.addRow();
                await sheet.appendValues(value);
            }
            await driver.findElement(By.id("login-button")).click();
            await driver.sleep(3000);
            let error_msg1 = await driver.executeScript("return document.getElementsByClassName('text-red-700')[0]");
            let error_msg2 = await driver.executeScript("return document.getElementsByClassName('error-mass')[0]");
            if (error_msg1 || error_msg2) {
                logger.logger.log({ level: 'error', message: 'RESPONSIVENESS - lambdatest login failed.', tester: server.userId });
                console.log("RESPONSIVENESS - lambdatest login failed.");
                value = [ "", "", "error", "lambdatest login failed.", server.userId, timestamp, module_name, url, "", "", "", "", "", "", devices, versions ];
                await sheet.addRow();
                await sheet.appendValues(value);
            } else {
                logger.logger.log({ level: 'info', message: 'RESPONSIVENESS - lambdatest login success.', tester: server.userId });
                console.log("RESPONSIVENESS - lambdatest login success.");
                value = [ "", "", "info", "lambdatest login success.", server.userId, timestamp, module_name, url, "", "", "", "", "", "", devices, versions ];
                await sheet.addRow();
                await sheet.appendValues(value);
            }
        } catch (error) {
            logger.logger.log({ level: 'error', message: error, tester: server.userId });
            console.log(error);
            value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, url, "", "", "", "", "", "", devices, versions ];
            await sheet.addRow();
            await sheet.appendValues(value);
        }
        await driver.findElement(By.id("input-text")).sendKeys(url);
        await driver.sleep(1000);
        await driver.executeScript("return document.getElementsByTagName('li').android.click()");
        if (os_mobile === "Android") {
            console.log("Android");
            let brand_length = await driver.executeScript("return document.getElementsByClassName('list-unstyled real-browser-test__list-device mobile_device_list')[4].children.length");
            for (let j = 0; j < brand_length; j++) {
                let os_classname_android = await driver.executeScript("return document.getElementsByClassName('list-unstyled real-browser-test__list-device mobile_device_list')[4].children[" + j + "].innerText");
                if (os_classname_android === brand_mobile) {
                    console.log("os_classname_android: " + os_classname_android);
                    console.log("brand_mobile: " + brand_mobile);
                    await driver.executeScript("return document.getElementsByClassName('list-unstyled real-browser-test__list-device mobile_device_list')[4].children[" + j + "].click()");
                }
            }
            let device_length = await driver.executeScript("return document.getElementsByClassName('list-unstyled real-browser-test__list-device mobile_device_list')[5].children.length");
            for (let k = 0; k < device_length; k++) {
                let brand_classname = await driver.executeScript("return document.getElementsByClassName('list-unstyled real-browser-test__list-device mobile_device_list')[5].children[" + k + "].innerText");
                if (brand_classname === deviceOrOS_mobile) {
                    console.log("deviceOrOS_mobile: " + deviceOrOS_mobile);
                    await driver.executeScript("return document.getElementsByClassName('list-unstyled real-browser-test__list-device mobile_device_list')[5].children[" + k + "].click()");
                    await driver.findElement(By.className("btn-start")).click();
                }
            }
        }
        else if (os_mobile === "IOS") {
            console.log("IOS");
            let os_length = await driver.executeScript("return document.getElementsByClassName('fa fa-apple').length");
            for (let i = 0; i < os_length; i++) {
                let os_classname_ios = await driver.executeScript("return document.getElementsByClassName('fa fa-apple')[" + i + "].classList.value");
                if (os_classname_ios === "fa fa-apple") {
                    await driver.executeScript("return document.getElementsByClassName('fa fa-apple')[" + i + "].click()");
                    let device_mobile_length = await driver.executeScript("return document.getElementsByClassName('list-unstyled real-browser-test__list-device mobile_device_list')[1].children.length");
                    for (let l = 0; l < device_mobile_length; l++) {
                        let device_mobile_innertext = await driver.executeScript("return document.getElementsByClassName('list-unstyled real-browser-test__list-device mobile_device_list')[1].children[" + l + "].innerText");
                        if (device_mobile_innertext === deviceOrOS_mobile) {
                            console.log("deviceOrOS_mobile: " + deviceOrOS_mobile);
                            await driver.executeScript("return document.getElementsByClassName('list-unstyled real-browser-test__list-device mobile_device_list')[1].children[" + l + "].click()");
                            await driver.findElement(By.className("btn-start")).click();
                        }
                    }
                }
            }
        }



        // await driver.executeScript("return document.getElementsByClassName('img-responsive center-block')[1].click()");
        // await driver.sleep(1000);
        // await driver.executeScript(brand);
        // await driver.sleep(1000);
        // await driver.executeScript(device_mobile);
        // await driver.sleep(1000);
        // await driver.findElement(By.className("btn-start")).click();
    } catch (error) {
        logger.logger.log({ level: 'error', message: error, tester: server.userId });
        console.log(error);
        value = [ "", "", "error", JSON.stringify(error), server.userId, timestamp, module_name, url, "", "", "", "", "", "", devices, versions ];
        await sheet.addRow();
        await sheet.appendValues(value);
    }
    // end test
    logger.logger.log({ level: 'info', message: 'test ends.', tester: server.userId });
    console.log("test ends.");
    value = [ "", "", "info", "test ends.", server.userId, timestamp, module_name, url, "", "", "", "", "", "", devices, versions ];
    await sheet.addRow();
    await sheet.appendValues(value);
}


module.exports = { mobile };

    