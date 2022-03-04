const app = require('express')();
const {Builder, By} = require("selenium-webdriver");
const config = require("../../config");

const lambdatest_site = config.lambdatest_site;
const lt_email = config.creds_lambdatest.email;
const lt_password = config.creds_lambdatest.password;


async function windows8(url, email, password) {
    let driver = await new Builder().forBrowser("chrome").build();
    try {
        await driver.get(lambdatest_site);
        if ((email) && (password)) {
            console.log("lambdatest credentials were edited.");
            await driver.findElement(By.id("email")).sendKeys(email);
            await driver.findElement(By.id("password")).sendKeys(password);
        } else {
            console.log("lambdatest credentials were not edited.");
            await driver.findElement(By.id("email")).sendKeys(lt_email);
            await driver.findElement(By.id("password")).sendKeys(lt_password);
        }
        await driver.findElement(By.id("login-button")).click();
        await driver.sleep(3000);
        await driver.findElement(By.id("input-text")).sendKeys(url);
        await driver.executeScript("return document.getElementsByTagName('li')[115].click()");
        await driver.findElement(By.className("btn-start")).click();
    } catch (error) {
        console.log(error);
    }
}


module.exports = { windows8 };

    